# Support Portal + Dashboard — A tot Z Implementatieplan

> **Voor Hermes/Alex:** voer dit plan autonoom uit. Karsten is weg en wil een werkend product: publieke supportsite, Convex backend, dashboard `/support`, ticketopvolging, toewijzing, statussen en interne notities/chat. Gebruik shadcn/ui waar relevant.

**Goal:** Bouw `support.stinismedia.com` als werkende klant-intake en koppel elk ticket aan het Stinis dashboard onder `/support`.

**Architecture:** De publieke supportsite is een aparte Next.js/Vercel app in `support-Stinis-Media`. De interne verwerking gebeurt in het bestaande dashboardproject via Convex. De supportsite gebruikt Convex mutations/actions om tickets, bijlagen en reacties te schrijven; het dashboard leest en beheert dezelfde data.

**Tech Stack:** Next.js, React, TypeScript, Tailwind CSS, shadcn/ui, Convex, Vercel, bestaande Stinis dashboard/Clerk omgeving.

---

## Fase 0 — Repo- en omgevingcheck

**Doel:** zeker zijn dat beide projecten proper staan voor development.

**Acties:**

1. Inspecteer `C:/Users/Alexs/projects/support-Stinis-Media`.
2. Inspecteer `C:/Users/Alexs/projects/dashboard`.
3. Controleer Git status in beide repos.
4. Laat ongerelateerde untracked dashboardbestanden ongemoeid.
5. Gebruik bestaande GitHub/Vercel-auth via `gh`/`vercel`.

**Acceptatie:**

- Beide projecten zijn lokaal beschikbaar.
- Er is duidelijk welke bestanden geraakt worden.
- Er wordt niets per ongeluk meegenomen uit tijdelijke dashboardbestanden.

---

## Fase 1 — Publieke supportsite ombouwen naar echte Next.js app

**Doel:** de statische placeholder vervangen door een onderhoudbare Next.js app met shadcn/ui look-and-feel.

**Support repo files:**

- `package.json`
- `next.config.ts`
- `tsconfig.json`
- `postcss.config.mjs`
- `components.json`
- `src/app/layout.tsx`
- `src/app/page.tsx`
- `src/app/globals.css`
- `src/components/ui/*`
- `src/components/support/support-form.tsx`
- `src/lib/utils.ts`
- `src/lib/support-options.ts`

**Acties:**

1. Scaffold Next.js App Router met TypeScript.
2. Installeer Tailwind/shadcn basisdependencies.
3. Voeg shadcn/ui componenten toe: `button`, `card`, `input`, `textarea`, `select`, `radio-group`, `badge`, `label`, `separator`, `alert`.
4. Herbouw de huidige visuele MVP als React componenten.
5. Gebruik Stinis/Webfluencer-geïnspireerde stijl: donkere hero, afgeronde kaarten, warme accentkleur, premium spacing.
6. Maak formulierstate client-side met duidelijke validatiefouten.
7. Behoud copy over kantooruren en prioriteiten.

**Acceptatie:**

- `npm run lint` slaagt.
- `npm run build` slaagt.
- Homepage toont formulier, prioriteiten, kantooruren en proces.
- Geen 404 op Vercel.

---

## Fase 2 — Convex support backend in dashboard

**Doel:** database en backendfuncties bouwen in het dashboardproject, omdat het dashboard de bron van waarheid is.

**Dashboard files:**

- `convex/schema.ts`
- `convex/support.ts`
- eventueel `convex/http.ts` of bestaande publieke action/mutation structuur

**Datamodel:**

### `supportTickets`

- `ticketNumber`
- `firstName`
- `companyName?`
- `email`
- `phone`
- `websiteUrl`
- `pageUrl?`
- `issueType`
- `priority`: `normal | urgent | emergency`
- `status`: `new | in_progress | waiting_for_customer | planned | resolved | closed`
- `description`
- `browser?`
- `device?`
- `source`: `support_portal`
- `assignedTo?`
- `assignedToName?`
- `relatedClientId?`
- `relatedProjectId?`
- `createdAt`
- `updatedAt`
- `resolvedAt?`

### `supportAttachments`

- `ticketId`
- `fileName`
- `storageId?`
- `mimeType`
- `size`
- `uploadedAt`

### `supportComments`

- `ticketId`
- `type`: `internal_note | customer_reply | status_change | assignment_change | system`
- `body`
- `authorType`: `customer | team | system`
- `authorName?`
- `createdAt`

**Acties:**

1. Voeg schema-tabellen en indexes toe.
2. Bouw publieke mutation `createPublicTicket` met server-side validatie.
3. Genereer ticketnummers zoals `SUP-YYYY-00001`.
4. Bouw queries:
   - `listTickets`
   - `getTicket`
   - `listTicketComments`
   - `getSupportSummary`
5. Bouw mutations:
   - `updateTicketStatus`
   - `assignTicket`
   - `addInternalComment`
   - `addCustomerComment` indien nuttig voor publieke follow-up later
6. Voeg basis anti-spam toe waar haalbaar: honeypotveld + minimale validatie.

**Acceptatie:**

- Convex codegen/build slaagt.
- Testticket kan via mutation aangemaakt worden.
- Ticket is via dashboardquery zichtbaar.
- Status, toewijzing en interne notitie werken.

---

## Fase 3 — Dashboard Support module

**Doel:** Stinis team kan tickets behandelen zonder database/CLI.

