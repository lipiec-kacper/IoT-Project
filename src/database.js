import Database from 'better-sqlite3'
import { readFileSync } from 'node:fs'
import { join } from 'node:path'

const db = new Database('database.sqlite');

db.pragma('foreign_key = ON');

const schemaPath = join(process.cwd(), "db", "init.sql");
const schema = readFileSync(schemaPath, "utf8");

db.exec(schema);

function insertRoom(roomNumber) {
  const query = db.prepare(`
    INSERT OR IGNORE INTO room (room_number) VALUES (?)
  `);

  query.run(roomNumber);
}

function insertCO2(time, co2, roomNumber) {
  const query = db.prepare(`
    INSERT INTO co2 (time, co2_level, room_number) VALUES (?,?,?)
  `);

  query.run(time, co2, roomNumber);
}

function insertAirQuality(time, PM25, PM10, room_number) {
  const query = db.prepare(`
    INSERT INTO air_quality (time, PM_25, PM_10, room_number) VALUES (?,?,?,?)
  `);

  query.run(time, PM25, PM10, room_number);

}

function insertHumidity(time, humidity, room_number) {
  const query = db.prepare(`
    INSERT INTO humidity (time, humidity_level, room_number) VALUES (?,?,?)
  `);

  query.run(time, humidity, room_number);

}

function insertlight(time, light, room_number) {

  const query = db.prepare(`
    INSERT INTO light (time, light_intensity, room_number) VALUES (?,?,?)
  `);

  query.run(time, light, room_number);

}

function insertFacilities(videoprojector, seating_capacity, computers, robots_for_training, room_number) {

  const query = db.prepare(`
    INSERT INTO facilities (videoprojector, seating_capacity, computers, robots_for_training, room_number) VALUES (?,?,?,?,?)
  `);

  query.run(videoprojector, seating_capacity, computers, robots_for_training, room_number);

}

function insertSound(time, sound_level, room_number) {

  const query = db.prepare(`
    INSERT INTO sound (time, sound_level, room_number) VALUES (?,?,?)
  `);

  query.run(time, sound_level, room_number);

}

function insertTemperature(time, temperature, room_number) {

  const query = db.prepare(`
    INSERT INTO temperature (time, temperature, room_number) VALUES (?,?,?)
  `);

  query.run(time, temperature, room_number);

}

function insertVoc(time, voc_level, room_number) {

  const query = db.prepare(`
    INSERT INTO voc (time, voc_level, room_number) VALUES (?,?,?)
  `);

  query.run(time, voc_level, room_number);

}


// insertRoom(1)
// insertCO2("22:35", 35.87, 1);
// insertVoc("22:35", 85.24, 1);
// insertTemperature("78:85", 47.78, 1);
// insertlight("24:55", 87.7, 1);
// insertHumidity("11:35", 78.14, 1);
// insertFacilities(1, 45, 10, 45, 1);
// insertSound("11:44", 11.23, 1);
// insertAirQuality("15:36", 12.8, 75.55, 1);
//
export {
  insertRoom,
  insertCO2,
  insertAirQuality,
  insertHumidity,
  insertlight,
  insertFacilities,
  insertSound,
  insertTemperature,
  insertVoc
};

console.log('Database initialized successfully');
