import {Component, Input} from '@angular/core';
import {last} from 'rxjs';

@Component({
  selector: 'app-vaccines',
  imports: [],
  templateUrl: './vaccines.component.html',
  styleUrl: './vaccines.component.scss'
})
export class VaccinesComponent {
  @Input() vaccines: { name: string; date: string; booster: string }[] = [
    {name: 'Parvovirose', date: '24 / 10 / 2024', booster: '24 / 08 / 2025'},
    {name: 'Maladie de Carré', date: '24 / 10 / 2024', booster: '24 / 08 / 2025'},
    {name: 'Hépatite contagieuse canine', date: '24 / 10 / 2024', booster: '24 / 08 / 2025'},
    {name: 'Leptospirose', date: '24 / 10 / 2024', booster: '24 / 08 / 2025'},
  ];
  protected readonly last = last;
}