**Dashboard files:**

- `src/app/(dashboard)/support/page.tsx`
- `src/app/(dashboard)/support/[ticketId]/page.tsx`
- `src/components/support/support-ticket-list.tsx`
- `src/components/support/support-ticket-detail.tsx`
- `src/components/support/support-comments.tsx`
- `src/components/support/support-status-select.tsx`
- `src/components/support/support-assignee-select.tsx`
- `src/components/layout/sidebar*` of bestaande nav config

**Acties:**

1. Voeg sidebar item `Support` toe.
2. Bouw `/support` met KPI cards:
   - Nieuwe tickets
   - Noodgevallen
   - In behandeling
   - Wacht op klant
3. Bouw filters:
   - status
   - prioriteit
   - type probleem
   - zoek op ticketnummer/naam/e-mail/website
4. Maak volledige ticketrij/kaart klikbaar.
5. Bouw detailpagina met:
   - klantgegevens
   - websitegegevens
   - probleemomschrijving
   - status select
   - medewerker/toewijzing select/input
   - interne notities/chat
   - tijdlijn
6. Gebruik shadcn/ui componenten voor cards, badges, selects, buttons, textarea.

**Acceptatie:**

- `/support` is zichtbaar in de dashboardnavigatie.
- Tickets verschijnen in lijst.
- Klik op volledige kaart opent detail.
- Status wijzigen werkt.
- Ticket toewijzen werkt.
- Interne notitie/chatbericht toevoegen werkt.

---

## Fase 4 — Publieke supportsite koppelen aan Convex

**Doel:** klant kan echt een ticket indienen vanaf `support.stinismedia.com`.

**Support repo files:**

- `src/lib/convex.ts`
- `src/components/support/support-form.tsx`
- `.env.example`

**Acties:**

1. Voeg Convex client toe in supportsite.
2. Gebruik publieke `createPublicTicket` mutation.
3. Valideer formulier client-side en server-side.
4. Toon success state met ticketnummer.
5. Toon duidelijke foutmelding bij mislukking.
6. Laat uploadveld visueel bestaan; als echte storage in deze fase niet haalbaar is, blokkeer upload niet maar communiceer tijdelijk dat bijlagen in fase 5 actief worden. Voorkeur blijft echte upload als Convex storage snel veilig kan.

**Acceptatie:**

- Ingevuld formulier maakt echt ticket aan.
- Ticketnummer verschijnt op de supportsite.
- Ticket is zichtbaar in dashboard `/support`.

---

## Fase 5 — Bijlagen en notificaties

**Doel:** supportaanvragen operationeel bruikbaar maken.

**Acties:**

1. Implementeer veilige uploadflow met limieten:
   - max. 5 bestanden
   - max. 10MB per bestand
   - jpg/png/webp/pdf
2. Koppel attachments aan ticket.
3. Toon bijlagen in dashboarddetail.
4. Voeg e-mail of interne notificatie toe indien bestaande provider/env beschikbaar is.
5. Als e-mailprovider ontbreekt: leg dit expliciet vast in README/env en zorg dat dashboardflow wel volledig werkt.

**Acceptatie:**

- Bijlagen worden bewaard of gecontroleerd geblokkeerd met duidelijke melding.
- Dashboard toont attachment metadata/downloadlink indien actief.
- Nieuwe tickets zijn operationeel zichtbaar voor Stinis.

---

## Fase 6 — Deploy, productiecheck en handoff

**Doel:** alles staat live en is testbaar.

**Acties:**

1. Run in support repo:
   - `npm run lint`
   - `npm run build`
2. Run in dashboard repo:
   - `npm run lint`
   - `npm run build`
   - Convex deploy/codegen waar nodig
3. Push beide repos naar GitHub.
4. Controleer Vercel deployment supportsite.
5. Controleer dashboard deployment/route.
6. Doe E2E smoke test:
   - ticket indienen
   - ticketnummer krijgen
   - dashboard `/support` openen
   - ticket bekijken
   - status wijzigen
   - toewijzen
   - interne notitie toevoegen
7. Stuur Telegram wanneer klaar met links en testresultaten.

**Acceptatie:**

- Werkende supportsite.
- Werkende dashboard supportmodule.
- Echte Convex dataflow.
- GitHub remote refs geverifieerd.
- Karsten krijgt Telegram-update met resultaat.

---

## Risico's / beslissingen

1. **DNS:** `support.stinismedia.com` vereist bij Combell nog `A support 76.76.21.21` als dit niet gedaan is.
2. **E-mailprovider:** alleen implementeren als bestaande provider/env beschikbaar is. Anders niet faken.
3. **Uploads:** veilig implementeren of tijdelijk gecontroleerd uitschakelen; nooit onveilige uploadtypes toelaten.
4. **Auth:** publieke intake blijft loginloos; dashboard blijft intern achter bestaande dashboardauth.
5. **Scopebewaking:** geen Zendesk-kloon bouwen; v1 focust op intake, opvolging, status, toewijzing en interne notities.

---

## Klaar-definitie

Het project is klaar wanneer Karsten kan:

1. Naar de supportsite gaan.
2. Een supportticket indienen.
3. In het dashboard naar `/support` gaan.
4. Het ticket zien.
5. Het ticket aan een medewerker toewijzen.
6. De status aanpassen.
7. Interne notities/chatberichten toevoegen.
8. Het ticket later terugvinden en opvolgen.
