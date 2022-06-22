//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/utils/Context.sol";
import "@openzeppelin/contracts/utils/Address.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";
import "@openzeppelin/contracts/utils/structs/EnumerableSet.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";

contract CallStaking is Ownable, ReentrancyGuard {
  using SafeMath for uint256;
  using Address for address;
  using SafeERC20 for IERC20;
  using EnumerableSet for EnumerableSet.AddressSet;

  // Dev address.
  address public devaddr;

  IERC20 SNTToken;

  uint256 public apr = 156;  // 1.56 percent 156 / 10000
  uint256 minStakePeriod = 7 days;

  struct StakeStruct {
    uint256 amount;
    uint256 rewards;
    uint256 depositAt; // deposit timestamp
  }

  EnumerableSet.AddressSet investors;
  mapping(address => StakeStruct) stakes;

  constructor(address sntAddress) {
    SNTToken = IERC20(sntAddress);
  }

  modifier onlyDev() {
      require(msg.sender == owner() || msg.sender == devaddr , "Error: Require developer or Owner");
      _;
  }

  function _getRewards(uint256 amount, uint256 depositAt) internal view returns (uint256) {
    if (block.timestamp > depositAt + minStakePeriod) {
      return amount.mul(block.timestamp - depositAt).mul(apr).div(10000).div(365 days);
    } else return 0;
  }

  function setSNT(IERC20 _snt) external onlyDev nonReentrant {
    SNTToken = _snt;
  }

  function setDev(address _dev) external onlyDev nonReentrant {
    devaddr = _dev;
  }

  function setApr(uint256 _apr) external onlyDev nonReentrant {
    apr = _apr;
  }

  function deposit(uint256 amount) external payable nonReentrant {
    require(amount > 0, "Attemping zero staking");

    uint256 balance = SNTToken.balanceOf(msg.sender);
    uint256 allowance = SNTToken.allowance(msg.sender, address(this));

    require(balance >= amount && allowance >= amount, "Insufficient balance or allowance");

    SNTToken.safeTransferFrom(msg.sender, address(this), amount);

    if (investors.contains(msg.sender)) {
      StakeStruct storage stakeItem = stakes[msg.sender];
      uint256 _newRewards = _getRewards(stakeItem.amount, stakeItem.depositAt);
      if (_newRewards > 0) stakeItem.rewards = stakeItem.rewards.add(_newRewards);
      stakeItem.amount = stakeItem.amount.add(amount);
    } else {
      StakeStruct memory stakeItem = StakeStruct(amount, 0, block.timestamp);
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

    uint256 balance = SNTToken.balanceOf(address(this));
    if (rewards > balance) rewards = balance;

    SNTToken.safeTransfer(msg.sender, rewards);
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
    
    uint256 balance = SNTToken.balanceOf(address(this));
    if (amount + rewards > balance) {
      SNTToken.safeTransfer(msg.sender, balance);
    } else {
      SNTToken.safeTransfer(msg.sender, amount + rewards);
    }
  }

  function withdrawAll() external nonReentrant {
    require(investors.contains(msg.sender), "No investor");

    StakeStruct storage stakeItem = stakes[msg.sender];
    require(stakeItem.amount > 0, "Invalid stake");

    uint256 rewards = stakeItem.rewards + _getRewards(stakeItem.amount, stakeItem.depositAt);
    uint256 balance = SNTToken.balanceOf(address(this));

    if (stakeItem.amount + rewards > balance) {
      SNTToken.safeTransfer(msg.sender, balance);
    } else {
      SNTToken.safeTransfer(msg.sender, stakeItem.amount + rewards);
    }

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
  function depositFunds(uint256 amount) external payable onlyDev nonReentrant {
    require(amount > 0, "you can deposit more than 0 snt");

    uint256 balance = SNTToken.balanceOf(msg.sender);
    uint256 allowance = SNTToken.allowance(msg.sender, address(this));

    require(balance >= amount && allowance >= amount, "Insufficient balance or allowance");

    SNTToken.safeTransferFrom(msg.sender, address(this), amount);
  }

  function withdrawFunds(uint256 amount) external onlyDev nonReentrant {
    // transfer fund
    uint256 balance = SNTToken.balanceOf(address(this));
    if (amount > balance) {
      SNTToken.safeTransfer(msg.sender, balance);
    } else {
      SNTToken.safeTransfer(msg.sender, amount);
    }
  }
}
