pragma solidity ^0.4.24;

/**
 * @title ImageRegistry
 * @dev A quick example contract to show dapp interactions with events
 */
contract ImageRegistry {
  address public owner;

  /// @dev Events
  event AssetAdded(address indexed ref, uint64 id, address sender);
  event AssetRemoved(address indexed ref, address sender);

  mapping(address => uint) public allAssets;

  constructor() public {
    owner = msg.sender;
  }

  function addAsset(address ref, uint64 id) public {
    allAssets[ref] = id;
    emit AssetAdded(ref, id, msg.sender);
  }

  function removeAsset(address ref) public {
    delete allAssets[ref];
    emit AssetRemoved(ref, msg.sender);
  }
}
