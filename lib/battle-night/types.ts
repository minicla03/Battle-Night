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
    question: 'Quale pianeta ha più lune conosciute?',
    optionA: 'Saturno',
    optionB: 'Giove',
    correct: 'A',
  },

  {
    question: 'Quale di questi numeri è primo?',
    optionA: '21',
    optionB: '29',
    correct: 'B',
  },

  {
    question: 'Quale città è attraversata dal fiume Senna?',
    optionA: 'Parigi',
    optionB: 'Madrid',
    correct: 'A',
  },

  {
    question: 'Quale animale è noto per avere tre cuori?',
    optionA: 'Polpo',
    optionB: 'Delfino',
    correct: 'A',
  },

  {
    question: 'In quale anno è iniziata la Seconda guerra mondiale?',
    optionA: '1939',
    optionB: '1941',
    correct: 'A',
  },

  {
    question: 'Quale elemento ha come simbolo chimico Fe?',
    optionA: 'Fluoro',
    optionB: 'Ferro',
    correct: 'B',
  },

  {
    question: 'Se tutti i Blo sono Blu e alcuni Blu sono Rosi, quale affermazione è sicuramente vera?',
    optionA: 'Tutti i Blo sono Blu',
    optionB: 'Tutti i Blu sono Blo',
    correct: 'A',
  },

  {
    question: 'Quale continente ha più Stati?',
    optionA: 'Africa',
    optionB: 'Asia',
    correct: 'A',
  },

  {
    question: 'Quale numero completa la sequenza: 2, 4, 8, 16, ?',
    optionA: '24',
    optionB: '32',
    correct: 'B',
  },

  {
    question: 'Quale di questi personaggi NON appartiene alla mitologia greca?',
    optionA: 'Thor',
    optionB: 'Ulisse',
    correct: 'A',
  },

  {
    question: 'Una famiglia ha 3 figli. Ogni figlio ha una sorella. Quanti figli ha in totale la famiglia?',
    optionA: '4',
    optionB: '6',
    correct: 'A',
  },

  {
    question: 'Quale oceano è il più grande?',
    optionA: 'Atlantico',
    optionB: 'Pacifico',
    correct: 'B',
  },

  {
    question: 'Se ieri era lunedì, che giorno sarà dopodomani?',
    optionA: 'Giovedì',
    optionB: 'Venerdì',
    correct: 'A',
  },

  {
    question: 'Un treno elettrico viaggia verso nord. Il vento soffia verso sud. In quale direzione va il fumo?',
    optionA: 'Verso sud',
    optionB: 'Non c’è fumo',
    correct: 'B',
  },
]

/** Pool of Italian words used in "L'Intesa Vincente" round. */
/**export const INTESA_WORD_POOL: string[] = [
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
]**/

