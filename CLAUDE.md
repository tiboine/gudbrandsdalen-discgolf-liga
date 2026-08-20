# CLAUDE.md — Gudbrandsdalen Discgolf Liga

## Prosjektoversikt

En ligaapp for frisbeegolf/discgolf i Gudbrandsdalen, Innlandet. Spillere registrerer runder, samler Stableford-poeng basert på score mot par, og følger en live ligatabell gjennom sesongen.

Målgruppe: Lokale discgolfspillere i Gudbrandsdalen (Lillehammer, Øyer, Ringebu, Sør-Fron, Nord-Fron, Sel). Appen skal være enkel, mobilvennlig og morsom å bruke.

**Status:** Produksjon. Live på **https://gdliga.no** (v1.6.x). Full-stack med ekte data — dette er ikke lenger en demo.

## Tech stack

- **Frontend:** React 18 + Vite 6, single-file (`src/App.jsx`, ~3200 linjer). Inline styles, ingen UI-bibliotek.
- **Backend:** Supabase (Postgres + Auth + Row Level Security + RPC-er + Edge Functions). Klient opprettes i `src/App.jsx` (`createClient` fra `VITE_SUPABASE_URL` / `VITE_SUPABASE_ANON_KEY`).
- **Auth:** Supabase Auth — e-post/passord, Google OAuth, og glemt-passord (recovery). Se «Autentisering» under.
- **Push:** Web Push (VAPID) via en Deno Edge Function (`supabase/functions/send-push`), trigget av en `pg_net`-webhook på `notifications`.
- **PWA:** `vite-plugin-pwa` (injectManifest) + egen Workbox-service-worker (`src/sw.js`). Installer­bar, offline-cache, push.
- **Mobil:** Android TWA-wrapper i `android-app/` (Bubblewrap) som pakker web-appen.
- **Hosting:** Vercel (auto-deploy fra `main`). Custom domene `gdliga.no`. `@vercel/analytics` er koblet på.
- **Språk:** Norsk (bokmål) i all UI-tekst. Engelske navn/kommentarer i kode.

## Prosjektstruktur

```
├── index.html                 # Entry point, norsk meta/SEO/OG, canonical gdliga.no
├── vite.config.js             # Vite + React + VitePWA (injectManifest). Injiserer __APP_VERSION__/__COMMIT_HASH__/__BUILD_DATE__
├── vercel.json                # SPA rewrite (/(.*) -> /)
├── package.json               # version = app-versjon (vises i footer, driver update-toast)
├── .env                       # VITE_SUPABASE_URL, VITE_SUPABASE_ANON_KEY, VITE_VAPID_PUBLIC_KEY (ikke committet med verdier)
├── src/
│   ├── main.jsx               # React root + <Analytics/>
│   ├── App.jsx                # HELE appen (single-file): state, auth, data, scoring, alle faner/modaler
│   ├── sw.js                  # Service worker: precache + Supabase NetworkFirst + push/notificationclick
│   ├── themes.js              # 5 fargetema (skog/fjell/solnedgang/host/kontrast), applyTheme() setter CSS-vars
│   └── components/
│       ├── BadgeIcons.jsx     # BADGE_ICONS — ~25 SVG-badges (achievements)
│       └── TabIcons.jsx       # TAB_ICONS, STAT_ICONS, LogoIcon, BellIcon
├── supabase/
│   ├── migrations/            # 001–009 SQL (kjøres MANUELT i Supabase SQL Editor / db push)
│   └── functions/send-push/   # Deno Edge Function for VAPID Web Push
├── android-app/               # Android TWA (twa-manifest.json, Gradle, AndroidManifest)
└── public/                    # favicon/ikoner, robots.txt, sitemap.xml
```

## Autentisering

