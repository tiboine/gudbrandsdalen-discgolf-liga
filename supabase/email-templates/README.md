# E-postmaler + avsender fra gdliga.no

Supabase-prosjektet er dashboard-styrt (ingen `config.toml`), så e-postmaler og
SMTP settes i **Supabase-dashbordet**. Filene her er kildekopier du limer inn.

## 1. Norske e-postmaler (gratis, virker umiddelbart)

Gå til **Supabase → Authentication → Email Templates**. For hver mal: sett
«Subject heading» og lim `.html`-innholdet inn i «Message body».

| Supabase-mal | Fil | Subject heading |
|---|---|---|
| Reset Password | `reset-password.html` | `Tilbakestill passordet ditt` |
| Confirm signup | `confirm-signup.html` | `Bekreft e-postadressen din` |

De andre malene (Magic Link, Change Email Address, Invite user, Reauthentication)
brukes ikke av appen i dag, men kan følge samme mønster. Alle handlingslenker
bruker variabelen `{{ .ConfirmationURL }}`.

> Merk: dette bytter bare **språk/innhold**. Avsenderen er fortsatt
> `noreply@mail.app.supabase.io` til du setter opp egen SMTP (steg 2).

## 2. Sende fra gdliga.no (egen SMTP)

Supabase sin innebygde e-post er ratebegrenset (~få i timen) og kan ikke sende fra
ditt domene. For `noreply@gdliga.no` trenger du en e-postleverandør + egen SMTP.

### Steg
1. **Velg leverandør.** Anbefalt: **Resend** (enkel, godt gratisnivå). Alternativer:
   Postmark, Amazon SES, Mailgun, SendGrid.
2. **Verifiser domenet `gdliga.no`** hos leverandøren. De gir deg DNS-poster du
   legger til der DNS for gdliga.no styres (trolig Vercel eller domeneregistraren):
   - **SPF** (TXT) — autoriserer leverandøren til å sende for domenet
   - **DKIM** (CNAME/TXT) — signerer e-postene
   - **DMARC** (TXT, valgfritt men anbefalt): `v=DMARC1; p=none; rua=mailto:postmaster@gdliga.no`
3. **Hent SMTP-detaljer** fra leverandøren.
   - Resend: host `smtp.resend.com`, port `465` (SSL) eller `587` (STARTTLS),
     brukernavn `resend`, passord = din Resend **API-nøkkel**.
4. **Supabase → Project Settings → Authentication → SMTP Settings** → skru på
   «Enable Custom SMTP» og fyll inn:
   - Sender email: `noreply@gdliga.no`
   - Sender name: `Gudbrandsdalen Discgolf Liga`
   - Host / Port / Username / Password fra steg 3
5. **Supabase → Authentication → URL Configuration:** sjekk at **Site URL** er
   `https://gdliga.no` og at `https://gdliga.no` står under **Redirect URLs**
   (samme liste som Google-innlogging bruker).
6. **Lagre og test:** utløs en «Glemt passord»-e-post og sjekk at avsender er
   `noreply@gdliga.no` og at lenken lander på gdliga.no.

### Hva jeg (Claude) ikke kan gjøre for deg
Opprette leverandørkonto, legge til DNS-poster og skrive inn SMTP-passord/API-nøkkel
i dashbordet krever dine egne kontoer og hemmeligheter — det må du gjøre selv.
Jeg har laget malene og denne oppskriften; si ifra hvis du vil ha hjelp til et
konkret steg (f.eks. nøyaktige DNS-poster for en valgt leverandør).
