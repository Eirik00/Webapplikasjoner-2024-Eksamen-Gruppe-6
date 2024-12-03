import { port } from "./config";
import Database from 'better-sqlite3';

import { serve } from "@hono/node-server";
import { cors } from "hono/cors";
import app from "./app"


const db = new Database(process.env.DB_PATH || './database.sqlite');
app.use("/*", cors());


// Initialiserer databasen og lager kurs, leksjoner og kommentarer tables
const initDb = () => {
      // Funksjon laget av AI
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

    CREATE TABLE IF NOT EXISTS kategorier (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name VARCHAR(256) NOT NULL
      );

      
    CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name VARCHAR(256) NOT NULL,
        email VARCHAR(256) NOT NULL
      );
    
  `);

  } catch (error) {
  console.error("Feil ved initialisering av databasen:", error);
  }
};

initDb();

  const populateDatabase = () => {
    // Funksjon laget av AI for raskere implementering av data
    try {
      const categories = [
        "Marketing",
        "Photoshop",
        "Code",
        "Video",
        "Analytics",
        "Web",
        "Design",
        "Empty",
      ];
  
      const courses = [
        {
          id: 1,
          title: "JavaScript 101",
          slug: "javascript-101",
          description:
            "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore",
          category: "Code",
          lessons: [
            {
              id: 1,
              title: "Variabler",
              slug: "variabler",
              description:
                "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.",
              text: [
                {
                  id: 1,
                  text: "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat.",
                },
                {
                  id: 2,
                  text: "Consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat.",
                },
              ],
            },
            {
              id: 2,
              title: "Løkker",
              slug: "lokker",
              description:
                "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore.",
              text: [],
            },
          ],
        },
        {
          id: 2,
          title: "Python 101",
          slug: "python-101",
          description:
            "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore",
          category: "Code",
          lessons: [],
        },
        {
          id: 3,
          title: 'Layers 101',
          slug: 'layers-101',
          description:
            'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore',
          lessons: [],
          category: 'photoshop',
        },
        {
          id: 4,
          title: 'SEO',
          slug: 'seo',
          description:
            'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore',
          lessons: [],
          category: 'marketing',
        },
        {
          id: 5,
          title: 'Intro til tegning',
          slug: 'intro-tegning',
          description:
            'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore',
          lessons: [],
          category: 'design',
        },
        {
          id: 6,
          title: 'Videoproduksjon 101',
          slug: 'videoproduksjon-101',
          description:
            'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore',
          lessons: [],
          category: 'video',
        },
        {
          id: 7,
          title: 'UI Design 101',
          slug: 'ui-design-101',
          description:
            'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore',
          lessons: [],
          category: 'web',
        },
        {
          id: 8,
          title: 'CRO',
          slug: 'cro',
          description:
            'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore',
          lessons: [],
          category: 'analytics',
        },
      ];
  
      const users = [
        { id: 1, name: "Ole Hansen", email: "ole@email.no" },
        { id: 2, name: "Sara Olsen", email: "sara@email.no" },
        { id: 3, name: "Finn Finnsen", email: "finn@email.no" },
        { id: 4, name: "Kari Guttormsen", email: "kari@email.no" },
        { id: 5, name: "Sturla Simensen", email: "sturla@email.no" },
      ];
  
      const comments = [
        {
          id: 1,
          leksjon_id: 1,
          created_by: "Sara Olsen",
          comment: "Lorem ipsum dolor sit amet, consetetur sadipscing elitr.",
        },
        {
          id: 2,
          leksjon_id: 1,
          created_by: "Finn Finnsen",
          comment: "Dolor sit amet, consetetur sadipscing elitr.",
        },
      ];
  
      // Legge inn kategorier
      const insertStmt = db.prepare(`
        INSERT OR IGNORE INTO kategorier (name) VALUES (?)
      `);
    
      categories.forEach((category) => {
        insertStmt.run(category);
      });
  
      // Legge til kurs og leksjoner
      const courseStmt = db.prepare(`
        INSERT OR REPLACE INTO kurs (id, title, slug, description, category)
        VALUES (?, ?, ?, ?, ?)
      `);
  
      const lessonStmt = db.prepare(`
        INSERT OR REPLACE INTO leksjoner (id, kurs_id, title, slug, description, text)
        VALUES (?, ?, ?, ?, ?, ?)
      `);
  
      courses.forEach((course) => {
        courseStmt.run(
          course.id,
          course.title,
          course.slug,
          course.description,
          course.category
        );
  
        course.lessons.forEach((lesson) => {
          lessonStmt.run(
            lesson.id,
            course.id,
            lesson.title,
            lesson.slug,
            lesson.description,
            JSON.stringify(lesson.text)
          );
        });
      });
  
      const userStmt = db.prepare(`
        INSERT OR IGNORE INTO users (id, name, email)
        VALUES (?, ?, ?)
      `);
      users.forEach((user) => userStmt.run(user.id, user.name, user.email));



    // Legge inn kommentarer som allerede finnes
    const commentStmt = db.prepare(`
      INSERT OR IGNORE INTO kommentarer (id, leksjon_id, created_by, comment)
      VALUES (?, ?, ?, ?)
    `);
    comments.forEach((comment) =>
      commentStmt.run(
        comment.id,
        comment.leksjon_id,
        comment.created_by,
        comment.comment
      )
    );

    console.log("Database populated successfully!");
  } catch (error) {
    console.log("Population Error Found;", error);
  }
};

populateDatabase();


// Oppretter kurs med tittel og kategori
app.post('/kurs', async (c) => {

    const { title, description } = await c.req.json();

    if (!title || typeof title !== 'string') {
      return c.json({ error: 'Ugyldig tittel' }, 400);
    }

    const stmt = db.prepare('INSERT INTO kurs (title, slug, description) VALUES (?, ?, ?)');
    const result = stmt.run(title, title.toLocaleLowerCase, description);
    return c.json({ id: result.lastInsertRowid });

});

// Henter kurs fra databasen
app.get('/kurs', (c) => {

  const stmt = db.prepare('SELECT * FROM kurs');
  const kursList = stmt.all();
  return c.json(kursList);

});


// Legger til leksjon for et spesifikt kurs
app.post('/kurs/:slug/leksjoner', async (c) => {
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
app.get('/kurs/:slug/leksjoner', (c) => {
  const kursSlug = c.req.param('slug');
    // Hente id fra kurs
  const kursStmt = db.prepare('SELECT id FROM kurs WHERE slug = ?');
  const kurs = kursStmt.get(kursSlug) as { id: number } | undefined;

  if (!kurs || !kurs.id) {
    return c.json({ error: 'Kurs ikke funnet' }, 404);
  }

  const kursId = kurs.id;

  // Bruker id fra kurs til å hente leksjoner
  const lessonsStmt = db.prepare('SELECT * FROM leksjoner WHERE kurs_id = ?');
  const lessons = lessonsStmt.all(kursId);

  return c.json(lessons);
});

app.get('/kurs/:slug/:leksjonSlug', (c) => {
  const kursSlug = c.req.param('slug');
  const leksjonSlug = c.req.param('leksjonSlug');

  // Henter id fra kurs
  const kursStmt = db.prepare('SELECT id FROM kurs WHERE slug = ?');
  const kurs = kursStmt.get(kursSlug) as { id: number } | undefined;

  if (!kurs || !kurs.id) {
    return c.json({ error: 'Kurs ikke funnet' }, 404);
  }

  const kursId = kurs.id;

  // Henter leksjoner fra kurs med id
  const lessonStmt = db.prepare('SELECT * FROM leksjoner WHERE kurs_id = ? AND slug = ?');
  const lesson = lessonStmt.get(kursId, leksjonSlug);

  if (!lesson) {
    return c.json({ error: 'Leksjon ikke funnet' }, 404);
  }

  return c.json(lesson);

});

app.get('/kurs/:slug', (c) => {
  const kursSlug = c.req.param('slug');
  const kursStmt = db.prepare('SELECT * FROM kurs WHERE slug = ?');
  const kurs = kursStmt.get(kursSlug) as { id: number } | undefined;

  if (!kurs) {
    return c.json({ error: 'Kurs ikke funnet' }, 404);
  }

  const lessonsStmt = db.prepare('SELECT * FROM leksjoner WHERE kurs_id = ?');
  const lessons = lessonsStmt.all(kurs.id);

  return c.json({ ...kurs, lessons });
});

// Legger til kommentar til en leksjon
app.get('/kurs/:slug/:leksjonSlug/kommentarer', (c) => {
  const kursSlug = c.req.param('slug');
  const leksjonSlug = c.req.param('leksjonSlug');
  const kursStmt = db.prepare('SELECT id FROM kurs WHERE slug = ?');
  const kurs = kursStmt.get(kursSlug) as { id: number } | undefined;

  if (!kurs || !kurs.id) {
    return c.json({ error: 'Kurs ikke funnet' }, 404);
  }

  const leksjonStmt = db.prepare('SELECT id FROM leksjoner WHERE kurs_id = ?');
  const leksjon = leksjonStmt.get(kurs.id) as { id: number } | undefined;

  if (!leksjon || !leksjon.id) {
    return c.json({ error: 'Leksjon ikke funnet' }, 404);
  }

  const commentsStmt = db.prepare('SELECT * FROM kommentarer WHERE leksjon_id = ?');
  const comments = commentsStmt.all(leksjon.id);

  return c.json(comments);
});


// Henter kommentarer for en bestemt leksjon
app.get('/leksjoner/:id/kommentarer', (c) => {
  const leksjonId = Number(c.req.param('id'));
  const stmt = db.prepare('SELECT * FROM kommentarer WHERE leksjon_id = ?');
  const kommentarerList = stmt.all(leksjonId);
  return c.json(kommentarerList);

});

app.get('/kategorier', (c) => {
const stmt = db.prepare('SELECT * FROM kategorier');
const categories = stmt.all();
return c.json(categories);

});

// Start serveren
console.log(`Server is running on port ${port}`);
serve({
  fetch: app.fetch,
  port,
});
