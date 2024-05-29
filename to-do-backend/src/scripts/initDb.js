const { openDb } = require('../db');

const initializeDatabase = async () => {
  const db = await openDb();
  try {
    await db.exec(`
      CREATE TABLE IF NOT EXISTS todos (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        description TEXT NOT NULL,
        status TEXT NOT NULL CHECK (status IN ('pending', 'completed')),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
    console.log('Database initialized for TO-DO list app');
  } catch (err) {
    console.error('Error initializing database:', err);
  } finally {
    await db.close();
  }
};

initializeDatabase().catch((err) => {
  console.error('Error initializing database:', err);
});
