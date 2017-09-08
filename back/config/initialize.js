const UserCont = require('../app/dbcontroller');

module.exports = {
  init: init
}
function init(){
const erisDbFactory = require('eris-db');
const erisContracts = require('eris-contracts');
const solc = require('solc');
const ERIS_URL = "http://127.0.0.1:1337/rpc"
const accounts = require("./accounts.js").accounts


var erisdb; /* ErisDB Factory */
var erisdbURL; /* ErisDB RPC URL */
var pipe; /* Pipe for creating contracts */
var contractManager;/* Contract Manager for creating contracts*/
var FULL_ACCOUNT = "42C5F373990E4A48FB894EC381A77C8E1127E898";
var greeterSource = 'contract medical  {    /* define variable greeting of the type string */    string data;    /* this runs when the contract is executed */    function medical(string _data) public {        data = _data;    }    /* main function */    function getRecord() constant returns (string) {        return data;    }         /* main function */    function setRecord(string _data){        data = _data;        }}'


/*Initialize ERISDB*/
erisdb = erisDbFactory.createInstance(ERIS_URL);
erisdb.start(function(error){
    if(!error){
        console.log("Ready to go");
    }
});

pipe = new erisContracts.pipes.DevPipe(erisdb, accounts); /* Create a new pipe*/
contractManager = erisContracts.newContractManager(pipe); /*Create a new contract object using the pipe */


/* Compile the Greeter Contract*/
var compiledContract = solc.compile(greeterSource);
//console.log(compiledContract)
var contractFactory = contractManager.newContractFactory(JSON.parse(compiledContract.contracts.medical.interface)); //parameter is abi
// console.log(contractFactory)
var record = {name: "Jonh", surname:"Cost", sex:"Male", birthdate:"20/04/1995", nationality:"Spanish", phone:"9292929112", desease:"A001 Cholera due to Vibrio cholerae 01, biovar eltor"}
console.log(record)
var instance;
/* Send the contract */
contractFactory.new.apply(contractFactory, [JSON.stringify(record),
 {from: FULL_ACCOUNT, data:compiledContract.contracts.medical.bytecode}, (err, contractInstance)=> {
  console.log(contractInstance.address);
  UserCont.createContract({address:contractInstance.address.toString(), name:"medicalRecord"})
  .then(resp => {
    console.log(resp)
  }).catch(err => {
    console.log(err);
  })
 }]);

 }
