import { getLightData, getAirQualityData, getCO2Data, getHumidityData, getSoundData, getTemperatureData, getVocData, getFacilitiesData } from "./getData.js";
import { finalBestRanking } from "./algo.js";
import express from 'express'

const app = express();
const port = 3000;


function getData(date, startHour, endHour) {
  return {
    light: getLightData(date, startHour, endHour),
    airQuality: getAirQualityData(date, startHour, endHour),
    co2: getCO2Data(date, startHour, endHour),
    humidity: getHumidityData(date, startHour, endHour),
    sound: getSoundData(date, startHour, endHour),
    temperature: getTemperatureData(date, startHour, endHour),
    voc: getVocData(date, startHour, endHour)
  };
}

app.get('/api/sensor-data', (req, res) => {
  const { date, startHour, endHour } = req.query;
  res.json(getData(date, startHour, endHour));
});
//http://localhost:3000/api/sensor-data?date=2024-10-29&startHour=07&endHour=08
//

app.get('/api/facilities', (req, res) => {
  const { room } = req.query;
  res.json(getFacilitiesData(room));
});

app.get('/api/results', (req, res) => {
  const { date, startHour, endHour, lightPref, lightWeight, airPrefPM25, airPrefPM10, airWeight, co2Pref, co2Weight, hmdtPref, hmdtWeight, sndPref, sndWeight, tempPref, tempWeight, vocPref, vocWeight } = req.query;

  const lightPrefParam = lightPref || null;
  const lightWeightParam = lightWeight || null;
  const airPrefPM25Param = airPrefPM25 || null;
  const airPrefPM10Param = airPrefPM10 || null;
  const airWeightParam = airWeight || null;
  const co2PrefParam = co2Pref || null;
  const co2WeightParam = co2Weight || null;
  const hmdtPrefParam = hmdtPref || null;
  const hmdtWeightParam = hmdtWeight || null;
  const sndPrefParam = sndPref || null;
  const sndWeightParam = sndWeight || null;
  const tempPrefParam = tempPref || null;
  const tempWeightParam = tempWeight || null;
  const vocPrefParam = vocPref || null;
  const vocWeightParam = vocWeight || null;

  res.json(finalBestRanking(date, startHour, endHour, vocWeightParam, vocPrefParam, tempWeightParam, tempPrefParam, lightWeightParam, lightPrefParam, airWeightParam, airPrefPM25Param, airPrefPM10Param, co2WeightParam, co2PrefParam, hmdtWeightParam, hmdtPrefParam, sndWeightParam, sndPrefParam));

});









app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});

