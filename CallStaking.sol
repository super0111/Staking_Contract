//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/utils/Context.sol";
import "@openzeppelin/contracts/utils/Address.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";
import "@openzeppelin/contracts/utils/structs/EnumerableSet.sol";

contract CallStaking is Ownable, ReentrancyGuard {
  using SafeMath for uint256;
  using Address for address;
  using EnumerableSet for EnumerableSet.AddressSet;

  // Dev address.
  address public devaddr;

  uint256 public apr = 624;  // 6.24 percent 624 / 10000
  uint256 minStakePeriod = 7 days;

  struct StakeStruct {
    uint256 amount;
    uint256 rewards;
    uint256 depositAt; // deposit timestamp
  }

  EnumerableSet.AddressSet investors;
  mapping(address => StakeStruct) stakes;

  constructor() {
  }

  modifier onlyDev() {
      require(msg.sender == owner() || msg.sender == devaddr , "Error: Require developer or Owner");
      _;
  }

  function setDev(address _dev) external onlyDev nonReentrant {
    devaddr = _dev;
  }

  function setApr(uint256 _apr) external onlyDev nonReentrant {
    apr = _apr;
  }

  function _getRewards(uint256 amount, uint256 depositAt) internal view returns (uint256) {
    if (block.timestamp > depositAt + minStakePeriod) {
      return amount.mul(block.timestamp - depositAt).mul(apr).div(10000).div(365 days);
    } else return 0;
  }

  function deposit() external payable nonReentrant {
    require(msg.value > 0, "Attemping zero staking");
    if (investors.contains(msg.sender)) {
      StakeStruct storage stakeItem = stakes[msg.sender];
      uint256 _newRewards = _getRewards(stakeItem.amount, stakeItem.depositAt);
      if (_newRewards > 0) stakeItem.rewards = stakeItem.rewards.add(_newRewards);
      stakeItem.amount = stakeItem.amount.add(msg.value);
    } else {
      StakeStruct memory stakeItem = StakeStruct(msg.value, 0, block.timestamp);
      investors.add(msg.sender);
      stakes[msg.sender] = stakeItem;
    }
  }

  function claimRewards() external nonReentrant {
    require(investors.contains(msg.sender), "No investor");
    StakeStruct storage stakeItem = stakes[msg.sender];
    require(stakeItem.amount > 0, "Invalid stake");
    uint256 rewards = stakeItem.rewards + _getRewards(stakeItem.amount, stakeItem.depositAt);
    stakeItem.rewards = 0;
    stakeItem.depositAt = block.timestamp;
    (bool success, ) = msg.sender.call{value: rewards}("");
    require(success, "Failed to claim rewards");
  }

  function withdraw(uint256 amount) external nonReentrant {
    require(investors.contains(msg.sender), "No investor");

    StakeStruct storage stakeItem = stakes[msg.sender];
    require(stakeItem.amount >= amount, "Invalid stake");

    uint256 rewards = stakeItem.rewards + _getRewards(stakeItem.amount, stakeItem.depositAt);
    uint256 _newAmount = stakeItem.amount - amount;

    if (_newAmount == 0) {
      investors.remove(msg.sender);
      delete stakes[msg.sender];
    } else {
      stakeItem.depositAt = block.timestamp;
      stakeItem.amount = _newAmount;
      stakeItem.rewards = 0;
    }
    
    (bool success, ) = msg.sender.call{value: amount + rewards}("");
    require(success, "Failed to claim rewards");
  }

  function withdrawAll() external {
    require(investors.contains(msg.sender), "No investor");

    StakeStruct storage stakeItem = stakes[msg.sender];
    require(stakeItem.amount > 0, "Invalid stake");

    uint256 rewards = stakeItem.rewards + _getRewards(stakeItem.amount, stakeItem.depositAt);
    
    (bool success, ) = msg.sender.call{value: stakeItem.amount + rewards}("");
    require(success, "Failed to claim rewards");

    investors.remove(msg.sender);
    delete stakes[msg.sender];
  }

  function getTotalInvests() external view returns (uint256 totalInvests) {
    for (uint256 index = 0; index < investors.length(); index++) {
      address _account = investors.at(index);
      totalInvests += stakes[_account].amount;
    }
  }

  function getTotalInvestors() external view returns (uint256) {
    return investors.length();
  }

  function getStakingData(address _account) external view returns (uint256 invests, uint256 rewards) {
    if (investors.contains(_account)) {
      StakeStruct memory stakeItem = stakes[_account];
      invests = stakeItem.amount;
      rewards = stakeItem.rewards + _getRewards(stakeItem.amount, stakeItem.depositAt);
    }
  }

  // adding pool by owner
    function depositFunds() external payable onlyDev returns(bool) {
        require(msg.value > 0, "you can deposit more than 0 snt");
        return true;
    }

    function withdrawFunds(uint256 amount) external onlyDev nonReentrant {
        // transfer fund
        (bool success, ) = msg.sender.call{value: amount}("");
        require(success, "Failed to withdraw funds");
    }

}
