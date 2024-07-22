import {ChangeDetectionStrategy, Component} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {LayoutComponent} from "./children/layout/layout.component";

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [RouterOutlet, LayoutComponent],
    template: `
        <app-layout/>`,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
    title: string = 'test-front-artsofte';
}
