import { ChangeDetectorRef, Component, OnInit, ViewRef } from '@angular/core';
import { Router } from "@angular/router";
import { GlobalComponent } from "../_custom/GlobalController/global.component";
import { GlobalService } from "../_services/global.service";
import { ElectronService } from "../core/services";
import { CompanyService } from "../_services/company.service";
import { desktopCapturer } from "electron";
import { ConfirmationDialogService } from "../shared/components/confirm-dialog/confirmation-dialog.service";
import { TrackingService } from "../_services/trackingService.service";

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})
export class HomeComponent extends GlobalComponent implements OnInit {

    constructor(private _cdr: ChangeDetectorRef, public router: Router, public projectService: CompanyService,
                public globalService: GlobalService, private _electronService: ElectronService,
                private confirmationDialogService: ConfirmationDialogService,
                public trackingService: TrackingService) {
        super(router, globalService);
    }

    ngOnInit(): void {

        if (!this.globalService.getToken || !this.globalService.currentUserValue) {
            this.router.navigate(['authentication']);
        }
        if (this._electronService.isElectron) {
            this._electronService.ipcRenderer.on('get-tracking-status-response', (event, response) => {
                this.trackingService.trackingStatus = response.trackingStatus;
                this.trackingService.realTimeView = response.realTimeViewTracking;
                this._electronService.ipcRenderer.send('getLastTrackingReport', {});
                if (this._cdr && !(this._cdr as ViewRef).destroyed) {
                    this._cdr.detectChanges();
                }
            });
            if (this.trackingService.trackingStatus == this.trackingService.TRACKING_STATUS_INITIAL) {
                this._electronService.ipcRenderer.send('get-tracking-status', {});
            }

            this._electronService.ipcRenderer.on('getOpenedWindows', (event, response) => {
                desktopCapturer.getSources({
                    types: ['window'],
                    fetchWindowIcons: true, thumbnailSize: {width: 300, height: 170}
                }).then(async sources => {
                    this.trackingService.listOpenWindows = [];
                    for (let y = 0; y < sources.length; y++) {
                        this.trackingService.listOpenWindows.push(sources[y]);

                        const image = sources[y].thumbnail.toPNG();
                        var data = new Uint8Array(image);
                        this.trackingService.listOpenWindows[y].base64 = "data:image/jpg;base64,"
                            + Buffer.from(data).toString('base64');
                    }
                    this._electronService.ipcRenderer.send('save-opened-windows', this.trackingService.listOpenWindows);
                });
            });

            this._electronService.ipcRenderer.on('tracking-report', (event, response) => {
                if (this.trackingService.isTrackingStarted()) {
                    if (response.hasOwnProperty('mouseClick') && response.hasOwnProperty('keyPress')) {
                        this.trackingService.keyPress = response.keyPress;
                        this.trackingService.totalMouseClick = response.totalMouseClick;
                        this.trackingService.totalKeyPress= response.totalKeyPress;
                        this.trackingService.trackingRank = response.trackingRank;
                        this.trackingService.trackingPaused = response.trackingPaused;
                        this.trackingService.activeSession = response.activeSession;
                        this.trackingService.mouseClick = response.mouseClick;
                        this.trackingService.psList = response.psList;
                        this.trackingService.screen = response.screen;
                        this.trackingService.usedMemory = response.usedMemory;
                        this.trackingService.elapsedTime = response.elapsedTime;
                        if (this._cdr && !(this._cdr as ViewRef).destroyed) {
                            this._cdr.detectChanges();
                        }

                    }
                }
            })

        }
    }

    init(): void {

    }

    startTracking() {

        this.confirmationDialogService.confirm('Start Tracking', 'Do you really want to start tracking ?', 'Start', 'Cancel', 'lg')
            .then(async (confirmed) => {
                if (confirmed) {
                    this.trackingService.trackingStatus = this.trackingService.TRACKING_STATUS_STARTED;
                    this._electronService.ipcRenderer.send('start-tracking', {})
                }
            })
            .catch(() => console.log('User dismissed start tacking dialog '));
    }

    stopTracking() {

        this.confirmationDialogService.confirm('Stop Tracking', 'Do you really want to stop tracking ?', 'Stop', 'Cancel', 'lg')
            .then((confirmed) => {
                if (confirmed) {
                    this.trackingService.trackingStatus = this.trackingService.TRACKING_STATUS_STOPPED;
                    this._electronService.ipcRenderer.send('stop-tracking', {});
                }
            })
            .catch(() => console.log('User dismissed stop tacking dialog '));
    }

    pauseTracking() {
        this.confirmationDialogService.confirm('Pause Tracking', 'Do you really want to pause tracking ?', 'Pause', 'Cancel', 'lg')
            .then((confirmed) => {
                if (confirmed) {
                    this.trackingService.trackingStatus = this.trackingService.TRACKING_STATUS_PAUSED;
                    this._electronService.ipcRenderer.send('pause-tracking', {})
                }
            })
            .catch(() => console.log('User dismissed pause tacking dialog '));
    }

    changeRealTimeView() {
        this.trackingService.realTimeView = !this.trackingService.realTimeView;
        this._electronService.ipcRenderer.send('realTimeViewTracking', this.trackingService.realTimeView)
    }

    enableRealTimeView() {
        this.trackingService.realTimeView = true;
        this._electronService.ipcRenderer.send('realTimeViewTracking', this.trackingService.realTimeView)
    }

    disableRealTimeView() {
        this.trackingService.realTimeView = false;
        this._electronService.ipcRenderer.send('realTimeViewTracking', this.trackingService.realTimeView)
    }

    exit() {
        this.globalService.logout();
    }


}
