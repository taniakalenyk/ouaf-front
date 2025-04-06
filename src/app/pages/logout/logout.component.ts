import { Component } from '@angular/core';
import {ButtonComponent} from "../../shared/button/button.component";
import {FooterComponent} from "../../shared/footer/footer.component";
import {HeaderComponent} from "../../shared/header/header.component";

@Component({
  selector: 'app-logout',
    imports: [
        ButtonComponent,
        FooterComponent,
        HeaderComponent
    ],
  templateUrl: './logout.component.html',
  styleUrl: './logout.component.scss'
})
export class LogoutComponent {

}
