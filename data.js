// =========================================================
// SELEÇÃO DO POVO — Base de dados
// Categorias: DEF (goleiro+laterais+zagueiros), MEI (volantes+meias), ATK (pontas+atacantes)
// pos = categoria de filtro; slot.pos = posição tática real do slot
// =========================================================

// Mapa: posição tática → categoria de filtro
const POS_CATEGORY = {
  GOL: "DEF",
  LD:  "DEF",
  ZAG: "DEF",
  LE:  "DEF",
  VOL: "MEI",
  MEI: "MEI",
  PD:  "ATK",
  PE:  "ATK",
  ATA: "ATK",
};

const PLAYERS = [
  // ---------------- GOLEIROS ----------------
  { name: "Alisson",            pos: "GOL", club: "Liverpool (ING)" },
  { name: "Ederson",            pos: "GOL", club: "Fenerbahçe (TUR)" },
  { name: "Weverton",           pos: "GOL", club: "Grêmio (BRA)" },
  { name: "Bento",              pos: "GOL", club: "Al-Nassr (ARA)" },
  { name: "Lucas Perri",        pos: "GOL", club: "Lyon (FRA)" },
  { name: "Léo Jardim",         pos: "GOL", club: "Vasco (BRA)" },
  { name: "Rafael",             pos: "GOL", club: "São Paulo (BRA)" },
  { name: "Everson",            pos: "GOL", club: "Atlético-MG (BRA)" },
  { name: "João Paulo",         pos: "GOL", club: "Santos (BRA)" },
  { name: "Marcos Felipe",      pos: "GOL", club: "Bahia (BRA)" },
  { name: "John",               pos: "GOL", club: "Botafogo (BRA)" },
  { name: "Fábio",              pos: "GOL", club: "Fluminense (BRA)" },
  { name: "Hugo Souza",         pos: "GOL", club: "Corinthians (BRA)" },
  { name: "Léo Linck",          pos: "GOL", club: "Athletico-PR (BRA)" },
  { name: "Cleiton",            pos: "GOL", club: "Bragantino (BRA)" },
  { name: "Neto",               pos: "GOL", club: "Bournemouth (ING)" },
  { name: "Lucas Arcanjo",      pos: "GOL", club: "São Paulo (BRA)" },
  { name: "Mycael",             pos: "GOL", club: "Athletico-PR (BRA)" },
  { name: "Kauã Santos",        pos: "GOL", club: "Eintracht Frankfurt (ALE)" },
  { name: "Matheus Donelli",    pos: "GOL", club: "Corinthians (BRA)" },

  // ---------------- LATERAIS-DIREITOS ----------------
  { name: "Wesley",             pos: "LD",  club: "Roma (ITA)" },
  { name: "Danilo",             pos: "LD",  club: "Flamengo (BRA)" },
  { name: "Yan Couto",          pos: "LD",  club: "Borussia Dortmund (ALE)" },
  { name: "Vanderson",          pos: "LD",  club: "Monaco (FRA)" },
  { name: "Emerson Royal",      pos: "LD",  club: "Milan (ITA)" },
  { name: "Dodô",               pos: "LD",  club: "Fiorentina (ITA)" },
  { name: "Arthur",             pos: "LD",  club: "Bayer Leverkusen (ALE)" },
  { name: "Vinícius Tobias",    pos: "LD",  club: "Shakhtar Donetsk (UCR)" },
  { name: "Mayke",              pos: "LD",  club: "Palmeiras (BRA)" },
  { name: "Matheuzinho",        pos: "LD",  club: "Corinthians (BRA)" },
  { name: "Tinga",              pos: "LD",  club: "Fortaleza (BRA)" },
  { name: "Samuel Xavier",      pos: "LD",  club: "Fluminense (BRA)" },
  { name: "Fagner",             pos: "LD",  club: "Corinthians (BRA)" },
  { name: "JP Chermont",        pos: "LD",  club: "Santos (BRA)" },
  { name: "Agustín Giay",       pos: "LD",  club: "Palmeiras (BRA)" },
  { name: "Pedro Lima",         pos: "LD",  club: "Wolverhampton (ING)" },

  // ---------------- LATERAIS-ESQUERDOS ----------------
  { name: "Alex Sandro",        pos: "LE",  club: "Flamengo (BRA)" },
  { name: "Carlos Augusto",     pos: "LE",  club: "Inter de Milão (ITA)" },
  { name: "Caio Henrique",      pos: "LE",  club: "Monaco (FRA)" },
  { name: "Ayrton Lucas",       pos: "LE",  club: "Flamengo (BRA)" },
  { name: "Renan Lodi",         pos: "LE",  club: "Al-Hilal (ARA)" },
  { name: "Abner",              pos: "LE",  club: "Lyon (FRA)" },
  { name: "Wendell",            pos: "LE",  club: "Porto (POR)" },
  { name: "Guilherme Arana",    pos: "LE",  club: "Atlético-MG (BRA)" },
  { name: "Cuiabano",           pos: "LE",  club: "Botafogo (BRA)" },
  { name: "Piquerez",           pos: "LE",  club: "Palmeiras (BRA)" },
  { name: "Lucas Piton",        pos: "LE",  club: "Vasco (BRA)" },
  { name: "Alex Telles",        pos: "LE",  club: "Botafogo (BRA)" },
  { name: "Felipe Jonatan",     pos: "LE",  club: "Fortaleza (BRA)" },
  { name: "Patryck Lanza",      pos: "LE",  club: "São Paulo (BRA)" },
  { name: "Matheus Bidu",       pos: "LE",  club: "Corinthians (BRA)" },
  { name: "Vanderlan",          pos: "LE",  club: "Palmeiras (BRA)" },

  // ---------------- ZAGUEIROS ----------------
  { name: "Marquinhos",         pos: "ZAG", club: "PSG (FRA)" },
  { name: "Gabriel Magalhães",  pos: "ZAG", club: "Arsenal (ING)" },
  { name: "Bremer",             pos: "ZAG", club: "Juventus (ITA)" },
  { name: "Éder Militão",       pos: "ZAG", club: "Real Madrid (ESP)" },
  { name: "Murillo",            pos: "ZAG", club: "Nottingham Forest (ING)" },
  { name: "Léo Pereira",        pos: "ZAG", club: "Flamengo (BRA)" },
  { name: "Beraldo",            pos: "ZAG", club: "PSG (FRA)" },
  { name: "Ibañez",             pos: "ZAG", club: "Al-Ahli (ARA)" },
  { name: "Thiago Silva",       pos: "ZAG", club: "Fluminense (BRA)" },
  { name: "Fabrício Bruno",     pos: "ZAG", club: "Flamengo (BRA)" },
  { name: "Murilo",             pos: "ZAG", club: "Palmeiras (BRA)" },
  { name: "Vitão",              pos: "ZAG", club: "Internacional (BRA)" },
  { name: "Cacá",               pos: "ZAG", club: "Corinthians (BRA)" },
  { name: "Vitor Reis",         pos: "ZAG", club: "Palmeiras (BRA)" },
  { name: "Léo Ortiz",          pos: "ZAG", club: "Flamengo (BRA)" },
  { name: "Natan",              pos: "ZAG", club: "Real Betis (ESP)" },
  { name: "Robert Renan",       pos: "ZAG", club: "Al-Shabab (ARA)" },
  { name: "João Victor",        pos: "ZAG", club: "Vasco (BRA)" },
  { name: "Gustavo Gómez",      pos: "ZAG", club: "Palmeiras (BRA)" },
  { name: "Junior Alonso",      pos: "ZAG", club: "Atlético-MG (BRA)" },
  { name: "Kanu",               pos: "ZAG", club: "Bahia (BRA)" },
  { name: "Titi",               pos: "ZAG", club: "Fortaleza (BRA)" },
  { name: "Adryelson",          pos: "ZAG", club: "Botafogo (BRA)" },
  { name: "Naves",              pos: "ZAG", club: "Palmeiras (BRA)" },
  { name: "David Luiz",         pos: "ZAG", club: "Flamengo (BRA)" },
  { name: "Gabriel Paulista",   pos: "ZAG", club: "Besiktas (TUR)" },
  { name: "Diego Carlos",       pos: "ZAG", club: "Aston Villa (ING)" },

  // ---------------- VOLANTES ----------------
  { name: "Casemiro",           pos: "VOL", club: "Manchester United (ING)" },
  { name: "Bruno Guimarães",    pos: "VOL", club: "Newcastle (ING)" },
  { name: "Fabinho",            pos: "VOL", club: "Al-Ittihad (ARA)" },
  { name: "João Gomes",         pos: "VOL", club: "Wolverhampton (ING)" },
  { name: "Éderson",            pos: "VOL", club: "Atalanta (ITA)" },
  { name: "André",              pos: "VOL", club: "Wolverhampton (ING)" },
  { name: "Douglas Luiz",       pos: "VOL", club: "Juventus (ITA)" },
  { name: "Gerson",             pos: "VOL", club: "Flamengo (BRA)" },
  { name: "Joelinton",          pos: "VOL", club: "Newcastle (ING)" },
  { name: "Andrey Santos",      pos: "VOL", club: "Strasbourg (FRA)" },
  { name: "Gabriel Moscardo",   pos: "VOL", club: "Reims (FRA)" },
  { name: "Arthur Melo",        pos: "VOL", club: "Fiorentina (ITA)" },
  { name: "Pablo Maia",         pos: "VOL", club: "São Paulo (BRA)" },
  { name: "Marlon Freitas",     pos: "VOL", club: "Botafogo (BRA)" },
  { name: "Aníbal Moreno",      pos: "VOL", club: "Palmeiras (BRA)" },
  { name: "Richard Ríos",       pos: "VOL", club: "Palmeiras (BRA)" },
  { name: "Zé Rafael",          pos: "VOL", club: "Palmeiras (BRA)" },
  { name: "Fred",               pos: "VOL", club: "Fenerbahçe (TUR)" },
  { name: "Thiago Maia",        pos: "VOL", club: "Internacional (BRA)" },
  { name: "Walace",             pos: "VOL", club: "Cruzeiro (BRA)" },
  { name: "Matheus Henrique",   pos: "VOL", club: "Cruzeiro (BRA)" },
  { name: "Danilo Santos",      pos: "VOL", club: "Botafogo (BRA)" },
  { name: "Gregore",            pos: "VOL", club: "Botafogo (BRA)" },
  { name: "Otávio",             pos: "VOL", club: "Atlético-MG (BRA)" },
  { name: "Hércules",           pos: "VOL", club: "Fortaleza (BRA)" },
  { name: "Lucas Evangelista",  pos: "VOL", club: "Bragantino (BRA)" },

  // ---------------- MEIAS ----------------
  { name: "Lucas Paquetá",      pos: "MEI", club: "Flamengo (BRA)" },
  { name: "Rodrygo",            pos: "MEI", club: "Real Madrid (ESP)" },
  { name: "Neymar Jr.",         pos: "MEI", club: "Santos (BRA)" },
  { name: "Philippe Coutinho",  pos: "MEI", club: "Vasco (BRA)" },
  { name: "Raphael Veiga",      pos: "MEI", club: "Palmeiras (BRA)" },
  { name: "Andreas Pereira",    pos: "MEI", club: "Fulham (ING)" },
  { name: "Estêvão",            pos: "MEI", club: "Palmeiras (BRA)" },
  { name: "Oscar",              pos: "MEI", club: "Shanghai Port (CHI)" },
  { name: "Matheus Pereira",    pos: "MEI", club: "Cruzeiro (BRA)" },
  { name: "Ganso",              pos: "MEI", club: "Fluminense (BRA)" },
  { name: "Éverton Ribeiro",    pos: "MEI", club: "Bahia (BRA)" },
  { name: "Lucas Moura",        pos: "MEI", club: "São Paulo (BRA)" },
  { name: "Malcom",             pos: "MEI", club: "Al-Hilal (ARA)" },
  { name: "Claudinho",          pos: "MEI", club: "Zenit (RUS)" },
  { name: "Alan Patrick",       pos: "MEI", club: "Internacional (BRA)" },
  { name: "Gustavo Scarpa",     pos: "MEI", club: "Atlético-MG (BRA)" },
  { name: "Lorran",             pos: "MEI", club: "Flamengo (BRA)" },
  { name: "Luis Guilherme",     pos: "MEI", club: "West Ham (ING)" },
  { name: "Igor Gomes",         pos: "MEI", club: "Atlético-MG (BRA)" },
  { name: "Rodrigo Nestor",     pos: "MEI", club: "São Paulo (BRA)" },
  { name: "Luciano",            pos: "MEI", club: "São Paulo (BRA)" },
  { name: "Maurício",           pos: "MEI", club: "Palmeiras (BRA)" },
  { name: "Nikão",              pos: "MEI", club: "Athletico-PR (BRA)" },
  { name: "Gabriel Carvalho",   pos: "MEI", club: "Internacional (BRA)" },
  { name: "Thalys",             pos: "MEI", club: "Palmeiras (BRA)" },

  // ---------------- PONTAS-ESQUERDA ----------------
  { name: "Vinicius Jr.",       pos: "PE",  club: "Real Madrid (ESP)" },
  { name: "Gabriel Martinelli", pos: "PE",  club: "Arsenal (ING)" },
  { name: "Galeno",             pos: "PE",  club: "Porto (POR)" },
  { name: "Everton Cebolinha",  pos: "PE",  club: "Flamengo (BRA)" },
  { name: "Bruno Henrique",     pos: "PE",  club: "Flamengo (BRA)" },
  { name: "Richarlison",        pos: "PE",  club: "Tottenham (ING)" },
  { name: "Biel",               pos: "PE",  club: "Bahia (BRA)" },
  { name: "Erick Pulga",        pos: "PE",  club: "Ceará (BRA)" },
  { name: "Keno",               pos: "PE",  club: "Fluminense (BRA)" },
  { name: "Ferreira",           pos: "PE",  club: "São Paulo (BRA)" },
  { name: "Arthur Gomes",       pos: "PE",  club: "Cruzeiro (BRA)" },
  { name: "Jeffinho",           pos: "PE",  club: "Botafogo (BRA)" },
  { name: "Lincoln",            pos: "PE",  club: "Red Bull Bragantino (BRA)" },
  { name: "Gabigol",            pos: "PE",  club: "Cruzeiro (BRA)" },

  // ---------------- PONTAS-DIREITA ----------------
  { name: "Raphinha",           pos: "PD",  club: "Barcelona (ESP)" },
  { name: "Savinho",            pos: "PD",  club: "Manchester City (ING)" },
  { name: "Endrick",            pos: "PD",  club: "Real Madrid (ESP)" },
  { name: "David Neres",        pos: "PD",  club: "Benfica (POR)" },
  { name: "Luiz Henrique",      pos: "PD",  club: "Zenit (RUS)" },
  { name: "Antony",             pos: "PD",  club: "Manchester United (ING)" },
  { name: "Rayan",              pos: "PD",  club: "Bournemouth (ING)" },
  { name: "Pepê",               pos: "PD",  club: "Porto (POR)" },
  { name: "Samuel Lino",        pos: "PD",  club: "Atlético de Madrid (ESP)" },
  { name: "Paulinho",           pos: "PD",  club: "Atlético-MG (BRA)" },
  { name: "Yuri Alberto",       pos: "PD",  club: "Corinthians (BRA)" },
  { name: "Estêvão",            pos: "PD",  club: "Palmeiras (BRA)" },
  { name: "Tetê",               pos: "PD",  club: "Panathinaikos (GRE)" },
  { name: "Igor Coronado",      pos: "PD",  club: "Corinthians (BRA)" },
  { name: "Gabriel Veron",      pos: "PD",  club: "Cruzeiro (BRA)" },
  { name: "Marquinhos",         pos: "PD",  club: "Fluminense (BRA)" },

  // ---------------- CENTROAVANTES ----------------
  { name: "Pedro",              pos: "ATA", club: "Flamengo (BRA)" },
  { name: "Matheus Cunha",      pos: "ATA", club: "Manchester United (ING)" },
  { name: "Gabriel Jesus",      pos: "ATA", club: "Arsenal (ING)" },
  { name: "Igor Thiago",        pos: "ATA", club: "Brentford (ING)" },
  { name: "Vitor Roque",        pos: "ATA", club: "Real Betis (ESP)" },
  { name: "Evanilson",          pos: "ATA", club: "Bournemouth (ING)" },
  { name: "Marcos Leonardo",    pos: "ATA", club: "Benfica (POR)" },
  { name: "João Pedro",         pos: "ATA", club: "Brighton (ING)" },
  { name: "Richarlison",        pos: "ATA", club: "Tottenham (ING)" },
  { name: "Gabigol",            pos: "ATA", club: "Cruzeiro (BRA)" },
  { name: "Tiquinho Soares",    pos: "ATA", club: "Botafogo (BRA)" },
  { name: "Hulk",               pos: "ATA", club: "Atlético-MG (BRA)" },
  { name: "Flaco López",        pos: "ATA", club: "Palmeiras (BRA)" },
  { name: "Rafael Borré",       pos: "ATA", club: "Internacional (BRA)" },
  { name: "Jonathan Calleri",   pos: "ATA", club: "São Paulo (BRA)" },
  { name: "Pedro Raul",         pos: "ATA", club: "Corinthians (BRA)" },
  { name: "Igor Jesus",         pos: "ATA", club: "Botafogo (BRA)" },
  { name: "Arthur Cabral",      pos: "ATA", club: "Benfica (POR)" },
  { name: "Luiz Henrique",      pos: "ATA", club: "Zenit (RUS)" },
  { name: "Kauã Elias",         pos: "ATA", club: "Fluminense (BRA)" },
];

