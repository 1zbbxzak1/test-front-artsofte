import {ChangeDetectionStrategy, Component} from '@angular/core';
import {RouterLink} from "@angular/router";

@Component({
    selector: 'app-navigation',
    standalone: true,
    imports: [
        RouterLink
    ],
    templateUrl: './navigation.component.html',
    styleUrl: './styles/navigation.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavigationComponent {

}
