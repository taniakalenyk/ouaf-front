import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-card',
  imports: [],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss'
})
export class CardComponent {
  @Input() firstname: string = 'TETIANA';
  @Input() lastname: string = 'LOMBARDI';
  @Input() description: string = 'Heureuse propriétaire de Maybe et Baily, passionnée par les activités en plein air avec mes compagnons à quatre pattes. Heureuse propriétaire de Maybe et Baily, passionnée par les activités en plein air avec mes compagnons à quatre pattes.';
  @Input() profilePicture: string = '/images/profile-picture.png';
  @Input() email: string = 'tetiana.lombardi@ouaf.academy';
  @Input() address: string = '150 Avenue de Strasbourg';
  @Input() city: string = '57070 Metz';
  @Input() phone: string = '+33 7 07 07 07 07';
  @Input() birthdate: string = '07 / 06 / 1992';

}
