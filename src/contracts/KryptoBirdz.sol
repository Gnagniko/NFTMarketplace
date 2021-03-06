// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./ERC721Connector.sol";

contract KryptoBird is ERC721Connector {
    // array to store our nfts
    string[] public kryptoBirdz;
    string[] public kryptoMonsDecription;
    string[] public kryptoMonsName;

    mapping(string => bool) _kryptoBirdzExists;

    function mint(string memory _kryptoBird, string memory _kryptoMonsDecr, string memory _kryptoMonsName) public {
        require(!_kryptoBirdzExists[_kryptoBird], 'Error - kryptoBird already exists');
        // this is deprecated - uint_id = KryptoBirdz.push(_kryptoBird)
        // .push no longer returns the length but a  ref to the added element
        // therefore we have to do it the following way
        kryptoBirdz.push(_kryptoBird);
        kryptoMonsDecription.push(_kryptoMonsDecr);
        kryptoMonsName.push(_kryptoMonsName);
        uint256 _id = kryptoBirdz.length - 1;

        _mint(msg.sender, _id);
        _kryptoBirdzExists[_kryptoBird] = true;
    }

    constructor() ERC721Connector("KryptoBird", "KBIRDZ") {}
}
