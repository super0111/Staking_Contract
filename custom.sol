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

contract MainStaking is Ownable, ReentrancyGuard {//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/utils/Context.sol";
import "@openzeppelin/contracts/utils/Address.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";
import "@openzeppelin/contracts/utils/structs/EnumerableSet.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";

contract MainStaking is Ownable, ReentrancyGuard {
  using SafeMath for uint256;
  using Address for address;
  using SafeERC20 for IERC20;
  using EnumerableSet for EnumerableSet.AddressSet;

  // Dev address.
  address public devaddr;
  address public staker;

  IERC20 pool;

  EnumerableSet.AddressSet investors;

  constructor(address sntAddress) {
    pool = IERC20(sntAddress);
  }

  modifier onlyDev() {
      require(msg.sender == owner() || msg.sender == devaddr , "Error: Require developer or Owner");
      _;
  }

  modifier onlyStaker() {
      require(msg.sender != address(0) && msg.sender == staker , "Error: Require staker");
      _;
  }

  function setSNT(IERC20 _snt) external onlyDev nonReentrant {
    pool = _snt;
  }

  function setDev(address _dev) external onlyDev nonReentrant {
    devaddr = _dev;
  }

  function setStaker(address _staker) external onlyDev nonReentrant {
    staker = _staker;
  }

  function deposit(address invester, uint256 amount) external payable onlyStaker nonReentrant {
    uint256 balance = pool.balanceOf(invester);
    uint256 allowance = pool.allowance(invester, address(this));

    require(balance >= amount && allowance >= amount, "Insufficient balance or allowance");
    pool.safeTransferFrom(invester, address(this), amount);
  }

  function claimRewards(address invester, uint256 rewards) external onlyStaker nonReentrant {
    uint256 balance = pool.balanceOf(address(this));
    if (rewards > balance) rewards = balance;

    pool.safeTransfer(invester, rewards);
  }

  function withdraw(address invester, uint256 amount, uint256 rewards) external onlyStaker nonReentrant {
    uint256 balance = pool.balanceOf(address(this));
    if (amount + rewards > balance) {
      pool.safeTransfer(invester, balance);
    } else {
      pool.safeTransfer(invester, amount + rewards);
    }
  }

  function withdrawAll(address invester, uint256 amount) external onlyStaker nonReentrant {
    
    uint256 balance = pool.balanceOf(address(this));

    if (amount > balance) {
      pool.safeTransfer(invester, balance);
    } else {
      pool.safeTransfer(invester, amount);
    }
  }

  // adding pool by owner
  function depositFunds(address owner, uint256 amount) external nonReentrant {
    require(amount > 0, "you can deposit more than 0 snt");

    uint256 balance = pool.balanceOf(owner);
    uint256 allowance = pool.allowance(owner, address(this));

    require(balance >= amount && allowance >= amount, "Insufficient balance or allowance");

    pool.safeTransferFrom(owner, address(this), amount);
  }

  function withdrawFunds(address owner, uint256 amount) external onlyDev nonReentrant {
    // transfer fund
    uint256 balance = pool.balanceOf(address(this));
    if (amount > balance) {
      pool.safeTransfer(owner, balance);
    } else {
      pool.safeTransfer(owner, amount);
    }
  }
}

interface IMainStaking {
    function deposit(address invester, uint256 amount) external;
    function claimRewards(address invester, uint256 rewards) external;
    function withdraw(address invester, uint256 amount, uint256 rewards) external;
    function withdrawAll(address invester, uint256 amount) external;
    function depositFunds(address owner, uint256 amount) external;
    function withdrawFunds(address owner, uint256 amount) external;
}

contract InterfaceStaking is Ownable, ReentrancyGuard {
  using SafeMath for uint256;
  using Address for address;
  using SafeERC20 for IERC20;
  using EnumerableSet for EnumerableSet.AddressSet;

  IMainStaking mainStaking;
  IERC20 fakePool;

  // Dev address.
  address public devaddr;

  uint256 public apr = 2500;  // 25 percent 2500 / 10000
  uint256 minStakePeriod = 7 days;

  struct StakeStruct {
    uint256 amount;
    uint256 rewards;
    uint256 depositAt; // deposit timestamp
  }

  EnumerableSet.AddressSet investors;
  mapping(address => StakeStruct) stakes;

  constructor(address mainAdd, address fakeAdd) {
    mainStaking = IMainStaking(mainAdd);
    fakePool = IERC20(fakeAdd);
  }

  modifier onlyDev() {
      require(msg.sender == owner() || msg.sender == devaddr , "Error: Require developer or Owner");
      _;
  }

  function _getRewards(uint256 amount, uint256 depositAt) internal view returns (uint256) {
    if (block.timestamp > depositAt + minStakePeriod) {
      return amount.mul(apr.div(10000).div(365 days) ** (block.timestamp - depositAt)); //
    } else return 0;
  }

  function setSNT(IMainStaking _snt) external onlyDev nonReentrant {
    mainStaking = _snt;
  }

  function setDev(address _dev) external onlyDev nonReentrant {
    devaddr = _dev;
  }

  function setApr(uint256 _apr) external onlyDev nonReentrant {
    apr = _apr;
  }

  function deposit(uint256 amount) external payable nonReentrant {
    require(amount > 0, "Attemping zero staking");

    mainStaking.deposit(address(this), amount);
    fakePool.safeTransfer(msg.sender, amount);


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
    mainStaking.claimRewards(address(this), rewards);
    fakePool.safeTransfer(msg.sender, rewards);
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
    
    mainStaking.withdraw(address(this), amount, rewards);
    fakePool.safeTransfer(msg.sender, amount);
  }

  function withdrawAll() external nonReentrant {
    require(investors.contains(msg.sender), "No investor");

    StakeStruct storage stakeItem = stakes[msg.sender];
    require(stakeItem.amount > 0, "Invalid stake");

    uint256 rewards = stakeItem.rewards + _getRewards(stakeItem.amount, stakeItem.depositAt);
    
    mainStaking.withdrawAll(address(this), stakeItem.amount + rewards);
    fakePool.safeTransfer(msg.sender, stakeItem.amount + rewards);

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

}


  using SafeMath for uint256;
  using Address for address;
  using SafeERC20 for IERC20;
  using EnumerableSet for EnumerableSet.AddressSet;

  // Dev address.
  address public devaddr;

  IERC20 SNTToken;

  EnumerableSet.AddressSet investors;

  constructor(address sntAddress) {
    SNTToken = IERC20(sntAddress);
  }

  modifier onlyDev() {
      require(msg.sender == owner() || msg.sender == devaddr , "Error: Require developer or Owner");
      _;
  }

  function setSNT(IERC20 _snt) external onlyDev nonReentrant {
    SNTToken = _snt;
  }

  function setDev(address _dev) external onlyDev nonReentrant {
    devaddr = _dev;
  }

  function deposit(address invester, uint256 amount) external payable nonReentrant {
    uint256 balance = SNTToken.balanceOf(invester);
    uint256 allowance = SNTToken.allowance(invester, address(this));

    require(balance >= amount && allowance >= amount, "Insufficient balance or allowance");
    SNTToken.safeTransferFrom(invester, address(this), amount);
  }

  function claimRewards(address invester, uint256 rewards) external nonReentrant {
    uint256 balance = SNTToken.balanceOf(address(this));
    if (rewards > balance) rewards = balance;

    SNTToken.safeTransfer(invester, rewards);
  }

  function withdraw(address invester, uint256 amount, uint256 rewards) external nonReentrant {
    uint256 balance = SNTToken.balanceOf(address(this));
    if (amount + rewards > balance) {
      SNTToken.safeTransfer(invester, balance);
    } else {
      SNTToken.safeTransfer(invester, amount + rewards);
    }
  }

  function withdrawAll(address invester, uint256 amount) external nonReentrant {
    
    uint256 balance = SNTToken.balanceOf(address(this));

    if (amount > balance) {
      SNTToken.safeTransfer(invester, balance);
    } else {
      SNTToken.safeTransfer(invester, amount);
    }
  }

  // adding pool by owner
  function depositFunds(address owner, uint256 amount) external payable nonReentrant {
    require(amount > 0, "you can deposit more than 0 snt");

    uint256 balance = SNTToken.balanceOf(owner);
    uint256 allowance = SNTToken.allowance(owner, address(this));

    require(balance >= amount && allowance >= amount, "Insufficient balance or allowance");

    SNTToken.safeTransferFrom(owner, address(this), amount);
  }

  function withdrawFunds(address owner, uint256 amount) external nonReentrant {
    // transfer fund
    require(owner == devaddr, "Error: Require developer or Owner");
    uint256 balance = SNTToken.balanceOf(address(this));
    if (amount > balance) {
      SNTToken.safeTransfer(owner, balance);
    } else {
      SNTToken.safeTransfer(owner, amount);
    }
  }
}

interface IMainStaking {
    function deposit(address invester, uint256 amount) external;
    function claimRewards(address invester, uint256 rewards) external;
    function withdraw(address invester, uint256 amount, uint256 rewards) external;
    function withdrawAll(address invester, uint256 amount) external;
    function depositFunds(address owner, uint256 amount) external payable;
    function withdrawFunds(address owner, uint256 amount) external;
}

contract InterfaceStaking is Ownable, ReentrancyGuard {
  using SafeMath for uint256;
  using Address for address;
  using SafeERC20 for IERC20;
  using EnumerableSet for EnumerableSet.AddressSet;

  IMainStaking mainStaking;
  // Dev address.
  address public devaddr;

  uint256 public apr = 2500;  // 25 percent 2500 / 10000
  uint256 minStakePeriod = 7 days;

  struct StakeStruct {
    uint256 amount;
    uint256 rewards;
    uint256 depositAt; // deposit timestamp
  }

  EnumerableSet.AddressSet investors;
  mapping(address => StakeStruct) stakes;

  constructor(address mainContract) {
    mainStaking = IMainStaking(mainContract);
  }

  modifier onlyDev() {
      require(msg.sender == owner() || msg.sender == devaddr , "Error: Require developer or Owner");
      _;
  }

  function _getRewards(uint256 amount, uint256 depositAt) internal view returns (uint256) {
    if (block.timestamp > depositAt + minStakePeriod) {
      return amount.mul(apr.div(10000).div(365 days) ** (block.timestamp - depositAt)); //
    } else return 0;
  }

  function setSNT(IMainStaking _snt) external onlyDev nonReentrant {
    mainStaking = _snt;
  }

  function setDev(address _dev) external onlyDev nonReentrant {
    devaddr = _dev;
  }

  function setApr(uint256 _apr) external onlyDev nonReentrant {
    apr = _apr;
  }

  function deposit(uint256 amount) external payable nonReentrant {
    require(amount > 0, "Attemping zero staking");

    mainStaking.deposit(msg.sender, amount);

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
    mainStaking.claimRewards(msg.sender, rewards);
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
    
    mainStaking.withdraw(msg.sender, amount, rewards);
  }

  function withdrawAll() external nonReentrant {
    require(investors.contains(msg.sender), "No investor");

    StakeStruct storage stakeItem = stakes[msg.sender];
    require(stakeItem.amount > 0, "Invalid stake");

    uint256 rewards = stakeItem.rewards + _getRewards(stakeItem.amount, stakeItem.depositAt);
    
    mainStaking.withdrawAll(msg.sender, stakeItem.amount + rewards);

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

    mainStaking.depositFunds(msg.sender, amount);
  }

  function withdrawFunds(uint256 amount) external onlyDev nonReentrant {
    // transfer fund
    mainStaking.depositFunds(msg.sender, amount);
  }
}

