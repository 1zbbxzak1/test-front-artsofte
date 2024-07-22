import {Routes} from '@angular/router';
import {CompanyListComponent} from "./children/layout/pages/company-list/company-list.component";
import {CompanyDetailComponent} from "./children/layout/pages/company-detail/company-detail.component";
import {CompanyYandexMapComponent} from "./children/layout/pages/company-yandex-map/company-yandex-map.component";

export const routes: Routes = [
    {path: '', component: CompanyListComponent, pathMatch: "full"},
    {path: 'detail/:id', component: CompanyDetailComponent},
    {path: 'map', component: CompanyYandexMapComponent},
];
