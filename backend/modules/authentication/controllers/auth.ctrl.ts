import { Request, Response, NextFunction } from 'express';
import { default as UserService } from '../services/auth.srvc';
import { AppConfig} from "../../../../src/environments/environment";

const screenshot = require('screenshot-desktop')


class AuthController {

    async loginAndGetProfile(credentials) {
        let Response:any ={};

        const resultLoginBody = await UserService.loginWithCompany(AppConfig.hookServerUrl, credentials);
        let resultProfileBody = await UserService.me(AppConfig.hookServerUrl, resultLoginBody.token);
        resultProfileBody.token = resultLoginBody.token;
        Response.token=resultLoginBody.token;
        Response.profile=resultProfileBody.data
        return Response;

    }
    async loginAndGetProfileAndCompany(credentials,company) {
        let Response:any ={};

        const resultLoginBody = await UserService.login(AppConfig.hookServerUrl, credentials);
        let resultProfileBody = await UserService.me(AppConfig.hookServerUrl, resultLoginBody.token);
        resultProfileBody.token = resultLoginBody.token;
        Response.token=resultLoginBody.token;
        Response.profile=resultProfileBody.data
        return Response;

    }
    async login(credentials ) {

            const resultPostBody = await UserService.login(AppConfig.hookServerUrl, credentials);
            return resultPostBody;

    }
    async profile(token ) {

        const resultPostBody = await UserService.me(AppConfig.hookServerUrl, token);
        return resultPostBody;

    }


}

export default new AuthController();
