import {ErrorHandler, Injectable} from '@angular/core';
import {CompanyService} from "./company.service";
import {BehaviorSubject, catchError, map, Observable, of} from "rxjs";
import {ICompanyDetailResponseModel} from "../response-models/company-detail/ICompanyDetail.response-model";
import {CacheCompanies} from "../enums/cache-companies";

@Injectable({
    providedIn: 'root'
})
export class CompanyManagerService {

    private _companies: ICompanyDetailResponseModel[] = [];
    private _companiesSubject: BehaviorSubject<ICompanyDetailResponseModel[]> = new BehaviorSubject<ICompanyDetailResponseModel[]>(this._companies);
    public companies$ = this._companiesSubject.asObservable();
    private _cacheCompany: CacheCompanies = CacheCompanies.inMemory;
    private readonly _localStorageKey: string = 'companiesCache';

    constructor(
        private readonly _companyService: CompanyService,
        private readonly _errorHandler: ErrorHandler,
    ) {
        this.loadCache();
    }

    public setCacheStrategy(strategy: CacheCompanies): void {
        this._cacheCompany = strategy;
        this.saveCache();
    }

    public getAllCompanies(): Observable<ICompanyDetailResponseModel[]> {
        if (this._companies.length > 0) {
            return of(this._companies);
        }

        const companiesCache: string | null = localStorage.getItem('companiesCache');

        if (companiesCache) {
            this._companies = JSON.parse(companiesCache);
            return of(this._companies);
        } else {
            return this._companyService.getAllCompanies().pipe(
                map((companies: ICompanyDetailResponseModel[]) => {
                    this._companies = companies;
                    this._companiesSubject.next(this._companies);
                    this.saveCache();
                    return this._companies;
                }),
                catchError(err => {
                    this._errorHandler.handleError(err);
                    return of([]);
                })
            );
        }
    }

    public getCompanyById(id: string): Observable<ICompanyDetailResponseModel | undefined> {
        return of(this._companies.find((company: ICompanyDetailResponseModel): boolean => Number(company.id) === Number(id)));
    }

    private loadCache(): void {
        if (this._cacheCompany === CacheCompanies.localStorage) {
            const cachedCompanies: string | null = localStorage.getItem(this._localStorageKey);
            if (cachedCompanies) {
                this._companies = JSON.parse(cachedCompanies);
                this._companiesSubject.next(this._companies);
            }
        }
    }

    private saveCache(): void {
        if (this._cacheCompany === CacheCompanies.localStorage) {
            localStorage.setItem(this._localStorageKey, JSON.stringify(this._companies));
        }
    }
}
