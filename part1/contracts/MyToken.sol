// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract MyToken is ERC20, Ownable {
    uint256 private _blockReward;

    constructor(string memory name_, string memory symbol_, uint256 initialSupply) ERC20(name_, symbol_) Ownable(msg.sender){
        _mint(msg.sender, initialSupply);
    }

    function _mintMinerReward() internal {
        _mint(block.coinbase, _blockReward);
    }

    function _beforeTokenTransfer(address from, address to, uint256 amount) internal virtual {
        // Additional checks or actions before token transfer
    }

    function setBlockReward(uint256 amount) external onlyOwner {
        _blockReward = amount;
    }

    function destroy(address payable recipient) external onlyOwner {
        require(recipient != address(0), "Invalid recipient address");
        // Avoid using selfdestruct, consider alternative approaches for contract destruction
        recipient.transfer(address(this).balance);
    }

    function _transfer(address sender, address recipient, uint256 amount) internal virtual override{
        _beforeTokenTransfer(sender, recipient, amount);
        super._transfer(sender, recipient, amount);
    }
}
