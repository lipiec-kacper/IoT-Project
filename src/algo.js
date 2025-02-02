import { db } from "./database.js";

function getBestLightRooms(date, startHour, endHour, pref) {
  let recommended = 500;
  if (pref === null || pref === undefined) {
    pref = recommended
  }

  const query = db.prepare(`
        SELECT room_number, AVG(light_intensity) AS avg_light_intensity,
               ABS(AVG(light_intensity) - ?) AS deviation
        FROM light
        WHERE strftime('%Y-%m-%d', time) = ? 
        AND strftime('%H', time) BETWEEN ? AND ?
        GROUP BY room_number
        ORDER BY deviation ASC;
    `);

  return query.all(pref, date, startHour, endHour);
}


function getBestAirQualityRoom(date, startHour, endHour, pref_25, pref_10) {
  let recommended_25 = 5;
  let recommended_10 = 15;

  if (pref_25 === null || pref_25 === undefined) {
    pref_25 = recommended_25;
  } else if (pref_10 === null || pref_10 === undefined) {
    pref_10 = recommended_10;
  }

  const query = db.prepare(`
    SELECT room_number, AVG(PM_25) AS avg_PM2_5, AVG(PM_10) AS avg_PM10,
           ABS(AVG(PM_25) - ?) AS deviation_PM2_5, ABS(AVG(PM_10) - ?) AS deviation_PM10
    FROM air_quality
    WHERE strftime('%Y-%m-%d', time) = ? 
    AND strftime('%H', time) BETWEEN ? AND ?
    GROUP BY room_number
    ORDER BY deviation_PM2_5 ASC, deviation_PM10 ASC;
  `);

  return query.all(pref_25, pref_10, date, startHour, endHour);
}

function getBestCO2Room(date, startHour, endHour, pref) {
  let recommended = 0;
  if (pref === null || pref === undefined) {
    pref = recommended
  }
  const query = db.prepare(`
        SELECT room_number, AVG(co2_level) AS avg_co2_level,
               ABS(AVG(co2_level) - ?) AS deviation
        FROM co2
        WHERE strftime('%Y-%m-%d', time) = ? 
        AND strftime('%H', time) BETWEEN ? AND ?
        GROUP BY room_number
        ORDER BY deviation ASC;
    `);

  return query.all(pref, date, startHour, endHour);
}

function getBestHumidityRoom(date, startHour, endHour, pref) {
  let recommended = 40;
  if (pref === null || pref === undefined) {
    pref = recommended
  }
  const query = db.prepare(`
        SELECT room_number, AVG(humidity_level) AS avg_humidity_level,
               ABS(AVG(humidity_level) - ?) AS deviation
        FROM humidity
        WHERE strftime('%Y-%m-%d', time) = ? 
        AND strftime('%H', time) BETWEEN ? AND ?
        GROUP BY room_number
        ORDER BY deviation ASC;
    `);

  return query.all(pref, date, startHour, endHour);
}

function getBestSoundRoom(date, startHour, endHour, pref) {
  let recommended = 0;
  if (pref === null || pref === undefined) {
    pref = recommended
  }
  const query = db.prepare(`
        SELECT room_number, AVG(sound_level) AS avg_sound_level,
               ABS(AVG(sound_level) - ?) AS deviation
        FROM sound
        WHERE strftime('%Y-%m-%d', time) = ? 
        AND strftime('%H', time) BETWEEN ? AND ?
        GROUP BY room_number
        ORDER BY deviation ASC;
    `);

  return query.all(pref, date, startHour, endHour);
}

function getBestTemperatureRoom(date, startHour, endHour, pref) {
  let recommended = 23;
  if (pref === null || pref === undefined) {
    pref = recommended
  }
  const query = db.prepare(`
        SELECT room_number, AVG(temperature) AS avg_temperature_level,
               ABS(AVG(temperature) - ?) AS deviation
        FROM temperature
        WHERE strftime('%Y-%m-%d', time) = ? 
        AND strftime('%H', time) BETWEEN ? AND ?
        GROUP BY room_number
        ORDER BY deviation ASC;
    `);

  return query.all(pref, date, startHour, endHour);
}


function getBestVOCRoom(date, startHour, endHour, pref) {
  let recommended = 0;
  if (pref === null || pref === undefined) {
    pref = recommended
  }
  const query = db.prepare(`
        SELECT room_number, AVG(voc_level) AS avg_voc_level,
               ABS(AVG(voc_level) - ?) AS deviation
        FROM voc
        WHERE strftime('%Y-%m-%d', time) = ? 
        AND strftime('%H', time) BETWEEN ? AND ?
        GROUP BY room_number
        ORDER BY deviation ASC;
    `);

  return query.all(pref, date, startHour, endHour);
}

function insertToAList(scores, weight) {
  let list = {};
  if (weight === null || weight === undefined) {
    weight = 1;
  }
  let index = 5;
  scores.forEach((room) => {
    //console.log(room.room_number);
    let finalScore = index * weight;
    list[room.room_number] = finalScore
    index--;
  });

  return list;
}
function findFinalBest(score1, score2, score3, score4, score5, score6, score7) {
  let score = {};

  // Loop through the keys (room numbers) in score1
  for (let room in score1) {
    score[room] = score1[room];  // Initialize with score1 value

    // Add the values from the other score objects
    if (score2[room] !== undefined) score[room] += score2[room];
    if (score3[room] !== undefined) score[room] += score3[room];
    if (score4[room] !== undefined) score[room] += score4[room];
    if (score5[room] !== undefined) score[room] += score5[room];
    if (score6[room] !== undefined) score[room] += score6[room];
    if (score7[room] !== undefined) score[room] += score7[room];
  }

  return score;
}


