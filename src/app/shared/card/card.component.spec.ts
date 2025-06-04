import {ComponentFixture, TestBed} from '@angular/core/testing';
import {CardComponent} from './card.component';
import {OwnerService} from '../../services/users/owner.service';
import {AuthService} from '../../services/auth.service';
import {of} from 'rxjs';

describe('CardComponent', () => {
  let component: CardComponent;
  let fixture: ComponentFixture<CardComponent>;
  let ownerServiceMock: jasmine.SpyObj<OwnerService>;
  let authServiceMock: jasmine.SpyObj<AuthService>;

  beforeEach(async () => {
    ownerServiceMock = jasmine.createSpyObj('OwnerService', ['getCurrentOwner']);
    ownerServiceMock.getCurrentOwner.and.returnValue(of({id: 1, name: 'Test Owner'}));

    authServiceMock = jasmine.createSpyObj('AuthService', [], {id: 1});

    await TestBed.configureTestingModule({
      imports: [CardComponent],
      providers: [
        {provide: OwnerService, useValue: ownerServiceMock},
        {provide: AuthService, useValue: authServiceMock}
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(CardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
