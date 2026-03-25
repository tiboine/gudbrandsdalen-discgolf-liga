# CLAUDE.md — Gudbrandsdalen Discgolf Liga

## Prosjektoversikt

En ligaapp for frisbeegolf/discgolf i Gudbrandsdalen, Innlandet. Spillere registrerer runder, samler Stableford-poeng basert på plassering, og følger en live ligatabell gjennom sesongen.

Målgruppe: Lokale discgolfspillere i Gudbrandsdalen (Lillehammer, Øyer, Ringebu, Sør-Fron, Nord-Fron, Sel). Appen skal være enkel, mobilvennlig og morsom å bruke.

## Tech stack

- **Frontend:** React 18 + Vite
- **Hosting:** Vercel (gratis tier)
- **Språk:** Norsk (bokmål) i all UI-tekst
- **Ingen backend ennå** — all data er hardkodet demodata. Backend/database er planlagt neste steg.

## Prosjektstruktur

```
├── index.html          # Entry point med norsk meta, disc-emoji favicon
├── package.json        # Vite + React avhengigheter
├── vite.config.js      # Vite med React-plugin
├── vercel.json         # SPA rewrite-regler
├── src/
│   ├── main.jsx        # React root mount
│   └── App.jsx         # Hele appen (single-file foreløpig)
└── public/             # Statiske assets (tom foreløpig)
```

## Kjernefunksjonalitet

### 1. Ligatabell (hovedfane)
- Podium-visning for topp 3
- Full rankingtabell med sparkline-trender
- Divisjonsfilter: Alle / Åpen / Rekreasjons
- Klikk på spiller → modal med profil og statistikk

### 2. Runder
- Feed med siste registrerte runder
- Viser spiller, bane, score (mot par), og poeng opptjent

### 3. Baner
- 8 baner fra Gudbrandsdalen med ekte data fra UDisc
- Viser rating, antall hull, par, vanskelighetsgrad, lengde, spilletid
- Klikkbar ekspandering med beskrivelse og direkte UDisc-lenke
- Alle baner er gratis

### 4. Poengsystem (Stableford)
- Poeng basert på plassering per runde: 1.plass=14pts, 2.=12, 3.=10, osv.
- Beste 8 av 12 runder teller for sluttresultatet
- Ved likt resultat deles poengene

### 5. Registrer runde (modal)
- Velg bane (dropdown med hull/par/rating)
- Legg inn score mot par
- Velg dato
- Suksessanimering etter registrering

## Baner i ligaen (fra UDisc)

| ID | Bane | Sted | Hull | Par | UDisc Rating |
|----|------|------|------|-----|-------------|
| skogen | Skogen Diskgolfbane | Lillehammer | 22 | 63 | ★4.2 |
| jorstadmoen | Jørstadmoen | Lillehammer | 18 | 54 | ★3.9 |
| sandbumoen | Sandbumoen Discgolfbane | Sør-Fron/Otta | 18 | 55 | ★3.9 |
| kvam | Kvam Idrettspark | Kvam, Nord-Fron | 9 | 27 | ★3.8 |
| ringebu | Ringebu Ungdomskole | Ringebu | 9 | 27 | ★2.5 |
| vinstra | Vinstra Ungdomsskole | Vinstra | 6 | 18 | ★2.7 |
| otta | Otta Disc Golf | Otta, Sel | 6 | 18 | ★2.2 |
| oyer | Øyer Ungdomsskole | Øyer | 9 | 27 | ★3.2 |

UDisc-lenker finnes i COURSES-arrayet i `src/App.jsx`. UDisc har ingen offentlig API (per mars 2026), men spillere kan eksportere sine runder som CSV fra UDisc-appen.

## Designsystem

### Farger
- **Bakgrunn:** Mørk skog-gradient (`#0a0f0a` → `#111a11` → `#1a2618`)
- **Primær/accent:** Lime-grønn (`#A3E635`, gradient til `#65A30D`)
- **Tekst:** Varm hvit (`#e8e8e0`)
- **Sekundær tekst:** Dempet grønn (`#6b7a58`, `#8a9a70`)
- **Negativt:** Rød (`#ef4444`) for scores over par
- **Rating-stjerner:** Gul (`#facc15`)

### Typografi
- **Font:** DM Sans (importert fra Google Fonts)
- **Headings:** 800 weight
- **Body:** 400-600 weight

### Visuell stil
- Noise-texture overlay for dybde
- Fjellsilhuett i bakgrunnen (SVG)
- Glassmorfisme på modaler (backdrop-blur)
- Subtile border og transparens (`rgba(255,255,255,0.06)`)
- Animasjoner: fadeSlideUp, fadeIn, slideUp
- Mobil-first design, max-width 600px

### Komponenter
- `Sparkline` — SVG mini-graf for poengtrend
- `AnimNum` — Animert tallteller
- `Stars` — Stjernerating-visning
- Modaler slider opp fra bunnen (bottom sheet-mønster)

## Kommandoer

```bash
npm install       # Installer avhengigheter
npm run dev       # Lokal utviklingsserver (localhost:5173)
npm run build     # Produksjonsbygg til dist/
npm run preview   # Forhåndsvis produksjonsbygg
vercel            # Deploy til Vercel (krever vercel CLI)
```

## Planlagt videre utvikling (roadmap)

### Fase 1: Backend & autentisering
- [ ] Legg til Supabase (gratis tier) som database
- [ ] Brukerregistrering og innlogging
- [ ] Lagre runder og poeng i PostgreSQL
- [ ] Beregn ligatabell automatisk fra runder

### Fase 2: CSV-import fra UDisc
- [ ] Filopplasting for UDisc CSV-eksport
- [ ] Parsing av UDisc CSV-format (kolonner: PlayerName, CourseName, +/-, Date, osv.)
- [ ] Automatisk matching av baner mot COURSES-arrayet

### Fase 3: Utvidet funksjonalitet
- [ ] Sesonghåndtering (flere sesonger, arkiv)
- [ ] Head-to-head statistikk mellom spillere
- [ ] Banerekorder per bane i ligaen
- [ ] Push-varsler ved nye resultater
- [ ] Admin-panel for ligaadministrator

### Fase 4: Sosiale features
- [ ] Kommentarer på runder
- [ ] Bilder fra runder
- [ ] Vennelag/grupper

## Viktige konvensjoner

- **Språk i UI:** Alltid norsk bokmål
- **Språk i kode:** Engelske variabelnavn og kommentarer
- **Score:** Vises alltid som mot par (f.eks. -3, +2, E for even)
- **Poeng:** Forkortes "pts" i UI
- **Baner:** Lenk alltid til UDisc-siden der det er mulig
- **Mobilfokus:** Design for 375px bredde først, skaler opp
- **Ingen eksterne UI-biblioteker:** Inline styles i React (nåværende mønster)
- **Single-file foreløpig:** App.jsx inneholder alt. Splitt til separate filer når kompleksiteten øker (komponenter, hooks, data, utils)

## Ting å være obs på

- App.jsx er ~340 linjer. Når du legger til ny funksjonalitet, vurder å splitte ut:
  - `src/data/courses.js` — banedata
  - `src/data/stableford.js` — poengsystem
  - `src/components/` — gjenbrukbare komponenter (Sparkline, Stars, Modal, etc.)
  - `src/hooks/` — custom hooks for state management
- Demodata (spillere, runder) skal erstattes av ekte data fra database i Fase 1
- Norske tegn (æ, ø, å) i all brukervendt tekst — pass på encoding
- UDisc-lenker kan endre seg — verifiser med web search hvis usikker