// User inputs
const date = '2024-10-29';
const startHour = '06';
const endHour = '08';

function finalBestRanking(date, startHour, endHour, vocWeight, vocPref, tempWeight, tempPref, lightWeight, lightPref, airWeight, airPrefPM25, airPrefPM10, co2Weight, co2Pref, humidWeight, hmdPref, soundWeight, sndPref) {
  const bestLightRooms = getBestLightRooms(date, startHour, endHour, lightPref);
  const bestAirQualityRoom = getBestAirQualityRoom(date, startHour, endHour, airPrefPM25, airPrefPM10);
  const bestCO2Room = getBestCO2Room(date, startHour, endHour, co2Pref);
  const bestHumidityRoom = getBestHumidityRoom(date, startHour, endHour, hmdPref);
  const bestSoundRoom = getBestSoundRoom(date, startHour, endHour, sndPref);
  const bestTemperatureRoom = getBestTemperatureRoom(date, startHour, endHour, tempPref);
  const bestVOCRoom = getBestVOCRoom(date, startHour, endHour, vocPref);
  //
  // console.log(bestLightRooms);
  // console.log(bestAirQualityRoom);
  // console.log(bestCO2Room);
  // console.log(bestHumidityRoom);
  // console.log(bestSoundRoom);
  // console.log(bestTemperatureRoom);
  // console.log(bestVOCRoom)
  //Insert and add a weight to the best ranking of each
  let bestVOC = insertToAList(bestVOCRoom, vocWeight);
  let bestTEMP = insertToAList(bestTemperatureRoom, tempWeight)
  let bestlight = insertToAList(bestLightRooms, lightWeight);
  let bestAir = insertToAList(bestAirQualityRoom, airWeight);
  let bestCO2 = insertToAList(bestCO2Room, co2Weight);
  let bestHumid = insertToAList(bestHumidityRoom, humidWeight);
  let bestSound = insertToAList(bestSoundRoom, soundWeight);

  // console.log("Voc \t", Object.entries(bestVOC).sort((a, b) => b[1] - a[1]))
  // console.log("Temp \t", Object.entries(bestTEMP).sort((a, b) => b[1] - a[1]))
  // console.log("Light \t", Object.entries(bestlight).sort((a, b) => b[1] - a[1]))
  // console.log("Air \t", Object.entries(bestAir).sort((a, b) => b[1] - a[1]))
  // console.log("CO2 \t", Object.entries(bestCO2).sort((a, b) => b[1] - a[1]))
  // console.log("Humid \t", Object.entries(bestHumid).sort((a, b) => b[1] - a[1]))
  // console.log("Sound \t", Object.entries(bestSound).sort((a, b) => b[1] - a[1]))
  //

  //final ranking with weight added
  let bestofbest = findFinalBest(bestVOC, bestTEMP, bestlight, bestAir, bestCO2, bestHumid, bestSound);

  return bestofbest;
}

let test = finalBestRanking(date, startHour, endHour, 5, null, null, null, null, null, null, null, null, null, null, null, null, null, null);
console.log(test)



export {
  finalBestRanking
}


//TEST
//Get the best ranking
// const bestLightRooms = getBestLightRooms(date, startHour, endHour);
// const bestAirQualityRoom = getBestAirQualityRoom(date, startHour, endHour);
// const bestCO2Room = getBestCO2Room(date, startHour, endHour);
// const bestHumidityRoom = getBestHumidityRoom(date, startHour, endHour);
// const bestSoundRoom = getBestSoundRoom(date, startHour, endHour);
// const bestTemperatureRoom = getBestTemperatureRoom(date, startHour, endHour);
// const bestVOCRoom = getBestVOCRoom(date, startHour, endHour);
//
// console.log(bestLightRooms);
// console.log(bestAirQualityRoom);
// console.log(bestCO2Room);
// console.log(bestHumidityRoom);
// console.log(bestSoundRoom);
// console.log(bestTemperatureRoom);
// console.log(bestVOCRoom)
// //Insert and add a weight to the best ranking of each
// let bestVOC = insertToAList(bestVOCRoom, 5);
// let bestTEMP = insertToAList(bestTemperatureRoom, 4)
// let bestlight = insertToAList(bestLightRooms, 3);
// let bestAir = insertToAList(bestAirQualityRoom, 1);
// let bestCO2 = insertToAList(bestCO2Room, 1);
// let bestHumid = insertToAList(bestHumidityRoom, 1);
// let bestSound = insertToAList(bestSoundRoom, 1);
//
// console.log("Voc \t", Object.entries(bestVOC).sort((a, b) => b[1] - a[1]))
// console.log("Temp \t", Object.entries(bestTEMP).sort((a, b) => b[1] - a[1]))
// console.log("Light \t", Object.entries(bestlight).sort((a, b) => b[1] - a[1]))
// console.log("Air \t", Object.entries(bestAir).sort((a, b) => b[1] - a[1]))
// console.log("CO2 \t", Object.entries(bestCO2).sort((a, b) => b[1] - a[1]))
// console.log("Humid \t", Object.entries(bestHumid).sort((a, b) => b[1] - a[1]))
// console.log("Sound \t", Object.entries(bestSound).sort((a, b) => b[1] - a[1]))
//
//
// //final ranking with weight added
// let bestofbest = findFinalBest(bestVOC, bestTEMP, bestlight, bestAir, bestCO2, bestHumid, bestSound);
// console.log(Object.entries(bestofbest).sort((a, b) => b[1] - a[1]));
//


