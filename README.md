# 🥏 Gudbrandsdalen Discgolf Liga

Ligaapp for frisbeegolf i Gudbrandsdalen med Stableford-poeng, ligatabell, runderegistrering og baneinfo fra UDisc.

## Kom i gang lokalt

```bash
# Installer avhengigheter
npm install

# Start utviklingsserver
npm run dev

# Bygg for produksjon
npm run build
```

## Deploy til Vercel (gratis)

### Alternativ 1: Via GitHub (anbefalt)

1. **Opprett GitHub-repo:**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   ```
   
2. **Push til GitHub:**
   - Gå til [github.com/new](https://github.com/new) og opprett et nytt repo
   - Følg instruksjonene for å pushe:
   ```bash
   git remote add origin https://github.com/DITT-BRUKERNAVN/gudbrandsdalen-discgolf-liga.git
   git branch -M main
   git push -u origin main
   ```

3. **Koble til Vercel:**
   - Gå til [vercel.com](https://vercel.com) og logg inn med GitHub
   - Klikk "Add New Project"
   - Velg repoet ditt
   - Vercel oppdager automatisk at det er et Vite-prosjekt
   - Klikk "Deploy"
   - Ferdig! Du får en URL som `gudbrandsdalen-discgolf-liga.vercel.app`

### Alternativ 2: Via Vercel CLI

```bash
# Installer Vercel CLI
npm install -g vercel

# Deploy (følg instruksjonene)
vercel

# Deploy til produksjon
vercel --prod
```

## Eget domene

Etter deploy kan du legge til et eget domene i Vercel:
1. Gå til prosjektinnstillinger → Domains
2. Legg til f.eks. `gudbrandsdalendisc.no`
3. Oppdater DNS-innstillingene hos domeneregistraren din

Domener som `.no` koster ca. 100-200 kr/år hos f.eks. Domeneshop.

## Teknologi

- **React 18** — UI-rammeverk
- **Vite** — Byggesystem
- **Vercel** — Hosting
- Banedata fra [UDisc](https://udisc.com)

## Baner i ligaen

| Bane | Sted | Hull | Rating |
|------|------|------|--------|
| Skogen Diskgolfbane | Lillehammer | 22 | ★4.2 |
| Jørstadmoen | Lillehammer | 18 | ★3.9 |
| Sandbumoen Discgolfbane | Sør-Fron/Otta | 18 | ★3.9 |
| Kvam Idrettspark | Nord-Fron | 9 | ★3.8 |
| Ringebu Ungdomskole | Ringebu | 9 | ★2.5 |
| Vinstra Ungdomsskole | Nord-Fron | 6 | ★2.7 |
| Otta Disc Golf | Sel | 6 | ★2.2 |
| Øyer Ungdomsskole | Øyer | 9 | ★3.2 |

## Lisens

MIT
