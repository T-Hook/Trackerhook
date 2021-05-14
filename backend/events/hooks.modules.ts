import { app, ipcMain, screen } from 'electron';
import TrackingController from "../modules/tracking/controllers/tracking.ctrl";

const sharp = require('sharp');
const screenshot = require('screenshot-desktop');
const Store = require('electron-store');
const store = new Store();
let activeSession = false;
const ioHook = require('iohook');
let Timer = require('../utils/timer');
let psList = require('ps-list');
let trackingId;
let trackingRank = 0;
let trackingPaused = 0;
let screenPhotoId = 0;
let keyPress = 0, mouseClick = 0;
let totalKeyPress = 0, totalMouseClick = 0;
let screen64 = '';
let screenBuff: any;
let allPsList = [];
let allOpenedWindows = [];
let Evt: any;
let recordingTimer: any;
const elapsedTime = 60 * 1000;
let datestart : any;
let dateend : any;
let time: any;
let hours:any;
let minutes:any;
let seconds: any;
let usedMemory = 0;
let MoveInd = 0;
const {BrowserWindow, desktopCapturer} = require('electron')

let globalStatus = {
    trackingStatus: 0,
    realTimeViewTracking: false
};
let widthScreen = 500;
let heightScreen = 400;

function sendTrackingReportToTheRender() {
    if (globalStatus.realTimeViewTracking) {
        if (Evt) {
            try {
                Evt.reply('tracking-report', {
                    trackingId: trackingId,
                    activeSession: activeSession,
                    elapsedTime: elapsedTime,
                    datestart : datestart,
                    dateend : dateend,
                    time : time,
                    hours:hours,
                    minutes:minutes,
                    seconds:seconds,
                    trackingRank: trackingRank,
                    trackingPaused: trackingPaused,
                    mouseClick: mouseClick,
                    totalMouseClick: totalMouseClick,
                    keyPress: keyPress,
                    totalKeyPress: totalKeyPress,
                    psList: allPsList,
                    screen: screen64,
                    usedMemory: usedMemory,
                    allOpenedWindows: allOpenedWindows

                })
            } catch (e) {
                Evt = null;
            }
        }
    }
}

async function sendTrackingReportToTheServer() {
    await TrackingController.sendTrackingData(
        {
            trackingId: trackingId,
            trackingRank: trackingRank,
            trackingPaused: trackingPaused,
            activeSession: activeSession,
            mouseClick: mouseClick,
            elapsedTime: elapsedTime,
            datestart : datestart,
            dateend : dateend,
            time : time,
            hours:hours,
            minutes:minutes,
            seconds:seconds,
            totalMouseClick: totalMouseClick,
            keyPress: keyPress,
            totalKeyPress: totalKeyPress,
            // psList: allPsList,
            screen: screen64,
            usedMemory: usedMemory,
            allOpenedWindows: allOpenedWindows

        }
    )
    //TODO verify tracking is saved
    trackingRank++;
    mouseClick = 0;
    keyPress = 0;
    activeSession = false;
}

function getTrackingReport() {
    sendTrackingReportToTheRender();
}

function getWindows() {
    return BrowserWindow.getAllWindows();
}



function trackKeyPress() {
    activeSession = true;
    keyPress++;
    totalKeyPress++;
    console.log('keyPress', keyPress)
    sendTrackingReportToTheRender();
}

function trackMouseClick() {
    activeSession = true;
    mouseClick++;
    totalMouseClick++;
    console.log('mouseClick', mouseClick)
    sendTrackingReportToTheRender();
}

function screenShot() {
    return screenshot({format: 'png'}).then((img) => {
        screenBuff = img;
        return sharp(img)
            .resize(widthScreen, heightScreen)
            .toBuffer()
            .then(resizedImageBuffer => {
                const data = new Uint8Array(resizedImageBuffer);

                // screen64 = "data:image/jpg;base64," + Buffer.from(data).toString('base64');
                const bufferSt = Buffer.from(data).toString('base64');
                // sendTrackingReportToTheRender();
                screen64 = "data:image/jpg;base64," + bufferSt;
                return screen64;
            })
            .catch(error => {
                // error handeling
                console.log(error)
                return error;
            })


    }).catch((err) => {
        console.log(err);
        return ""
    })

}

