var erisDbFactory = require('eris-db');

erisdb = erisDbFactory.createInstance("http://127.0.0.1:1337/rpc");
erisdb.start(function(error){
    if(!error){
        console.log("Ready to go");
    }
});

erisdb.blockchain().getLatestBlock( (err, res) => {
   console.log(res)
 });
