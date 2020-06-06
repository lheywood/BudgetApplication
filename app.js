global.basedir = __dirname;
const config = require( "./config" );
const express = require( "express");
const path = require( "path" );
const bodyParser = require( "body-parser" );

const app = express();
const port = process.env.PORT || 453;

const mssql = require('mssql');
const routes = require('./routes');

app.disable('etag');

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use('/', routes);
app.use(express.static(path.join(__dirname, '/client')));

mssql.connect(config.sql).then(pool => {
    if(pool.connecting){
        console.log("Connectign to database...")
    }
    if(pool.connected){
        app.listen(port, () => {
            console.log('Server listening at port %d', port);
        });
    }
    return pool;
}).catch(function(err){
    console.log("Error connecting to db");
    console.log(err);
});







