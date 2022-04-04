import React, { Component } from "react"; 
import './App.css';
import Create from './Create'
import Collections from './Collections'
import Header from './Header.js'
import TeamCards from './TeamCards'
import Home from './Home'
import {BrowserRouter as Router, Route, Routes } from "react-router-dom"


function App() {
        return (
            <Router>
                <div className="App">
                    <Header/>
                    <div className="content">
                        <Routes>
                            <Route  exact path="/collections" element={<Collections/>}/>
                            <Route  exact path="/create" element={<Create/>}/>
                            <Route  exact path="/" element={<Home/>}/>
                        </Routes>
                    </div>
                    <TeamCards></TeamCards>
                    
                </div>
                
            </Router>
        )
}

export default App;