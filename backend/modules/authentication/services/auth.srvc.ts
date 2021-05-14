import * as util from 'util';


const request = require('request');

/**
 * @class UserService
 */
class UserService {


    /**
     * @param serverUrl
     * @param body
     * @returns {Promise<void>}
     */
    async login(serverUrl, body): Promise<any> {
        return new Promise(function (resolve, reject) {
            request.post(
                {
                    url: serverUrl+'/auth/login',
                    body: body,
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
    /**
     * @param serverUrl
     * @param body
     * @returns {Promise<void>}
     */
    async loginWithCompany(serverUrl, body): Promise<any> {
        return new Promise(function (resolve, reject) {
            request.post(
                {
                    url: serverUrl+'/auth/login/company',
                    body: body,
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
    /**
     * @param serverUrl
     * @param token
     * @returns {Promise<void>}
     */
    async me(serverUrl, token): Promise<any> {
        return new Promise(function (resolve, reject) {
            request.get(
                {
                    url: serverUrl+'/api/users/me',
                    headers: {
                        Authorization: 'bearer ' + token
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

export default new UserService();
