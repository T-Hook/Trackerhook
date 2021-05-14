const request = require('request');

/**
 * @class CompanyService
 */
class CompanyService {

    /**
     * @param serverUrl
     * @param data
     * @returns {Promise<void>}
     */
    async getCompanies(serverUrl, data):  Promise<any> {
        return new Promise(function (resolve, reject) {
            request.get(
                {
                    url: serverUrl + '/api/company',
                    headers: {
                        Authorization : "Bearer " + data.token,
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

export default new CompanyService();
