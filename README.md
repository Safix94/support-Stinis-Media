# Stinis Media Support Portal

Publieke supportwebsite voor klanten van Stinis Media, bedoeld voor `support.stinismedia.com`.

## Doel

Klanten moeten snel een supportticket kunnen indienen voor WordPress-websites, Vercel/Next.js-projecten, hosting, domeinen, formulieren, tracking, SEO, contentaanpassingen en bugs.

Het ticket moet automatisch terechtkomen in het interne Stinis Media dashboard onder **Support**.

## Fase 1 status

Fase 1 is uitgewerkt als functioneel en visueel plan:

- [`docs/phase-1-support-portal-plan.md`](docs/phase-1-support-portal-plan.md)
- [`docs/design-direction.md`](docs/design-direction.md)
- [`docs/support-intake-spec.md`](docs/support-intake-spec.md)
- [`docs/dashboard-support-spec.md`](docs/dashboard-support-spec.md)
- [`docs/wireframes/support-home.md`](docs/wireframes/support-home.md)

## Aanbevolen technische richting

- Publieke supportsite: Next.js op Vercel
- Subdomein: `support.stinismedia.com`
- Backend/datastore: gedeelde Convex omgeving met het Stinis dashboard
- Dashboard-integratie: `/support` route in het bestaande dashboard
- Uploads: veilige storage via backend, niet publiek indexeerbaar
- E-mail: bevestiging naar klant + interne notificatie naar Stinis Media

## Niet in v1

- Geen klantenlogin
- Geen volledige Zendesk/Freshdesk-kloon
- Geen chatfunctie
- Geen credentials/wachtwoorden via formulier
- Geen complexe SLA-engine

Eerst intake → dashboard → opvolging. Daarna pas statusportaal/login/SLA-uitbreidingen.