- **Innlogging:** e-post/passord (`signInWithEmail`) + Google OAuth (`signInWithGoogle`, `redirectTo: https://gdliga.no`).
- **Registrering:** `signUpWithEmail` → Supabase sender bekreftelses-e-post.
- **Glemt passord:** «Glemt passord?» i login-modalen → `sendPasswordReset` (`supabase.auth.resetPasswordForEmail`) sender e-post med lenke til `gdliga.no`. Lenken utløser et `PASSWORD_RECOVERY`-event i `onAuthStateChange` → `recoveryMode` viser «Velg nytt passord» → `updatePassword` (`supabase.auth.updateUser`).
  - Krever at `https://gdliga.no` står i Supabase → Authentication → URL Configuration → Redirect URLs (samme liste som Google OAuth bruker).
- `ensureProfile` (kjører på `user`-endring) oppretter en rad i `profiles` hvis den mangler — kritisk for Google OAuth-brukere.
- **Admin:** `ADMIN_EMAILS` / `isAdmin` (p.t. `urbanthor@gmail.com`). Admin-fanen har underfaner (oversikt/runder/spillere/profiler/meldinger/nyheter/test).

## Supabase-backend

Tabeller (basisskjemaet ble laget i Supabase-UI; migrasjonene 001–009 lag-på-lag):
- `profiles` — brukerprofil (full_name, avatar_url, division, hometown, push_prefs)
- `rounds` — registrerte runder (`score` = mot par, `total_score` = absolutt, course_id, date, aces/eagles/birdies/bogeys, group_id for gruppespill)
- `news`, `feedback`, `notifications`, `friends`, `push_subscriptions`

Viktig:
- **RLS er på** for alle tabeller. Migrasjon `007` herdet policyene (admin-tilgang, egne rader, venneregistrering). Se filene for detaljer.
- **Cross-user-varsler** går via fire `SECURITY DEFINER`-RPC-er (migrasjon `008`): `notify_friend_request`, `notify_friend_accepted`, `notify_round_registered`, `notify_course_record`. Tittel/tekst settes server-side (anti-spoofing) — ikke skriv til `notifications` direkte fra klienten for andre brukere.
- **Push-pipeline:** INSERT i `notifications` → `pg_net`-trigger (migrasjon `006`) POST-er til `send-push` Edge Function → VAPID-push til alle subs (respekterer `push_prefs`, rydder 410/404) → service worker viser varsel → klikk sender `{type:'navigate', path}` til appen som bytter fane.
- **Migrasjoner kjøres MANUELT** — Vercel-deploy kjører dem ikke. Kjør ny SQL i Supabase SQL Editor eller `supabase db push`. Alle er idempotente.

## Kjernefunksjonalitet (faner)

`tab`-state (lagres i sessionStorage): `tabell, runder, baner, nytt, rekorder, regler, badges, venner, intro, admin`. 4 primære + resten bak «Mer».

- **Ligatabell** — podium topp 3 + full tabell med sparkline-trend. Filter: Alle / Åpen / Rekreasjons / Venner.
- **Runder** — feed med siste runder (capped 50), viser spiller, bane, score mot par, poeng, gruppespillere.
- **Baner** — 12 ligabaner (13 i COURSES inkl. vingarparken) med UDisc-data; sorter på lengde/popularitet/rating.
- **Rekorder** — all-time + banerekorder per bane. Bruker `allRounds` (ubegrenset), ikke bare feeden.
- **Badges** — grid fra `BADGE_DEFS` / `BADGE_ICONS`.
- **Registrer runde** (modal) — velg bane (GPS sorterer nærmeste først), score mot par med live poeng-preview, dato, gruppespillere. Lagrer `score` + `total_score`.
- **Nytt / Regler / Intro / Venner / Admin.**

Egne dialoger: `appConfirm` / `appAlert` / `appPrompt` (ikke browser-native `confirm/alert`).

## Poengsystem (Score-Stableford)