// Adiciona id único e categoria de filtro
PLAYERS.forEach((p, i) => {
  p.id = p.name.toLowerCase()
    .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-") + "-" + i;
  p.category = POS_CATEGORY[p.pos];
});

// =========================================================
// TÉCNICOS
// =========================================================
const COACHES = [
  { name: "Carlo Ancelotti",   style: "Gestor de elenco, equilíbrio tático e vencedor nato",       club: "Real Madrid (ESP)",     group: "Estrangeiros" },
  { name: "Pep Guardiola",     style: "Posicional, posse de bola extrema e revolução tática",       club: "Manchester City (ING)", group: "Estrangeiros" },
  { name: "Abel Ferreira",     style: "Competitivo, mentalidade vencedora e adaptável",             club: "Palmeiras (BRA)",       group: "Estrangeiros" },
  { name: "Jorge Jesus",       style: "Ofensivo, pressão alta e intensidade máxima",                club: "Al-Hilal (ARA)",        group: "Estrangeiros" },
  { name: "Zinedine Zidane",   style: "Gestão de vestiário estelar e pragmatismo em mata-mata",     club: "Sem clube",             group: "Estrangeiros" },
  { name: "Luis Enrique",      style: "Posicional moderno, uso da base e intensidade",              club: "PSG (FRA)",             group: "Estrangeiros" },
  { name: "Lionel Scaloni",    style: "Equilíbrio tático, pragmatismo e vencedor de Copa",          club: "Seleção Argentina",     group: "Estrangeiros" },
  { name: "Marcelo Bielsa",    style: "Pressão asfixiante, jogo vertical e ofensivo",               club: "Seleção Uruguaia",      group: "Estrangeiros" },
  { name: "Dorival Júnior",    style: "Jogo de aproximação, ótimo gestor de grupo",                 club: "Sem clube",             group: "Nacionais" },
  { name: "Renato Gaúcho",     style: "Ofensivo, focado na individualidade e motivador",            club: "Grêmio (BRA)",          group: "Nacionais" },
  { name: "Tite",              style: "Organização defensiva sólida e jogo apoiado",                club: "Flamengo (BRA)",        group: "Nacionais" },
  { name: "Rogério Ceni",      style: "Jogo de triangulação, ofensivo e exigente taticamente",      club: "Bahia (BRA)",           group: "Nacionais" },
  { name: "Cuca",              style: "Jogo vertical, forte em bolas paradas e motivador",          club: "Sem clube",             group: "Nacionais" },
  { name: "Mano Menezes",      style: "Defensivo, reativo e focado no contra-ataque",               club: "Fluminense (BRA)",      group: "Nacionais" },
  { name: "Fernando Diniz",    style: "Relacional, posse de bola autoral e risco na saída",         club: "Cruzeiro (BRA)",        group: "Nova geração" },
  { name: "Juan Pablo Vojvoda",style: "Moderno, intensidade física e transição rápida",             club: "Fortaleza (BRA)",       group: "Nova geração" },
  { name: "Artur Jorge",       style: "Ofensivo, vertical e uso agressivo dos pontas",              club: "Botafogo (BRA)",        group: "Nova geração" },
  { name: "Luis Zubeldía",     style: "Competitivo, copeiro e forte marcação",                      club: "São Paulo (BRA)",       group: "Nova geração" },
  { name: "Filipe Luís",       style: "Ideias modernas, ofensivo, influenciado pela Europa",        club: "Flamengo (BRA)",        group: "Nova geração" },
  { name: "Thiago Carpini",    style: "Organização tática, transição rápida e nova escola",         club: "Vitória (BRA)",         group: "Nova geração" },
];