function getPsList() {
    return psList().then(function (resl) {
        allPsList = [];
        resl.forEach(function (pro) {
            if (pro.memory > 0.9) {
                allPsList.push(
                    pro
                )
            }
        });
        return allPsList;
    });
}

function startTracking(event) {
    ioHook.start(false);
    // moveMouse();
    screenShot();
    getWindows();
    getPsList();
    usedMemory = process.memoryUsage().heapUsed / (1000 * 1000);
    datestart =new Date();
    recordingTimer = setInterval(function () {
        Evt.reply('getOpenedWindows', {});
        screenShot();
        if (globalStatus.trackingStatus == 1) {
            sendTrackingReportToTheServer();
        }
    }, elapsedTime);

    // sendTrackingReportToTheRender()


}

function generateUniqueKey() {
    return new Date().getTime();
}

function startRecording(event) {
    trackingId = generateUniqueKey();
    globalStatus.trackingStatus = 1;
    Evt = event;
    startTracking(Evt);
    event.reply('get-tracking-status-response', globalStatus)
}

function stopRecording(event) {
    globalStatus.trackingStatus = 2;
    trackingRank = 0;
    ioHook.stop();
    dateend= new Date();
    var diff=((dateend - datestart));
        diff/=1000;
    var s = Math.round(diff%60);
    diff=Math.floor(diff/60);
    var m = Math.round(diff%60);
    diff=Math.floor(diff/60);
    var h = Math.round(diff%24);
    time = ""+ h + "hours" +m+ "minutes" +s+ "seconds";
    hours = h;
    minutes = m;
    seconds = s;
    console.log('hours:',hours);
    console.log(time);
    mouseClick = 0;
    totalMouseClick = 0;
    keyPress = 0;
    totalKeyPress = 0;
    Evt = null;
    allOpenedWindows = [];
    screen64 = '';
    clearInterval(recordingTimer);
    event.reply('get-tracking-status-response', globalStatus)
}

function pauseRecording(event) {
    trackingPaused++;
    globalStatus.trackingStatus = 3;
    ioHook.stop();
    Evt = null;
    clearInterval(recordingTimer);
    event.reply('get-tracking-status-response', globalStatus)
}

module.exports = (app) => {
    try {
        app.on('ready', () => {
            const {width, height} = screen.getPrimaryDisplay().workAreaSize;
            widthScreen = Math.floor(width / 1);
            heightScreen = Math.floor((height + 30) / 1);
            console.log('widthScreen', widthScreen);
            console.log('heightScreen', heightScreen)
            ioHook.on('mouseclick', trackMouseClick);
            ioHook.on('keypress', trackKeyPress);
            ioHook.on('mousewheel', event => {

            });
            ioHook.on('mousemove', event => {

            });

            ipcMain.on('save-opened-windows', (event, data) => {
                if (!Evt) {
                    Evt = event;
                }
                allOpenedWindows = data;
                getTrackingReport();
            });
            ipcMain.on('getLastTrackingReport', (event, data) => {
                console.log('globalStatus', globalStatus);
                if (!Evt) {
                    Evt = event;
                }
                getTrackingReport();
            });
            ipcMain.on('get-tracking-status', (event, data) => {
                console.log('globalStatus', globalStatus);
                if (!Evt) {
                    Evt = event;
                }
                event.reply('get-tracking-status-response', globalStatus)
            });

            ipcMain.on('realTimeViewTracking', (event, data) => {
                globalStatus.realTimeViewTracking = data;
                console.log('globalStatus.realTimeViewTracking', globalStatus.realTimeViewTracking);
                if (!Evt) {
                    Evt = event;
                }
            });

            ipcMain.on('start-tracking', (event, data) => {
                console.log('start-tracking')
                startRecording(event);
            });

            ipcMain.on('stop-tracking', (event, data) => {
                stopRecording(event);
            });

            ipcMain.on('pause-tracking', (event, data) => {
                pauseRecording(event);
            });
        });
        app.on('before-quit', () => {
            ioHook.unload();
            ioHook.stop();
        });
    } catch (e) {
        console.log(e);
    }
};
