contract mortal {
    /* Define variable owner of the type address*/
    address owner;

    /* this function is executed at initialization and sets the owner of the contract */
    function mortal() { owner = msg.sender; }

    /* Function to recover the funds on the contract */
    function kill() { if (msg.sender == owner) selfdestruct(owner); }
}

contract medical is mortal {
    /* define variable greeting of the type string */
    string data;

    /* this runs when the contract is executed */
    function medical(string _data) public {
        data = _data;
    }

    /* main function */
    function getRecord() constant returns (string) {
        return data;
    }

     /* main function */
    function setRecord(string _data){
        data = _data;

    }
}
