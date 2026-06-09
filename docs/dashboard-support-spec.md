# Dashboard Support Specificatie

Deze specificatie beschrijft de interne dashboardmodule voor supporttickets.

## 1. Route en navigatie

Nieuwe dashboardroute:

```text
/support
```

Sidebar label:

```text
Support
```

Detailroute:

```text
/support/[ticketId]
```

## 2. Ticketstatussen

Backend values:

```ts
type SupportTicketStatus =
  | "new"
  | "in_progress"
  | "waiting_for_customer"
  | "planned"
  | "resolved"
  | "closed";
```

Labels:

- `new` → Nieuw
- `in_progress` → In behandeling
- `waiting_for_customer` → Wacht op klant
- `planned` → Gepland
- `resolved` → Opgelost
- `closed` → Gesloten

## 3. Overzichtspagina

### Bovenaan

- titel: Support
- korte intro: `Nieuwe aanvragen van klanten via support.stinismedia.com`
- KPI cards:
  - Nieuwe tickets
  - Noodgevallen
  - In behandeling
  - Wacht op klant

### Filters

- zoekveld: naam, e-mail, website, ticketnummer
- statusfilter
- prioriteitsfilter
- type probleem filter
- datumfilter later optioneel

### Tabs/quick filters

- Nieuw
- Noodgevallen
- In behandeling
- Wacht op klant
- Opgelost
- Alle tickets

## 4. Ticketkaart/tabelrij

Elke ticketkaart toont:

- ticketnummer
- prioriteit badge
- status badge
- website URL
- naam klant
- e-mail
- telefoon
- type probleem
- korte beschrijving
- aangemaakt op
- bijlagen indicator
- toegewezen aan

UX-regel:

> De volledige ticketkaart/rij moet klikbaar zijn en de detailpagina openen. Actieknoppen/selects stoppen event propagation.

## 5. Detailpagina

### Header

- ticketnummer
- status
- prioriteit
- aangemaakt op
- laatste update
- quick actions:
  - status wijzigen
  - toewijzen
  - markeer opgelost

### Blokken

1. Klantgegevens
2. Websitegegevens
3. Probleemomschrijving
4. Bijlagen
5. Interne notities
6. Communicatiegeschiedenis
7. Tijdlijn/system events
8. Gerelateerde klant/project/deal indien matchbaar

## 6. Datamodel voorstel

### supportTickets

```ts
{
  ticketNumber: string;
  firstName: string;
  companyName?: string;
  email: string;
  phone: string;
  websiteUrl: string;
  pageUrl?: string;
  issueType: string;
  priority: "normal" | "urgent" | "emergency";
  status: "new" | "in_progress" | "waiting_for_customer" | "planned" | "resolved" | "closed";
  description: string;
  browser?: string;
  device?: "desktop" | "mobile" | "tablet" | "unknown";
  source: "support_portal";
  assignedTo?: string;
  relatedClientId?: string;
  relatedProjectId?: string;
  createdAt: number;
  updatedAt: number;
  resolvedAt?: number;
  lastCustomerEmailAt?: number;
  lastInternalActivityAt?: number;
}
```

### supportAttachments

```ts
{
  ticketId: Id<"supportTickets">;
  fileName: string;
  storageId: Id<"_storage">;
  mimeType: string;
  size: number;
  uploadedAt: number;
}
```

### supportComments

```ts
{
  ticketId: Id<"supportTickets">;
  type: "internal_note" | "customer_reply" | "status_change" | "system";
  body: string;
  authorType: "customer" | "team" | "system";
  authorName?: string;
  createdAt: number;
}
```

## 7. Acceptatiecriteria fase 2/3

- Een ticket kan backendmatig aangemaakt worden.
- Ticket krijgt uniek ticketnummer.
- Ticket verschijnt in `/support`.
- Ticketdetail opent via volledige klikbare kaart/rij.
- Status kan aangepast worden.
- Interne notitie kan toegevoegd worden.
- Bijlagen zijn zichtbaar.
- Noodgevallen vallen duidelijk op.
