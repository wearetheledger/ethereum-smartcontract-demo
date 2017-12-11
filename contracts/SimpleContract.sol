pragma solidity 0.4.18;


contract SimpleContract {
    address public owner;
    string public nameOwner;

    event Fallback(address sender, uint256 amount);
    /**
    * @dev Throws if called by any account other than the owner.
    */
    modifier onlyOwner() {
        require(msg.sender == owner);
        _;
    }

    // this is the constructor
    function SimpleContract(string _nameOwner) public{
        owner = msg.sender;
        nameOwner = _nameOwner;
    }

    // this is the fallback function. The payable parameter specifies that 
    // you can deposit some ETH on the contract.
    function() payable public {
        // send event
        Fallback(msg.sender, msg.value);
    }

    function withdrawMoney() onlyOwner public {
        owner.transfer(this.balance);
    }



}