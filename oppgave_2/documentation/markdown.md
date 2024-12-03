# Dokumentasjon

## Oppgave 1

### API-endepunkter
Her er en oversikt over API-endepunktene og deres funksjonalitet.

| Metode | URL                             | Beskrivelse                                                                                   |
|--------|---------------------------------|-----------------------------------------------------------------------------------------------|
| GET    | **`/events`**                   | Henter alle arrangementer.                                                                    |
| GET    | **`/events/:id`**               | Henter et spesifikt arrangement basert på ID.                                                 |
| POST   | **`/events`**                   | Oppretter et nytt arrangement.                                                                |
| PUT    | **`/events/:id`**               | Oppdaterer et spesifikt arrangement basert på ID.                                             |
| DELETE | **`/events/:id`**               | Sletter et spesifikt arrangement basert på ID.                                                |
| POST   | **`/events/:id/join/:ticketid`**| Legger til personer til et spesifikt arrangement og billettype basert på ID og billettype-ID. |
| GET    | **`/mals`**                     | Henter alle maler.                                                                            |
| POST   | **`/mals`**                     | Oppretter en ny mal.                                                                          |

#### GET `/events`
- **Beskrivelse:** Henter alle arrangementer.
- **Respons:** 
  - **200:** Returnerer en liste over arrangementer.
  - **500:** Feil ved uthenting av data.

#### GET `/events/:id`
- **Beskrivelse:** Henter et spesifikt arrangement basert på ID.
- **Respons:** 
  - **200:** Returnerer arrangementet.
  - **404:** Arrangementet ble ikke funnet.
  - **500:** Feil ved uthenting av data.

#### POST `/events`
- **Beskrivelse:** Oppretter et nytt arrangement.
- **Respons:** 
  - **201:** Arrangementet ble opprettet.
  - **400:** Ugyldig data.
  - **500:** Feil ved opprettelse av data.

#### PUT `/events/:id`
- **Beskrivelse:** Oppdaterer et spesifikt arrangement basert på ID.
- **Respons:** 
  - **200:** Arrangementet ble oppdatert.
  - **404:** Arrangementet ble ikke funnet.
  - **400:** Ugyldig data.
  - **500:** Feil ved oppdatering av data.

#### DELETE `/events/:id`
- **Beskrivelse:** Sletter et spesifikt arrangement basert på ID.
- **Respons:** 
  - **200:** Arrangementet ble slettet.
  - **404:** Arrangementet ble ikke funnet.
  - **500:** Feil ved sletting av data.

#### POST `/events/:id/join/:ticketid`
- **Beskrivelse:** Legger til personer til et spesifikt arrangement og billettype basert på ID og billettype-ID.
- **Respons:** 
  - **200:** Personene ble lagt til.
  - **404:** Arrangementet eller billettypen ble ikke funnet.
  - **400:** Ugyldig data eller ingen ledige plasser.
  - **500:** Feil ved oppdatering av data.

#### GET `/mals`
- **Beskrivelse:** Henter alle maler.
- **Respons:** 
  - **200:** Returnerer en liste over maler.
  - **500:** Feil ved uthenting av data.

#### POST `/mals`
- **Beskrivelse:** Oppretter en ny mal.
- **Respons:** 
  - **201:** Malen ble opprettet.
  - **400:** Ugyldig data.
  - **500:** Feil ved opprettelse av data.

### Sider

| URL                             | Beskrivelse                                                                             |
|---------------------------------|-----------------------------------------------------------------------------------------|
| **`/`**                         | Hovedside, viser alle arrangementer. Bruker kan melde på arrangement, admin kan slette. |
| **`/opprett-mal/`**             | Side for opprettelse av maler, kun tilgjengelig som admin.                              |
| **`/opprett-arrangement/`**     | Side for opprettelse av arrangementer, kun tilgjengelig for admin.                      |
| **`/endre-arrangement/:id`**    | Side for oppdatering av arrangement, kun tilgjengelig for admin.                        |
| **`/events/:id`**               | Side for visning av et spesifikt arrangement.                                           |
| **`/events/:id/join/:ticketid`**| Side for å legge til personer til et spesifikt arrangement og billettype.               |

