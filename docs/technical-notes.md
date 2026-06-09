# Technical Notes

## Aanbevolen stack

- Next.js voor publieke supportsite
- Vercel voor hosting
- Convex voor tickets/backoffice-data
- Bestaande Stinis dashboard als interne behandelomgeving
- E-mailprovider later bepalen op basis van bestaande dashboard setup

## Repo-opmerking

Deze repo bevat in fase 1 nog geen applicatiecode. De eerste commit is bewust documentatie-first zodat de scope en UX vastliggen voor development start.

## Mogelijke implementatie-opties

### Optie A — aparte publieke app

Voordelen:

- duidelijke scheiding publiek/intern
- eigen Vercel project en subdomein
- eenvoudiger styling rond support

Nadeel:

- moet gedeelde backend/API correct koppelen

### Optie B — route binnen dashboard app

Voordelen:

- minder repositories/apps
- directe toegang tot bestaande code

Nadeel:

- publiek/intern sneller door elkaar
- auth en publieke routes kunnen complexer worden

## Aanbeveling

Gebruik optie A voor `support.stinismedia.com`, met gedeelde Convex/backendkoppeling naar het dashboard.

## Security notes

- Geen credentials vragen of opslaan.
- Uploads nooit rechtstreeks publiek indexeerbaar maken.
- Server-side validatie is verplicht.
- Rate limiting en honeypot zijn minimumvereisten.
- Later eventueel Cloudflare Turnstile toevoegen.
