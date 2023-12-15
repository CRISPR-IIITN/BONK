const express = require('express');
const router = express.Router();

const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/hostel')
    .then(() => console.log('Connected to MongoDB...'))
    .catch(err => console.error('Could not connect to MongoDB...', err));

const schema = new mongoose.Schema({
    room: Number,
    download: Number,
    upload: Number,
    ping: Number,
    lastSpeedTest: { type: Date, default: Date.now } // Gets updated each time
})

const Room = mongoose.model('Room', schema);

router.get('/', async (req, res) => {
  try {
      const rooms = await Room.find();
      res.send(rooms);
  } catch (err) {
      res.status(500).send(err.message);
  }
});

router.get('/:id', async (req, res) => {
  try {
    const requestedRoom = parseInt(req.params.id);
    let rooms;

    // Send all rooms of that floor as array
    if (requestedRoom <= 10) {
      const allRooms = await Room.find();
      rooms = allRooms.filter(room => Math.floor(room.room / 100) === requestedRoom);
      if (rooms.length === 0) return res.status(404).send('Floor does not exist.');
    }
    // Send the particular room
    else {
      rooms = await Room.findOne({room: requestedRoom});
      if(!rooms) return res.status(404).send('Room not found.');
    }

    res.send(rooms);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

router.post('/initialize', async (req, res) => {
  for (let i=1;i<=10;i++) {
    for (let j=1;j<=56;j++) {
      try {
        const newRoom = new Room({
          room: i*100+j,
          upload: 0,
          download: 0,
          ping: 0
        });
        await newRoom.save();
      }
      catch (err) {
        res.status(500).send(err.message);
      }
    }
    console.log(`Floor ${i} initialized.`);
  }

  res.send('All rooms initialized.');
});

const missedParamsPost = (params) => {
  let missingParams = [];
  if (params.room == null) missingParams.push('room');
  if (params.upload == null) missingParams.push('upload');
  if (params.download == null) missingParams.push('download');
  if (params.ping == null) missingParams.push('ping');

  return missingParams;
}

router.post('/', async (req, res) => {
  const { room, upload, download, ping } = req.body;

  // Check for missing parameters
  const missingParams = missedParamsPost(req.body);

  if (missingParams.length) {
      return res.status(400).send(`Missing required parameter(s): ${missingParams.join(', ')}`);
  }

  // Validate room number with regex
  const roomRegex = /^([1-9]|10)(0[1-9]|[1-4][0-9]|5[0-6])$/;
  if (!roomRegex.test(String(room))) {
      return res.status(400).send('Invalid room number.');
  }

  // Create a new Room document
  const newRoom = new Room({
      room: room,
      upload: upload,
      download: download,
      ping: ping
  });

  // Save the new Room document
  try {
      const savedRoom = await newRoom.save();
      res.send(savedRoom);
  } catch (err) {
      res.status(500).send(err.message);
  }
});

const missedParamsPut = (params) => {
  let missingParams = [];
  if (params.upload == null) missingParams.push('upload');
  if (params.download == null) missingParams.push('download');
  if (params.ping == null) missingParams.push('ping');

  return missingParams;
}

const randomAssign = async (req, res) => {
  try {

    for (let i=1;i<=10;i++) {
      for (let j=1;j<=56;j++) {
        await Room.findOneAndUpdate(
          { room: i*100+j },
          { 
            upload: Math.floor(Math.random() * (150 - 30 + 1)) + 30,
            download: Math.floor(Math.random() * (150 - 30 + 1)) + 30,
            ping: Math.floor(Math.random() * (120 - 10 + 1)) + 10,
            lastSpeedTest: Date.now()
          }
        );
      }
    }

    res.send('All rooms updated.');
  } catch (err) {
    res.status(500).send(err.message);
  }
}

router.put('/:room', async (req, res) => {
  const { upload, download, ping } = req.body;

  // Randomly assign values to all rooms
  if (req.params.room === 'randomAssign') {
    const returnMessage = randomAssign(req, res);
    return returnMessage;
  }

  // Check for missing parameters
  const missingParams = missedParamsPut(req.body);

  if (missingParams.length) {
      return res.status(400).send(`Missing required parameter(s): ${missingParams.join(', ')}`);
  }

  // Find the room and update it
  try {
    const updatedRoom = await Room.findOneAndUpdate(
      { room: req.params.room },
      { 
        upload, 
        download, 
        ping, 
        lastSpeedTest: Date.now() 
      },
      { new: true }
    );

    if (!updatedRoom) {
      return res.status(404).send('Room not found.');
    }

    res.send(updatedRoom);
  } catch (err) {
      res.status(500).send(err.message);
  }
});

module.exports = router;