import {Component, Input} from '@angular/core';
import {NgStyle} from '@angular/common';

@Component({
  selector: 'app-polaroid',
  imports: [
    NgStyle
  ],
  templateUrl: './polaroid.component.html',
  styleUrls: ['./polaroid.component.scss']
})
export class PolaroidComponent {
  @Input() size: 'small' | 'regular' = 'regular';
  @Input() title: string = '';
  @Input() description: string = '';
  @Input() imageUrl: string = '';

  default = '/images/gallery/1.jpg'

  width = '';
  height = '';
  finalImageUrl = '';

  ngOnInit() {
    this.setSize(this.size);
    this.finalImageUrl = this.imageUrl?.trim() ? this.imageUrl : this.default;
  }

  setSize(size: 'small' | 'regular') {
    const sizes = {
      small: {width: '7.19rem', height: '9rem'},
      regular: {width: '11.25rem', height: '14.13rem'},
    };

    this.width = sizes[size].width;
    this.height = sizes[size].height;
  }


}

