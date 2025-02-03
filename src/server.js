import { getLightData, getAirQualityData, getCO2Data, getHumidityData, getSoundData, getTemperatureData, getVocData, getFacilitiesData, getBookings } from "./getData.js";
import { isUserRegistered, getUserId, checkIfUserAlreadyExists, insertUser, insertBooking } from "./presentation/models/checkUser.js";
import { finalBestRanking } from "./algo.js";
import express from 'express';
import session from 'express-session';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const app = express();
const port = 3000;

// Middleware for parsing form data
app.use(express.urlencoded({ extended: true }));

// Session setup (similar to Flask session)
app.use(session({
  secret: 'h6d9#@gA!zP2@XrYqT$zBvN%Ls3oMk',
  resave: false,
  saveUninitialized: true
}));

// Resolve __dirname in ES Modules using import.meta.url
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Serve static files (HTML, CSS, JS) from the "src/presentation/pages" directory
app.use(express.static(path.join(__dirname, 'presentation')));
//
// app.get('/', (req, res) => {
//   res.sendFile(path.join(__dirname, 'presentation', 'pages', 'auth.html'));
// });
//
//
let userId;

app.route('/')
  .get((req, res) => {
    res.sendFile(path.join(__dirname, 'presentation', 'pages', 'auth.html'));
  })
  .post((req, res) => {
    const formType = req.body.form_type;

    if (formType === 'sign_in') {
      const email = req.body.loginEmail;
      const password = req.body.loginPassword;
      const isRegistered = isUserRegistered(email, password);

      if (isRegistered) {
        userId = getUserId(email, password);
        req.session.userId = userId;  // Store user in session
        return res.redirect('/home');
      }

    } else if (formType === 'sign_up') {
      const email = req.body.registerEmail;
      const password = req.body.registerPassword;
      const alreadyExists = checkIfUserAlreadyExists(email, password);

      if (alreadyExists) {
        return res.sendFile(path.join(__dirname, 'presentation', 'pages', 'auth.html')); // Reload auth page
      }

      let isInserted = insertUser(email, password);



      if (isInserted) {
        userId = getUserId(email, password);
        req.session.userId = userId;  // Store user in session
        return res.redirect('/home');
      }
    }

    // Default case (invalid submission)
    return res.sendFile(path.join(__dirname, 'presentation', 'pages', 'auth.html'));
  });


app.route('/home')
  // Handle GET request for the home page
  .get((req, res) => {
    if (!req.session.userId) {
      return res.redirect('/');
    }
    // Serve the home page if the user is logged in
    console.log("arrived")
    res.sendFile(path.join(__dirname, 'presentation', 'pages', 'home.html'));
  })
  // Handle POST request for form submission
  .post((req, res) => {
    const formType = req.body.form_type;


    if (formType === 'recom') {
      const date = req.body.date;
      const startHour = req.body.startHour;
      const endHour = req.body.endHour;
      const lightWeight = req.body.lightWeight || null;
      const airWeight = req.body.airWeight || null;
      const co2Weight = req.body.co2Weight || null;
      const humidityWeight = req.body.humidityWeight || null;
      const soundWeight = req.body.soundWeight || null;
      const temperatureWeight = req.body.temperatureWeight || null
      const vocWeight = req.body.vocWeight || null;

      const amountComp = req.body.amountComp || null;
      const amountSeat = req.body.amountSeat || null;
      const projector = req.body.projector || null;
      const amountRob = req.body.amountRob || null;

      // Call the API for results and return JSON
      const result = finalBestRanking(date, startHour, endHour, vocWeight, null, temperatureWeight, null, lightWeight, null, airWeight, null, null, co2Weight, null, humidityWeight, null, soundWeight, null, amountComp, amountSeat, projector, amountRob);
      insertBooking(formattedResults[0]?.roomNumber, date, startHour, endHour, userId);

      const formattedResults = Object.entries(result)
        .sort((a, b) => b[1] - a[1])
        .map(([room, score]) => ({ roomNumber: room, score }));

      return res.json({ message: "Here is the ranking from the best to the worst classroom, the best one has been added to the Booking", results: formattedResults });
    }

    if (formType === 'prop') {
      const date = req.body.date;
      const startHour = req.body.startHour;
      const endHour = req.body.endHour;
      const lightWeight = req.body.lightWeight || null;
      const lightPref = req.body.lightPref || null;
      const airWeight = req.body.airWeight || null;
      const airPrefPM25 = req.body.airPrefPM25 || null;
      const airPrefPM10 = req.body.airPrefPM10 || null;

      const co2Weight = req.body.co2Weight || null;
      const co2Pref = req.body.co2Pref || null;

      const humidityWeight = req.body.humidityWeight || null;
      const humidityPref = req.body.humidityPref || null;

      const soundWeight = req.body.soundWeight || null;
      const soundPref = req.body.soundPref || null;

      const temperatureWeight = req.body.temperatureWeight || null
      const temperaturePref = req.body.temperaturePref || null

      const vocWeight = req.body.vocWeight || null;
      const vocPref = req.body.vocPref || null;

      const amountComp = req.body.amountComp || null;
      const amountSeat = req.body.amountSeat || null;
      const projector = req.body.projector || null;
      const amountRob = req.body.amountRob || null;

      // Call the API for results and return JSON
      const result = finalBestRanking(date, startHour, endHour, vocWeight, vocPref, temperatureWeight, temperaturePref, lightWeight, lightPref, airWeight, airPrefPM25, airPrefPM10, co2Weight, co2Pref, humidityWeight, humidityPref, soundWeight, soundPref, amountComp, amountSeat, projector, amountRob);

      const formattedResults = Object.entries(result)
        .sort((a, b) => b[1] - a[1])
        .map(([room, score]) => ({ roomNumber: room, score }));

      insertBooking(formattedResults[0]?.roomNumber, String(date), startHour, endHour, userId);

      return res.json({ message: "Here is the ranking from the best to the worst classroom, the best one has been added to the Booking", results: formattedResults });
    }

    // Default case: if formType is not 'recom', serve the home page
    res.sendFile(path.join(__dirname, 'presentation', 'pages', 'home.html'));
  });

// Function to get data from various APIs
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

// API to get sensor data
app.get('/api/sensor-data', (req, res) => {
  const { date, startHour, endHour } = req.query;
  res.json(getData(date, startHour, endHour));
});

// API to get facilities data
app.get('/api/facilities', (req, res) => {
  const { room } = req.query;
  res.json(getFacilitiesData(room));
});

//TODO: api for bookings
//
app.get('/api/bookings', (req, res) => {
  const { date, startHour, endHour } = req.query;
  res.json(getBookings(date, startHour, endHour));
})

// API to get the results based on user preferences
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

// Start the server
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
