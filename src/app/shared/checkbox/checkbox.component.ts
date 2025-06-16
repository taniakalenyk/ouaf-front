import {Component, EventEmitter, Input, Output} from '@angular/core';
import {NgClass} from '@angular/common';

@Component({
  selector: 'app-checkbox',
  standalone: true,
  imports: [
    NgClass
  ],
  templateUrl: './checkbox.component.html',
  styleUrl: './checkbox.component.scss'
})
export class CheckboxComponent {
  @Input() label: string = '';
  @Input() additionLabel: string = '';
  @Input() backgr: 'dark' | 'light' = 'light';
  @Input() checked: boolean = false;
  @Input() isRadio: boolean = false;
  @Input() name: string = '';
  @Output() checkedChange = new EventEmitter<boolean>();

  onCheckboxChange(event: Event): void {
    const isChecked = (event.target as HTMLInputElement).checked;
    this.checked = isChecked;
    this.checkedChange.emit(isChecked);
  }
}
