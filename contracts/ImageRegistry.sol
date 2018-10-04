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

  struct Asset {
    address ref;
    uint64 id;
  }

  mapping(address => Asset) public allAssets;

  constructor() public {
    owner = msg.sender;
  }

  modifier onlyAdmin {
    require(owner == msg.sender);
    _;
  }

  modifier assetExists(address ref) {
    require(allAssets[ref].ref != 0);
    _;
  }

  function addAsset(address _ref, uint64 _id) public {
    allAssets[_ref] = Asset(_ref, _id);
    emit AssetAdded(_ref, _id, msg.sender);
  }

  function removeAsset(address ref) public onlyAdmin assetExists(ref) {
    delete allAssets[ref];
    emit AssetRemoved(ref, msg.sender);
  }

  function getAssetByHash(address ref) public view returns (address, uint64) {
    return (allAssets[ref].ref, allAssets[ref].id);
  }
}
