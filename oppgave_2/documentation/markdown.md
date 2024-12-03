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

#### GET 
Denne skal brukes til å hente ut informasjon. Det vil da gi en repsons 200 med json knyttet til informasjonen ønsket.
Hvis det ikke skulle finnes informasjon tilknyttet vil det gis et 404, om det er feil med uthenting vil det gis 500

#### POST 
Denne brukes til å sende/legge til informasjon i databasen/api-et. Det vil trenge et json dokument tilsendt i protokollen, om det er gyldig vil det sendes 201 repsons tilbake for å signalisere at backend mottokk dataen som ble sendt. Om dataen ikke er formatert riktig så sendes det en 400 kode, og om det skjer noe galt på backenden så sendes det 500

#### DELETE 
Denne skal brukes til å fjærne data fra databasen/api-et. Det vil trenge informasjon angående hva som skal slettes, i form av en id f.eks. Blir dataen slettet korrekt gir det en 200 repsons. Er det feil referat til data gir det 404 respons og er det en feil på backend så blir det en 500 respons.

#### PUT 
Denne skal brukes til å oppdatere informasjon på databasen/api-et. Det vil trenge json data samt en identifikator til hva slags data som skal endres. Om allt er gyldig så blir det sendt en 200 repsons. Er det feil formatert data eller at referansen ikke viser til noe data så blir det sendt 404 response og er det noe feil med backend så blir det en 500 respons

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
Arrangementer sorteres først på år og måned, og så på type etter hva som søkes på.

### Datamodellen

<<<<<<< Updated upstream
=======
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
>>>>>>> Stashed changes
