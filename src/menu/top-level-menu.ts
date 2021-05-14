import {app, Menu, Tray} from 'electron';
import { AppConfig } from '../environments/environment';


const path = require('path');
const {menubar} = require('menubar');

const iconPath = path.join(__dirname, '..', 'assets', 'timetracker-favicon.png');
let tray = null;

module.exports = (app, win) => {
    try {
        app.on('ready', () => {

            tray = new Tray(iconPath);
            const contextMenu = Menu.buildFromTemplate([
                {
                    label: 'Tracking',
                    submenu: [
                        {
                            label: 'Start', type: 'radio',
                        },
                        {
                            label: 'Stop', type: 'radio'
                        }
                    ]
                },
                {label: 'Exit', role: 'close'},
                !AppConfig.production && {type: 'separator'},
                !AppConfig.production && {role: 'toggleDevTools'},
            ]);
            tray.setContextMenu(contextMenu);

            const mb = menubar({tray});

            mb.on('ready', () => {
                console.log('TimeTracker top level menu bar is ready.');
            });
        });
    } catch (e) {
        console.log(e);
    }
}
