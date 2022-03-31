/**
 * Use this file to configure your truffle project. It's seeded with some
 * common settings for different networks and features like migrations,
 * compilation and testing. Uncomment the ones you need or modify
 * them to suit your project as necessary.
 *
 * More information about configuration can be found at:
 *
 * trufflesuite.com/docs/advanced/configuration
 *
 * To deploy via Infura you'll need a wallet provider (like @truffle/hdwallet-provider)
 * to sign your transactions before they're sent to a remote public node. Infura accounts
 * are available for free at: infura.io/register.
 *
 * You'll also need a mnemonic - the twelve word phrase the wallet uses to generate
 * public/private key pairs. If you're publishing your code to GitHub make sure you load this
 * phrase from a file you've .gitignored so it doesn't accidentally become public.
 *
 */

// const HDWalletProvider = require('@truffle/hdwallet-provider');
//
// const fs = require('fs');
// const mnemonic = fs.readFileSync(".secret").toString().trim();

// https://ropsten.infura.io/v3/7a3e69e4622c4737ab5d1de8c44ee6a3

var HDWalletProvider = require("truffle-hdwallet-provider");
var mnemonic = "iron nuclear damage maze reveal feature table napkin very ostrich spoil cushion";
module.exports = {
  /**
   * Networks define how you connect to your ethereum client and let you set the
   * defaults web3 uses to send transactions. If you don't specify one truffle
   * will spin up a development blockchain for you on port 9545 when you
   * run `develop` or `test`. You can ask a truffle command to use a specific
   * network from the command line, e.g
   *
   * $ truffle test --network <network-name>
   */

  networks: {
    // Useful for testing. The `development` name is special - truffle uses it by default
    // if it's defined here and no other network is specified at the command line.
    // You should run a client (like ganache-cli, geth or parity) in a separate terminal
    // tab if you use this network and you must also set the `host`, `port` and `network_id`
    // options below to some value.
    //
    development: {
      host: "127.0.0.1",     // Localhost (default: none)
      port: 7545,            // Standard Ethereum port (default: none)
      network_id: "*",       // Any network (default: none)
    },
    rinkeby: {
      provider: function() {
        return new HDWalletProvider(mnemonic, 
          "https://rinkeby.infura.io/v3/3456721dec9248518dbbd4b293193046");
      },
      network_id: 4,
      gas: 4500000,
      gasPrice: 10000000000,
    },
    ropsten: {
      provider: function() {
        return new HDWalletProvider(mnemonic, 
          "https://ropsten.infura.io/v3/7a3e69e4622c4737ab5d1de8c44ee6a3");
      },
      network_id: 3,
      gas: 4000000,
    }
  
  },

  contracts_directory: './src/contracts',
  contracts_build_directory: './src/abis',

  // Configure your compilers
  compilers: {
    solc: {
      version:'^0.8.0',
      optimizer:{
        enabled:'true',
        runs: 200
      }
    }
  },

};
