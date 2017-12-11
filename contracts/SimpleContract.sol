pragma solidity 0.4.18;

// Simple contract written in solidity
contract SimpleContract {
    address public owner;
    string public nameOwner;

    // event, fired when the fallback function is called
    event Fallback(address sender, uint256 amount);

    
    // Throws if called by any account other than the owner.
    modifier onlyOwner() {
        require(msg.sender == owner);
        _;
    }

    // This is the constructor which has a name parameter
    function SimpleContract(string _nameOwner) public{
        owner = msg.sender;
        nameOwner = _nameOwner;
    }

    // This is the fallback function. The payable parameter specifies that 
    // you can deposit some ETH on the contract.
    function() payable public {
        // send event
        Fallback(msg.sender, msg.value);
    }

    // This function can only called upon by the owner of this contract.x
    function withdrawMoney() onlyOwner public {
        owner.transfer(this.balance);
    }



}