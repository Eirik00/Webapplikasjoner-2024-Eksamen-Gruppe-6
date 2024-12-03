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

