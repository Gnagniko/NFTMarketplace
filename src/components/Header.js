import React from 'react'
import {Link} from 'react-router-dom'

function Header (){
    return (
        <nav class="navbar navbar-expand-lg fixed-top navbar-dark bg-dark">
            <a class="navbar-brand" href="#">KryptoMons  </a>
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>

            <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul class="navbar-nav mr-auto">
                    <li class="nav-item ">
                        <Link className='nav-link' to="/">Home</Link>
                    </li>
                    <li class="nav-item">
                        <Link className='nav-link' to="/create">Create</Link>
                    </li>
                    <li class="nav-item">
                        <Link className='nav-link' to="/collections">Collections</Link>
                    </li>
                    
                </ul>
                <form class="form-inline my-2 my-lg-0">
                    <input class="form-control mr-sm-2" type="search" placeholder="Search items, collections, and accounts" aria-label="Search"/>
                    <button class="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
                </form>
            </div>

            <ul className="navbar- nav px-3">
                <button class="wallet-btn btn" id="connectWallet" style={{color:'white'}}>
                    <span>Connect Wallet</span>
                </button>
            </ul>
        </nav>
    )
}

export default Header