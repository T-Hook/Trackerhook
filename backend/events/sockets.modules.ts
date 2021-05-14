import {app, ipcMain} from "electron";
import AuthController from "../modules/authentication/controllers/auth.ctrl";
import CompanyController from "../modules/company/controllers/company.ctrl";

const screenshot = require('screenshot-desktop');
const Store = require('electron-store');
const store = new Store();
module.exports = (app) => {
    try {
        app.on('ready', () => {
            ipcMain.on('ping', (event, data) => {
                console.log(data);
            })
            ipcMain.on('authentication', (event, data) => {
                AuthController.loginAndGetProfile(data).
                then((respLogin) => {
                    event.reply('login-reply', respLogin);
                    store.set('token',respLogin);
                });
            })
            ipcMain.on('profile', (event, token) => {

                console.log("token",token);
                AuthController.profile(token).then((profile) => {
                    event.reply('profile-reply', profile);
                    store.set('profile',profile);
                });
            })
            ipcMain.on('screen', (event, data) => {
                screenshot({filename: 'shot.jpg'}).then((img) => {
                    console.log(img);
                }).catch((err) => {
                    console.log(err)
                })
            });

            // ******************** Company Module Events Start ************************//
            ipcMain.on('companies-list', (event, data) => {
                CompanyController.getCompanies(data).
                then((data) => event.reply('companies-list-reply', data));
            })
            // ********************* Company Module Events End *************************//
        });
    } catch (e) {
        console.log(e);
    }
}
