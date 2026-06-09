# Roadmap — Stinis Media Support Portal

## Fase 1 — Plan en scope

Status: uitgewerkt.

Output:

- functioneel plan
- intake specificatie
- dashboard specificatie
- designrichting
- wireframe

## Fase 2 — Backend/datamodel

Doel: supporttickets technisch kunnen ontvangen en opslaan.

Taken:

- Convex schema toevoegen
- publieke ticket create action/mutation
- ticketnummer generator
- upload handling
- server-side validatie
- rate limiting/honeypot
- queries voor dashboard
- status/comment mutations

## Fase 3 — Dashboard UI

Doel: tickets behandelen in het Stinis dashboard.

Taken:

- `/support` route
- sidebar item
- ticketlijst
- filters/quick filters
- detailpagina
- status updates
- interne notities
- bijlagen tonen

## Fase 4 — Publieke supportsite

Doel: klant kan ticket indienen op `support.stinismedia.com`.

Taken:

- Next.js site/app route
- hero en contentsecties
- formulier
- uploadcomponent
- succespagina
- responsive styling
- privacy/kantooruren

## Fase 5 — E-mail en notificaties

Doel: klant en team krijgen duidelijke communicatie.

Taken:

- bevestigingsmail klant
- interne mail Stinis
- aparte noodgevalmelding
- mail logging

## Fase 6 — Deployment en QA

Doel: live en betrouwbaar.

Taken:

- Vercel project
- DNS `support.stinismedia.com`
- env vars
- productie smoke tests
- mobiel/desktop QA
- testtickets met en zonder bijlagen

## Fase 7 — V2 uitbreidingen

Mogelijkheden:

- magic link ticketstatus
- klantenlogin
- SLA per contract
- automatische klant/project matching
- AI-samenvatting en labels
- WordPress support plugin
- taken automatisch genereren uit tickets
