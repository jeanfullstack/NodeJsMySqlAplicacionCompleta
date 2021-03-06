const express = require('express');
const router = express.Router();

const pool = require('../database'); //Conexion de la base de datos
const {isLoggedIn} = require('../lib/auth');

router.get('/add', isLoggedIn, async (req, res) => {
    res.render('links/add');

});

router.post('/add', isLoggedIn, async (req, res) => { //Recibe los datos del formulario
    const { title, url, description } = req.body;
    const newLink = {
        title,
        url,
        description,
        user_id: req.user.id
    };
    await pool.query('INSERT INTO links set ?', [newLink]);
    req.flash('success', 'Link Saved Successfully');
    res.redirect('/links');
});

router.get('/', isLoggedIn, async (req, res) => {
    const links = await pool.query('SELECT * FROM links WHERE user_id = ?', [req.user.id]);
    console.log(links);
    res.render('links/list', { links });
});

router.get('/delete/:id', isLoggedIn, async (req, res) => {
    const { id } = req.params;
    await pool.query('DELETE FROM links WHERE ID = ?', [id]);
    req.flash('success', 'Link Removed Successfully');
    res.redirect('/links');
});

router.get('/edit/:id', isLoggedIn, async (req, res) => {
    const { id } = req.params;
    const links = await pool.query('SELECT * FROM links WHERE id = ?', [id]); 
    res.render('links/edit', {link: links[0]});
    
});

router.post('/edit/:id', isLoggedIn, async (req, res) => {
    const { id } = req.params;
    const { title, description, url } = req.body;
    const newLink = {
        title, 
        description,
        url
    };
    await pool.query('UPDATE links set ? WHERE id = ?', [newLink, id]);
    req.flash('success', 'Link Updated Successfully');
    res.redirect('/links');
});

module.exports = router;

//req.flash('success', 'Link saved successfully');



//console.log(req.params.id);
//res.send('DELETED');
//console.log(id);
//res.send('received');
//console.log(links[0]);
//res.send('UPDATED');
//console.log(newLink);
