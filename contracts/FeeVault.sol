// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

interface IERC20 {
    function balanceOf(address account) external view returns (uint256);
    function transfer(address to, uint256 amount) external returns (bool);
}

/**
 * @title  GOLDRIBBON fee vault
 * @notice Holds trading fees until they are forwarded to a single, immutable
 *         recipient.
 *
 * The entire trust argument of this project is that this file is short enough
 * to read in full before buying anything. Three properties, and they are the
 * only three that matter:
 *
 *   1. `recipient` is `immutable`. It is written once, in the constructor,
 *      and there is no setter. Not an owner-only setter — none at all.
 *   2. There is no `owner`, no access control and no withdrawal path. The
 *      only functions that move value are `release` and `releaseToken`, and
 *      both send the full balance to `recipient` and nowhere else.
 *   3. Both are `external` and unguarded. Anyone can call them. That is
 *      deliberate: it means no key holder can delay a donation, and a holder
 *      who does not trust the team's schedule can push the money themselves.
 *
 * What this contract deliberately does NOT do: hold any opinion about where
 * the fees come from, or promise a rate. The rate lives in the token; this
 * vault only guarantees the destination.
 */
contract FeeVault {
    /// @notice The only address this contract can ever pay.
    address payable public immutable recipient;

    /// @notice Total native currency forwarded, in wei. Only ever increases.
    uint256 public totalReleased;

    /// @notice Number of native releases. Each one is a receipt on the page.
    uint256 public releaseCount;

    event Received(address indexed from, uint256 amount);
    event Released(uint256 indexed index, uint256 amount, uint256 timestamp);
    event TokenReleased(address indexed token, uint256 amount, uint256 timestamp);

    error ZeroRecipient();
    error NothingToRelease();
    error TransferFailed();

    constructor(address payable recipient_) {
        if (recipient_ == address(0)) revert ZeroRecipient();
        recipient = recipient_;
    }

    receive() external payable {
        emit Received(msg.sender, msg.value);
    }

    /**
     * @notice Forward the entire native balance to `recipient`.
     * @dev State is written before the external call, and the call sends the
     *      full balance, so a reentrant call finds a zero balance and reverts
     *      on `NothingToRelease` rather than double-counting.
     * @return amount The wei forwarded.
     */
    function release() external returns (uint256 amount) {
        amount = address(this).balance;
        if (amount == 0) revert NothingToRelease();

        unchecked {
            totalReleased += amount;
            releaseCount += 1;
        }

        emit Released(releaseCount, amount, block.timestamp);

        (bool ok, ) = recipient.call{value: amount}("");
        if (!ok) revert TransferFailed();
    }

    /**
     * @notice Forward the entire balance of an ERC-20 to `recipient`.
     * @dev Present because fees may accrue in a stablecoin rather than in the
     *      native currency. Same single destination, same lack of guard.
     */
    function releaseToken(IERC20 token) external returns (uint256 amount) {
        amount = token.balanceOf(address(this));
        if (amount == 0) revert NothingToRelease();

        emit TokenReleased(address(token), amount, block.timestamp);

        if (!token.transfer(recipient, amount)) revert TransferFailed();
    }

    /// @notice Native currency waiting for the next release, in wei.
    function pending() external view returns (uint256) {
        return address(this).balance;
    }
}
