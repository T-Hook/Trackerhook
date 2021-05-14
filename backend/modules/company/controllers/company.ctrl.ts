import {default as CompanyService} from '../services/company.srvc';
import {AppConfig} from "../../../../src/environments/environment";


class CompanyController {

    async getCompanies(data) {

        return await CompanyService.getCompanies(AppConfig.hookServerUrl, data);

    }
}

export default new CompanyController();