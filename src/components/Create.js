import React, { Component } from "react"; 
import Web3 from "web3";
import detectEthereumProvider from "@metamask/detect-provider";
import KryptoBird from '../abis/Kryptobird.json'; 
import './App.css';
import MetaMaskOnboarding from '@metamask/onboarding'
import './App.css';


    class Create extends Component {

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
    
        mint = (kryptoBird, kryptoMonsDecr, krytoMonName) => {
    
            if(this.state.account !== ''){
                this.state.contract.methods.mint(kryptoBird, kryptoMonsDecr, krytoMonName).send({from:this.state.account})
                    .once('receipt', (receipt) => {
                this.setState({
                    kryptoBirdz:[...this.state.kryptoBirdz, kryptoBird]
                })
                this.setState({
                    kryptoMonsDescrs:[...this.state.kryptoMonsDescrs, kryptoMonsDecr]
                })
                this.setState({
                    kryptoMonsNames:[...this.state.kryptoMonsNames, krytoMonName]
                })
             })
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

        render (){
            return (
                    <div className='row'>
                        
                        <main role='main' className="col-lg-12 d-flex text-center">
                            <div className='content mr-auto ml-auto' style={{opacity:'0.8'}}>
                                <hr></hr>
                                <hr></hr>
                                <h1 style={{color:'white'}}>
                                    kryptoMons - NFT Marketplace
                                </h1>
                                <p style={{color:'white'}}> Here you can mint your NFTs to the Blockchain.
                                </p>
                                <p style={{color:'white'}}>
                                 Please fill the following fields to mint your NFT
                                </p>

                                <form onSubmit={(event) => {
                                    event.preventDefault()
                                    const kryptoBird = this.kryptoBird.value
                                    const kryptoMonDecr = this.kryptoMonDecr.value
                                    const kryptoMonName = this.kryptoMonName.value
                                    this.mint(kryptoBird, kryptoMonDecr, kryptoMonName)
                                }}>
                                    <input type='text' placeholder='Add a file location' className='form-control mb-1'
                                    ref={(input) => this.kryptoBird = input}/>
                                    <input type='text' placeholder='Add NFT name' className='form-control mb-1'
                                    ref={(input) => this.kryptoMonName = input}/>
                                    <textarea type='text' placeholder='Add NFT description' className='form-control mb-1'
                                    ref={(input) => this.kryptoMonDecr = input}/>
                                    <input style={{margin:'6px'}} type='submit' className='btn btn-primary btn-black' value='MINT' />
                                </form>
                            </div>
                        </main>
                    </div>
                )
        }
    }

export default Create