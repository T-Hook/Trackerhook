import * as util from 'util';


const request = require('request');
const Store = require('electron-store');
const store = new Store();
/**
 * @class UserService
 */
class TrackingService {


    /**
     * @param serverUrl
     * @param body
     * @returns {Promise<void>}
     */
    async tracking(serverUrl, body): Promise<any> {
        const token =store.get('token');
        return new Promise(function (resolve, reject) {
            request.post(
                {
                    url: serverUrl+'/api/tracking?Authorization=bearer '+token.token,
                    body: body,
                    header:{
                        Authorization:'bearer '+token.token
                    },
                    json: true
                },
                function (error, response, body) {
                    if (!error && body) {
                        const result = (body);
                        resolve(result);
                    } else {
                        reject(error);
                    }
                }
            );
        });
    }

}

export default new TrackingService();
