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

### Sider

| URL                             | Beskrivelse                                                                             |
|---------------------------------|-----------------------------------------------------------------------------------------|
| **`/`**                         | Hovedside, viser alle arrangementer. Bruker kan melde på arrangement, admin kan slette. |
| **`/opprett-mal/`**             | Side for opprettelse av maler, kun tilgjengelig som admin.                              |
| **`/opprett-arrangement/`**     | Side for opprettelse av arrangementer, kun tilgjengelig for admin.                      |
| **`/endre-arrangement/:id`**    | Side for oppdatering av arrangement, kun tilgjengelig for admin.                        |
| **`/events/:id`**               | Side for visning av et spesifikt arrangement.                                           |
| **`/events/:id/join/:ticketid`**| Side for å legge til personer til et spesifikt arrangement og billettype.               |