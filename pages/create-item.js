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

  export default function CreateItem() {
      const [fileUrl, setFileUrl] = useState(null)
      const [formInput, updateFormInput] = useState({price: '', name: '', description:''})
      const router = useRouter()
      
      async function onChange(e) {
          const file = e.target.files[0]

          try {
            const added = await client.add(
                file,
                // this block takes care of file upload
                {
                    progress: (prog) => console.log(`received: ${prog}`);
                }
            )
            const url = `https://ipfs.infura.io/ipfs/${added.path}`
            setFileUrl(url)
          } catch(e){
              console.log(e);
          }
      }
  }