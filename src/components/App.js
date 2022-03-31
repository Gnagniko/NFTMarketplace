import React, { Component } from "react"; 
import Web3 from "web3";
import detectEthereumProvider from "@metamask/detect-provider";
import KryptoBird from '../abis/Kryptobird.json'; 
import {MDBCard, MDBCardBody, MDBCardTitle, 
    MDBCardText, MDBCardImage,MDBBtn} from 'mdb-react-ui-kit';
import './App.css';
import MetaMaskOnboarding from '@metamask/onboarding'


class App extends Component {

    async componentDidMount() {
        await this.loadWeb3();
        await this.loadBlockchainData();
    }
    
    async loadWeb3(){
        // first up is to detect ethereum provider (metamask)
        const provider = await detectEthereumProvider();

        if (provider === window.ethereum) {
            window.web3 = new Web3(window.ethereum);
            console.log('ethereum wallet is connected')
          } else if (provider === window.web3) {
            window.web3 = new Web3(window.web3.currentProvider);
            console.log('ethereum wallet is connected')
          } else {
            // no ethereum provider 
            console.log('no ehtereum wallet detected')
          }

          // if accounts changed load new Blockchain Data
          if (MetaMaskOnboarding.isMetaMaskInstalled()) {
            window.ethereum.on("accountsChanged", (newAccounts) => {
                this.setState({account: newAccounts[0]})
                this.loadBlockchainData();
            });
          }
    }

    async loadBlockchainData() {
        const onboarding = new MetaMaskOnboarding();

        window.web3 = new Web3(window.ethereum)
        const web3 = window.web3
        let accounts = await window.web3.eth.getAccounts()
        console.log(accounts[0])
        this.setState({account: accounts[0]})
        console.log('in line 41 after account address')
       
        
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
                const KryptoBird = await contract.methods.kryptoBirdz(i - 1).call()
                this.setState({
                    kryptoBirdz:[...this.state.kryptoBirdz, KryptoBird]
                })
            }

        } else {
            window.alert('Smart contract not deployed')
        }
    }

    mint = (kryptoBird) => {
        this.state.contract.methods.mint(kryptoBird).send({from:this.state.account})
        .once('receipt', (receipt) => {
            this.setState({
                kryptoBirdz:[...this.state.kryptoBirdz, kryptoBird]
            })
        })
    }

    constructor(props) {
        super(props);
        this.state = {
            account: '',
            contract: null,
            totalSupply:0,
            kryptoBirdz:[]
        }
    }

    render(){
        return (
            <div className="container-filled">
                <nav className="navbar navbar-dark fixed-top bg-dark flex-md-nowrap p-0 shadow">
                    <div className="navbar-brand col-sm-3 col-md-3 mr-0" style={{color:'white'}}>
                        Krypto Birdz NFTs (Non Fungible Tokens)
                    </div>
                    <ul className="navbar- nav px-3">
                        <li className="nacv-item text-nowrap d-none d-sm-none d-sm-block">
                            <small className="text-white">
                                {this.state.account}
                            </small>
                        </li>
                    </ul>
                </nav>

                <div className='container-fluid mt-1'>
                    <div className='row'>
                        <main role='main' className="col-lg-12 d-flex text-center">
                            <div className='content mr-auto ml-auto' style={{opacity:'0.8'}}>
                                <h1 style={{color:'white'}}>
                                    kryptoBirdz - NFT Marketplace
                                </h1>

                                <form onSubmit={(event) => {
                                    event.preventDefault()
                                    const kryptoBird = this.kryptoBird.value
                                    this.mint(kryptoBird)
                                }}>
                                    <input type='text' placeholder='Add a file location' className='form-control mb-1'
                                    ref={(input) => this.kryptoBird = input}/>
                                    <input style={{margin:'6px'}} type='submit' className='btn btn-primary btn-black' value='MINT' />
                                </form>

                            </div>
                        </main>
                    </div>
                            <hr></hr>
                            <div className="row textCenter">
                                {this.state.kryptoBirdz.map((kryptoBird, key) => {
                                    return(
                                        <div >
                                            <div>
                                                <MDBCard className="token img" style={{maxWidth:'22rem'}}>
                                                    <MDBCardImage src={kryptoBird} position='top' heigh='250rem' style={{marginRight:'4px'}} />
                                                    <MDBCardBody>
                                                        <MDBCardTitle> kryptoBirdz </MDBCardTitle>
                                                        <MDBCardText> This is one of 20 funtokens. Especialy made for friends to flex.</MDBCardText>
                                                        <MDBBtn href={kryptoBird}>Download</MDBBtn>
                                                    </MDBCardBody>
                                                </MDBCard>
                                            </div>
                                        </div>
                                    )
                                })}
                                
                            </div>

                </div>
            </div>
        )
    }
}

export default App;