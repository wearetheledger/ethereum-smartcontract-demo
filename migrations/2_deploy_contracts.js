const SimpleContract = artifacts.require('SimpleContract');


module.exports = function(deployer) {
  // deploy SimpleContract
  deployer.deploy(SimpleContract,"Kevin Leyssens");
}
