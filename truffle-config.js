const path = require("path");
const HDWalletProvider = require("@truffle/hdwallet-provider");
//enter your ropsten account private key in here so that provider can do the transactions with that account
const Mnemonic = "fa24de014493d440e1705d612fdba587be992fdc27bc8812d2050e2613a380ab";

module.exports = {
    // See <http://truffleframework.com/docs/advanced/configuration>
    // to customize your Truffle configuration!
    contracts_build_directory: path.join(__dirname, "client/src/contracts"),
    networks: {
        develop: {
            port: 8545
        },
        ropsten: {
            provider: function() {
              return new HDWalletProvider(Mnemonic, "https://ropsten.infura.io/v3/697d48cfcc8e42d5bb0b26486764b55b");
            },
            network_id: 3
            
        }
    },
    compilers: {
        solc: {
            version: "0.8.7"
        }
    }
};
