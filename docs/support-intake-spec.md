# Support Intake Specificatie

Deze specificatie beschrijft het publieke ticketformulier op `support.stinismedia.com`.

## 1. Formuliervelden

### Verplicht

| Veld | Type | Validatie |
| --- | --- | --- |
| Voornaam | tekst | min. 2 tekens |
| E-mailadres | email | geldig e-mailadres |
| Telefoonnummer | tekst/tel | min. 6 tekens |
| Website URL | url | moet http(s) URL zijn of domein dat genormaliseerd kan worden |
| Type probleem | select | verplicht |
| Prioriteit | radio/cards | `normal`, `urgent`, `emergency` |
| Beschrijving | textarea | min. 20 tekens |
| Privacy akkoord | checkbox | verplicht |

### Optioneel

| Veld | Type | Opmerking |
| --- | --- | --- |
| Bedrijfsnaam | tekst | nuttig voor matching |
| Pagina URL | url | specifieke pagina waar het probleem zit |
| Browser | select/tekst | Chrome, Safari, Edge, Firefox, anders |
| Apparaat | select | desktop, mobiel, tablet |
| Gewenste deadline | datum | informatief, geen belofte |
| Bijlagen | file upload | screenshots/pdf/foto's |

## 2. Type probleem opties

- Website werkt niet
- Foutmelding of bug
- Formulier werkt niet
- Tekstaanpassing
- Afbeelding/content aanpassen
- Tracking/analytics probleem
- Snelheid/performance
- SEO/vindbaarheid
- E-mail/domein/hosting
- Andere vraag

## 3. Prioriteiten

Backend values:

```ts
type SupportPriority = "normal" | "urgent" | "emergency";
```

Labels:

- `normal` → Normaal
- `urgent` → Dringend
- `emergency` → Noodgeval

## 4. Uploadregels

V1-regels:

- max. 5 bestanden per ticket
- max. 10MB per bestand
- toegelaten types:
  - `image/jpeg`
  - `image/png`
  - `image/webp`
  - `application/pdf`
- niet toestaan:
  - `.zip`
  - `.exe`
  - `.php`
  - `.js`
  - `.html`
  - onbekende binary files

## 5. Veiligheid en anti-spam

V1 moet bevatten:

- server-side validatie
- honeypot field
- rate limiting per IP
- upload type/size validation
- normalisatie van bestandsnamen
- geen credentials/wachtwoorden vragen
- privacy checkbox

Later mogelijk:

- Cloudflare Turnstile
- domeinallowlist voor bestaande klanten
- magic link voor ticketstatus

## 6. Bevestigingsscherm

Na succesvolle indiening:

```text
Bedankt, je aanvraag is ontvangen.

Ticketnummer: SUP-2026-00124

We bekijken je melding tijdens onze kantooruren. Je ontvangt ook een bevestiging per e-mail.
```

## 7. Bevestigingsmail klant

Onderwerp:

```text
Ticket ontvangen: SUP-2026-00124 — Stinis Media Support
```

Inhoud:

```text
Dag [voornaam],

We hebben je supportaanvraag ontvangen.

Ticketnummer: [ticketnummer]
Website: [website]
Prioriteit: [prioriteit]
Type probleem: [type]

We bekijken je aanvraag tijdens onze kantooruren: maandag t.e.m. vrijdag van 09:00 tot 17:00.

Samenvatting:
[beschrijving]

Groeten,
Stinis Media
```

## 8. Interne notificatie

Onderwerp normaal/dringend:

```text
Nieuw supportticket: [ticketnummer] — [website]
```

Onderwerp noodgeval:

```text
🚨 Noodgeval supportticket: [ticketnummer] — [website]
```

Inhoud moet bevatten:

- ticketnummer
- prioriteit
- type probleem
- klantnaam
- e-mail
- telefoon
- website
- beschrijving
- link naar dashboardticket
