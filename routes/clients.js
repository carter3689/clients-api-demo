const router = require('express').Router();

const knex = require('../knex-config')

const authGuard = require('../authGaurd/authGaurd');
const { update, del } = require('../knex-config');

router.get('/clients/:id', authGuard, async(req,res) =>{
    const id = parseInt(req.params.id);
    const client = await getClient(id);
    res.json({status: 'success', data : {client: client}});
});


router.post('/clients/create', authGuard, async(req,res) => {
    let client_name = req.body.client_name
    let slogan = req.body.slogan
    let location = req.body.location

    let new_client = await createClient(client_name,slogan,location);

    res.send({status:'success'})
})

router.get('/clients', async(req,res) => {
    all_clients = await getAllClients();
    res.send({status:'success', data : {clients: all_clients}})
})

router.post('/clients/update/:id', authGuard, async(req,res) =>{
    let id = req.params.id;
    let client_name = req.body.client_name;
    let slogan = req.body.slogan;
    let location = req.body.location;

    let client_updated = await updateClient(id,client_name, slogan, location)

    res.json({status:'success', data: {client_updated: client_updated}})
})

router.delete('/clients/delete/:id', authGuard, async(req,res) => {
    let id =  req.params.id;
    let deletedClient = await deleteClient(id);

    res.send({status:'success', data:{client_deleted:deletedClient}})
})

async function getClient(id){
    return await knex
        .select('*')
        .from('clients')
        .where('id', id)
}

async function createClient(client_name, slogan,location){
    return await knex('clients')
        .insert({client_name: client_name,
                slogan:slogan,
                location
        })
}

async function getAllClients(){
    return await knex('clients')
        .select('*')
}

async function updateClient(id, client_name,slogan,location){
    return await knex('clients')
        .update({client_name:client_name, slogan: slogan,location:location})
        .where('id',id)
}

async function deleteClient(id){
    return await knex('clients')
        .where({id:id})
        .del()
}
module.exports = router