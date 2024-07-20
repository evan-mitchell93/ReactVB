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
      
      CREATE TABLE IF NOT EXISTS teamstats (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      resultid INTEGER NOT NULL,
      pointsplayed INTEGER,
      plusminus INTEGER,
      scored INTEGER,
      scoredminuserrors INTEGER,
      swings INTEGER,
      kills INTEGER,
      hiterr INTEGER,
      hitpct REAL,
      blk INTEGER,
      blkasst INTEGER,
      blkerr INTEGER,
      asst INTEGER,
      dig INTEGER,
      ballhandleerr INTEGER,
      srvreccount INTEGER,
      srvrecerr INTEGER,
      srvmade INTEGER,
      srvace INTEGER,
      srverr INTEGER,
      FOREIGN KEY(resultid) REFERENCES results(id)
      );
      `);
    }; 


//get first row from the table will
export function queryFirstResult() {
    const val = db.getFirstSync('SELECT * FROM results;');
    console.log(val);
    return val;
  };

//get all results might update to include seasons
export function queryAllResults() {
    const resultList = db.getAllSync('SELECT * FROM results;');
    console.log(resultList);
    return resultList;
}

//get teamstats by specific match result id
export function getTeamStats(resultId){
    const teamStats = db.getAllSync('SELECT * FROM teamstats WHERE resultid = ?',resultId);
    return teamStats;
}