### Filtrering
Arrangementer sorteres først på år og måned, og så på type etter hva som søkes på. Filtreringen skjer ved at brukeren skriver inn en søketekst i et input-felt. Arrangementene blir deretter filtrert basert på om arrangementstypen inneholder søketeksten (case-insensitive).

### Opprette / Gjenbruke en Mal

For å opprette og gjenbruke en mal i applikasjonen, følg disse trinnene:

#### Opprette en Mal

Naviger til Opprett Mal-siden:

1. Gå til `/opprett-mal` siden i applikasjonen.

2. Fyll ut Mal-skjemaet:

- **Navn på mal:** Skriv inn et navn for malen.
- **Tillat arrangementer på samme dag:** Kryss av hvis arrangementer kan holdes på samme dag.
- **Hvilke Dager:** Velg hvilke dager arrangementene kan holdes.
- **Fast pris:** Kryss av hvis prisen skal være fast, og skriv inn prisen.
- **Begrenset antall plasser:** Kryss av hvis det er begrenset antall plasser, og skriv inn antall plasser.
- **Venteliste:** Kryss av hvis det skal være venteliste.
- **Privat:** Kryss av hvis arrangementet skal være privat.

3. Lagre Malen:

- Klikk på "Lagre Mal" knappen for å lagre malen.
- Malen blir sendt til backend via en POST-forespørsel til `/mals` endepunktet.

#### Gjenbruke en Mal

Naviger til Opprett Arrangement-siden:

1. Gå til `/opprett-arrangement` siden i applikasjonen.

2. Velg en Mal:

- Velg en eksisterende mal fra listen over tilgjengelige maler.
- Malen blir brukt til å forhåndsutfylle arrangementsskjemaet med informasjonen fra malen.

3. Tilpass Arrangementet:

- Gjør eventuelle nødvendige endringer i arrangementsskjemaet.
- Fyll ut eventuelle tilleggskrav som ikke er dekket av malen.

4. Lagre Arrangementet:

- Klikk på "Lagre Arrangement" knappen for å lagre arrangementet.
- Arrangementet blir sendt til backend via en POST-forespørsel til `/events` endepunktet.

### Datamodeller

#### Event
```typescript
interface Event {
  id: string;
  title: string;
  date: string;
  type: string;
  description: string;
  location: string;
  tickets: Ticket[];
}

interface Ticket {
  price: number;
  type: string;
  availableSeats: number;
  person: Person[];
}

interface Person {
  name: string;
  telephone: string;
}

interface Mal {
  id: string;
  title: string;
  eventOnSameDay: boolean;
  selectedWeekdays: string[];
  lockedPrice: boolean;
  price: number;
  limitedAvailability: boolean;
  availableSeats: number;
  waitingList: boolean;
  private: boolean;
}
```

#### Database Modell
```sql
CREATE TABLE events (
  id VARCHAR PRIMARY KEY,
  title VARCHAR,
  date TIMESTAMP,
  type VARCHAR,
  description TEXT,
  location VARCHAR
);

CREATE TABLE tickets (
  id SERIAL PRIMARY KEY,
  event_id VARCHAR REFERENCES events(id),
  price NUMERIC,
  type VARCHAR,
  availableSeats INTEGER
);

CREATE TABLE persons (
  id SERIAL PRIMARY KEY,
  ticket_id INTEGER REFERENCES tickets(id),
  name VARCHAR,
  telephone VARCHAR
);

CREATE TABLE mals (
  id VARCHAR PRIMARY KEY,
  title VARCHAR,
  eventOnSameDay BOOLEAN,
  selectedWeekdays TEXT[],
  lockedPrice BOOLEAN,
  price NUMERIC,
  limitedAvailability BOOLEAN,
  availableSeats INTEGER,
  waitingList BOOLEAN,
  private BOOLEAN
);
```