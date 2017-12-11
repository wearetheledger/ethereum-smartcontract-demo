const SimpleContract = artifacts.require('SimpleContract');


module.exports = function(deployer) {
  // deploy SimpleContract with an owners name as parameter
  deployer.deploy(SimpleContract,"Kevin Leyssens");
}
