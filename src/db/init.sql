CREATE TABLE IF NOT EXISTS room (
  room_number INTEGER PRIMARY KEY
);

CREATE TABLE IF NOT EXISTS air_quality (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  time TEXT,
  PM_25 REAL,
  PM_10 REAL,
  room_number INTEGER,
  FOREIGN KEY(room_number) REFERENCES room(room_number)
);

CREATE TABLE IF NOT EXISTS co2 (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  time TEXT,
  co2_level REAL,
  room_number INTEGER,
  FOREIGN KEY(room_number) REFERENCES room(room_number)
);

CREATE TABLE IF NOT EXISTS humidity (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  time TEXT,
  humidity_level REAL,
  room_number INTEGER,
  FOREIGN KEY(room_number) REFERENCES room(room_number)
);

CREATE TABLE IF NOT EXISTS light (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  time TEXT,
  light_intensity REAL,
  room_number INTEGER,
  FOREIGN KEY(room_number) REFERENCES room(room_number)
);

CREATE TABLE IF NOT EXISTS facilities (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  videoprojector INTEGER,
  seating_capacity INTEGER,
  computers INTEGER,
  robots_for_training INTEGER,
  room_number INTEGER,
  FOREIGN KEY(room_number) REFERENCES room(room_number)
);

CREATE TABLE IF NOT EXISTS sound (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  time TEXT,
  sound_level REAL,
  room_number INTEGER,
  FOREIGN KEY(room_number) REFERENCES room(room_number)
);

CREATE TABLE IF NOT EXISTS temperature (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  time TEXT,
  temperature REAL,
  room_number INTEGER,
  FOREIGN KEY(room_number) REFERENCES room(room_number)
);

CREATE TABLE IF NOT EXISTS voc (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  time TEXT,
  voc_level REAL,
  room_number INTEGER,
  FOREIGN KEY(room_number) REFERENCES room(room_number)
);
















