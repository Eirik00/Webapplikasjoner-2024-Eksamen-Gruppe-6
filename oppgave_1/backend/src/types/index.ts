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
      title TEXT NOT NULL,
      category TEXT
    );

    CREATE TABLE IF NOT EXISTS leksjoner (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      kurs_id INTEGER NOT NULL,
      title TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS kommentarer (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      leksjon_id INTEGER,
      content TEXT
    );
  `);
  } catch (error) {
  console.error("Feil ved initialisering av databasen:", error);
  }
};

initDb();

// Start serveren
console.log(`Server is running on port ${port}`);
serve({
  fetch: app.fetch,
  port,
});