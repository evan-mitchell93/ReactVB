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
export function getAllResults() {
    const resultList = db.getAllSync('SELECT * FROM results;');
    return resultList;
}

//get teamstats by specific match result id
export function getTeamStats(resultId){
    try{
    const teamStats = db.getAllSync('SELECT * FROM teamstats WHERE resultid = ?',resultId);
    return teamStats;
    } catch (error) {
      console.error(error)
      return null;
    }
}

//add team stats from file
export function insertTeamStats(data,resultId){
  db.runSync(`INSERT INTO teamstats (resultid,pointsplayed,plusminus,scored,scoredminuserrors,
    swings,kills,hiterr,hitpct,blk,blkasst,blkerr,asst,dig,ballhandleerr,srvreccount,
    srvrecerr,srvmade,srvace,srverr) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?);`,resultId,
  data[1],data[2],data[3],data[4],data[5],data[6],data[7],data[8],data[9],data[10],
  data[11],data[12],data[13],data[14],data[15],data[16],data[17],data[18],data[19],data[20]);
}

export function insertResult(opp,setsW,setsL){
  try {
    db.runSync(`INSERT INTO results (opponent,setsWon,setsLost) VALUES (?,?,?);`,opp,setsW,setsL);
    console.log("Inserted record");
  } catch (error) {
    console.log("Error inserting", error);
  }
}