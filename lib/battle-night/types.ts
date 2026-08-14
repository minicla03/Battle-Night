export const PHASES = [
  'INTRO',
  'TEAMS',
  'MUSICA_DISTORTA',
  'INTESA_VINCENTE',
  'GHIGLIOTTINA',
  'BRUCO',
  'INVERSIONE_LOGICA',
] as const

export type Phase = (typeof PHASES)[number]

export const PHASE_LABELS: Record<Phase, string> = {
  INTRO: 'Intro',
  TEAMS: 'Le Squadre',
  MUSICA_DISTORTA: 'Musica Distorta',
  INTESA_VINCENTE: "L'Intesa Vincente",
  GHIGLIOTTINA: 'La Ghigliottina',
  BRUCO: 'Il Bruco',
  INVERSIONE_LOGICA: "L'Inversione Logica",
}

export const PHASE_SUBTITLES: Record<Phase, string> = {
  INTRO: 'Benvenuti alla Battle Night',
  TEAMS: 'Le quattro squadre in gara',
  MUSICA_DISTORTA: 'Indovina il brano nascosto',
  INTESA_VINCENTE: 'Due menti, una sola parola',
  GHIGLIOTTINA: 'La parola che unisce tutte',
  BRUCO: 'La catena di parole non si spezza',
  INVERSIONE_LOGICA: 'Quattordici passi verso la vittoria',
}

export const TEAMS = [
  'Vip',
  'Intellettuali',
  'Festaioli',
  'Dormiglioni',
] as const

export type Team = (typeof TEAMS)[number]

export const TEAM_TOKENS: Record<Team, string> = {
  Vip: 'team-vip',
  Intellettuali: 'team-intellettuali',
  Festaioli: 'team-festaioli',
  Dormiglioni: 'team-dormiglioni',
}

export const LOGIC_TOTAL_STEPS = 14

export interface LogicQuestion {
  question: string
  optionA: string
  optionB: string
  /** Which option is the correct answer */
  correct: 'A' | 'B'
}

/** 14 questions for the "Inversione Logica" round (one per step). */
export const LOGIC_QUESTIONS: LogicQuestion[] = [
  {
    question: 'Qual è la capitale della Francia?',
    optionA: 'Parigi',
    optionB: 'Berlino',
    correct: 'A',
  },
  {
    question: 'Quanti pianeti ha il sistema solare?',
    optionA: '8',
    optionB: '9',
    correct: 'A',
  },
  {
    question: 'Chi ha dipinto la Cappella Sistina?',
    optionA: 'Michelangelo',
    optionB: 'Leonardo da Vinci',
    correct: 'A',
  },
  {
    question: "In quale anno è caduto il Muro di Berlino?",
    optionA: '1989',
    optionB: '1991',
    correct: 'A',
  },
  {
    question: "Qual è l'elemento chimico con simbolo Au?",
    optionA: 'Oro',
    optionB: 'Argento',
    correct: 'A',
  },
  {
    question: 'Quante corde ha una chitarra classica?',
    optionA: '6',
    optionB: '5',
    correct: 'A',
  },
  {
    question: 'Chi ha scritto "La Divina Commedia"?',
    optionA: 'Dante Alighieri',
    optionB: 'Francesco Petrarca',
    correct: 'A',
  },
  {
    question: 'In quale oceano si trova il Triangolo delle Bermuda?',
    optionA: 'Atlantico',
    optionB: 'Pacifico',
    correct: 'A',
  },
  {
    question: 'Qual è il paese più grande del mondo per superficie?',
    optionA: 'Russia',
    optionB: 'Canada',
    correct: 'A',
  },
  {
    question: 'Quanti cromosomi ha una cellula umana normale?',
    optionA: '46',
    optionB: '48',
    correct: 'A',
  },
  {
    question: 'Qual è la montagna più alta del mondo?',
    optionA: 'Everest',
    optionB: 'K2',
    correct: 'A',
  },
  {
    question: 'In quale città si trova il Colosseo?',
    optionA: 'Roma',
    optionB: 'Atene',
    correct: 'A',
  },
  {
    question: "Qual è il simbolo chimico dell'acqua?",
    optionA: 'H₂O',
    optionB: 'CO₂',
    correct: 'A',
  },
  {
    question: 'Chi ha composto la Quinta Sinfonia?',
    optionA: 'Beethoven',
    optionB: 'Mozart',
    correct: 'A',
  },
]

