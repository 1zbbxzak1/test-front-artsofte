import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {
    ICompanyDetailResponseModel
} from "../../../../data/response-models/company-detail/ICompanyDetail.response-model";
import {AsyncPipe, NgIf} from "@angular/common";
import {CompanyManagerService} from "../../../../data/services/company.manager.service";
import {Observable} from "rxjs";

@Component({
    selector: 'app-company-detail',
    standalone: true,
    imports: [
        NgIf,
        AsyncPipe
    ],
    templateUrl: './company-detail.component.html',
    styleUrl: './styles/company-detail.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CompanyDetailComponent implements OnInit {
    protected company$: Observable<ICompanyDetailResponseModel | undefined> = new Observable<ICompanyDetailResponseModel | undefined>();

    constructor(
        private readonly _companyManagerService: CompanyManagerService,
        private readonly _route: ActivatedRoute
    ) {
    }

    public ngOnInit(): void {
        const companyId: string = this._route.snapshot.paramMap.get('id')!;
        if (companyId) {
            this.company$ = this._companyManagerService.getCompanyById(companyId);
        }
    }
}