/** Pool of Italian words used in "L'Intesa Vincente" round. */
export const INTESA_WORD_POOL: string[] = [
  // --------------------------------------------------------
  // OGGETTI / PERSONE / ANIMALI
  // --------------------------------------------------------
  'Paracadute',
  'Caleidoscopio',
  'Catapulta',
  'Maggiordomo',
  'Fotocopiatrice',
  'Ambulanza',
  'Detective',
  'Cameriere',
  'Pirata',
  'Astronauta',
  'Vampiro',
  'Supereroe',
  'Prestigiatore',
  'Domatore',
  'Sommozzatore',
  'Bibliotecario',
  'Giornalista',
  'Archeologo',
  'Pilota',
  'Regista',

  // --------------------------------------------------------
  // SITUAZIONI / AZIONI
  // --------------------------------------------------------
  'Karaoke',
  'Teletrasporto',
  'Procrastinazione',
  'Imbarazzo',
  'Coincidenza',
  'Vendetta',
  'Ricatto',
  'Malinteso',
  'Inseguimento',
  'Sorpresa',
  'Litigio',
  'Trasloco',
  'Vacanza',
  'Colloquio',
  'Appuntamento',
  'Tradimento',
  'Incidente',
  'Evasione',
  'Interrogatorio',
  'Premiazione',

  // --------------------------------------------------------
  // CONCETTI / EMOZIONI
  // --------------------------------------------------------
  'Nostalgia',
  'Gelosia',
  'Dilemma',
  'Paradosso',
  'Pregiudizio',
  'Amnesia',
  'Invisibilità',
  'Contraddizione',
  'Imprevisto',
  'Miraggio',
  'Confusione',
  'Ansia',
  'Coraggio',
  'Fortuna',
  'Sfortuna',
  'Pazienza',
  'Curiosità',
  'Timidezza',
  'Orgoglio',
  'Rimorso',

  // --------------------------------------------------------
  // TECNOLOGIA / MODERNITÀ
  // --------------------------------------------------------
  'Influencer',
  'Smartphone',
  'Password',
  'Algoritmo',
  'Robot',
  'Videogioco',
  'Streaming',
  'Podcast',
  'Hashtag',
  'Selfie',
  'Drone',
  'Wi-Fi',
  'Auricolare',
  'Tastiera',
  'Joystick',

  // --------------------------------------------------------
  // LUOGHI / AMBIENTI
  // --------------------------------------------------------
  'Labirinto',
  'Grattacielo',
  'Metropolitana',
  'Aeroporto',
  'Campeggio',
  'Museo',
  'Castello',
  'Prigione',
  'Stadio',
  'Discoteca',

  // --------------------------------------------------------
  // PAROLE PIÙ PARTICOLARI / DIFFICILI
  // --------------------------------------------------------
  'Déjà-vu',
  'Paradosso',
  'Cospirazione',
  'Allucinazione',
  'Eredità',
  'Identità',
  'Rivincita',
  'Rivoluzione',
  'Catastrofe',
  'Sopravvivenza',
  'Trasformazione',
  'Invenzione',
  'Esplorazione',
  'Confessione',
  'Manipolazione',
];


/** A single set of five clues + the solution word for "La Ghigliottina" */
export interface GhigliottinaSet {
  clues: [string, string, string, string, string]
  solution: string
}

