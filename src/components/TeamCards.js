import React from 'react';
import './App.css';
import App from "./App";
import { BsDiscord, BsInstagram } from "react-icons/bs";

function TeamCards (){
    return(
        <div class="container py-5">
            <div class="row mb-4">
            <div class="col-lg-5">
                <h2 class="display-4 font-weight-light">Our team</h2>
            </div>
            </div>

            <div class="row text-center">
            
                <div class="col-xl-3 col-sm-6 mb-5">
                    <div class="bg-white rounded shadow-sm "><img src="https://bootdey.com/img/Content/avatar/avatar7.png" alt="" width="100" class="img-fluid rounded-circle mb-3 img-thumbnail shadow-sm"/>
                    <h5 class="mb-0">Koffi Tino Gnagniko</h5><span class="small text-uppercase text-muted">CEO - Founder</span>
                    <hr></hr>
                    <abbr title="Telefonnummer">Tel. +49 1573 0056780</abbr> <br></br>
                    <abbr title="Email-Adresse">Email: tino.gnagniko@gmail.com</abbr> <a></a>
                    <ul class="social mb-0 list-inline mt-3">
                        <li class="list-inline-item"><a href="https://discord.gg/CTrwTaVW" class="social-link"><BsDiscord/></a></li>
                        <li class="list-inline-item"><a href="https://www.instagram.com/onifc_t/" class="social-link"><BsInstagram/></a></li>
                    </ul>
                    </div>
                </div>
            
            </div>
        </div>
    )
}

export default TeamCards