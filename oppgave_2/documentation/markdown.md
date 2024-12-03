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