export const GHIGLIOTTINA_SETS: GhigliottinaSet[] = [

  // ========================================================
  // DIFFICOLTÀ FACILE
  // ========================================================

  {
    clues: ['Notte', 'Fuoco', 'Corsa', 'Vittoria', 'Squadra'],
    solution: 'Campione'
  },

  {
    clues: ['Luna', 'Sole', 'Mare', 'Vento', 'Terra'],
    solution: 'Luce'
  },

  {
    clues: ['Primavera', 'Estate', 'Autunno', 'Inverno', 'Neve'],
    solution: 'Stagione'
  },

  {
    clues: ['Roma', 'Milano', 'Napoli', 'Torino', 'Firenze'],
    solution: 'Città'
  },

  {
    clues: ['Chitarra', 'Piano', 'Violino', 'Tromba', 'Flauto'],
    solution: 'Musica'
  },

  {
    clues: ['Pasta', 'Pizza', 'Risotto', 'Lasagne', 'Polenta'],
    solution: 'Piatto'
  },

  // ========================================================
  // DIFFICOLTÀ MEDIA
  // ========================================================

  {
    clues: ['Stella', 'Mare', 'Calcio', 'Cinema', 'Tavolo'],
    solution: 'Portiere'
  },

  {
    clues: ['Letto', 'Fiume', 'Mare', 'Strada', 'Sangue'],
    solution: 'Corso'
  },

  {
    clues: ['Pesce', 'Ponte', 'Carta', 'Piano', 'Scopa'],
    solution: 'Gioco'
  },

  {
    clues: ['Cane', 'Mare', 'Ferro', 'San', 'Capo'],
    solution: 'Grande'
  },

  {
    clues: ['Bianco', 'Nero', 'Medio', 'Oriente', 'Estremo'],
    solution: 'Punto'
  },

  {
    clues: ['Ponte', 'Musica', 'Capelli', 'Collo', 'Elettrico'],
    solution: 'Cavo'
  },

  {
    clues: ['Banco', 'Costa', 'Conto', 'Scolastico', 'Alimentare'],
    solution: 'Credito'
  },

  {
    clues: ['Carta', 'Forbici', 'Roccia', 'Mano', 'Tagliare'],
    solution: 'Gesto'
  },

  {
    clues: ['Rosa', 'Guerra', 'Ghiaccio', 'Pietra', 'Vetro'],
    solution: 'Freddo'
  },

  {
    clues: ['Porta', 'Finestra', 'Computer', 'Televisore', 'Telefono'],
    solution: 'Schermo'
  },

  // ========================================================
  // DIFFICOLTÀ MEDIO-ALTA
  // ========================================================

  {
    clues: ['Testa', 'Letto', 'Tavolo', 'Fiume', 'Strada'],
    solution: 'Capo'
  },

  {
    clues: ['Cielo', 'Cinema', 'Tavolo', 'Calcio', 'Stella'],
    solution: 'Campo'
  },

  {
    clues: ['Dente', 'Pettine', 'Segreto', 'Strada', 'Tempo'],
    solution: 'Lungo'
  },

  {
    clues: ['Fuoco', 'Acqua', 'Terra', 'Aria', 'Metallo'],
    solution: 'Elemento'
  },

  {
    clues: ['Carta', 'Credito', 'Identità', 'Bancomat', 'Fede'],
    solution: 'Tessera'
  },

  {
    clues: ['Piede', 'Tavolo', 'Montagna', 'Piano', 'Palcoscenico'],
    solution: 'Scena'
  },

  {
    clues: ['Chiave', 'Soluzione', 'Inglese', 'Segreto', 'Risposta'],
    solution: 'Codice'
  },

  {
    clues: ['Orologio', 'Ponte', 'Mano', 'Strada', 'Porta'],
    solution: 'Dritta'
  },

  // ========================================================
  // DIFFICOLTÀ ALTA
  // ========================================================

  {
    clues: ['Testa', 'Croce', 'Moneta', 'Medaglia', 'Tavolo'],
    solution: 'Faccia'
  },

  {
    clues: ['Luce', 'Ombra', 'Cinema', 'Teatro', 'Specchio'],
    solution: 'Scena'
  },

  {
    clues: ['Cuore', 'Batteria', 'Cucina', 'Macchina', 'Squadra'],
    solution: 'Carica'
  },

  {
    clues: ['Collo', 'Bottiglia', 'Strada', 'Piuma', 'Neve'],
    solution: 'Collo'
  },

  {
    clues: ['Vento', 'Musica', 'Voce', 'Campana', 'Silenzio'],
    solution: 'Suono'
  },

  {
    clues: ['Occhio', 'Aquila', 'Ago', 'Lama', 'Spillo'],
    solution: 'Punta'
  },

  {
    clues: ['Tempo', 'Denaro', 'Parola', 'Pazienza', 'Distanza'],
    solution: 'Perdere'
  },

  {
    clues: ['Fuoco', 'Segreto', 'Candela', 'Stella', 'Passione'],
    solution: 'Fiamma'
  },

  // ========================================================
  // DIFFICOLTÀ MOLTO ALTA / FINALE
  // ========================================================

  {
    clues: ['Porta', 'Finestra', 'Computer', 'Casa', 'Mare'],
    solution: 'Aperto'
  },

  {
    clues: ['Testa', 'Piano', 'Piede', 'Mano', 'Tavolo'],
    solution: 'Forte'
  },

  {
    clues: ['Guerra', 'Amore', 'Calcio', 'Politica', 'Cinema'],
    solution: 'Partita'
  },

  {
    clues: ['Carta', 'Vento', 'Neve', 'Pietra', 'Fuoco'],
    solution: 'Bianca'
  },

  {
    clues: ['Segreto', 'Porta', 'Risposta', 'Cassetto', 'Tesoro'],
    solution: 'Chiave'
  },

  {
    clues: ['Mare', 'Montagna', 'Città', 'Campagna', 'Deserto'],
    solution: 'Viaggio'
  },

  {
    clues: ['Sogno', 'Notte', 'Cinema', 'Teatro', 'Realtà'],
    solution: 'Scena'
  },

  {
    clues: ['Voce', 'Mano', 'Cuore', 'Testa', 'Carta'],
    solution: 'Firma'
  },
]


export interface DistortedSong {
  title: string
  artist: string
  year: number
  hint: string          // a vague hint shown to players, no spoilers
  /** Filename in /public/songs/ (e.g. "01-albachiara.mp3") */
  audioFile: string
  /** Points awarded for correctly guessing this song */
  points: number
}

