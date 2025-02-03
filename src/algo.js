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

// function getRoomWithFacilities(computersAmount, seatsAmount, videoProjector, robotsAmount) {
//   const project = videoProjector || 0
//   let computersRooms;
//   let seatsAmountRooms;
//   let projectorRooms;
//   let robotsAmountRooms;
//
//   let result;
//   if (computersAmount !== null || computersAmount !== undefined) {
//     const query = db.prepare(`
//         SELECT room_number
//         FROM facilities
//         WHERE computers >= ? ;
//     `);
//
//     computersRooms = query.all(computersAmount);
//   }
//
//   if (seatsAmount !== 0 || seatsAmount !== undefined) {
//     const query2 = db.prepare(`
//         SELECT room_number
//         FROM facilities
//         WHERE seating_capacity >= ? ;
//     `);
//
//     seatsAmountRooms = query2.all(seatsAmount)
//   }
//
//   if (videoProjector === 1) {
//     const query3 = db.prepare(`
//         SELECT room_number
//         FROM facilities
//         WHERE videoprojector = 1 ;
//     `);
//
//     projectorRooms = query3.all();
//
//   }
//
//   if (robotsAmount !== null || robotsAmount !== undefined) {
//     const query4 = db.prepare(`
//         SELECT room_number
//         FROM facilities
//         WHERE robots_for_training >= ? ;
//     `);
//
//     robotsAmountRooms = query4.all(seatsAmount)
//   }
//
//   console.log(computersRooms);
//   console.log(seatsAmountRooms);
//   console.log(projectorRooms);
//   console.log(robotsAmountRooms);
//
//
// }
//
// function getRoomWithFacilities(computersAmount, seatsAmount, videoProjector, robotsAmount) {
//   const project = videoProjector || 0;
//
//   let computersRooms = [];
//   let seatsAmountRooms = [];
//   let projectorRooms = [];
//   let robotsAmountRooms = [];
//
//   // Query to find rooms with the required computers amount
//   if (computersAmount !== null && computersAmount !== undefined && computersAmount > 0) {
//     const query = db.prepare(`
//         SELECT room_number
//         FROM facilities
//         WHERE computers >= ? ;
//     `);
//     computersRooms = query.all(computersAmount);
//   }
//
//   // Query to find rooms with the required seats amount
//   if (seatsAmount !== null && seatsAmount !== undefined && seatsAmount > 0) {
//     const query2 = db.prepare(`
//         SELECT room_number
//         FROM facilities
//         WHERE seating_capacity >= ? ;
//     `);
//     seatsAmountRooms = query2.all(seatsAmount);
//   }
//
//   // Query to find rooms with a projector
//   if (videoProjector === 1) {
//     const query3 = db.prepare(`
//         SELECT room_number
//         FROM facilities
//         WHERE videoprojector = 1 ;
//     `);
//     projectorRooms = query3.all();
//   }
//
//   // Query to find rooms with the required robots amount
//   if (robotsAmount !== null && robotsAmount !== undefined && robotsAmount > 0) {
//     const query4 = db.prepare(`
//         SELECT room_number
//         FROM facilities
//         WHERE robots_for_training >= ? ;
//     `);
//     robotsAmountRooms = query4.all(robotsAmount);
//   }
//
//   console.log("seats amount", seatsAmountRooms);
//   console.log("computers", computersRooms)
//   console.log("projectorRooms", projectorRooms)
//   console.log("robotsAmountRooms", robotsAmountRooms)
//
//   // Combine the results - Find rooms that meet all the conditions
//   let matchingRooms = computersRooms;
//
//   if (seatsAmountRooms.length > 0) {
//     matchingRooms = matchingRooms.filter(room => seatsAmountRooms.includes(room));
//   }
//
//   if (projectorRooms.length > 0) {
//     matchingRooms = matchingRooms.filter(room => projectorRooms.includes(room));
//   }
//
//   if (robotsAmountRooms.length > 0) {
//     matchingRooms = matchingRooms.filter(room => robotsAmountRooms.includes(room));
//   }
//
//   // Final check for rooms that meet all conditions
//   if (matchingRooms.length > 0) {
//     console.log('Rooms that meet all requirements: ', matchingRooms);
//     return matchingRooms;
//   } else {
//     console.log('No rooms available with these properties');
//     return 'No rooms available with these properties';
//   }
// }
//
function getRoomWithFacilities(computersAmount, seatsAmount, videoProjector, robotsAmount) {
  let computersRooms = [];
  let seatsAmountRooms = [];
  let projectorRooms = [];
  let robotsAmountRooms = [];

  // Query to find rooms with the required computers amount
  if (computersAmount !== null && computersAmount !== undefined) {
    const query = db.prepare(`
        SELECT room_number
        FROM facilities
        WHERE computers >= ? ;
    `);
    computersRooms = query.all(computersAmount).map(room => room.room_number);
  }

  // Query to find rooms with the required seats amount
  if (seatsAmount !== null && seatsAmount !== undefined) {
    const query2 = db.prepare(`
        SELECT room_number
        FROM facilities
        WHERE seating_capacity >= ? ;
    `);
    seatsAmountRooms = query2.all(seatsAmount).map(room => room.room_number);
  }

  // Query to find rooms with a projector
  if (videoProjector === 1) {
    const query3 = db.prepare(`
        SELECT room_number
        FROM facilities
        WHERE videoprojector = 1 ;
    `);
    projectorRooms = query3.all().map(room => room.room_number);
  }

  // Query to find rooms with the required robots amount
  if (robotsAmount !== null && robotsAmount !== undefined) {
    const query4 = db.prepare(`
        SELECT room_number
        FROM facilities
        WHERE robots_for_training >= ? ;
    `);
    robotsAmountRooms = query4.all(robotsAmount).map(room => room.room_number);
  }

  // Combine the results - Find rooms that meet all the conditions
  let matchingRooms = computersRooms;

  if (seatsAmountRooms.length > 0) {
    matchingRooms = matchingRooms.filter(room => seatsAmountRooms.includes(room));
  }

  if (projectorRooms.length > 0) {
    matchingRooms = matchingRooms.filter(room => projectorRooms.includes(room));
  }

  if (robotsAmountRooms.length > 0) {
    matchingRooms = matchingRooms.filter(room => robotsAmountRooms.includes(room));
  }

  // Final check for rooms that meet all conditions
  if (matchingRooms.length > 0) {
    console.log('Rooms that meet all requirements: ', matchingRooms);
    return matchingRooms;
  } else {
    console.log('No rooms available with these properties');
    return 'No rooms available with these properties';
  }
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
const endHour = '09';

function finalBestRanking(
  date, startHour, endHour, vocWeight, vocPref, tempWeight, tempPref, lightWeight, lightPref,
  airWeight, airPrefPM25, airPrefPM10, co2Weight, co2Pref, humidWeight, hmdPref, soundWeight,
  sndPref, computersAmount, seatsAmount, videoProjector, robotsAmount) {

  // Get the best rooms based on the environmental factors (light, air quality, etc.)
  const bestLightRooms = getBestLightRooms(date, startHour, endHour, lightPref);
  const bestAirQualityRoom = getBestAirQualityRoom(date, startHour, endHour, airPrefPM25, airPrefPM10);
  const bestCO2Room = getBestCO2Room(date, startHour, endHour, co2Pref);
  const bestHumidityRoom = getBestHumidityRoom(date, startHour, endHour, hmdPref);
  const bestSoundRoom = getBestSoundRoom(date, startHour, endHour, sndPref);
  const bestTemperatureRoom = getBestTemperatureRoom(date, startHour, endHour, tempPref);
  const bestVOCRoom = getBestVOCRoom(date, startHour, endHour, vocPref);

  // Get rooms that match the facility requirements
  const availableRooms = getRoomWithFacilities(computersAmount, seatsAmount, videoProjector, robotsAmount);

  // Filter each room list based on the available rooms
  let filteredLightRooms = bestLightRooms.filter(room => availableRooms.includes(room.room_number));
  let filteredAirQualityRooms = bestAirQualityRoom.filter(room => availableRooms.includes(room.room_number));
  let filteredCO2Rooms = bestCO2Room.filter(room => availableRooms.includes(room.room_number));
  let filteredHumidityRooms = bestHumidityRoom.filter(room => availableRooms.includes(room.room_number));
  let filteredSoundRooms = bestSoundRoom.filter(room => availableRooms.includes(room.room_number));
  let filteredTemperatureRooms = bestTemperatureRoom.filter(room => availableRooms.includes(room.room_number));
  let filteredVOCRooms = bestVOCRoom.filter(room => availableRooms.includes(room.room_number));

  // If all facility values are null or undefined, skip filtering and proceed with default behavior
  if (
    (computersAmount === null || computersAmount === undefined) &&
    (seatsAmount === null || seatsAmount === undefined) &&
    (videoProjector === null || videoProjector === undefined) &&
    (robotsAmount === null || robotsAmount === undefined)
  ) {
    // If no facilities specified, retain all best rooms without filtering
    filteredLightRooms = bestLightRooms;
    filteredAirQualityRooms = bestAirQualityRoom;
    filteredCO2Rooms = bestCO2Room;
    filteredHumidityRooms = bestHumidityRoom;
    filteredSoundRooms = bestSoundRoom;
    filteredTemperatureRooms = bestTemperatureRoom;
    filteredVOCRooms = bestVOCRoom;
  }

  // If any of the filtered arrays are empty, return "No rooms available"
  if (
    filteredLightRooms.length === 0 ||
    filteredAirQualityRooms.length === 0 ||
    filteredCO2Rooms.length === 0 ||
    filteredHumidityRooms.length === 0 ||
    filteredSoundRooms.length === 0 ||
    filteredTemperatureRooms.length === 0 ||
    filteredVOCRooms.length === 0
  ) {
    return 'No rooms available with these properties';
  }

  // Insert weight into each "best" ranking
  let bestVOC = insertToAList(filteredVOCRooms, vocWeight);
  let bestTEMP = insertToAList(filteredTemperatureRooms, tempWeight);
  let bestLight = insertToAList(filteredLightRooms, lightWeight);
  let bestAir = insertToAList(filteredAirQualityRooms, airWeight);
  let bestCO2 = insertToAList(filteredCO2Rooms, co2Weight);
  let bestHumid = insertToAList(filteredHumidityRooms, humidWeight);
  let bestSound = insertToAList(filteredSoundRooms, soundWeight);

  // Final ranking with weights added
  let bestofbest = findFinalBest(bestVOC, bestTEMP, bestLight, bestAir, bestCO2, bestHumid, bestSound);

  return bestofbest;
}
let test = finalBestRanking(date, startHour, endHour, null, null, null, 25, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null);
console.log(test)



export {
  finalBestRanking
}


