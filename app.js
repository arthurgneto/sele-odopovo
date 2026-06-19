// =========================================================
// SELEÇÃO DO POVO — app.js (v3 — Supabase)
// =========================================================

(function () {
  "use strict";

  // =========================================================
  // CONFIGURAÇÃO SUPABASE
  // Substitua pelos seus valores do painel Supabase:
  // Project Settings → API
  // =========================================================
  const SUPABASE_URL = "https://nmhqragzhfkwjbvicrwx.supabase.co";
  const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5taHFyYWd6aGZrd2pidmljcnd4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODE4MjIwNzksImV4cCI6MjA5NzM5ODA3OX0.vrJdST8s51aPKMNhWXgzqULg7eazzFoxLXeuw0a5hIw";

  // Cliente Supabase (via CDN — adicione o script no index.html)
  const { createClient } = supabase;
  const sb = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

  // ---------- ESTADO ----------
  let currentFormationKey = "4-3-3";
  let selectedSlots = {};
  let selectedCoach = null;
  let activeSlotId = null;

  // Jogadores carregados do Supabase (substitui o array estático do data.js)
  let PLAYERS = [];

  // Cache local dos totais (carregado do Supabase)
  let playerVoteTotals = {};  // { [player_id]: { name, pos, total_votes } }
  let coachVoteTotals  = {};  // { [coach_id]:  { name, total_votes } }
  let totalVotes = 0;

  // Ticker
  const TICKER_MAX_CHARS = 140;
  const BLOCKED_WORDS = [
    "merda","caralho","porra","foda","fodendo","viado","puta","prostituta",
    "vagabunda","fdp","filhadaputa","filha da puta","cu","buceta","pinto",
    "desgraça","lixo","idiota","imbecil","retardado","cretino","otario",
    "vai tomar no","arrombado"
  ];

  const $ = (sel, ctx) => (ctx || document).querySelector(sel);
  const $$ = (sel, ctx) => Array.from((ctx || document).querySelectorAll(sel));

  // ---------- INIT ----------
  document.addEventListener("DOMContentLoaded", async () => {
    renderFormationCards();
    renderCoachList();
    renderField();
    bindGlobalEvents();
    updateVoteButtonState();

    // Carrega dados do Supabase
    await loadVoteData();
    renderPovoField();
    await initTicker();
  });

  // =========================================================
  // SUPABASE — CARREGAR DADOS
  // =========================================================
  async function loadVoteData() {
    try {
      // Carrega jogadores do Supabase (substituindo o data.js estático)
      const { data: playersData, error: playersError } = await sb
        .from("players")
        .select("*")
        .order("name");

      if (playersError) throw playersError;
      PLAYERS = playersData || [];

      // Total de votos
      const { data: countData } = await sb
        .from("vote_count")
        .select("total")
        .single();
      totalVotes = parseInt(countData?.total || 0);
      $("#stat-votos").textContent = totalVotes;

      // Totais por jogador
      const { data: votes } = await sb
        .from("player_vote_totals")
        .select("*");
      playerVoteTotals = {};
      (votes || []).forEach(p => {
        playerVoteTotals[p.player_id] = p;
      });

      // Totais por técnico
      const { data: coaches } = await sb
        .from("coach_vote_totals")
        .select("*");
      coachVoteTotals = {};
      (coaches || []).forEach(c => {
        coachVoteTotals[c.coach_id] = c;
      });

      renderField();
      renderPovoField();
    } catch (err) {
      console.error("Erro ao carregar dados do Supabase:", err);
    }
  }

  // =========================================================
  // TICKER — Supabase
  // =========================================================
  async function initTicker() {
    await renderTickerContent();

    $("#ticker-add-btn").addEventListener("click", () => {
      $("#ticker-modal").style.display = "flex";
      $("#ticker-input").value = "";
      updateCharCount();
      setTimeout(() => $("#ticker-input").focus(), 80);
    });

    $("#ticker-cancel").addEventListener("click", () => {
      $("#ticker-modal").style.display = "none";
    });

    $("#ticker-input").addEventListener("input", updateCharCount);
    $("#ticker-submit").addEventListener("click", submitTickerMessage);
  }

  async function renderTickerContent() {
    const container = $("#ticker-content");
    const since = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString();

    const { data: msgs } = await sb
      .from("ticker_messages")
      .select("text, created_at")
      .gte("created_at", since)
      .order("created_at", { ascending: false })
      .limit(50);

    const defaults = [
      "Deixe sua mensagem no carrossel! 👆",
      "Monte sua Seleção e vote no time ideal! 🇧🇷",
      "Quem seria o melhor técnico para a Seleção? Vote agora!",
      "A Seleção do Povo é feita por você — vote e faça a diferença!",
    ];

    const all = msgs && msgs.length > 0
      ? msgs.map(m => m.text)
      : defaults;

    const doubled = [...all, ...all];
    container.innerHTML = doubled.map(t =>
      `<span class="ticker-msg"><span class="tag">POVO</span>${escapeHtml(t)}</span>`
    ).join("");
  }

  function escapeHtml(str) {
    return str.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;");
  }

  function containsBlockedWords(text) {
    const lower = text.toLowerCase();
    return BLOCKED_WORDS.some(w => lower.includes(w));
  }

  function updateCharCount() {
    const val = $("#ticker-input").value;
    const cnt = val.length;
    const el = $("#ticker-char-count");
    el.textContent = cnt + " / " + TICKER_MAX_CHARS;
    el.classList.toggle("over", cnt > TICKER_MAX_CHARS);
    $("#ticker-submit").disabled = cnt === 0 || cnt > TICKER_MAX_CHARS;
  }

  async function submitTickerMessage() {
    const text = $("#ticker-input").value.trim();
    if (!text || text.length > TICKER_MAX_CHARS) return;
    if (containsBlockedWords(text)) {
      showToast("Mensagem contém palavras não permitidas. Tente novamente.");
      return;
    }

    const { error } = await sb
      .from("ticker_messages")
      .insert([{ text }]);

    if (error) {
      showToast("Erro ao publicar mensagem. Tente novamente.");
      console.error(error);
      return;
    }

    await renderTickerContent();
    $("#ticker-modal").style.display = "none";
    showToast("Mensagem publicada no carrossel! 🎉");
  }

  // =========================================================
  // FORMAÇÕES
  // =========================================================
  function renderFormationCards() {
    const grid = $("#formation-grid");
    grid.innerHTML = "";
    Object.keys(FORMATIONS).forEach((key) => {
      const f = FORMATIONS[key];
      const card = document.createElement("button");
      card.className = "formation-card" + (key === currentFormationKey ? " active" : "");
      card.type = "button";
      card.innerHTML = `<div class="f-name">${f.label}</div><div class="f-desc">${f.desc}</div>`;
      card.addEventListener("click", () => switchFormation(key));
      grid.appendChild(card);
    });
  }

  function switchFormation(key) {
    if (key === currentFormationKey) return;
    currentFormationKey = key;
    selectedSlots = {};
    $("#current-formation-label").textContent = FORMATIONS[key].label;
    renderFormationCards();
    renderField();
    renderPovoField();
    updateVoteButtonState();
  }

  // =========================================================
  // CAMPO / SLOTS
  // =========================================================
  function renderField() {
    const container = $("#slots-container");
    container.innerHTML = "";
    const formation = FORMATIONS[currentFormationKey];

    formation.slots.forEach((slot) => {
      const player = selectedSlots[slot.id];
      const el = document.createElement("div");
      el.className = "slot" + (player ? " filled" : "");
      el.style.left = slot.x + "%";
      el.style.top = (100 - slot.y) + "%";
      el.dataset.slotId = slot.id;

      const initials = player ? initialsOf(player.name) : POS_LABEL[slot.pos].slice(0, 3).toUpperCase();
      const rating = player ? getPlayerRating(player.id) : null;

      el.innerHTML =
        '<div class="slot-circle">' +
          initials +
          (rating !== null ? '<span class="slot-rating">' + rating + '</span>' : "") +
        '</div>' +
        '<div class="slot-label">' + (player ? player.name : POS_LABEL[slot.pos]) + '</div>';

      el.addEventListener("click", () => openPlayerModal(slot));
      container.appendChild(el);
    });
  }

  function initialsOf(name) {
    return name.split(" ").map((p) => p[0]).slice(0, 2).join("").toUpperCase();
  }

  function getPlayerRating(playerId) {
    const entry = playerVoteTotals[playerId];
    if (!entry || entry.total_votes === 0) return null;
    const score = Math.min(9.9, 6.0 + Math.log2(entry.total_votes + 1) * 0.6);
    return score.toFixed(1);
  }

  // =========================================================
  // MODAL DE SELEÇÃO DE JOGADOR
  // =========================================================
  function openPlayerModal(slot) {
    activeSlotId = slot.id;
    const overlay = $("#modal-overlay");
    const title = $("#modal-title");
    const cat = POS_CATEGORY[slot.pos]; title.innerHTML = 'Escolher <span>' + CATEGORY_LABEL[cat] + '</span> <small style="opacity:.6;font-size:.7em">' + POS_LABEL[slot.pos] + '</small>';
    $("#modal-search").value = "";
    overlay.style.display = "flex";
    renderModalList(slot.pos, "");
    setTimeout(() => $("#modal-search").focus(), 50);
  }

  function closePlayerModal() {
    $("#modal-overlay").style.display = "none";
    activeSlotId = null;
  }

  function renderModalList(pos, query) {
    const list = $("#modal-list");
    const q = query.trim().toLowerCase();
    const candidates = PLAYERS
      .filter((p) => POS_CATEGORY[p.pos] === POS_CATEGORY[pos])
      .filter((p) => !q || p.name.toLowerCase().includes(q) || p.club.toLowerCase().includes(q));

    if (candidates.length === 0) {
      list.innerHTML = '<div class="empty-search">Nenhum jogador encontrado</div>';
      return;
    }

    list.innerHTML = candidates.map((p) => {
      const votes = playerVoteTotals[p.id]?.total_votes || 0;
      const isSelected = Object.values(selectedSlots).some((s) => s.id === p.id);
      return (
        '<div class="player-item' + (isSelected ? " selected" : "") + '" data-player-id="' + p.id + '">' +
          '<div class="player-avatar">' + initialsOf(p.name) + '</div>' +
          '<div class="player-info">' +
            '<div class="player-name">' + p.name + '</div>' +
            '<div class="player-club">' + p.club + (votes > 0 ? ' · <b>' + votes + ' votos</b>' : '') + '</div>' +
          '</div>' +
        '</div>'
      );
    }).join("");

    $$(".player-item", list).forEach((item) => {
      item.addEventListener("click", () => {
        const playerId = item.dataset.playerId;
        const player = PLAYERS.find((p) => p.id === playerId);
        if (player) selectPlayer(player);
      });
    });
  }

  function selectPlayer(player) {
    selectedSlots[activeSlotId] = player;
    closePlayerModal();
    renderField();
    updateVoteButtonState();
  }

  // =========================================================
  // TÉCNICOS
  // =========================================================
  function renderCoachList(query) {
    const list = $("#coach-list");
    const q = (query || "").trim().toLowerCase();
    const groups = ["Estrangeiros", "Nacionais", "Nova geração"];

    let html = "";
    groups.forEach((g) => {
      const items = COACHES.filter((c) => c.group === g).filter((c) =>
        !q || c.name.toLowerCase().includes(q) || c.club.toLowerCase().includes(q)
      );
      if (items.length === 0) return;
      html += '<div class="coach-group-label">' + g + '</div>';
      items.forEach((c) => {
        const active = selectedCoach && selectedCoach.id === c.id;
        const votes = coachVoteTotals[c.id]?.total_votes || 0;
        html +=
          '<div class="coach-item' + (active ? " active" : "") + '" data-coach-id="' + c.id + '">' +
            '<div class="coach-avatar">' + initialsOf(c.name) + '</div>' +
            '<div class="coach-info">' +
              '<div class="coach-name">' + c.name + '</div>' +
              '<div class="coach-style">' + c.style + (votes > 0 ? ' · <b>' + votes + ' votos</b>' : '') + '</div>' +
            '</div>' +
          '</div>';
      });
    });

    if (!html) {
      html = '<div class="empty-search" style="padding:20px 8px;">Nenhum técnico encontrado</div>';
    }

    list.innerHTML = html;

    $$(".coach-item", list).forEach((item) => {
      item.addEventListener("click", () => {
        const coachId = item.dataset.coachId;
        selectedCoach = COACHES.find((c) => c.id === coachId);
        renderCoachList($("#coach-search").value);
        updateVoteButtonState();
      });
    });
  }

  // =========================================================
  // BOTÃO VOTAR
  // =========================================================
  function updateVoteButtonState() {
    const formation = FORMATIONS[currentFormationKey];
    const filled = formation.slots.filter((s) => selectedSlots[s.id]).length;
    const total = formation.slots.length;
    const btn = $("#vote-btn");
    const hint = $("#vote-hint");

    const ready = filled === total && selectedCoach;
    btn.disabled = !ready;

    if (ready) {
      hint.textContent = "Tudo pronto! Seu voto vai contar na Seleção do Povo.";
    } else if (!selectedCoach && filled === total) {
      hint.textContent = "Falta escolher o técnico.";
    } else {
      hint.textContent = "Faltam " + (total - filled) + " de " + total + " jogadores" + (!selectedCoach ? " e o técnico" : "") + ".";
    }
  }

  // =========================================================
  // VOTAR — grava no Supabase
  // =========================================================
  async function castVote() {
    const btn = $("#vote-btn");
    btn.disabled = true;
    btn.textContent = "Enviando...";

    try {
      // 1. Insere o voto principal
      const { data: voteData, error: voteError } = await sb
        .from("votes")
        .insert([{
          formation: currentFormationKey,
          coach_id:   selectedCoach.id,
          coach_name: selectedCoach.name,
        }])
        .select("id")
        .single();

      if (voteError) throw voteError;

      const voteId = voteData.id;

      // 2. Insere os jogadores da escalação
      const players = Object.entries(selectedSlots).map(([slotId, player]) => ({
        vote_id:     voteId,
        slot_id:     slotId,
        player_id:   player.id,
        player_name: player.name,
        player_pos:  player.pos,
      }));

      const { error: playersError } = await sb
        .from("vote_players")
        .insert(players);

      if (playersError) throw playersError;

      // 3. Atualiza cache local
      totalVotes++;
      $("#stat-votos").textContent = totalVotes;

      Object.values(selectedSlots).forEach((player) => {
        if (!playerVoteTotals[player.id]) {
          playerVoteTotals[player.id] = { player_id: player.id, player_name: player.name, player_pos: player.pos, total_votes: 0 };
        }
        playerVoteTotals[player.id].total_votes++;
      });

      if (!coachVoteTotals[selectedCoach.id]) {
        coachVoteTotals[selectedCoach.id] = { coach_id: selectedCoach.id, coach_name: selectedCoach.name, total_votes: 0 };
      }
      coachVoteTotals[selectedCoach.id].total_votes++;

      showToast("Voto registrado! Sua escalação entrou na Seleção do Povo. 🇧🇷");
      renderField();
      renderPovoField();
      renderCoachList($("#coach-search").value);
      showDog();

    } catch (err) {
      console.error("Erro ao votar:", err);
      showToast("Erro ao registrar voto. Tente novamente.");
    } finally {
      btn.textContent = "Votar";
      updateVoteButtonState();
    }
  }

  // =========================================================
  // CACHORRO COMEMORATIVO
  // =========================================================
  function showDog() {
    const overlay = $("#dog-overlay");
    const img = $("#dog-img");

    overlay.classList.add("active");

    let frame = 0;
    const shakes = [0, 18, -18, 14, -14, 8, -8, 3, 0];
    const interval = setInterval(() => {
      img.style.transform = "rotate(" + (shakes[frame] || 0) + "deg) scale(1)";
      frame++;
      if (frame >= shakes.length) clearInterval(interval);
    }, 80);

    setTimeout(() => {
      img.style.opacity = "0";
      img.style.transform = "rotate(0deg) scale(2)";
      img.style.transition = "opacity 0.35s, transform 0.35s ease-in";
      setTimeout(() => {
        overlay.classList.remove("active");
        img.style.opacity = "";
        img.style.transform = "";
        img.style.transition = "";
      }, 360);
    }, 1600);
  }

  // =========================================================
  // SELEÇÃO DO POVO (agregado)
  // =========================================================
  function renderPovoField() {
    const container = $("#povo-slots-container");
    container.innerHTML = "";

    const formation = FORMATIONS[currentFormationKey];

    formation.slots.forEach((slot) => {
      // Encontra o jogador mais votado da posição
      const best = Object.values(playerVoteTotals)
        .filter((v) => POS_CATEGORY[v.player_pos] === POS_CATEGORY[slot.pos])
        .sort((a, b) => b.total_votes - a.total_votes)[0];

      const el = document.createElement("div");
      el.className = "slot" + (best ? " filled" : "");
      el.style.left = slot.x + "%";
      el.style.top = (100 - slot.y) + "%";

      const initials = best ? initialsOf(best.player_name) : POS_LABEL[slot.pos].slice(0, 3).toUpperCase();
      const rating = best ? getPlayerRating(best.player_id) : null;

      el.innerHTML =
        '<div class="slot-circle">' +
          initials +
          (rating !== null ? '<span class="slot-rating">' + rating + '</span>' : "") +
        '</div>' +
        '<div class="slot-label">' + (best ? best.player_name : "Aguardando votos") + '</div>';

      container.appendChild(el);
    });
  }

  // =========================================================
  // AÇÕES DA TOOLBAR
  // =========================================================
  function clearField() {
    selectedSlots = {};
    selectedCoach = null;
    renderField();
    renderCoachList($("#coach-search").value);
    updateVoteButtonState();
  }

  function randomFill() {
    const formation = FORMATIONS[currentFormationKey];
    const usedIds = new Set();
    formation.slots.forEach((slot) => {
      const candidates = PLAYERS.filter((p) => POS_CATEGORY[p.pos] === POS_CATEGORY[slot.pos] && !usedIds.has(p.id));
      if (candidates.length === 0) return;
      const pick = candidates[Math.floor(Math.random() * candidates.length)];
      usedIds.add(pick.id);
      selectedSlots[slot.id] = pick;
    });
    if (!selectedCoach) {
      selectedCoach = COACHES[Math.floor(Math.random() * COACHES.length)];
      renderCoachList($("#coach-search").value);
    }
    renderField();
    updateVoteButtonState();
  }

  // =========================================================
  // TOAST
  // =========================================================
  let toastTimer = null;
  function showToast(msg) {
    const toast = $("#toast");
    $("#toast-text").textContent = msg;
    toast.classList.add("show");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toast.classList.remove("show"), 3200);
  }

  // =========================================================
  // EVENTOS GLOBAIS
  // =========================================================
  function bindGlobalEvents() {
    $("#modal-close").addEventListener("click", closePlayerModal);
    $("#modal-overlay").addEventListener("click", (e) => {
      if (e.target.id === "modal-overlay") closePlayerModal();
    });
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        closePlayerModal();
        $("#ticker-modal").style.display = "none";
      }
    });

    $("#modal-search").addEventListener("input", (e) => {
      const slot = FORMATIONS[currentFormationKey].slots.find((s) => s.id === activeSlotId);
      if (slot) renderModalList(slot.pos, e.target.value);
    });

    $("#coach-search").addEventListener("input", (e) => {
      renderCoachList(e.target.value);
    });

    $("#vote-btn").addEventListener("click", castVote);
    $("#clear-btn").addEventListener("click", clearField);

    $("#ticker-modal").addEventListener("click", (e) => {
      if (e.target.id === "ticker-modal") {
        $("#ticker-modal").style.display = "none";
      }
    });
  }

})();