
//Object to access the user's mode
const User = require('./user');
const Contract = require('./contract')
//Object to simplify the creation of the response
const restTemplate = require('../config/restTemplate');

/*
* Expose the functions of the file
*/
module.exports = {
    getUsers: getUsers,
    getUser: getUser,
    createUser: createUser,
    createContract: createContract,
    getContract: getContract,

}
/*
* Function that will recover and return all the Users in the database
*/
function getUsers(){
    return new Promise((res, rej) => {
        User.find({})
        .then(data => {
            return res(restTemplate(false, data));
        }).catch(err => {
            return rej(restTemplate(true, err));
        })
    });
}

function getContract(newContract){
    return new Promise((res, rej) => {
        Contract.findOne(newContract)
        .then(data => {
            return res(restTemplate(false, data));
        }).catch(err => {
            return rej(restTemplate(true, err));
        })
    });
}
function createContract(newContract){
    return new Promise((res, rej) => {
        Contract.findOne(newContract)
		.then(found => {
			if(found){
        console.log(found)
				return rej(restTemplate(true, 'COntract already in DB'));
			}else{
				var contract = new Contract(newContract);
				return contract.save();
			}
		}).then(result => {
			return res(restTemplate(false, 'Contract added successfully'));
		}).catch(err => {
			return rej(restTemplate(true, err));
		})
    });
}
/*
* Function that will recover and return an specific user in the database
*/
function getUser(user){
  return new Promise((res,rej)=>{
    User.findOne(user)
        .then(data => {
            return res(restTemplate(false, data));
        }).catch(err => {
            return rej(restTemplate(true, err));

          });
        });
}
/*
* Function to create a new user with the given data inside the Json
* i.e.: {username:'name', email: 'e@mail.com', password: 'passwd'}
*/
function createUser(newUser){
    return new Promise((res, rej) => {
        User.findOne(newUser)
		.then(found => {
			if(found){
				return rej(restTemplate(true, 'User already in DB'));
			}else{
				var user = new User(newUser);
				return user.save();
			}
		}).then(result => {
			return res(restTemplate(false, 'User added successfully'));
		}).catch(err => {
			return rej(restTemplate(true, err));
		})
    });
}
