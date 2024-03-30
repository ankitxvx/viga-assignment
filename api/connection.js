const { Client } = require('pg');
const dotenv = require('dotenv');
dotenv.config();

const client = new Client({
    user: process.env.USER ,
    password: process.env.PASSWORD,
    host: process.env.HOST,
    port:5432,
    database:process.env.DB,
    ssl: true,  
});

client.connect() 
    .then(() => {
        console.log('Connected to PostgreSQL DB');
    })
    .catch((err) => {
        console.error('Error connecting to PostgreSQL:', err);
    }); 

module.exports = client; 
