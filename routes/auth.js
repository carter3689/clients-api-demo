

const router = require('express').Router();

const bcrypt = require('bcryptjs');

const jwt = require('jsonwebtoken');

const knex = require('../knex-config');

async function saveData(first_name,last_name,email,password){
    return await knex('user')
        .insert([
            {first_name:first_name,
            last_name:last_name,
            email:email,
            password:password
        }
        ])
}

async function hashPass(password){
    let passwordHashed;
    const hash = await bcrypt.hash(password,10).then(hash => {
        passwordHashed = hash;
    })

    return passwordHashed
}


async function comparePass(password, passHash){
    const passMatch = await bcrypt.compare(password, passHash);

    if (passMatch){
        return passMatch
    }
    else{
        return 'Auth Failed'
    }
}




router.post('/register', (req,res) => {
    let first_name = req.body.first_name;
    let last_name = req.body.last_name
    let email = req.body.email;
    let password = req.body.password
    let hash = bcrypt.hashSync(password)

    saveData(first_name,last_name,email,hash)

    

    res.send(`Register using ${first_name}, ${last_name}, ${email} and ${hash}`);
})

router.post('/login', (req,res) => {

    knex('user')
    .where({email: req.body.email})
    .select('password','email','first_name')
    .then(function(result){
        if(!result || !result[0]){
            return 'Auth Failed'
        }
        let verfiedPass = comparePass(req.body.password,result[0].password);

        if (verfiedPass){
           let token =  jwt.sign({
                email: result[0].email,
                first_name: result[0].first_name,
                time: new Date().toLocaleTimeString()
            }, process.env.JWT_SECRET, {
               expiresIn: '1hr' 
            })
            res.send({status: 'success', token: token})
        }
        else{
            res.send({status:'Auth Failed'})
        }
    })
})



module.exports = router;