- `scoreToPoints(scoreVsPar)` i `src/App.jsx`: ≤−4=10pts, −3/−2=9, −1/0=8, +1/+2=7, +3/+4=6, +5/+6=5, +7/+8=4, +9/+10=3, +11–13=2, +14–16=1, ≥+17=0
- Major-baner (`MAJOR_COURSE_IDS` = Skogen, Lalm, Jørstadmoen) gir 1,5× poeng (`Math.ceil`, avrundes opp)
- **Standings:** for hver spiller, filtrer runder til `LEAGUE_COURSE_IDS`, behold beste runde per `(course_id, seasonKey)`, summer poeng. Alle runder teller, men bare beste per bane per sesong gir ligapoeng.
- Ingen oppmøtepoeng — man må prestere for å klatre.
- **Sesong:** `getSeasonKey` gir f.eks. `2026-V` / `2026-H`. `SPRING_MONTHS = [5, 6, 7]` (mai–juli), `FALL_MONTHS = [8, 9, 10]` (aug–okt). Utenfor sesong (`null`) teller ikke for liga, men teller for badges/rekorder.
- **`par` er ikke bare pynt:** absolutt totalscore rekonstrueres som `score + course.par` når `total_score` mangler (gamle runder). Endrer du en banes `par`, kan historiske totaler forskyves — vurder en backfill-migrasjon (se `009` for Lalm-eksempelet).

## Baner i ligaen (fra UDisc)

`LEAGUE_COURSE_IDS` (12 baner som teller) og `MAJOR_COURSE_IDS` i `src/App.jsx`. `COURSES`-arrayet har all banedata + UDisc/Google Maps-lenker + lat/lng.

| ID | Bane | Sted | Major |
|----|------|------|-------|
| skogen | Skogen Diskgolfbane | Lillehammer | ⭐ Major |
| lalm | Lalm Diskgolfbane | Lalm, Sel | ⭐ Major |
| jorstadmoen | Jørstadmoen | Lillehammer | ⭐ Major |
| sandbumoen | Sandbumoen Discgolfbane | Sør-Fron | — |
| lundesetra | Lundesetra Frisbeegolfbane | Venabygd, Ringebu | — |
| mosetertoppen | Mosetertoppen Diskgolfpark | Øyer | — |
| gaala | Gålå | Gålå, Sør-Fron | — |
| fossen-kvitfjell | Fossen Diskgolf Kvitfjell | Fåvang | — |
| kvam | Kvam Idrettspark | Kvam, Nord-Fron | — |
| oyer | Øyer Ungdomsskole | Øyer | — |
| ringebu-u | Ringebu Ungdomskole Discgolfbane | Ringebu | — |
| vingarparken | Vingarparken Diskgolfbane | Lillehammer | — |

UDisc har ingen offentlig API. Spillere kan eksportere runder som CSV fra UDisc-appen (CSV-import er ennå ikke bygget).

> **NB (lærdom):** UDisc kan ha flere oppføringer for samme bane. Lalm har både en utdatert 12-hulls (`...discgolfbane-nYVD`) og den riktige 18-hulls (`...diskgolfbane-R5ZA`, par 57) — bruk den riktige. Verifiser hull/par mot UDisc ved endring.

## Designsystem

### Farger
- **Bakgrunn:** Mørk skog-gradient (`#0a0f0a` → `#111a11` → `#1a2618`)
- **Primær/accent:** Lime-grønn (`#A3E635`, gradient til `#65A30D`); lenker `#4a8a10`
- **Tekst:** Varm hvit (`#e8e8e0`); sekundær/dempet grønn (`#6b7a58`, `#8a9a70`)
- **Negativt:** Rød (`#ef4444`) for scores over par; **Rating-stjerner:** Gul (`#facc15`)
- Temaene styres via CSS-variabler (`--c-*` / `--theme-*`) satt av `applyTheme()` i `themes.js`. Bruk `var(--c-...)` i ny UI, ikke hardkodede farger der et token finnes.

### Typografi
- **Font:** DM Sans (Google Fonts). Headings 800, body 400–600.

### Visuell stil
- Noise-texture overlay, fjellsilhuett (SVG), glassmorfisme på modaler (backdrop-blur), subtile borders.
- Animasjoner: fadeSlideUp, fadeIn, slideUp. Modaler som bottom-sheet (slider opp fra bunnen).
- Mobil-first, max-width 600px, design for 375px først.

