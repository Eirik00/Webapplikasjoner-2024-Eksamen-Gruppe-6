import { Hono } from 'hono';
import Database from 'better-sqlite3';
import { cors } from "hono/cors";
import { serve } from '@hono/node-server';
import { port } from "./../config/index";


const app = new Hono();
const db = new Database(process.env.DB_PATH || './database.sqlite');
app.use("/*", cors());

// Initialiserer databasen og lager kurs, leksjoner og kommentarer tables
const initDb = () => {
  try {
  db.exec(`
    CREATE TABLE IF NOT EXISTS kurs (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title VARCHAR(256) NOT NULL,
      slug VARCHAR(256) NOT NULL,
      description VARCHAR(256) NOT NULL,
      category VARCHAR(256)
    );

    CREATE TABLE IF NOT EXISTS leksjoner (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      kurs_id INTEGER NOT NULL,
      title VARCHAR(256) NOT NULL,
      slug VARCHAR(256) NOT NULL,
      description VARCHAR(256) NOT NULL,
      text JSON
    );

    CREATE TABLE IF NOT EXISTS kommentarer (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      leksjon_id INTEGER,
      created_by VARCHAR(256),
      comment VARCHAR(256)
    );
  `);
  } catch (error) {
  console.error("Feil ved initialisering av databasen:", error);
  }
};

initDb();

// Oppretter kurs med tittel og kategori
app.post('/kurs', async (c) => {
  try {

    const { title, category } = await c.req.json();

    if (!title || typeof title !== 'string') {
      return c.json({ error: 'Ugyldig tittel' }, 400);
    }

    const stmt = db.prepare('INSERT INTO kurs (title, category) VALUES (?, ?)');
    const result = stmt.run(title, category);
    return c.json({ id: result.lastInsertRowid });

  } catch (error) {
    console.error('Feil ved opprettelse av kurs:', error);
    return c.json({ error: 'Kunne ikke opprette kurs' }, 500);
  }
});

// Henter kurs fra databasen
app.get('/kurs', (c) => {
  try {

    const stmt = db.prepare('SELECT * FROM kurs');
    const kursList = stmt.all();
    return c.json(kursList);

  } catch (error) {
    console.error('Feil ved henting av kurs:', error);
    return c.json({ error: 'Kunne ikke hente kurs' }, 500);
  }
});


// Legger til leksjon for et spesifikt kurs
app.post('/kurs/:id/leksjoner', async (c) => {
  const kursId = Number(c.req.param('id'));
  const { title } = await c.req.json();

  if (!title) {
    return c.json({ error: 'Tittel er påkrevd' }, 400);
  }

  const stmt = db.prepare('INSERT INTO leksjoner (kurs_id, title) VALUES (?, ?)');
  const result = stmt.run(kursId, title);
  return c.json({ id: result.lastInsertRowid });
});

// Henter leksjoner for et bestemt kurs
app.get('/kurs/:id/leksjoner', (c) => {
  const kursId = Number(c.req.param('id'));
  try {

    const stmt = db.prepare('SELECT * FROM leksjoner WHERE kurs_id = ?');
    const leksjonerList = stmt.all(kursId);
    return c.json(leksjonerList);
  } catch (error) {
    console.error(`Feil ved henting av leksjoner for kurs ID ${kursId}: ${error}`);
    return c.json({ error: 'Kunne ikke hente leksjoner' }, 500);

  }
});

// Legger til kommentar til en leksjon
app.post('/leksjoner/:id/kommentarer', async (c) => {
  const leksjonId = Number(c.req.param('id'));
  const { content } = await c.req.json();

  if (!content) {
    return c.json({ error: 'Innhold er påkrevd' }, 400);
  }

  const stmt = db.prepare('INSERT INTO kommentarer (leksjon_id, content) VALUES (?, ?)');
  const result = stmt.run(leksjonId, content);
  return c.json({ id: result.lastInsertRowid });
});

// Henter kommentarer for en bestemt leksjon
app.get('/leksjoner/:id/kommentarer', (c) => {
  const leksjonId = Number(c.req.param('id'));

  try {

    const stmt = db.prepare('SELECT * FROM kommentarer WHERE leksjon_id = ?');
    const kommentarerList = stmt.all(leksjonId);
    return c.json(kommentarerList);

  } catch (error) {

    console.error(`Feil ved henting av kommentarer for leksjon ID ${leksjonId}: ${error}`);
    return c.json({ error: 'Kunne ikke hente kommentarer' }, 500);
  }
});



// Start serveren
console.log(`Server is running on port ${port}`);
serve({
  fetch: app.fetch,
  port,
});