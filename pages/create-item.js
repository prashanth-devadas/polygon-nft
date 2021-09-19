import { ethers } from 'ethers'
import { useEffect, useState } from 'react'
import { create as ipfsHttpClient } from 'ipfs-http-client'
import { useRouter } from 'next/dist/client/router'
import axios from 'axios'
import Web3Modal from "web3modal"

const client = ipfsHttpClient('https://ipfs.infura.io:5001/api/v0')

import {
    nftaddress, nftmarketaddress
  } from '../config'
  
  import NFT from '../artifacts/contracts/NFT.sol/NFT.json'
  import NFTMarket from '../artifacts/contracts/NFTMarket.sol/NFTMarket.json'