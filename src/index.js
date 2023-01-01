const express = require('express');
const {PORT} = require('./config/serverConfig')
const app = express();
const apiRoutes = require('./routes/index');
const bodyParser = require('body-parser');

const prepareAndStartServer = () =>{

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended:true}));

    app.use('/api',apiRoutes);

    app.listen(3001,() => {
        console.log(`server started on PORT: ${PORT}`);
    })
}

prepareAndStartServer();