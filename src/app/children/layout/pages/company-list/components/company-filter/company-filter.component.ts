import {ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule} from "@angular/forms";
import {
    ICompanyDetailResponseModel
} from "../../../../../../data/response-models/company-detail/ICompanyDetail.response-model";
import {NgForOf} from "@angular/common";

@Component({
    selector: 'app-company-filter',
    standalone: true,
    imports: [
        ReactiveFormsModule,
        NgForOf
    ],
    templateUrl: './company-filter.component.html',
    styleUrl: './styles/company-filter.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CompanyFilterComponent implements OnInit {
    @Output() public filterChanged: EventEmitter<string> = new EventEmitter<string>();
    @Input() public companies: ICompanyDetailResponseModel[] = [];
    protected filterForm: FormGroup;
    protected types: string[] = [];
    protected industries: string[] = [];

    constructor(private _fb: FormBuilder) {
        this.filterForm = this._fb.group({
            name: [''],
            type: [''],
            industry: ['']
        });
    }

    public ngOnInit(): void {
        this.types = [...new Set(this.companies.map((company: ICompanyDetailResponseModel) => company.type))];
        this.industries = [...new Set(this.companies.map((company: ICompanyDetailResponseModel) => company.industry))];

        this.filterForm.valueChanges.subscribe((value: any): void => {
            this.filterChanged.emit(value);
        });
    }
}
