require(`@nomiclabs/hardhat-waffle`);
const fs = require('fs')
const privateKey = fs.readFileSync(".secret").toString();
const projectId = fs.readFileSync(".projectId").toString();

module.exports = {
  networks: {
    hardhat: {
      chainId: 1337
    },
    mumbai: {
      url: `https://polygon-mumbai.infura.io/v3/${projectId}`,
      accounts: []
    },
    mainnet:{
      url: `https://polygon-mainnet.infura.io/v3/${projectId}`
    }
  },
  solidity: {
    version: "0.8.4",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200
      }
    },

    version: "0.8.0",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200
      }
    }
  }
};
