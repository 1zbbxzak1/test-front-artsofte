import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {Observable} from "rxjs";
import {ICompanyDetailResponseModel} from "../response-models/company-detail/ICompanyDetail.response-model";

@Injectable({
    providedIn: 'root'
})
export class CompanyService {

    private readonly _endpoint: string = `${environment.endpoint}/random_company?size=100`;

    constructor(
        private readonly _http: HttpClient,
    ) {
    }

    public getAllCompanies(): Observable<ICompanyDetailResponseModel[]> {
        return this._http.get<ICompanyDetailResponseModel[]>(`${this._endpoint}`);
    }
}
