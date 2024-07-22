import {ChangeDetectionStrategy, Component, OnDestroy, OnInit} from '@angular/core';
import {AngularYandexMapsModule, YaReadyEvent} from 'angular8-yandex-maps';
import {
    ICompanyDetailResponseModel
} from '../../../../data/response-models/company-detail/ICompanyDetail.response-model';
import {CompanyManagerService} from '../../../../data/services/company.manager.service';
import {Subscription} from 'rxjs';
import {NgForOf} from '@angular/common';

@Component({
    selector: 'app-company-yandex-map',
    standalone: true,
    imports: [
        AngularYandexMapsModule,
        NgForOf
    ],
    templateUrl: './company-yandex-map.component.html',
    styleUrl: './styles/company-yandex-map.component.scss',
    changeDetection: ChangeDetectionStrategy.Default,
})
export class CompanyYandexMapComponent implements OnInit, OnDestroy {
    protected companies: ICompanyDetailResponseModel[] = [];
    protected mapCenter: [number, number] = [55.751244, 37.618423];
    protected mapZoom: number = 10;
    protected objectManagerOptions: ymaps.IObjectManagerOptions = {
        clusterize: true,
        gridSize: 32,
        clusterDisableClickZoom: true
    };
    private _sub: Subscription = new Subscription();
    private _mapObjectManager?: ymaps.ObjectManager;

    constructor(private readonly _companyManagerService: CompanyManagerService) {
    }

    public ngOnInit(): void {
        const companiesCache: string | null = localStorage.getItem('companiesCache');
        if (companiesCache) {
            this.companies = JSON.parse(companiesCache);
            if (this.companies.length > 0) {
                this.mapCenter = [this.companies[0].latitude, this.companies[0].longitude];
            }

        } else {
            this._sub.add(this._companyManagerService.companies$.subscribe((companies: ICompanyDetailResponseModel[]): void => {
                this.companies = companies;
                if (this.companies.length > 0) {
                    this.mapCenter = [this.companies[0].latitude, this.companies[0].longitude];
                }
            }));
        }

        if (this._mapObjectManager) {
            this.updateMapData(this._mapObjectManager);
        }
    }

    public ngOnDestroy(): void {
        this._sub.unsubscribe();
    }

    protected onObjectManagerReady({target}: YaReadyEvent<ymaps.ObjectManager>): void {
        this._mapObjectManager = target;
        target.objects.options.set('preset', 'islands#blueDotIcon');
        target.clusters.options.set('preset', 'islands#blueClusterIcons');
        this.updateMapData(target);
    }

    protected centerOnCompany(company: ICompanyDetailResponseModel): void {
        this.mapCenter = [company.latitude, company.longitude];
        this.mapZoom = 14;
        if (this._mapObjectManager) {
            const object: object | null = this._mapObjectManager.objects.getById(Number(company.id));
            if (object) {
                this._mapObjectManager.objects.balloon.open(company.id);
            }
        }
    }

    private updateMapData(target: ymaps.ObjectManager): void {
        const data = {
            type: 'FeatureCollection',
            features: this.companies.map((company: ICompanyDetailResponseModel) => ({
                type: 'Feature',
                id: company.id,
                geometry: {
                    type: 'Point',
                    coordinates: [company.latitude, company.longitude]
                },
                properties: {
                    balloonContent: `
            <div style="display: flex; align-items: center;">
                <img src="${company.logo}" alt="${company.business_name}" style="width: 30%; height: fit-content; margin-right: 10px;">
                <div>
                    <strong>${company.business_name}</strong><br>
                    <i>Industry:</i> ${company.industry}<br/>
                    <i>Catch phrase:</i> ${company.catch_phrase}<br>
                    <i>Phone:</i> ${company.phone_number}<br/>
                    <i>Address:</i> ${company.full_address}<br>
                </div>
            </div>
          `
                }
            }))
        };

        target.removeAll();
        target.add(data);
    }
}
