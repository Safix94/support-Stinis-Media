# Fase 1 — Support Portal Plan

Datum: 2026-06-09
Project: Stinis Media Support Portal
Domein: `support.stinismedia.com`

## 1. Doel van fase 1

Fase 1 legt vast wat er gebouwd moet worden voordat development start:

- supportflow
- verplichte velden
- prioriteiten
- statussen
- dashboardstructuur
- visuele richting
- basiscontent voor de publieke pagina
- acceptatiecriteria voor fase 2/3/4

## 2. Kernbeslissing

Bouw dit als een aparte publieke supportwebsite die tickets wegschrijft naar dezelfde backend/datalaag als het Stinis dashboard.

**Aanbevolen architectuur:**

```text
Klant
  ↓
support.stinismedia.com
  ↓
Publieke ticket mutation/action
  ↓
Convex/support backend
  ↓
Stinis Dashboard > Support
  ↓
Team opvolging + klantcommunicatie
```

## 3. Scope MVP

### Publieke supportsite

- Landing/supportpagina
- Ticketformulier
- Screenshot/bijlage upload
- Prioriteitskeuze
- Kantooruren
- Bevestigingspagina met ticketnummer
- Bevestigingsmail naar klant

### Dashboard

- `/support` overzicht
- Ticketlijst met filters
- Ticketdetailpagina
- Status wijzigen
- Prioriteit tonen
- Interne notities
- Bijlagen bekijken

### Automatisatie

- Nieuw ticket automatisch in dashboard
- Interne notificatie naar Stinis Media
- Bevestigingsmail naar klant

## 4. Buiten scope v1

- klantenlogin
- publieke ticketstatuspagina
- chat/live support
- SLA-engine per contract
- facturatieflow
- automatische WordPress-plugin
- AI-triage
- credentials uploaden of opslaan

## 5. Gebruikersflow

1. Klant gaat naar `support.stinismedia.com`.
2. Klant leest kort waarvoor het formulier dient.
3. Klant vult contactgegevens en website in.
4. Klant kiest type probleem en prioriteit.
5. Klant beschrijft het probleem.
6. Klant voegt optioneel screenshot/bijlage toe.
7. Klant vinkt privacy/gegevensverwerking aan.
8. Klant dient ticket in.
9. Systeem maakt ticketnummer aan.
10. Klant ziet bevestiging en krijgt e-mail.
11. Dashboard toont nieuw ticket onder Support.
12. Team behandelt ticket via dashboard.

## 6. Prioriteiten

### Normaal

Voor gewone vragen, kleine bugs en contentaanpassingen.

Voorbeelden:

- tekst wijzigen
- afbeelding vervangen
- kleine visuele fout
- vraag over SEO/content

### Dringend

Voor problemen die leads, klanten of campagnes merkbaar kunnen beïnvloeden.

Voorbeelden:

- contactformulier werkt niet
- campagnepagina geeft fout
- tracking werkt niet tijdens lopende campagne
- belangrijke pagina toont fout op mobiel

### Noodgeval

Voor echte blokkades of veiligheidsproblemen.

Voorbeelden:

- website offline
- checkout werkt niet
- homepage toont kritieke fout
- mogelijke hack/security issue
- domein/hosting probleem waardoor site niet bereikbaar is

**Belangrijke copy op site:**

> Een ticket met prioriteit “Noodgeval” wordt sneller bekeken, maar betekent geen automatische 24/7 support tenzij dit contractueel is afgesproken.

## 7. Kantooruren

Te tonen op de supportwebsite:

> Maandag t.e.m. vrijdag: 09:00 – 17:00
> Gesloten tijdens weekends en feestdagen.

Extra nuance:

> Tickets kunnen altijd ingediend worden. Nieuwe aanvragen worden tijdens de kantooruren bekeken. Voor dringende problemen kies je “Dringend” of “Noodgeval”.

## 8. Success criteria fase 1

Fase 1 is klaar wanneer:

- alle intakevelden zijn vastgelegd
- prioriteiten en statussen zijn vastgelegd
- dashboardmodule functioneel beschreven is
- visuele richting helder genoeg is voor design/dev
- MVP-scope en niet-MVP-scope duidelijk zijn
- repo bevat documentatie waarmee fase 2 kan starten

## 9. Aanbevolen volgende fase

Start met fase 2: backend/datamodel.

Waarom: als de publieke site eerst live staat zonder dashboardverwerking, creëert dat operationele ruis. Eerst de machinekamer, daarna de voordeur.
