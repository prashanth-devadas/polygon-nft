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
import { route } from 'next/dist/server/router'

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

      async function createItem() {
          const { name, description, price } = formInput
          if(!name || !description || !price || !fileUrl) return
          const data = JSON.stringify({
            name, description, image: fileUrl
          })

          try{
              const added = await client.add(data)
              const url = `https://ipfs.infura.io/${added.path}`
              /* after file is uploaded to IPFS, pass the URL to save it on Polygon */
              createSale(url)
          } catch(err){
              console.log('Error uploading file: ', error);
          }
      }

      
      async function createSale(){
          const web3modal = new Web3Modal()
          const connection = await web3modal.connect()
          const provider = new ethers.providers.Web3Provider(connection)
          const signer = provider.getSigner()

          let contract = new ethers.Contract(nftaddress, NFT.abi, signer)
          let transaction = await contract.createToken(url)
          let tx = await transaction.wait()

          let event = tx.events[0]
          let value = event.args[2]
          let tokenId = value.toNumber()

          const price = ethers.utils.parseUnits(formInput.price, 'ether')

          contract = new ethers.Contract(nftmarketaddress, NFTMarket.abi, signer)

          let listingPrice = listingPrice.toString()

          transaction = await contract.createMarketItem(
              nftaddress, tokenId, price, {value: listingPrice}
          )

          await transaction.wait()

          router.push('/')
      }
  }