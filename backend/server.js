const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT || 3001;
const { ObjectId } = require('mongodb');


app.use(express.json());
app.use(cors());

const uri = 'mongodb+srv://admin:vetDB2022SPE@vetdb.qbxlez2.mongodb.net/vetDB?retryWrites=true&w=majority';
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true});

const connection = mongoose.connection;
connection.once('open', () => {
  console.log('MongoDB database connection established successfully');
});

// Define the schema for the registration collection
const registrationSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  studentNumber: String,
  universityEmail: String,
  course: String,
  password: String,
  type: String,
});

// Define the schema for the account collection
const accountSchema = new mongoose.Schema({
firstName: String,
lastName: String,
universityEmail: String,
studentNumber: String,
course: String,
password: String,
type: String,
});

const placementSchema = new mongoose.Schema({
  id: Number,
  placementType: String,
  animalType: String,
  provider: String,
  address: String,
  county: String,
  postcode: String,
  country: String,
  contactName: String,
  positionAtPractice: String,
  email: String,
  phoneNumber: String,
  website: String,
  accommodation: Boolean,
  spaExpiryDate: String,
  notes: String,
});

// Define the models for the registration and account collectionss
const Registration = mongoose.model('registrations', registrationSchema);
const Account = mongoose.model('accounts', accountSchema);
const Placement = mongoose.model('placements', placementSchema);


// Store registration request and prevent register using same university email
app.post('/api/register', async (req, res) => {
    const { firstName, lastName, studentNumber, universityEmail, course, password, type } = req.body;
    console.log('Recived Registration Request', req.body);
    // Check if email is already registered
    const registrationRecord = await Registration.findOne({ universityEmail });
    const accountRecord = await Account.findOne({ universityEmail });
  
    if (registrationRecord || accountRecord) {
      return res.status(409).send({ message: 'This email has already been registered' });
    }
  
    // Create a new registration record
    const newRegistration = new Registration({
      firstName,
      lastName,
      studentNumber,
      universityEmail,
      course,
      password,
      type,
    });
  
    try {
      await newRegistration.save();
      console.log('Registration saved to database');
      res.send({ message: 'Registration received' });
    } catch (error) {
      console.log('Error saving registration to database', error);
      res.status(500).send({ message: 'Error saving registration to database' });
    }
  });
  

// GET /api/registration - returns all registration requests
app.get('/api/registration', (req, res) => {
    Registration.find({}, { password: 0 }, (error, registrations) => {
      if (error) {
        console.error(error);
        res.status(500).send('Internal server error');
      } else {
        res.send(registrations);
      }
    });
  });
  
  // POST /api/approve - approves a registration request and moves it to the accounts collection
  app.post('/api/approve', (req, res) => {
    console.log('Approving:', req.body)
    const { universityEmail } = req.body;
  
    Registration.findOne({ universityEmail }, (error, registration) => {
      if (error) {
        console.error(error);
        res.status(500).send('Internal server error');
      } else if (!registration) {
        res.status(404).send(`Registration with email ${universityEmail} not found`);
      } else {
        // Create an account from the registration
        console.log('Found account');
        const account = new Account(registration.toObject());
  
        // Remove the registration from the registration collection
        registration.remove((error) => {
          if (error) {
            console.error(error);
            res.status(500).send('Internal server error');
          } else {
            // Save the account to the accounts collection
            account.save((error) => {
              if (error) {
                console.error(error);
                res.status(500).send('Internal server error');
              } else {
                res.send('Approved');
              }
            });
          }
        });
      }
    });
  });
  
  // POST /api/disapprove - disapproves a registration request and removes it from the registration collection
  app.post('/api/disapprove', (req, res) => {
    console.log('disapprove:', req.body);
    const { universityEmail } = req.body;
  
    Registration.findOneAndRemove({ universityEmail }, (error, registration) => {
      if (error) {
        console.error(error);
        res.status(500).send('Internal server error');
      } else if (!registration) {
        res.status(404).send(`Registration with email ${universityEmail} not found`);
      } else {
        console.log('Found account');
        res.send('Disapproved');
      }
    });
  });

// Get all placements with pagination
app.get('/api/placements', async (req, res) => {
  const limit = parseInt(req.query.limit) || 0;
  const offset = parseInt(req.query.offset) || 0;
  const placements = await Placement.find().skip(offset).limit(limit);
  res.send(placements);
});

// Search placements
app.get('/api/placements/search', async (req, res) => {
  const searchQuery = req.query.q;
  console.log("searching for:",req.query.q);

  // If the search query is empty, return all placements
  if (!searchQuery) {
    const placements = await Placement.find();
    return res.send(placements);
  }

  // Use a regular expression to search for matching placements
  const regex = new RegExp(searchQuery, 'i');
  const placements = await Placement.find({
    $or: [
      { provider: regex },
      { placementType: regex },
      { animalType: regex },
      { address: regex},
      { county: regex },
      { postcode: regex },
      { country: regex },
      { contactName: regex },
      { positionAtPractice: regex },
      { email: regex },
      { phoneNumber: regex },
      { website: regex},
      { spaExpiry: regex},
      { notes: regex},
    ]
  });
  console.log("search results: ", placements );
  res.send(placements);
});
  

// Delete a placement by ID
app.delete('/api/placements/delete/:id', async (req, res) => {
  console.log("delete", req.params.id);
  const id = parseInt(req.params.id);
  const placement = await Placement.findOneAndDelete({ id });
  if (placement) {
    res.send({ message: 'Placement deleted successfully' });
  } else {
    res.status(404).send({ error: 'Placement not found' });
  }
});

// Edit a placement by ID
app.put('/api/placements/edit/:id', async (req, res) => {
  const { id } = req.params;
  const placement = await Placement.findOneAndUpdate({id}, req.body, {
    new: true,
  });
  res.send(placement);
});
  
// Get all placements with pagination and filtering
app.get("/api/animalTypes", async (req, res) => {
  const animalTypes = await Placement.distinct("animalType");

  res.json(animalTypes);
});

app.get("/api/county", async (req, res) => {
  const county = await Placement.distinct("county");

  res.json(county);
});

app.get("/api/country", async (req, res) => {
  const country = await Placement.distinct("country");
  res.json(country);
});


app.post('/api/placements/filter', async (req, res) => {
  try {
    const { accommodation, animalType, county, country, placementType } = req.body;

    const query = {};

    if (typeof accommodation === 'boolean') {
      query.accommodation = accommodation;
    }

    if (Array.isArray(animalType) && animalType.length > 0) {
      query.animalType = { $in: animalType };
    }

    if (Array.isArray(county) && county.length > 0) {
      query.county = { $in: county };
    }

    if (Array.isArray(country) && country.length > 0) {
      query.country = { $in: country };
    }

    if (Array.isArray(placementType) && placementType.length === 1) {
      query.placementType = placementType[0];
    } else if (Array.isArray(placementType) && placementType.length === 2) {
      query.placementType = { $in: placementType };
    }

    const placements = await Placement.find(query).lean();

    res.json(placements);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});



app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
