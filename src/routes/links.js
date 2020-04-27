const express = require('express');
const router = express.Router();
const {isLoggedIn}= require('../lib/auth');
const pool=require('../views/database');

router.get('/add',isLoggedIn, (req, res) => {
    res.render('rooms/add');

});
//recibir datos formulario
router.post('/add',isLoggedIn, async (req, res) => { 
    const{title, room_id} =req.body;
    const newRoom={
        title,
        room_id,
        user_id: req.user.id
    };
    const newRoomP={
        //newRoom,
        title,
        room_id,
        user_id: req.user.id,
        rol: req.user.rol
    }
    //console.log(newRoomP);
    const exists = await pool.query('SELECT * FROM rooms WHERE room_id = ?', [newRoom.room_id]); //busca a db si la room ya estacreada

    if (req.user.rol=="assistant") { 
        if(exists.length > 0){ //si ya esta creada y eres assitente solo introduces una linia en la aux si
            await pool.query('INSERT INTO participants set ?',[newRoomP]);
            req.flash('success', 'Link saved successfully');
            res.redirect('/rooms');
        }else{                  //si no esta creada y eres assitente no se introduce, puedes haverte equivocado en el ID
            req.flash('message', 'La classe no existe o bien el ID no es correcto!');
            res.redirect('/rooms/add');
        }
    }
    else
    {
    await pool.query('INSERT INTO rooms set ?', [newRoom]);
    await pool.query('INSERT INTO participants set ?',[newRoomP]);
    req.flash('success', 'Link saved successfully');
    res.redirect('/rooms');
    
    }
    
});
//consulta base de datos
router.get('/',isLoggedIn, async (req, res) => { 
    const links= await pool.query('SELECT * FROM participants WHERE user_id= ?' , [req.user.id]);
    //console.log(links);
    
    res.render('rooms/list', { links } );

});
//delete
router.get('/delete/:room_id', isLoggedIn, async (req, res) => { 
    const {room_id} =req.params; 
    console.log(room_id);
    console.log(req.user.rol);
    //Si no ets profe nomes elimines la classe de la db auxiliar (participants)
    if(req.user.rol=="assistant"){
        await pool.query('DELETE FROM participants WHERE room_id = ? and user_id=? ', [room_id, req.user.id]);
    }else{
        //si ets profe elimines la classe de les dues db, incloent les linies del alumnes de la auxiliar
        await pool.query('DELETE FROM rooms WHERE room_id= ?', [room_id]);
        await pool.query('DELETE FROM participants WHERE room_id = ? ', [room_id]);
    }
    req.flash('success', 'class deleted successfully');
    res.redirect('/rooms' );

});
//edit: mostrar datos actuales
router.get('/edit/:id', isLoggedIn, async (req, res) => { 
    const {id} =req.params;
    const links= await pool.query('SELECT * FROM rooms WHERE id= ?', [id]);
    
    res.render('rooms/edit', { link: links[0] } );


});

//edit link, UPDATE in database
router.post('/edit/:id', isLoggedIn, async (req, res) => { 
    const {id} =req.params;
    /*const{room_id} =req.body;
    const newRoom={
        room_id,
        user_id: req.user.id
        //rol=req.user.rol
        
    }*/
    await pool.query('UPDATE rooms set ? WHERE id = ?', [newLink, id]);
    //console.log(newRoom.room_id);
    console.log(req.user.id);
    console.log(req.user.rol);
    //await pool.query('INSERT INTO participants set ?', [newRoom.room_id, req.user.id]);
    await pool.query('INSERT INTO participants (room_id, user_id, rol) VALUES ("1000", "3", "master")');
    req.flash('success', 'Link edited successfully');
    res.redirect('/rooms');
});

module.exports = router;