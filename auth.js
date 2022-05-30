var express = require('express'),
    router = express.Router();
var mongo = require("./db")
router.use(express.json());
const md5 = require("md5")
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

router.post('/login', async function(req, res, next){
    console.log(req.body)
    var email = req.body.email;
    var password = req.body.password;
    var newPass = md5(password)
    var result = await mongo.search('users', {email: email, password: newPass});
    if(result.length == 1)
    {
        var jwQ = {id: result[0].id, email: result[0].email}
    var token = await jwt.sign(jwQ, process.env.JWT_TOKEN, { expiresIn: '180000000s' });
    res.send({success: true, accessToken: token});
    }
    else
    {
        res.send({success: false});
    }
    
  })

  router.post('/register', async function(req, res, next){
    var email = req.body.email;
    var password = req.body.password;
    var result = await mongo.search('users', {email, email});
    if(result.length == 0)
    {
        var newPass = md5(password);
        var id = await mongo.count('users');
        query = {id: id, email: email, password: newPass}
        insert = await mongo.insert('users', query);
        if(insert)
        {
            var jwQ = {id: id, email: email}
            var token = await jwt.sign(jwQ, process.env.JWT_TOKEN, { expiresIn: '180000000s' });
            res.send({success: true, accessToken: token});
            
        }

    }
    else{
        res.send({success: false});
    }
    
  })

module.exports = router;