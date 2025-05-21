import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilepickerComponent } from './filepicker.component';

describe('FilepickerComponent', () => {
  let component: FilepickerComponent;
  let fixture: ComponentFixture<FilepickerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FilepickerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FilepickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
