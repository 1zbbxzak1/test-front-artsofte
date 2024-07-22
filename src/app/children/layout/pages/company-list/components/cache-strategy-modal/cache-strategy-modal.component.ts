import {ChangeDetectionStrategy, Component, EventEmitter, Output} from '@angular/core';
import {CacheCompanies} from "../../../../../../data/enums/cache-companies";

@Component({
    selector: 'app-cache-strategy-modal',
    standalone: true,
    imports: [],
    templateUrl: './cache-strategy-modal.component.html',
    styleUrl: './styles/cache-strategy-modal.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CacheStrategyModalComponent {
    @Output() public cacheStrategySelected: EventEmitter<CacheCompanies> = new EventEmitter<CacheCompanies>();

    protected selectCache(strategy: string): void {
        const cacheStrategy = CacheCompanies[strategy as keyof typeof CacheCompanies];
        this.cacheStrategySelected.emit(cacheStrategy);
    }
}
