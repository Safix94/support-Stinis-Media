# Design Direction — Stinis Media Support Portal

Referentiestijl: `webfluencer.nl`
Let op: de stijl is inspiratie, geen kopie. Content, merk, tone of voice en visuele vertaling moeten Stinis Media zijn.

## 1. Visuele richting

De supportsite moet premium, rustig en duidelijk aanvoelen.

Belangrijke elementen uit de referentie:

- donkere hero-sectie
- grote typografie
- afgeronde kaarten
- zachte glassmorphism/blur overlays
- veel witruimte
- compacte pill-buttons
- subtiele labels in uppercase
- warme accentkleur voor primaire acties
- afwisseling tussen lichte en donkere secties

## 2. Stinis Media vertaling

Gebruik de sfeer van een high-end webdesignbureau, maar met een supportgerichte UX.

### Basisgevoel

- professioneel
- betrouwbaar
- snel
- kalm
- niet technisch intimiderend

### Kleurgebruik

Voorlopige richting:

- achtergrond licht: `#F5F3EF` of warm off-white
- tekst donker: `#111111`
- donkere secties: `#1E1E1C` / `#262626`
- kaartachtergrond: wit/off-white met zachte border
- accent: warm oranje/goud, bijvoorbeeld `#E58A2A`
- urgentie/noodgeval: rood/oranje, spaarzaam gebruiken

### Typografie

- Grote, krachtige headings
- Korte zinnen
- Kleine uppercase labels voor secties
- Formulierlabels duidelijk en functioneel

Voorbeeld headingstijl:

```text
SUPPORT VOOR JE WEBSITE
```

Grote hero:

```text
Meld snel een probleem met je website.
```

## 3. Layoutconcept

### Desktop

Hero in twee kolommen:

- links: heading, korte uitleg, kantooruren, urgentie-info
- rechts: compacte ticketstartkaart of volledige formulierkaart

Daaronder:

1. Waarvoor kan je support aanvragen?
2. Prioriteiten uitgelegd
3. Wat gebeurt er na je aanvraag?
4. Footer/contactgegevens

### Mobiel

- één kolom
- formulier snel bereikbaar bovenaan
- sticky CTA optioneel later
- uploads eenvoudig houden

## 4. Componenten

### Header

- Logo: Stinis Media
- Nav compact:
  - Support indienen
  - Kantooruren
  - Contact
- CTA button: `Ticket indienen`

### Hero

- Donkere rounded hero card
- Subtiele gradient/blur
- Grote headline
- Kleine trust/help tekst
- Formulierkaart rechts of onder hero

### Formulierkaart

- Grote afgeronde kaart
- Stapelbare velden
- Prioriteit als visuele keuzechips/cards
- Uploadzone met drag/drop of klik
- Duidelijke submit button

### Priority cards

- Normaal
- Dringend
- Noodgeval

Elke card bevat korte uitleg en voorbeelden.

### Footer

- Stinis Media
- Graanstraat 1, 2830 Willebroek
- VAT BE1027689561
- Kantooruren
- Privacy link

## 5. Copyrichting

Gebruik korte, praktische zinnen.

Goed:

> Voeg zoveel mogelijk context toe. Een screenshot helpt ons sneller begrijpen wat er misloopt.

Niet goed:

> Onze supportafdeling engageert zich tot een optimale digitale dienstverlening.

## 6. UX-principes

- Eén primaire actie: ticket indienen
- Geen afleiding
- Geen klantenlogin in v1
- Geen technische termen zonder uitleg
- Foutmeldingen moeten menselijk zijn
- Formulier mag niet verloren gaan bij validatiefout
- Uploads moeten duidelijk tonen wat toegevoegd is

## 7. Slogan-integratie

Subtiel gebruiken, niet als hoofdfocus:

> Gericht op vindbaarheid, gefocust op groei. Ook wanneer er iets vastloopt.
