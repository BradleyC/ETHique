const ethique = artifacts.require('./Ethique.sol')

module.exports = async deployer => {
  deployer.deploy(ethique, 666666666666666, "tweet", "TWEET")
}