COACHES.forEach((c, i) => {
  c.id = c.name.toLowerCase()
    .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-") + "-" + i;
});

// =========================================================
// FORMAÇÕES
// =========================================================
const FORMATIONS = {
  "4-3-3": {
    label: "4-3-3",
    desc: "Equilíbrio com largura no ataque",
    slots: [
      { id: "GOL",  pos: "GOL", x: 50, y: 6  },
      { id: "LD",   pos: "LD",  x: 84, y: 22 },
      { id: "ZAG1", pos: "ZAG", x: 64, y: 18 },
      { id: "ZAG2", pos: "ZAG", x: 36, y: 18 },
      { id: "LE",   pos: "LE",  x: 16, y: 22 },
      { id: "VOL1", pos: "VOL", x: 35, y: 42 },
      { id: "VOL2", pos: "VOL", x: 65, y: 42 },
      { id: "MEI",  pos: "MEI", x: 50, y: 56 },
      { id: "PE",   pos: "PE",  x: 18, y: 78 },
      { id: "ATA",  pos: "ATA", x: 50, y: 88 },
      { id: "PD",   pos: "PD",  x: 82, y: 78 },
    ],
  },
  "4-4-2": {
    label: "4-4-2",
    desc: "Clássico, dois de área e meio cheio",
    slots: [
      { id: "GOL",  pos: "GOL", x: 50, y: 6  },
      { id: "LD",   pos: "LD",  x: 84, y: 22 },
      { id: "ZAG1", pos: "ZAG", x: 64, y: 18 },
      { id: "ZAG2", pos: "ZAG", x: 36, y: 18 },
      { id: "LE",   pos: "LE",  x: 16, y: 22 },
      { id: "PD",   pos: "PD",  x: 82, y: 50 },
      { id: "VOL1", pos: "VOL", x: 38, y: 46 },
      { id: "VOL2", pos: "VOL", x: 62, y: 46 },
      { id: "PE",   pos: "PE",  x: 18, y: 50 },
      { id: "ATA1", pos: "ATA", x: 38, y: 86 },
      { id: "ATA2", pos: "ATA", x: 62, y: 86 },
    ],
  },
  "3-5-2": {
    label: "3-5-2",
    desc: "Três zagueiros e alas avançados",
    slots: [
      { id: "GOL",  pos: "GOL", x: 50, y: 6  },
      { id: "ZAG1", pos: "ZAG", x: 74, y: 18 },
      { id: "ZAG2", pos: "ZAG", x: 50, y: 14 },
      { id: "ZAG3", pos: "ZAG", x: 26, y: 18 },
      { id: "LD",   pos: "LD",  x: 88, y: 46 },
      { id: "VOL1", pos: "VOL", x: 38, y: 42 },
      { id: "VOL2", pos: "VOL", x: 62, y: 42 },
      { id: "LE",   pos: "LE",  x: 12, y: 46 },
      { id: "MEI",  pos: "MEI", x: 50, y: 60 },
      { id: "ATA1", pos: "ATA", x: 38, y: 86 },
      { id: "ATA2", pos: "ATA", x: 62, y: 86 },
    ],
  },
  "4-2-3-1": {
    label: "4-2-3-1",
    desc: "Dois volantes de proteção e trio criativo",
    slots: [
      { id: "GOL",  pos: "GOL", x: 50, y: 6  },
      { id: "LD",   pos: "LD",  x: 84, y: 22 },
      { id: "ZAG1", pos: "ZAG", x: 64, y: 18 },
      { id: "ZAG2", pos: "ZAG", x: 36, y: 18 },
      { id: "LE",   pos: "LE",  x: 16, y: 22 },
      { id: "VOL1", pos: "VOL", x: 38, y: 38 },
      { id: "VOL2", pos: "VOL", x: 62, y: 38 },
      { id: "PE",   pos: "PE",  x: 18, y: 64 },
      { id: "MEI",  pos: "MEI", x: 50, y: 60 },
      { id: "PD",   pos: "PD",  x: 82, y: 64 },
      { id: "ATA",  pos: "ATA", x: 50, y: 88 },
    ],
  },
  "3-4-3": {
    label: "3-4-3",
    desc: "Pressão alta e três atacantes",
    slots: [
      { id: "GOL",  pos: "GOL", x: 50, y: 6  },
      { id: "ZAG1", pos: "ZAG", x: 74, y: 18 },
      { id: "ZAG2", pos: "ZAG", x: 50, y: 14 },
      { id: "ZAG3", pos: "ZAG", x: 26, y: 18 },
      { id: "LD",   pos: "LD",  x: 86, y: 44 },
      { id: "VOL1", pos: "VOL", x: 38, y: 42 },
      { id: "VOL2", pos: "VOL", x: 62, y: 42 },
      { id: "LE",   pos: "LE",  x: 14, y: 44 },
      { id: "PE",   pos: "PE",  x: 18, y: 80 },
      { id: "ATA",  pos: "ATA", x: 50, y: 88 },
      { id: "PD",   pos: "PD",  x: 82, y: 80 },
    ],
  },
  "5-3-2": {
    label: "5-3-2",
    desc: "Linha defensiva reforçada, retranca elástica",
    slots: [
      { id: "GOL",  pos: "GOL", x: 50, y: 6  },
      { id: "LD",   pos: "LD",  x: 88, y: 22 },
      { id: "ZAG1", pos: "ZAG", x: 68, y: 16 },
      { id: "ZAG2", pos: "ZAG", x: 50, y: 13 },
      { id: "ZAG3", pos: "ZAG", x: 32, y: 16 },
      { id: "LE",   pos: "LE",  x: 12, y: 22 },
      { id: "VOL1", pos: "VOL", x: 35, y: 46 },
      { id: "VOL2", pos: "VOL", x: 65, y: 46 },
      { id: "MEI",  pos: "MEI", x: 50, y: 58 },
      { id: "ATA1", pos: "ATA", x: 38, y: 86 },
      { id: "ATA2", pos: "ATA", x: 62, y: 86 },
    ],
  },
};

// Posições legíveis em português
const POS_LABEL = {
  GOL: "Goleiro", LD: "Lateral-direito", ZAG: "Zagueiro", LE: "Lateral-esquerdo",
  VOL: "Volante", MEI: "Meia", PD: "Ponta-direita", PE: "Ponta-esquerda", ATA: "Atacante",
};

// Categorias legíveis
const CATEGORY_LABEL = {
  DEF: "Defesa",
  MEI: "Meio-campo",
  ATK: "Ataque",
};