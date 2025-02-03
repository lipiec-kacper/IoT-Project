import { db } from "./database.js";

function getLightData(date, startHour, endHour) {
  const query = db.prepare(`
        SELECT room_number, light_intensity, time
        FROM light
        WHERE DATE(time) = ?  
        AND TIME(time) BETWEEN ? AND ?
        ORDER BY time ASC; 
    `);

  return query.all(date, startHour, endHour);
}

function getAirQualityData(date, startHour, endHour) {
  const query = db.prepare(`
    SELECT room_number, PM_25, PM_10, time
    FROM air_quality
    WHERE DATE(time) = ? 
    AND TIME(time) BETWEEN ? AND ?
    ORDER BY time ASC;
  `);

  return query.all(date, startHour, endHour);
}

function getCO2Data(date, startHour, endHour) {
  const query = db.prepare(`
    SELECT room_number, co2_level, time
    FROM co2
    WHERE DATE(time) = ? 
    AND TIME(time) BETWEEN ? AND ?
    ORDER BY time ASC;
  `);

  return query.all(date, startHour, endHour);
}

function getHumidityData(date, startHour, endHour) {
  const query = db.prepare(`
    SELECT room_number, humidity_level, time
    FROM humidity
    WHERE DATE(time) = ? 
    AND TIME(time) BETWEEN ? AND ?
    ORDER BY time ASC;
  `);

  return query.all(date, startHour, endHour);
}

function getSoundData(date, startHour, endHour) {
  const query = db.prepare(`
    SELECT room_number, sound_level, time
    FROM sound
    WHERE DATE(time) = ? 
    AND TIME(time) BETWEEN ? AND ?
    ORDER BY time ASC;
  `);

  return query.all(date, startHour, endHour);
}

function getTemperatureData(date, startHour, endHour) {
  const query = db.prepare(`
    SELECT room_number, temperature, time
    FROM temperature
    WHERE DATE(time) = ? 
    AND TIME(time) BETWEEN ? AND ?
    ORDER BY time ASC;
  `);

  return query.all(date, startHour, endHour);
}


function getVocData(date, startHour, endHour) {
  const query = db.prepare(`
    SELECT room_number, voc_level, time
    FROM voc
    WHERE DATE(time) = ? 
    AND TIME(time) BETWEEN ? AND ?
    ORDER BY time ASC;
  `);

  return query.all(date, startHour, endHour);
}

function getFacilitiesData(room) {
  const query = db.prepare(`
    SELECT *
    FROM facilities
    WHERE room_number = ? ;
  `);

  return query.all(room);
}

function getBookings(date, startHour, endHour) {
  const query = db.prepare(`
    SELECT *
    FROM bookings
    WHERE day = ?
    AND startHour >= ?
    AND endHour <= ?
    ORDER BY startHour ASC;
  `);

  return query.all(date, startHour, endHour);
}

export {
  getLightData,
  getAirQualityData,
  getCO2Data,
  getHumidityData,
  getSoundData,
  getTemperatureData,
  getVocData,
  getFacilitiesData,
  getBookings
}



const date = '2024-10-29';
const startHour = '07';
const endHour = '08';

//console.log(getLightData(date, startHour, endHour));
//console.log(getAirQualityData(date, startHour, endHour));
//console.log(getCO2Data(date, startHour, endHour));
//console.log(getHumidityData(date, startHour, endHour));
//console.log(getSoundData(date, startHour, endHour));
//console.log(getTemperatureData(date, startHour, endHour))
//console.log(getVocData(date, startHour, endHour));