/** Pool of Italian words used in "L'Intesa Vincente" round. */
export const INTESA_WORD_POOL: string[] = [
  'Farfalla', 'Semaforo', 'Vulcano', 'Bicicletta', 'Ombrello',
  'Cascata', 'Pianoforte', 'Tartaruga', 'Telefono', 'Astronauta',
  'Girasole', 'Trampolino', 'Cammello', 'Lanterna', 'Pinguino',
  'Mongolfiera', 'Medusa', 'Arcobaleno', 'Fulmine', 'Maschera',
  'Altalena', 'Formichiere', 'Sottomarino', 'Cappello', 'Elicottero',
  'Bandiera', 'Labirinto', 'Coccodrillo', 'Scacchiera', 'Papavero',
  'Aquilone', 'Calamaro', 'Trenino', 'Specchio', 'Palloncino',
  'Dragone', 'Funambolo', 'Igloo', 'Mandolino', 'Scorpione',
  'Campana', 'Dinosauro', 'Fantasma', 'Mosaico', 'Polpetto',
  'Ragnatela', 'Sombrero', 'Tornado', 'Unicorno', 'Voragine',
  'Windsurf', 'Xilofono', 'Yoyo', 'Zanzara', 'Abete',
  'Boomerang', 'Castello', 'Dominoes', 'Eclissi', 'Fenicottero',
  'Gondola', 'Hamster', 'Iceberg', 'Jungla', 'Koala',
  'Lumaca', 'Maionese', 'Nuvola', 'Ottopodi', 'Pappagallo',
  'Quaglia', 'Rondine', 'Salsiccia', 'Tulipano', 'Uccello',
  'Valanga', 'Wombat', 'Zaino', 'Acrobata', 'Barca',
  'Ciliegia', 'Dado', 'Elefante', 'Foglia', 'Gelato',
  'Helicoptero', 'Isolotto', 'Jeans', 'Kimono', 'Leone',
  'Magnete', 'Ninfea', 'Origami', 'Piranha', 'Quercia',
  'Rubino', 'Scalata', 'Timone', 'Ukulele', 'Vespa',
]

/** A single set of five clues + the solution word for "La Ghigliottina" */
export interface GhigliottinaSet {
  clues: [string, string, string, string, string]
  solution: string
}

export const GHIGLIOTTINA_SETS: GhigliottinaSet[] = [
  { clues: ['Notte', 'Fuoco', 'Corsa', 'Vittoria', 'Squadra'],    solution: 'Campione' },
  { clues: ['Luna', 'Sole', 'Mare', 'Vento', 'Terra'],            solution: 'Luce' },
  { clues: ['Rosso', 'Verde', 'Blu', 'Giallo', 'Bianco'],         solution: 'Colore' },
  { clues: ['Cane', 'Gatto', 'Uccello', 'Pesce', 'Coniglio'],    solution: 'Animale' },
  { clues: ['Pasta', 'Pizza', 'Risotto', 'Lasagne', 'Polenta'],   solution: 'Piatto' },
  { clues: ['Chitarra', 'Piano', 'Violino', 'Tromba', 'Flauto'],  solution: 'Musica' },
  { clues: ['Primavera', 'Estate', 'Autunno', 'Inverno', 'Neve'], solution: 'Stagione' },
  { clues: ['Roma', 'Milano', 'Napoli', 'Torino', 'Firenze'],     solution: 'Città' },
]

export interface DistortedSong {
  title: string
  artist: string
  year: number
  hint: string          // a vague hint shown to players, no spoilers
}

export const DISTORTED_SONGS: DistortedSong[] = [
  { title: 'Bohemian Rhapsody',      artist: 'Queen',              year: 1975, hint: 'Rock leggendario anni \'70' },
  { title: 'Billie Jean',            artist: 'Michael Jackson',    year: 1982, hint: 'King of Pop anni \'80' },
  { title: 'Smells Like Teen Spirit',artist: 'Nirvana',            year: 1991, hint: 'Grunge americano' },
  { title: 'Shape of You',           artist: 'Ed Sheeran',         year: 2017, hint: 'Pop britannico anni \'10' },
  { title: 'Volare',                 artist: 'Domenico Modugno',   year: 1958, hint: 'Classico italiano' },
  { title: 'Uptown Funk',            artist: 'Bruno Mars',         year: 2014, hint: 'Funk pop moderno' },
  { title: 'Azzurro',               artist: 'Adriano Celentano',  year: 1968, hint: 'Cantautore italiano' },
  { title: 'Blinding Lights',        artist: 'The Weeknd',         year: 2019, hint: 'Synth-pop anni \'80 style' },
  { title: 'Con Te Partirò',         artist: 'Andrea Bocelli',     year: 1995, hint: 'Opera italiana contemporanea' },
  { title: 'Rolling in the Deep',    artist: 'Adele',              year: 2010, hint: 'Soul-pop britannico' },
]

export interface GameState {
  currentPhase: Phase
  scores: Record<Team, number>
  timer: number
  timerRunning: boolean
  prizePool: number
  logicStep: number
  /** Shuffled word list for the current Intesa Vincente session */
  intesaWords: string[]
  /** Index of the word currently shown on display */
  intesaWordIndex: number
  /** Teams in order of finish for Il Bruco race (first 2 win) */
  brucoFinishOrder: Team[]
  /** Index of the active Ghigliottina set */
  ghigliottinaSetIndex: number
  /** Index of the current song in Musica Distorta */
  musicaIndex: number
  /** Whether the answer (title + artist) is revealed on screen */
  musicaRevealed: boolean
}

export const STORAGE_KEY = 'battleNightState'

export const INITIAL_PRIZE_POOL = 200000

/** Fisher-Yates shuffle — returns a new shuffled array */
export function shuffleArray<T>(arr: T[]): T[] {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

export function createInitialState(): GameState {
  return {
    currentPhase: 'INTRO',
    scores: {
      Vip: 0,
      Intellettuali: 0,
      Festaioli: 0,
      Dormiglioni: 0,
    },
    timer: 60,
    timerRunning: false,
    prizePool: INITIAL_PRIZE_POOL,
    logicStep: 0,
    intesaWords: shuffleArray(INTESA_WORD_POOL),
    intesaWordIndex: 0,
    brucoFinishOrder: [],
    ghigliottinaSetIndex: 0,
    musicaIndex: 0,
    musicaRevealed: false,
  }
}
