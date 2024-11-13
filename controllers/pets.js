const Pet = require('../models/pet.js');
const express = require('express');
const router = express.Router();


// Write you controller functions here.

// CREATE - POST - /pets
router.post('/', async (req, res) => {
  try {
    // Create a new pet
    const createdPet = await Pet.create(req.body);
    res.status(201).json(createdPet);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// READ - GET - /pets
router.get('/', async (req, res) => {
  try {
    const foundPets = await Pet.find();
    res.status(200).json(foundPets);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// READ - GET - /pets/:petId
router.get('/:petId', async (req, res) => {
  try {
    console.log(req.params.petId);
    const foundPet = await Pet.findById(req.params.petId);

    if (!foundPet) {
      res.status(404);
      throw new Error('Pet not found.');
    }


    res.status(200).json(foundPet);
  } catch (error) {
    if (res.statusCode === 404) {
      res.json({ error: error.message });
    } else {
      res.status(500).json({ error: error.message });
    }
  }
})

// DELETE - DELETE - /pets/:petId
router.delete('/:petId', async (req, res) => {
  try {
    const adoptedPet = await Pet.findByIdAndDelete(req.params.petId);

    if (!adoptedPet) {
      res.status(404);
      throw new Error('Pet not found.');
    }

    res.status(200).json(adoptedPet);
  } catch (error) {
    if (res.statusCode === 404) {
      res.json({ error: error.message });
    } else {
      res.status(500).json({ error: error.message });
    }
  }
});

// UPDATE - PUT - /pets/:petId
router.put('/:petId', async (req, res) => {
  try {
    const updatedPet = await Pet.findByIdAndUpdate(req.params.petId, req.body, { new: true });

    if (!updatedPet) {
      res.status(404);
      throw new Error('Pet not found.');
    }

    res.status(200).json(updatedPet);
  } catch (error) {
    if (res.statusCode === 404) {
      res.json({ error: error.message });
    } else {
      res.status(500).json({ error: error.message });
    }
  }
});

// Export the router at the bottom of the file
module.exports = router;