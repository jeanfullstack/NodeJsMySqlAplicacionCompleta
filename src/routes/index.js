const express = require('express'); //Crea nuevas rutas principales o secundarias
const router = express.Router();

router.get('/', (req, res) =>{
    res.render('index');

});

module.exports = router;





