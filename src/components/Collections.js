import React, { Component } from "react"; 
import Web3 from "web3";
import detectEthereumProvider from "@metamask/detect-provider";
import KryptoBird from '../abis/Kryptobird.json'; 

import MetaMaskOnboarding from '@metamask/onboarding'
import './App.css';
import {MDBCard, MDBCardBody, MDBCardTitle, 
    MDBCardText, MDBCardImage,MDBBtn} from 'mdb-react-ui-kit';



class Collections extends Component {

    async componentDidMount() {
        await this.loadWeb3();
        await this.loadBlockchainData();
    }
    
    async loadWeb3(){
        // first up is to detect ethereum provider (metamask)

          if (window.ethereum) {
            window.web3 = new Web3(window.ethereum);
          } else {
              console.log("could not connect to metamask")
          }
    }

    // Metamask connection
    async loadBlockchainData() {
        const onboarding = new MetaMaskOnboarding();
        const onboardButton = document.getElementById("connectWallet");

        if (!MetaMaskOnboarding.isMetaMaskInstalled()) {
            onboardButton.innerText = "Install MetaMask!";
            onboardButton.onclick = () => {
            onboardButton.innerText = "Connecting...";
            onboardButton.disabled = true;
            onboarding.startOnboarding();
            }
        }

        if (window.ethereum) {
            window.web3 = new Web3(window.ethereum);

            const web3 = window.web3

            // get networkId
            const networkId = await web3.eth.net.getId()
            const networkData = KryptoBird.networks[networkId]
            if(networkData) {
                const abi = KryptoBird.abi; 
                const address = networkData.address; 
                const contract = new web3.eth.Contract(abi, address)
                this.setState({contract})

                // call the total supply of our Krypto Birdz
                const totalSupply = await contract.methods.totalSupply().call()
                this.setState({totalSupply}) 

                // set up an array to keep track of tokens
                for(let i = 1; i <= totalSupply; i++) {
                    // get nfts url
                    const KryptoBird = await contract.methods.kryptoBirdz(i - 1).call()
                    this.setState({
                        kryptoBirdz:[...this.state.kryptoBirdz, KryptoBird]
                    })

                    // get nfts descriptions
                    const kryptoMonsDescr = await contract.methods.kryptoMonsDecription(i - 1).call()
                    this.setState({
                        kryptoMonsDescrs:[...this.state.kryptoMonsDescrs, kryptoMonsDescr]
                    })

                    // get nfts owner
                    const kryptoMonsOwner = await contract.methods.ownerOf(i - 1).call()
                    this.setState({
                        kryptoMonsOwners:[...this.state.kryptoMonsOwners, "..."+kryptoMonsOwner.slice(33,42)]
                    })

                    // get nfts name
                    const kryptoMonsName = await contract.methods.kryptoMonsName(i - 1).call()
                    this.setState({
                        kryptoMonsNames:[...this.state.kryptoMonsNames, kryptoMonsName]
                    })
                }

            } else {
                window.alert('Smart contract not deployed')
            }

            // connect to metamask
            const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });

            onboardButton.innerText = "..." + accounts[0].slice(33,42);
            this.setState({account: accounts[0]})
        }
    }

    constructor(props) {
        super(props);
        this.state = {
            account: '',
            contract: null,
            totalSupply:0,
            kryptoBirdz:[],
            kryptoMonsDescrs:[],
            kryptoMonsOwners:[],
            kryptoMonsNames:[]
        }
    }

    render(){
        return (
            <div class="container">
                <hr></hr>
                <hr></hr>
                <div>
                    <h2 class="display-4 font-weight-light" style={{color:'white'}}> Collections </h2>
                    <p style={{color:'white'}}>Here you can find every Art minted with KryptoMons NFT.
                    </p>
                </div>
                
                <hr></hr>
                         <div class="row ">
                            {this.state.kryptoBirdz.map((kryptoBird, key) => {
                                return(
                                        <div class="row mx">
                                            <MDBCard className="token img" style={{maxWidth:'22rem'}}>
                                                <MDBCardImage src={kryptoBird} position='top' heigh='250rem' style={{marginRight:'4px'}} />
                                                    <MDBCardBody>
                                                                    
                                                        <MDBCardTitle class="card_title" tag="h3"> {this.state.kryptoMonsNames[key]} </MDBCardTitle>
                                                        <form class="form-inline">
                                                            <MDBCardText class="action_btn">Created by: </MDBCardText>
                                    
                                                            <MDBCardText class="action_btn">{this.state.kryptoMonsOwners[key]} </MDBCardText>
                                                        </form>
                                                        <hr></hr>
                                                        <MDBCardText> {this.state.kryptoMonsDescrs[key]} </MDBCardText>
                                                                        
                                                        <form class="form-inline">
                                                            <MDBBtn href={kryptoBird} class="action_btn ">Download</MDBBtn>
                                                            <MDBBtn href={kryptoBird} class="action_btn ">Buy</MDBBtn>
                                                        </form>
                                                                        
                                                    </MDBCardBody>
                                            </MDBCard>
                                            </div>
                                    )
                                })}
                                                
                        </div>
                        <hr></hr>
            </div>
        )
    }
}

export default Collections;