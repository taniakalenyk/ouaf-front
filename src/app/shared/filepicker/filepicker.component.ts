import {Component, EventEmitter, Output} from '@angular/core';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-filepicker',
  imports: [FormsModule],
  templateUrl: './filepicker.component.html',
  styleUrl: './filepicker.component.scss'
})
export class FilepickerComponent {

  pickedFile: File | null = null;

  @Output()
  picked = new EventEmitter<File | null>(); // file or nothing

  onFilePicked(event: any) {
    this.pickedFile = event.target.files[0];
    this.picked.emit(this.pickedFile);
  }
}
