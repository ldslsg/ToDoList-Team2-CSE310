const { openDb } = require('../db');

const initializeDatabase = async () => {
  const db = await openDb();
  try {
     await db.exec(`
      CREATE TABLE IF NOT EXISTS user (
      user_id INTEGER PRIMARY KEY AUTOINCREMENT,
      email TEXT NOT NULL,
      password TEXT NOT NULL)
     `);
     await db.exec(`
      CREATE TABLE IF NOT EXISTS list (
        list_id INTEGER PRIMARY KEY AUTOINCREMENT,
         list_title TEXT NOT NULL,
        list_creation_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        user_id INTEGER NOT NULL,
         FOREIGN KEY(user_id) REFERENCES user(user_id))
     `);
     await db.exec(`
      CREATE TABLE IF NOT EXISTS to_dos (
      to_dos_id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      description TEXT NOT NULL,
      deadline_date TIMESTAMP NOT NULL,
      status INTEGER NOT NULL,
      priority INTEGER NOT NULL,
      list_id INTEGER NOT NULL,
      FOREIGN KEY(list_id) REFERENCES list(list_id))
     `);
    console.log('Database initialized');
  } catch (err) {
    console.error('Error initializing database:', err);
  } finally {
    await db.close();
  }
};

initializeDatabase().catch((err) => {
  console.error('Error initializing database:', err);
});

