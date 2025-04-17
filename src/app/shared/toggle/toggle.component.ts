import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'app-toggle',
  templateUrl: './toggle.component.html',
  styleUrl: './toggle.component.scss',
})
export class ToggleComponent {
  @Input() label: string = '';
  @Output() toggleEvent = new EventEmitter<void>();


  toggle() {
    this.toggleEvent.emit();
  }
}

