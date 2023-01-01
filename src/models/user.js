'use strict';
const {
  Model, STRING
} = require('sequelize');
const {SALT} = require('../config/serverConfig');
const bcrypt = require('bcrypt');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  User.init({
    email:{
    type: DataTypes.STRING,
    alloNULL: false,
    unique: true,
     validate: {
      isEmail: true
    }
  },
  password:{
   type:DataTypes.STRING,
   allowNull: false,
         validate: {
          len: [3,30]
        }
  }
},
  {
    sequelize,
    modelName: 'User',
  });

  User.beforeCreate((user)=> {
    //console.log(user);
    const encrytedPassword = bcrypt.hashSync(user.password,SALT);
    user.password = encrytedPassword;
  });

  return User;
};