import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import {Router, RouterLink} from "@angular/router";

@Component({
    selector: 'app-company-item',
    standalone: true,
    imports: [
        RouterLink
    ],
    templateUrl: './company-item.component.html',
    styleUrl: './styles/company-item.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CompanyItemComponent {
    @Input() public id: string = '';
    @Input() public business_name: string = '';
    @Input() public suffix: string = '';
    @Input() public industry: string = '';
    @Input() public logo: string = '';
    @Input() public type: string = '';

    constructor(private readonly _router: Router) {
    }

    protected navigateToDetailCompany(): void {
        this._router.navigate(['/detail', this.id]);
    }
}
