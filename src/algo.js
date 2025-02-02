import { db } from "./database.js";

function getBestLightRooms(date, startHour, endHour) {
  const query = db.prepare(`
        SELECT room_number, AVG(light_intensity) AS avg_light_intensity,
               ABS(AVG(light_intensity) - 500) AS deviation
        FROM light
        WHERE strftime('%Y-%m-%d', time) = ? 
        AND strftime('%H', time) BETWEEN ? AND ?
        GROUP BY room_number
        ORDER BY deviation ASC;
    `);

  return query.all(date, startHour, endHour);
}


function getBestAirQualityRoom(date, startHour, endHour) {
  const query = db.prepare(`
    SELECT room_number, AVG(PM_25) AS avg_PM2_5, AVG(PM_10) AS avg_PM10,
           ABS(AVG(PM_25) - 5) AS deviation_PM2_5, ABS(AVG(PM_10) - 15) AS deviation_PM10
    FROM air_quality
    WHERE strftime('%Y-%m-%d', time) = ? 
    AND strftime('%H', time) BETWEEN ? AND ?
    GROUP BY room_number
    ORDER BY deviation_PM2_5 ASC, deviation_PM10 ASC;
  `);

  return query.all(date, startHour, endHour);
}

function getBestCO2Room(date, startHour, endHour) {
  const query = db.prepare(`
        SELECT room_number, AVG(co2_level) AS avg_co2_level,
               ABS(AVG(co2_level) - 0) AS deviation
        FROM co2
        WHERE strftime('%Y-%m-%d', time) = ? 
        AND strftime('%H', time) BETWEEN ? AND ?
        GROUP BY room_number
        ORDER BY deviation ASC;
    `);

  return query.all(date, startHour, endHour);
}

function getBestHumidityRoom(date, startHour, endHour) {
  const query = db.prepare(`
        SELECT room_number, AVG(humidity_level) AS avg_humidity_level,
               ABS(AVG(humidity_level) - 40) AS deviation
        FROM humidity
        WHERE strftime('%Y-%m-%d', time) = ? 
        AND strftime('%H', time) BETWEEN ? AND ?
        GROUP BY room_number
        ORDER BY deviation ASC;
    `);

  return query.all(date, startHour, endHour);
}

function getBestSoundRoom(date, startHour, endHour) {
  const query = db.prepare(`
        SELECT room_number, AVG(sound_level) AS avg_sound_level,
               ABS(AVG(sound_level) - 0) AS deviation
        FROM sound
        WHERE strftime('%Y-%m-%d', time) = ? 
        AND strftime('%H', time) BETWEEN ? AND ?
        GROUP BY room_number
        ORDER BY deviation ASC;
    `);

  return query.all(date, startHour, endHour);
}

function getBestTemperatureRoom(date, startHour, endHour) {
  const query = db.prepare(`
        SELECT room_number, AVG(temperature) AS avg_temperature_level,
               ABS(AVG(temperature) - 23) AS deviation
        FROM temperature
        WHERE strftime('%Y-%m-%d', time) = ? 
        AND strftime('%H', time) BETWEEN ? AND ?
        GROUP BY room_number
        ORDER BY deviation ASC;
    `);

  return query.all(date, startHour, endHour);
}


function getBestVOCRoom(date, startHour, endHour) {
  const query = db.prepare(`
        SELECT room_number, AVG(voc_level) AS avg_voc_level,
               ABS(AVG(voc_level) - 0) AS deviation
        FROM voc
        WHERE strftime('%Y-%m-%d', time) = ? 
        AND strftime('%H', time) BETWEEN ? AND ?
        GROUP BY room_number
        ORDER BY deviation ASC;
    `);

  return query.all(date, startHour, endHour);
}



// User inputs
// const date = '2024-10-29';
// const startHour = '06';
// const endHour = '09';
//
//const bestLightRooms = getBestLightRooms(date, startHour, endHour);
//const bestAirQualityRoom = getBestAirQualityRoom(date, startHour, endHour);
//const bestCO2Room = getBestCO2Room(date, startHour, endHour);
//const bestHumidityRoom = getBestHumidityRoom(date, startHour, endHour);
//const bestSoundRoom = getBestSoundRoom(date, startHour, endHour);
//const bestTemperatureRoom = getBestTemperatureRoom(date, startHour, endHour);
//const bestVOCRoom = getBestVOCRoom(date, startHour, endHour);

//console.log(bestLightRooms);
//console.log(bestAirQualityRoom);
//console.log(bestCO2Room);
//console.log(bestHumidityRoom);
//console.log(bestSoundRoom);
//console.log(bestTemperatureRoom);
//console.log(bestVOCRoom)
