const UserRepository = require('../repository/user-repository');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const {JWT_KEY} = require('../config/serverConfig');
const { response } = require('express');

const userRepo = new UserRepository();
class UserService {
    constructor(){ //must be inside constructor when u need it inside the class UserService
        this.userRepository = new UserRepository();
    }
    
    async create(data){
        try {
            const user = await this.userRepository.create(data);
            return user;
        } catch (error) {
            console.log("Something went wrong in the service layer");
            throw error;
        }
    }

    async signIn(email,plainPassword){
        try {
            //step1 -> fetch the user using email
            const user = await this.userRepository.getByEmail(email);
           
            //step2 -> compare incoming plain password with the stored encrypted password
            const passwordMatch = this.checkPassword(plainPassword,user.password);

            if(!passwordMatch){
                console.log("Password doesnt match");
                throw {error: 'Incorrect password'};
            }
            //step 3 -> if password match then create a token and send it to the user
            const newJWT = this.createToken({email:user.email, id: user.id});
            return newJWT;
        } catch (error) {
            console.log("Something went wrong in the signIn process");
            throw error;
        }
    }

    async isAuthenticated(token){
        try {
            const reponse = this.verifyToken(token);
            if(!reponse){
                throw {error: 'Invalid token'}
            }
            const user = this.userRepository.getById(response.id);
            if(!user){
                throw {error: 'No user with the corresponding token exists'};
            }
            return user.id;
        } catch (error) {
            console.log("something went wrong in the auth process");
            throw error;
        }
    }

    createToken(user){
        try {
            const result = jwt.sign(user,JWT_KEY,{expiresIn: '1d'});
            return result;
        } catch (error) {
            console.log("Something went wrong in token creation");
            throw error;
        }
    }

    verifyToken(token){
        try {
            const response = jwt.verify(token,JWT_KEY);
            return response;
        } catch (error) {
            console.log("Something went wrong in token validation");
            throw error;
        }
    }

    checkPassword(userInputPlainPassword,encryptedPassword){
        try {
            return bcrypt.compareSync(userInputPlainPassword,encryptedPassword);
        } catch (error) {
            console.log("Something went wrong in password comparison");
            throw error;
        }
    }
}

module.exports = UserService; //dont enclode inside flower bracket when exporting class