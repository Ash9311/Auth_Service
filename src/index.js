const express = require('express');
const {PORT} = require('./config/serverConfig')
const app = express();
const apiRoutes = require('./routes/index');
const bodyParser = require('body-parser');
const db = require('./models/index');
//const {User,Role} = require('./models/index');
const prepareAndStartServer = () =>{

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended:true}));

    app.use('/api',apiRoutes);

    app.listen(3001,async() => {
        console.log(`server started on PORT: ${PORT}`);
        if(process.env.DB_SYNC){
            db.sequelize.sync({alter: true})
        }
        // const u1 = await User.findByPk(4);
        // const r1 = await Role.findByPk(2);
        // u1.addRole(r1);
    })
}

prepareAndStartServer();