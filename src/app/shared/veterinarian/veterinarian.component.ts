import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-veterinarian',
  imports: [],
  templateUrl: './veterinarian.component.html',
  styleUrl: './veterinarian.component.scss'
})
export class VeterinarianComponent {

  @Input() veterinarian: string = 'Dr. Vétérinaire de Bernard';
  @Input() email: string = 'toto@veterinaire.com';
  @Input() hospital: string = 'Clinique Vétérinaire Saint-Bernard';
  @Input() address: string = '150 Avenue de Strasbourg';
  @Input() city: string = '57070 Metz';
  @Input() phone: string = '+33 7 07 07 07 07';

}
