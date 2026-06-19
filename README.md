# Seleção do Povo — Guia de Migração para Supabase

## O que mudou

| Antes (localStorage) | Depois (Supabase) |
|---|---|
| Votos vivem só no navegador local | Votos persistidos em banco PostgreSQL |
| Ticker some ao fechar a aba | Ticker compartilhado entre todos os usuários |
| Placar zerado a cada sessão | Placar real acumulado de todos os visitantes |

---

## Passo 1 — Criar conta e projeto no Supabase

1. Acesse [supabase.com](https://supabase.com) e crie uma conta gratuita.
2. Clique em **New project**.
3. Preencha nome, senha e região (escolha **South America (São Paulo)** para menor latência).
4. Aguarde o projeto inicializar (~1 min).

---

## Passo 2 — Criar as tabelas (schema.sql)

1. No painel do seu projeto, clique em **SQL Editor** (ícone de banco de dados).
2. Clique em **New query**.
3. Cole o conteúdo do arquivo `schema.sql` que está nesta pasta.
4. Clique em **Run** (▶).

Isso cria:
- `votes` — cada voto completo
- `vote_players` — os 11 jogadores de cada voto
- `ticker_messages` — mensagens do carrossel
- Views `player_vote_totals`, `coach_vote_totals`, `vote_count`
- Políticas RLS para leitura/escrita anônima

---

## Passo 3 — Pegar suas credenciais

1. No painel, vá em **Project Settings → API**.
2. Copie:
   - **Project URL** (ex: `https://abcxyz.supabase.co`)
   - **anon / public key** (começa com `eyJ...`)

---

## Passo 4 — Configurar o app.js

Abra o arquivo `app.js` desta pasta e substitua as duas primeiras constantes:

```js
const SUPABASE_URL    = "https://SEU_PROJECT_ID.supabase.co";  // ← sua URL
const SUPABASE_ANON_KEY = "SUA_ANON_KEY_AQUI";                 // ← sua anon key
```

> **Segurança:** a `anon key` é segura para uso no frontend.
> O acesso ao banco é controlado pelas políticas RLS do Supabase,
> não pela chave em si.

---

## Passo 5 — Atualizar o index.html

Adicione o SDK do Supabase **antes** dos seus scripts, dentro do `<head>`:

```html
<script src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2"></script>
```

A ordem final dos scripts no `<body>` deve ser:

```html
<script src="data.js"></script>
<script src="app.js"></script>
```

---

## Passo 6 — Testar localmente

Abra o `index.html` diretamente no navegador (ou via Live Server no VS Code).
Faça um voto e verifique no **Supabase → Table Editor → votes** se a linha apareceu.

---

## Dicas extras

### Ver o ranking em tempo real
No Supabase SQL Editor:
```sql
SELECT * FROM player_vote_totals LIMIT 20;
SELECT * FROM coach_vote_totals;
SELECT * FROM vote_count;
```

### Limpar votos de teste
```sql
DELETE FROM votes;  -- cascade apaga vote_players também
DELETE FROM ticker_messages;
```

### Ativar Realtime (opcional)
Para atualizar o placar automaticamente enquanto outras pessoas votam:
1. Supabase → **Database → Replication**
2. Ative as tabelas `votes` e `vote_players`
3. No `app.js`, adicione um subscriber (veja a [documentação Realtime](https://supabase.com/docs/guides/realtime))

---

## Estrutura dos arquivos entregues

```
supabase-setup/
├── schema.sql              ← Execute no Supabase SQL Editor
├── app.js                  ← Substitui o app.js original
├── index-html-trecho.html  ← Trecho a adicionar no seu index.html
└── LEIA-ME.md              ← Este arquivo
```