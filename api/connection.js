const { Client } = require('pg');

const client = new Client({
	user: 'postgres',
	password: 'root',
	host: '::1',
	port: '5432',
	database: 'postgres',
});
 
 
    


 

client.connect().then(()=>{
    console.log('connected to postgreSQL DB');
}).catch((err)=>{
    console.error('error connecting failure:',err)
})

module.exports = client;

