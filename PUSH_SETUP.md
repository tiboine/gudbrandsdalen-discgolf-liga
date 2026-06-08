# Web Push setup-guide

Følg disse stegene én gang for å aktivere push-varslinger. Etterpå går alt automatisk.

## 1. Generer VAPID-nøkler (engangs)

På en maskin med Node installert:

```bash
npx web-push generate-vapid-keys
```

Du får et output som dette:

```
Public Key:
BNbxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
Private Key:
xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

Lagre begge to et trygt sted — du trenger dem i de neste stegene.

## 2. Sett Vercel env-variabel (klient-side)

Vercel Dashboard → ditt prosjekt → **Settings** → **Environment Variables**:

| Name | Value |
|---|---|
| `VITE_VAPID_PUBLIC_KEY` | (public key fra steg 1) |

Velg "Production", "Preview", og "Development" og lagre. Deploy på nytt etterpå.

## 3. Sett Supabase secrets (Edge Function-side)

Supabase Dashboard → ditt prosjekt → **Project Settings** → **Edge Functions** → **Secrets**:

| Name | Value |
|---|---|
| `VAPID_PUBLIC_KEY` | (samme public key) |
| `VAPID_PRIVATE_KEY` | (private key fra steg 1) |
| `VAPID_SUBJECT` | `mailto:urbanthor@gmail.com` (eller en URL) |

`SUPABASE_URL` og `SUPABASE_SERVICE_ROLE_KEY` settes automatisk av Supabase.

## 4. Aktiver pg_net extension

Supabase Dashboard → **Database** → **Extensions** → søk etter `pg_net` → toggle **Enable**.

## 5. Sett database-konfigurasjon for trigger

I Supabase SQL Editor, kjør (bytt ut verdiene):

```sql
ALTER DATABASE postgres SET app.settings.functions_url = 'https://DIN-PROJECT.functions.supabase.co';
ALTER DATABASE postgres SET app.settings.anon_key = 'din-anon-key';
```

Du finner `functions_url` under **Project Settings → API** (oppe ved Project URL — bytt `.supabase.co` med `.functions.supabase.co`). `anon_key` står samme sted under "Project API keys".

## 6. Kjør SQL-migrasjonene

I Supabase SQL Editor, kopier og kjør innholdet av disse to filene i rekkefølge:

1. `supabase/migrations/005_push.sql` — oppretter push_subscriptions-tabell + push_prefs-kolonne
2. `supabase/migrations/006_push_trigger.sql` — trigger som kaller Edge Function

## 7. Deploy Edge Function

Hvis du har Supabase CLI lokalt:

```bash
supabase functions deploy send-push
```

Hvis du foretrekker dashbordet:
- Supabase Dashboard → **Edge Functions** → **Create a new function** → navn `send-push`
- Lim inn innholdet av `supabase/functions/send-push/index.ts`
- Deploy

## 8. Test

1. Åpne appen og logg inn
2. Etter ~3 sekunder dukker en grønn banner opp øverst: "🔔 Få varsler på telefonen?"
3. Trykk "Aktiver" → nettleseren spør om tillatelse → tillat
4. Gå til "Min profil" og se at push-seksjonen viser "🔔 Aktivert"
5. Test ved å sende deg selv en notifikasjon fra **Admin → Test**-fanen
6. Push-varselet skal dukke opp på telefonen/desktop selv om appen ligger i bakgrunnen

## Plattform-merknader

- **Android Chrome / Edge**: Virker fullt ut når PWA er installert på hjem-skjermen
- **iOS 16.4+**: Virker KUN når PWA er lagt til hjem-skjermen via Safari (Del → Legg til på Hjem-skjerm)
- **iOS i Safari/Chrome direkte**: Push-varsler er ikke støttet
- **Desktop Chrome/Firefox/Edge**: Virker uansett (appen trenger ikke å være installert)
- **Desktop Safari (macOS)**: Krever Safari 16+

## Feilsøking

**Banneret kommer aldri:** sjekk at brukeren ikke har dismisset det tidligere (`localStorage.getItem("pushBannerDismissed")` skal være null). Eller at `Notification.permission` allerede er "granted" eller "denied".

**Aktivering feiler:** sjekk konsollen for feilmelding. Vanligvis enten `VITE_VAPID_PUBLIC_KEY` som mangler eller bruker som ikke har gitt tillatelse.

**Push sendes ikke fra triggeren:** sjekk at `pg_net` er aktivert og at `app.settings.functions_url` og `app.settings.anon_key` er satt. Test ved å kjøre `select net.http_post(...)` manuelt.

**Push sendes men når aldri telefonen:** sjekk Edge Function-loggene i Supabase Dashboard. Vanligst er feil VAPID-nøkler (private og public matcher ikke), eller at brukerens push_prefs har deaktivert typen.
