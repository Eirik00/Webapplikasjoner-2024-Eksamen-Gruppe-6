# Dokumentasjon 
## Oppgave 1

### API-endepunkter
Her er en oversikt over API-endepunktene og deres funksjonalitet.

| Endepunkt                        | Beskrivelse                                                            |
|----------------------------------|------------------------------------------------------------------------|
| **`/kurs`**                      | Henter alle kurs.                                                      |
| **`/kurs/:slug`**                | Henter informasjon om et spesifikt kurs.                               |
| **`/kurs/:slug/leksjoner`**      | Håndterer opprettelse og henting av leksjoner tilknyttet et kurs.      |
| **`/leksjoner/:id/kommentarer`** | Håndterer opprettelse og henting av kommentarer tilknyttet en leksjon. |
| **`/kategorier`**                | Henter tilgjengelige kategorier.                                       |


### Sider

| URL                         | Beskrivelse                                                       |
|-----------------------------|-------------------------------------------------------------------|
| **`/kurs`**                 | Viser alle kurs. Bruker API-et `/kurs` for å hente kursdata.      |
| **`/kurs/:slug`**           | Viser detaljer for et kurs.                                       |
| **`/kurs/:slug/leksjoner`** | Viser leksjoner for et kurs.                                      |
| **`/leksjoner/:id`**        | Viser kommentarer for en leksjon.                                 |
| **`/ny`**                   | Opprett et nytt kurs. Bruker API-et `/kurs` for å laste opp data. |
