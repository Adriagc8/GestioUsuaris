const express = require('express');
const router = express.Router();
const {isLoggedIn}= require('../lib/auth');
const pool=require('../views/database');

router.get('/add',isLoggedIn, (req, res) => {
    res.render('links/add');

});
//recibir datos formulario
router.post('/add',isLoggedIn, async (req, res) => { 
    const{title, url, description} =req.body;
    const newLink={
        title,
        url,
        description,
        user_id: req.user.id
    };
    await pool.query('INSERT INTO links set ?', [newLink]);
    req.flash('success', 'Link saved successfully');
    res.redirect('/links');
});
//consulta base de datos
router.get('/',isLoggedIn, async (req, res) => { 
    const links= await pool.query('SELECT * FROM links WHERE user_id= ?' , [req.user.id]);
    res.render('links/list', { links } );

});
//delete
router.get('/delete/:id', isLoggedIn, async (req, res) => { 
    const {id} =req.params;
    await pool.query('DELETE FROM links WHERE ID = ?', [id]);
    req.flash('success', 'Link deleted successfully');
    res.redirect('/links' );

});
//edit: mostrar datos actuales
router.get('/edit/:id', isLoggedIn, async (req, res) => { 
    const {id} =req.params;
    const links= await pool.query('SELECT * FROM links WHERE id= ?', [id]);
    
    res.render('links/edit', { link: links[0] } );


});

//edit link, UPDATE in database
router.post('/edit/:id', isLoggedIn, async (req, res) => { 
    const {id} =req.params;
    const{title, url, description} =req.body;
    const newLink={
        title,
        url,
        description
    }
    await pool.query('UPDATE links set ? WHERE id = ?', [newLink, id]);
    req.flash('success', 'Link edited successfully');
    res.redirect('/links');
});

module.exports = router;