const { Client } = require('pg');
const dotenv = require('dotenv');
dotenv.config();

const client = new Client({
    user: "viga_c0g9_user",
    password: "5gaq899lsi0sbnBrySEOL8XyafzcS6dV",
    host: 'dpg-co3i3ckf7o1s738hov50-a.oregon-postgres.render.com',
    port:5432,
    database:"viga_c0g9",
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
