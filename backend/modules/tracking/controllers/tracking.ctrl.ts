import { Request, Response, NextFunction } from 'express';
import { default as TrackingService } from '../services/tracking.srvc';
import { AppConfig} from "../../../../src/environments/environment";




class TrackingController {


    /**
     * @param tracking
     */
    async sendTrackingData(tracking) {
        const resultTrackingBody = await TrackingService.tracking(AppConfig.hookServerUrl, tracking);
        return resultTrackingBody;

    }


}

export default new TrackingController();
