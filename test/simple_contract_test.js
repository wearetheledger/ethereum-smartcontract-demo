contract('SimpleContractTest', function(accounts) {

  var SimpleContract = artifacts.require("SimpleContract");

  var metaSimpleContract;

  it("Should initialize the constructor in a correct way", function() {
    return SimpleContract.new("NameOfOwner").then(function(instance){
      metaSimpleContract = instance;
      return metaSimpleContract.nameOwner.call();
    }).then(function(name){
      assert.equal(name,"NameOfOwner");
    });
  });

  it("Should be deployed with Kevin Leyssens as an owner", function() {
    return SimpleContract.deployed().then(function(instance){
      metaSimpleContract = instance;
      return metaSimpleContract.nameOwner.call();
    }).then(function(name){
      assert.equal(name,"Kevin Leyssens");
    });
  });


  it("Should send money through the fallback function", function() {
    return SimpleContract.deployed().then(function(instance){
      metaSimpleContract = instance;
      //send 1 ETH
      return metaSimpleContract.sendTransaction({from: accounts[0], gas: 3000000, value: 1000000000000000000});
    }).then(function(){
      return web3.eth.getBalance(metaSimpleContract.address);
    }).then(function(balance){
      // conract should have 1 ETH
      assert.equal(balance.toNumber(),"1000000000000000000","Should be 1");
    });
  });

  it("Should fail when not the owner tries to withdraw money", function() {
    var inThen= false;

    return SimpleContract.deployed().then(function(instance){
      metaSimpleContract = instance;
      //send 1 ETH
      return metaSimpleContract.withdrawMoney({from: accounts[1], gas: 3000000});
    }).then(function(){
      inThen = true;
      assert.ok(false, "Should have failed");
    }).catch(function(err){
      if(inThen){
        assert.ok(false,"Should have failed, because accounts[1] is not the owner");
      } else {
        assert.ok(true, "Failed successfull");
      }
    });
  });


  it("Should transfer the right amount to the owner and contract should have a zero balance afterwards", function() {
    var previousbalance;

    return SimpleContract.deployed().then(function(instance){
      metaSimpleContract = instance;
      //send 1 ETH
      return web3.eth.getBalance(accounts[0]);      
    }).then(function(balance){
      previousbalance = balance.toNumber();
      return true;
    }).then(function(){
      return metaSimpleContract.withdrawMoney({from: accounts[0], gas: 3000000});
    }).then(function(){
      return web3.eth.getBalance(metaSimpleContract.address);
    }).then(function(balance){
      assert.equal(balance.toNumber(), 0, "Should be 0, transfered all the money to accounts[0]");
    }).then(function(){
      return web3.eth.getBalance(accounts[0]);      
    }).then(function(balance){
      assert.ok(balance.toNumber() > previousbalance, "Should be more, because of the transfer of 1 ETH from the contract to the owner.");
    })
    ;
  });


});
