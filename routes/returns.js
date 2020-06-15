// POST /api/returns {customerId, movieId}

// Return 401 if client is not logged in
// Return 400 if customerId is not provided
// Return 400 if movieId is not provided
// Return 404 if no rental found for this customer/movie
// return 400 if rental already returned
// Return 200 if valid request
// set return date
// calculate the rental fee
// increase the stock
// return summary of rental

const express = require('express');
const { Genre, validate } = require('../models/genre');
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');
const validateObjectId = require('../middleware/validateObjectId');

const router = express.Router();

router.post('/', async (req, res) => {
	res.status(401).send('Unauthorized');
});

module.exports = router;