### Komponenter i App.jsx
- `Sparkline` (SVG poengtrend), `AnimNum` (animert tallteller), `Stars` (stjernerating).

## Kommandoer

```bash
npm install       # Installer avhengigheter
npm run dev       # Lokal utviklingsserver (localhost:5173) — krever .env med Supabase-verdier
npm run build     # Produksjonsbygg til dist/ (bygger også service worker)
npm run preview   # Forhåndsvis produksjonsbygg
```

Deploy: **commit + push til `main`** → Vercel auto-deployer. Bump `version` i `package.json` per release (vises i footer, driver «Appen er oppdatert»-toast). Kjør evt. nye Supabase-migrasjoner manuelt.

## PWA / caching (viktig!)

- Service worker (`registerType: 'prompt'`) cacher aggressivt (precache + Supabase NetworkFirst). **Endringer er ikke umiddelbart synlige** for brukere med appen installert/åpen — de får en «Appen er oppdatert»-toast og må godta for å laste ny versjon (eller SW oppdaterer ved neste besøk).
- Ved feilsøking av «jeg ser ikke endringen»: sjekk footer-versjonen (`vX.Y.Z · commit · dato`). Hard reload alene er ikke nok — man må evt. avregistrere SW / tømme cache.

## Roadmap — status

### ✅ Fase 1: Backend & autentisering (FERDIG)
Supabase, e-post + Google-innlogging, glemt passord, runder/poeng i Postgres, automatisk ligatabell.

### ⬜ Fase 2: CSV-import fra UDisc
- [ ] Filopplasting + parsing av UDisc-CSV, auto-matching mot COURSES.

### 🟡 Fase 3: Utvidet funksjonalitet (delvis ferdig)
- [x] Sesonghåndtering (vår/høst, sesongnøkler)
- [x] Banerekorder per bane
- [x] Push-varsler ved nye resultater/venner
- [x] Admin-panel
- [ ] Head-to-head statistikk mellom spillere

### 🟡 Fase 4: Sosiale features (delvis ferdig)
- [x] Vennesystem (forespørsler, venne-filter, gruppespill)
- [ ] Kommentarer på runder
- [ ] Bilder fra runder

## Viktige konvensjoner

- **Språk i UI:** Alltid norsk bokmål. Norske tegn (æ, ø, å) — pass på encoding. **Commit-meldinger: ASCII** (skriv «oppforing», «pa» e.l.).
- **Språk i kode:** Engelske variabelnavn og kommentarer.
- **Score:** Vises alltid mot par (f.eks. -3, +2, E for even). Poeng forkortes "pts".
- **Baner:** Lenk alltid til UDisc der mulig.
- **Ingen eksterne UI-biblioteker:** Inline styles (nåværende mønster). Bruk `var(--c-*)`-tokens for farger.
- **Single-file:** `App.jsx` inneholder alt (~3200 linjer). Vurder å splitte ut når det vokser mer.
- **Cross-user-skriving** går via SECURITY DEFINER-RPC-er, ikke direkte tabell-INSERT.

## Ting å være obs på

- `App.jsx` er stor (~3200 linjer). Ved større tillegg, vurder å splitte ut:
  - `src/data/courses.js` (COURSES), `src/data/stableford.js` (poeng), flere `src/components/`, `src/hooks/`.
- Data er ekte (Supabase), ikke demo. Endringer i scoring/standings påvirker live ligatabell — test nøye.
- `par`/`holes` i COURSES brukes i visning OG i validering/total-rekonstruksjon (se Poengsystem). Backfill ved par-endring.
- Migrasjoner må kjøres manuelt i Supabase — det skjer ikke automatisk ved deploy.
- PWA-caching skjuler endringer til SW oppdaterer (se PWA-seksjon).
- UDisc-lenker/oppføringer kan endre seg — verifiser med web search hvis usikker.
