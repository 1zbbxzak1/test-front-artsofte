import {ChangeDetectionStrategy, Component} from '@angular/core';
import {RouterOutlet} from "@angular/router";
import {NavigationComponent} from "./components/navigation/navigation.component";

@Component({
    selector: 'app-layout',
    standalone: true,
    imports: [
        RouterOutlet,
        NavigationComponent
    ],
    templateUrl: './layout.component.html',
    styleUrl: './styles/layout.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LayoutComponent {

}
