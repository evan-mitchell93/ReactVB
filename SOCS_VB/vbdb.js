import * as SQLite from 'expo-sqlite';

export const db = SQLite.openDatabaseSync('vb.db');

export async function createTables() {
    await db.execAsync(`
      PRAGMA journal_mode = WAL;
      CREATE TABLE IF NOT EXISTS results (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      opponent TEXT NOT NULL,
      setsWon INTEGER NOT NULL,
      setsLost INTEGER NOT NULL);

      INSERT INTO results (opponent,setsWon,setsLost) VALUES ('CAM',2,3);
      INSERT INTO results (opponent, setsWon,setsLost) VALUES ('LCA',0,3);
      `);
    }; 



export function queryFirstResult() {
    const val = db.getFirstSync('SELECT * FROM results;');
    console.log(val);
    return val;
  };