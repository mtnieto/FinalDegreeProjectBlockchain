const UserCont = require('../app/dbcontroller');
const erisDbFactory = require('eris-db');
const erisContracts = require('eris-contracts');
const solc = require('solc');
const ERIS_URL = "http://127.0.0.1:1337/rpc"
const accounts = require("../config/accounts.js").accounts

module.exports = {
  interact: interact
}

function interact(myContractAddress, record){
  return new Promise((resolve, reject)=>{
    try{
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

      /* Send the contract */
      console.log(myContractAddress)
      var contractInstance = contractFactory.at(myContractAddress);
      console.log("entrada" + JSON.stringify(record))

      contractInstance["setRecord"].apply(contractInstance,[JSON.stringify(record), {from: FULL_ACCOUNT},(error,result)=>{
          if(!error){
            contractInstance["getRecord"].apply(contractInstance, [(err,res)=> {
               if (err) {
                 console.log(err);
               }
              else {
                console.log("Get" + res);
                resolve(res)
            }
          }])
          }else{
          console.log(error)
        }
     } ]);

    }
    catch(err){
     reject([400, err]);
    }

  })

 }
