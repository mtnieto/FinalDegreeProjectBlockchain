pragma solidity ^0.4.0;
/**************************************************************************************/
/**********************************Contract B******************************************/
/**************************************************************************************/
/* @title Users history*/

contract ContractB{

    address private owner;
    mapping (uint => string) private history;
    uint private count;

    function ContractB(){
        owner = msg.sender;
        count = 0;
    }

    function set(string _eventReceived){

        history[count] = _eventReceived;
        count++;
    }

    function getLength() constant returns (uint){
        return count;
    }

    function getPos(uint _pos) constant returns (string){
        if(0 <= _pos)
            return history[_pos];

        return "";
    }

}/*CONTRACT END*/

/**************************************************************************************/
/**********************************Contract A******************************************/
/**************************************************************************************/

/* @title Users History Interface*/
contract ContractA{

    /*User -> ContractB reference*/
    mapping (string => address) private users;
    /*Contract owner address*/
    address private owner;


    /* This is the constructor whose code is*/
    /* run only when the contract is created.*/
    function ContractA(){
        owner = msg.sender;
    }

    function setUser(string _user, string _eventReceived){
        address addr = users[_user];
        /*If contract does not exist create one*/
        if(addr == address(0x0)){
            addr = new ContractB();

            /*Store the new created contract*/
            users[_user] = addr;
        }


        /*llamo al contrato e inserto al evento*/
        ContractB ctr = ContractB(addr);
        ctr.set(_eventReceived);
    }

    function getAddress(string _user) constant returns (address) {
        return users[_user];
    }

    function getLengthUser(string _user) constant returns (uint) {
        address addr = users[_user];
        uint len = 0;
        if(addr != address(0x0)){
            ContractB ctr = ContractB(addr);
            len = ctr.getLength();
        }
        return len;
    }
}/*CONTRACT END*/
