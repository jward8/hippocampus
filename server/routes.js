const userRoutes = require('./api/user');
const express = require('express');
const router = express.Router();

router.get('/api/v1', (req, res) => {
    res.send('Hello World!')
})

router.use('/api/v1/user', userRoutes);

module.exports = router;