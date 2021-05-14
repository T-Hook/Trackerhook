
import { Injectable, OnInit } from '@angular/core';
import { ipcMain } from "electron";
const ioHook = require('iohook');

@Injectable({providedIn: 'root'})
export class ConnectorService implements OnInit {
    public credentials: any;


    constructor() {

    }

    ngOnInit() {
    }



    init() {

    }

    authentication(token) {
        this.credentials = {
            username:"ameur",
            password:"hamdouni"
        }
    }



}
