# 🌙 Battle Night

> **Dashboard live per game show** — Pannello di controllo e display pubblico per la serata a quiz *Battle Night*.

Battle Night è un'applicazione web full-stack costruita con **Next.js 16**, progettata per condurre una serata di giochi a squadre in tempo reale. Il conduttore gestisce tutto dal pannello **Regia**, mentre il pubblico segue l'andamento dalla schermata **Display** proiettata su schermo.

---

## ✨ Funzionalità

### 🎛️ Pannello Regia (`/admin`)
- Navigazione tra le fasi di gioco con pulsanti avanti/indietro
- Gestione punteggi per ciascuna squadra (incremento/decremento)
- Timer configurabile con avvio, pausa e reset
- Controllo del montepremi (dimezzamento / reset a € 200.000)
- Controlli specifici per ogni manche

### 📺 Display Pubblico (`/display`)
- Vista a schermo intero per la proiezione al pubblico
- Si sincronizza automaticamente con la Regia tramite **BroadcastChannel**, evento `storage` e polling di fallback (1 s)
- Senza bisogno di WebSocket o server dedicato — comunicazione 100% lato client

---

## 🎮 Fasi di Gioco

| Fase | Nome | Descrizione |
|------|------|-------------|
| 1 | **Intro** | Schermata di benvenuto |
| 2 | **Le Squadre** | Presentazione delle quattro squadre in gara |
| 3 | **Musica Distorta** | Indovina il brano musicale nascosto |
| 4 | **L'Intesa Vincente** | Due squadre, una parola da indovinare a gesti |
| 5 | **La Ghigliottina** | Trova la parola che collega cinque indizi |
| 6 | **Il Bruco** | Gara a catena di parole |
| 7 | **L'Inversione Logica** | 14 step di domande a risposta binaria |

### 🎵 Musica Distorta
- 20 brani italiani con file audio in `/public/songs/`
- Riproduzione audio controllabile dalla Regia (play/pausa/volume)
- Rivelazione titolo + artista sincronizzata con il Display
- Punteggi variabili (1–5 punti) in base alla difficoltà

### 💬 L'Intesa Vincente
- Pool di 100+ parole italiane mescolate casualmente
- Avanzamento parola con rimescolamento automatico a fine lista

### 🔪 La Ghigliottina
- 8 set di indizi predefiniti, navigabili avanti e indietro

### 🐛 Il Bruco
- Registrazione dell'ordine di arrivo delle squadre

### 🧠 L'Inversione Logica
- 14 domande a scelta binaria (A/B) con progresso visivo

---

## 👥 Squadre

| Token | Nome |
|-------|------|
| `team-vip` | Vip |
| `team-intellettuali` | Intellettuali |
| `team-festaioli` | Festaioli |
| `team-dormiglioni` | Dormiglioni |

---

## 🛠️ Stack Tecnologico

| Tecnologia | Versione | Ruolo |
|-----------|---------|-------|
| [Next.js](https://nextjs.org/) | 16.2.6 | Framework React full-stack |
| [React](https://react.dev/) | 19 | UI |
| [TypeScript](https://www.typescriptlang.org/) | 5.7.3 | Type safety |
| [Tailwind CSS](https://tailwindcss.com/) | 4 | Styling |
| [shadcn/ui](https://ui.shadcn.com/) | 4 | Componenti UI |
| [Lucide React](https://lucide.dev/) | 1.16 | Icone |
| [Base UI](https://base-ui.com/) | 1.5 | Primitive UI headless |

### Sincronizzazione tra tab (senza server)
Lo stato di gioco viene persistito in **localStorage** e propagato in tempo reale tramite:
1. **BroadcastChannel** — aggiornamento istantaneo tra tab dello stesso browser
2. **`storage` event** — fallback cross-tab nativo del browser
3. **Polling 1 s** — fallback universale per finestre separate e casi limite

---

## 🚀 Avvio rapido

### Prerequisiti
- Node.js >= 18
- pnpm (consigliato) oppure npm

### Installazione

```bash
# Clona il repository
git clone https://github.com/<tuo-utente>/battle-night.git
cd battle-night

# Installa le dipendenze
pnpm install
# oppure
npm install
```

### Sviluppo

```bash
pnpm dev
# oppure
npm run dev
```

L'app sarà disponibile su [http://localhost:3000](http://localhost:3000).

> Il server parte con `-H 0.0.0.0` quindi è accessibile anche da altri dispositivi nella stessa rete locale (utile per proiettare il Display su un secondo schermo/tablet).

### Build produzione

```bash
pnpm build && pnpm start
# oppure
npm run build && npm start
```

---

## 📁 Struttura del Progetto

```
battle-night/
├── app/
│   ├── admin/          # Pagina Regia (/admin)
│   ├── display/        # Pagina Display pubblico (/display)
│   ├── globals.css     # Stili globali e design system
│   ├── layout.tsx      # Layout radice
│   └── page.tsx        # Homepage con link a Regia e Display
├── components/
│   ├── atoms/          # Componenti primitivi (NeonTitle, ecc.)
│   ├── molecules/      # Componenti composti
│   ├── organisms/      # Blocchi UI complessi per fase
│   │   ├── admin-controls.tsx          # Pannello di controllo Regia
│   │   ├── musica-distorta-board.tsx   # Board Musica Distorta
│   │   ├── intesa-vincente-board.tsx   # Board Intesa Vincente
│   │   ├── ghigliottina-board.tsx      # Board Ghigliottina
│   │   ├── bruco-board.tsx             # Board Bruco
│   │   ├── inversione-logica-grid.tsx  # Grid Inversione Logica
│   │   ├── phase-renderer.tsx          # Selettore di fase
│   │   └── phase-shell.tsx             # Shell con header di fase
│   └── pages/          # Componenti pagina completi
├── lib/
│   └── battle-night/
│       ├── types.ts    # Tipi, costanti, domande e brani
│       └── store.ts    # Hook di stato (useGameController, useGameStateReader)
└── public/
    └── songs/          # File audio MP3 per Musica Distorta
```

---

## 🎶 File Audio

I brani per la fase **Musica Distorta** vanno posizionati in `public/songs/` con il nome file corrispondente definito in `DISTORTED_SONGS` (in `lib/battle-night/types.ts`).

```
public/songs/
├── 01-albachiara.mp3
├── 02-i-tuoi-particolari.mp3
├── ...
└── 20-cenere.mp3
```

I file audio **non sono inclusi nel repository** per ragioni di copyright. Aggiungili manualmente prima di avviare l'applicazione.

---

## 📝 Licenza

[![License: CC BY-NC 4.0](https://img.shields.io/badge/License-CC%20BY--NC%204.0-lightgrey.svg)](https://creativecommons.org/licenses/by-nc/4.0/)

Questo progetto è distribuito sotto la licenza **Creative Commons Attribution-NonCommercial 4.0 International (CC BY-NC 4.0)**.

Puoi liberamente usarlo, condividerlo e adattarlo **a condizione che**:
- venga data **attribuzione** all'autore originale
- non venga fatto un **uso commerciale**

Consulta il file [LICENSE](./LICENSE) o visita [creativecommons.org/licenses/by-nc/4.0](https://creativecommons.org/licenses/by-nc/4.0/) per i dettagli completi.

Copyright © 2026 [minicla03](https://github.com/minicla03)
