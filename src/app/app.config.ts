import {ApplicationConfig, importProvidersFrom, provideZoneChangeDetection} from '@angular/core';
import {provideRouter} from '@angular/router';

import {routes} from './app.routes';
import {provideClientHydration} from '@angular/platform-browser';
import {provideHttpClient} from "@angular/common/http";
import {environment} from "../environments/environment";
import {BehaviorSubject} from "rxjs";
import {AngularYandexMapsModule, YaConfig} from "angular8-yandex-maps";

export const config$: BehaviorSubject<YaConfig> = new BehaviorSubject<YaConfig>({
    apikey: environment.apikey,
});

export const appConfig: ApplicationConfig = {
    providers: [
        provideZoneChangeDetection({eventCoalescing: true}),
        provideRouter(routes),
        provideClientHydration(),
        provideHttpClient(),
        importProvidersFrom(AngularYandexMapsModule.forRoot(config$)),
    ]
};
