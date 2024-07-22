import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {CompanyItemComponent} from "./components/company-item/company-item.component";
import {CompanyFilterComponent} from "./components/company-filter/company-filter.component";
import {CompanySortComponent} from "./components/company-sort/company-sort.component";
import {CompanyManagerService} from "../../../../data/services/company.manager.service";
import {NgForOf, NgIf} from "@angular/common";
import {
    ICompanyDetailResponseModel
} from "../../../../data/response-models/company-detail/ICompanyDetail.response-model";
import {CacheStrategyModalComponent} from "./components/cache-strategy-modal/cache-strategy-modal.component";
import {CacheCompanies} from "../../../../data/enums/cache-companies";

@Component({
    selector: 'app-company-list',
    standalone: true,
    imports: [
        CompanyItemComponent,
        CompanyFilterComponent,
        CompanySortComponent,
        NgForOf,
        CacheStrategyModalComponent,
        NgIf
    ],
    templateUrl: './company-list.component.html',
    styleUrl: './styles/company-list.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CompanyListComponent implements OnInit {
    protected companies: ICompanyDetailResponseModel[] = [];
    protected originalCompanies: ICompanyDetailResponseModel[] = [];
    protected showCacheModal: boolean = true;

    constructor(
        private readonly _companyManagerService: CompanyManagerService,
    ) {
    }

    public ngOnInit(): void {
        if (sessionStorage.getItem('pageReloaded') === 'true') {
            this.showCacheModal = false;
        } else {
            sessionStorage.setItem('pageReloaded', 'true');
            this.showCacheModal = localStorage.getItem('cacheModalShow') !== 'true';
        }

        this._companyManagerService.getAllCompanies().subscribe((companies: ICompanyDetailResponseModel[]): void => {
            this.companies = companies;
            this.originalCompanies = [...companies];
        });
    }

    protected onCacheStrategySelected(strategy: CacheCompanies): void {
        this._companyManagerService.setCacheStrategy(strategy);
        this.showCacheModal = false;
        localStorage.setItem('cacheModalShow', 'true');

        this._companyManagerService.getAllCompanies().subscribe((companies: ICompanyDetailResponseModel[]): void => {
            this.companies = companies;
            this.originalCompanies = [...companies];
        });
    }

    protected onSortChanged(sortBy: string): void {
        if (sortBy === "") {
            this.companies = [...this.originalCompanies];
        } else {
            this.companies.sort((a: ICompanyDetailResponseModel, b: ICompanyDetailResponseModel): number => {
                if (sortBy === 'business_name') {
                    return a.business_name.localeCompare(b.business_name);
                } else if (sortBy === 'type') {
                    return a.type.localeCompare(b.type);
                } else if (sortBy === 'industry') {
                    return a.industry.localeCompare(b.industry);
                }
                return 0;
            });
        }
    }

    protected onFilterChanged(filterValues: any): void {
        this.companies = this.originalCompanies.filter((company: ICompanyDetailResponseModel) => {
            return (!filterValues.name || company.business_name.toLowerCase().includes(filterValues.name.toLowerCase())) &&
                (!filterValues.type || company.type === filterValues.type) &&
                (!filterValues.industry || company.industry === filterValues.industry);
        });
    }
}
