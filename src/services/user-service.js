const UserRepository = require('../repository/user-repository');
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
}

module.exports = UserService; //dont enclode inside flower bracket when exporting class