import {ChangeDetectionStrategy, Component, EventEmitter, Output} from '@angular/core';
import {NgForOf} from "@angular/common";

@Component({
    selector: 'app-company-sort',
    standalone: true,
    imports: [
        NgForOf
    ],
    templateUrl: './company-sort.component.html',
    styleUrl: './styles/company-sort.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CompanySortComponent {
    @Output() public sortChanged: EventEmitter<string> = new EventEmitter<string>();
    protected defaultSort: string = "";

    protected onSortChange(event: Event): void {
        const selectElement: HTMLSelectElement = event.target as HTMLSelectElement;
        this.sortChanged.emit(selectElement.value);
    }
}
