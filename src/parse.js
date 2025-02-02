import { insertRoom, insertCO2, insertTemperature, insertAirQuality, insertVoc, insertFacilities, insertSound, insertlight, insertHumidity } from "./database.js";
import fs from 'fs'

function parseAndInsertLight(jsonFile) {
  try {
    const data = JSON.parse(fs.readFileSync(jsonFile, 'utf8'));
    let i = 0;
    data.rooms.forEach((room, index) => {
      const roomNumber = index + 1;

      insertRoom(roomNumber);

      room.light_intensity_values.forEach((entry) => {
        //console.log(i, "\t", entry.timestamp, entry["light_intensity"], roomNumber)
        i++;
        insertlight(entry.timestamp, entry["light_intensity"], roomNumber);
      })
    })
  } catch (error) {
    console.error("Error inserting data", error);
  }
}

function parseAndInsertHumidity(jsonFile) {
  try {
    const data = JSON.parse(fs.readFileSync(jsonFile, 'utf8'));
    let i = 0;
    data.rooms.forEach((room, index) => {
      const roomNumber = index + 1;

      insertRoom(roomNumber);

      room.humidity_values.forEach((entry) => {
        i++;
        insertHumidity(entry.timestamp, entry["humidity"], roomNumber);
      })
    })
  } catch (error) {
    console.error("Error inserting data", error);
  }
}

function parseAndInsertAirQuality(jsonFile) {
  try {
    const data = JSON.parse(fs.readFileSync(jsonFile, 'utf8'));
    let i = 0;
    data.rooms.forEach((room, index) => {
      const roomNumber = index + 1;

      insertRoom(roomNumber);

      room.air_quality_values.forEach((entry) => {
        i++;
        //console.log(i, "\t", entry.timestamp, entry["PM2.5"], entry["PM10"], roomNumber)
        insertAirQuality(entry.timestamp, entry["PM2.5"], entry["PM10"], roomNumber);
      })
    })
  } catch (error) {
    console.error("Error inserting data", error);
  }
}

function parseAndInsertCO2(jsonFile) {
  try {
    const data = JSON.parse(fs.readFileSync(jsonFile, 'utf8'));
    let i = 0;
    data.rooms.forEach((room, index) => {
      const roomNumber = index + 1;

      insertRoom(roomNumber);

      room.co2_values.forEach((entry) => {
        i++;
        //console.log(i, "\t", entry.timestamp, entry["co2_level"], roomNumber)
        insertCO2(entry.timestamp, entry["co2_level"], roomNumber);
      })
    })
  } catch (error) {
    console.error("Error inserting data", error);
  }
}

function parseAndInsertSound(jsonFile) {
  try {
    const data = JSON.parse(fs.readFileSync(jsonFile, 'utf8'));
    let i = 0;
    data.rooms.forEach((room, index) => {
      const roomNumber = index + 1;

      insertRoom(roomNumber);

      room.sound_values.forEach((entry) => {
        i++;
        //console.log(i, "\t", entry.timestamp, entry["sound_level"], roomNumber)
        insertSound(entry.timestamp, entry["sound_level"], roomNumber);
      })
    })
  } catch (error) {
    console.error("Error inserting data", error);
  }
}

function parseAndInsertTemperature(jsonFile) {
  try {
    const data = JSON.parse(fs.readFileSync(jsonFile, 'utf8'));
    let i = 0;
    data.rooms.forEach((room, index) => {
      const roomNumber = index + 1;

      insertRoom(roomNumber);

      room.temperature_values.forEach((entry) => {
        i++;
        //console.log(i, "\t", entry.timestamp, entry["temperature"], roomNumber)
        insertTemperature(entry.timestamp, entry["temperature"], roomNumber);
      })
    })
  } catch (error) {
    console.error("Error inserting data", error);
  }
}

function parseAndInsertVoc(jsonFile) {
  try {
    const data = JSON.parse(fs.readFileSync(jsonFile, 'utf8'));
    let i = 0;
    data.rooms.forEach((room, index) => {
      const roomNumber = index + 1;

      insertRoom(roomNumber);

      room.voc_values.forEach((entry) => {
        i++;
        //console.log(i, "\t", entry.timestamp, entry["VOC_level"], roomNumber)
        insertVoc(entry.timestamp, entry["VOC_level"], roomNumber);
      })
    })
  } catch (error) {
    console.error("Error inserting data", error);
  }
}

function parseAndInsertFacilities(jsonFile) {
  try {
    const data = JSON.parse(fs.readFileSync(jsonFile, 'utf8'));
    let i = 0;
    data.rooms.forEach((room, index) => {
      const roomNumber = index + 1;

      insertRoom(roomNumber);

      if (room.facilities && typeof room.facilities === 'object') {
        const {
          videoprojector = false,  // Default to false if missing
          seating_capacity = 0,    // Default to 0 if missing
          computers = 0,           // Default to 0 if missing
          robots_for_training = 0 // Default to 0 if missing
        } = room.facilities;

        // Now handle the insert logic
        if (videoprojector) {
          //console.log(1, seating_capacity, computers, robots_for_training, roomNumber);
          insertFacilities(1, seating_capacity, computers, robots_for_training, roomNumber);
        } else {
          //console.log(0, seating_capacity, computers, robots_for_training, roomNumber);
          insertFacilities(0, seating_capacity, computers, robots_for_training, roomNumber);
        }
      } else {
        console.log(`❌ No facilities found for Room ${roomNumber}`);
      }
    })
  } catch (error) {
    console.error("Error inserting data", error);
  }
}

console.time("Execution Time");

// parseAndInsertLight('../Project_sensor_data/LightIntensity_sensor_data.json')
// parseAndInsertHumidity(`../Project_sensor_data/humidity_sensor_data.json`)
// parseAndInsertAirQuality(`../Project_sensor_data/air_quality_sensor_data.json`)
// parseAndInsertCO2('../Project_sensor_data/co2_sensor_data.json')
// parseAndInsertSound('../Project_sensor_data/sound_sensor_data.json')
// parseAndInsertTemperature('../Project_sensor_data/temperature_sensor_data.json')
// parseAndInsertVoc('../Project_sensor_data/voc_sensor_data.json')
// parseAndInsertFacilities('../Project_sensor_data/room_facilities_data.json')
//
console.timeEnd("Execution Time");
