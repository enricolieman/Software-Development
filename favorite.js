var express = require('express'),
    router = express.Router();
var mongo = require("./db")
var bodyParser = require('body-parser')
var urlencodedParser = bodyParser.urlencoded({ extended: false })
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const axios = require("axios")
dotenv.config();

router.put('/add', urlencodedParser, async function(req, res, next){

    var id = await mongo.count('favorite');
    query = {id: id, user_id: req.userData.id, lat: req.body.lat, long: req.body.long, kota: req.body.kota}
        insert = await mongo.insert('favorite', query);
        if(insert)
        {
            res.send({success:true, id:id});
            
        }
        else
        {
            res.send({success:false});
        }
  })

  router.get('/all', async function(req, res, next){

    query = {user_id: req.userData.id}
    find = await mongo.search('favorite', query);
            
        if(find)
        {
            res.send({success:true, data:find});
        }
  })

  router.delete('/:id', async function(req, res, next){

    query = {user_id: req.userData.id, id: +req.params.id}
    find = await mongo.delete('favorite', query);
    console.log(query);
            
        if(find)
        {
            res.send({success:true});
        }
        else
        {
            res.send({success:false})
        }
  })

module.exports = router;