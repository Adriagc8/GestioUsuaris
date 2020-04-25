const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => { //ruta inicial
    res.render('index');
});

module.exports = router;