export const DISTORTED_SONGS: DistortedSong[] = [
  { title: 'Albachiara', artist: 'Vasco Rossi', year: 1979, hint: 'Cantautorato rock italiano anni \'70', audioFile: '01-albachiara.mp3', points: 3 },
  { title: 'I Tuoi Particolari', artist: 'Ultimo', year: 2019, hint: 'Pop italiano contemporaneo', audioFile: '02-i-tuoi-particolari.mp3', points: 2 },
  { title: 'Una Volta Ancora', artist: 'Fred De Palma feat. Ana Mena', year: 2019, hint: 'Reggaeton italiano', audioFile: '03-una-volta-ancora.mp3', points: 2 },
  { title: 'Tutta Colpa Mia', artist: 'Elodie', year: 2017, hint: 'Pop R&B italiano', audioFile: '04-tutta-colpa-mia.mp3', points: 3 },
  { title: 'Cercavo Amore', artist: 'Emma', year: 2012, hint: 'Pop italiano contemporaneo', audioFile: '05-cercavo-amore.mp3', points: 3 },
  { title: 'Désolé', artist: 'Anna Pepe', year: 2020, hint: 'Urban pop italiano', audioFile: '06-desole.mp3', points: 4 },
  { title: 'La Prima Volta', artist: 'Negramaro', year: 2006, hint: 'Rock alternativo pugliese', audioFile: '07-la-prima-volta.mp3', points: 4 },
  { title: 'Sinceramente', artist: 'Annalisa', year: 2024, hint: 'Pop elettronico italiano', audioFile: '08-sinceramente.mp3', points: 1 },
  { title: 'Dove e Quando', artist: 'Benji & Fede', year: 2019, hint: 'Pop duo italiano', audioFile: '09-dove-e-quando.mp3', points: 3 },
  { title: 'Filo Rosso', artist: 'Alfa', year: 2024, hint: 'Indie pop generazione Z', audioFile: '10-filo-rosso.mp3', points: 4 },
  { title: 'Tuta Gold', artist: 'Mahmood', year: 2024, hint: 'Urban pop italiano', audioFile: '11-tuta-gold.mp3', points: 2 },
  { title: 'Notti in bianco', artist: 'BLANCO', year: 2021, hint: 'Pop urban italiano', audioFile: '12-notti-in-bianco.mp3', points: 3 },
  { title: 'Insuperabile', artist: 'Rkomi', year: 2022, hint: 'Pop rap italiano', audioFile: '13-insuperabile.mp3', points: 4 },
  { title: 'Laura Non C\'\u00e8', artist: 'Nek', year: 1997, hint: 'Pop italiano anni \'90', audioFile: '14-laura-non-ce.mp3', points: 5 },
  { title: 'Vai!', artist: 'Alfa', year: 2022, hint: 'Indie pop giovane', audioFile: '15-vai.mp3', points: 3 },
  { title: 'Scrivile Scemo', artist: 'Pinguini Tattici Nucleari', year: 2020, hint: 'Pop rock italiano', audioFile: '16-scrivile-scemo.mp3', points: 3 },
  { title: 'D\'estate non vale', artist: 'Fred De Palma feat. Ana Mena', year: 2018, hint: 'Latin pop italiano estivo', audioFile: '17-destate-non-vale.mp3', points: 2 },
  { title: 'Tango', artist: 'Tananai', year: 2023, hint: 'Pop italiano contemporaneo', audioFile: '18-tango.mp3', points: 2 },
  { title: 'Malibu', artist: 'Sangiovanni', year: 2021, hint: 'Pop italiano estivo', audioFile: '19-malibu.mp3', points: 4 },
  { title: 'Cenere', artist: 'Lazza', year: 2023, hint: 'Rap italiano da festival', audioFile: '20-cenere.mp3', points: 5 },
];
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
  /** Whether the admin audio player is currently playing */
  musicaPlaying: boolean
  /** Admin audio player volume (0–1) */
  musicaVolume: number
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
    musicaPlaying: false,
    musicaVolume: 0.8,
  }
}
