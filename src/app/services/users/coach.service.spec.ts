import {TestBed} from '@angular/core/testing';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';

import {CoachService} from './coach.service';
import {Coach} from '../../models/coach.model';

describe('CoachService', () => {
  let service: CoachService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CoachService]
    });
    service = TestBed.inject(CoachService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get current coach', () => {
    const mockCoach: Coach = {
      id: 1,
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@example.com',
      password: 'password',
      registrationDate: '2023-01-01T00:00:00',
      role: 'COACH',
      specialties: ['Dog Training', 'Behavior Modification']
    };

    service.getCurrentCoach(1).subscribe(coach => {
      expect(coach).toEqual(mockCoach);
    });

    const req = httpMock.expectOne('http://localhost:8080/api/coaches/1');
    expect(req.request.method).toBe('GET');
    req.flush(mockCoach);
  });

  it('should get current user by role and id', () => {
    const mockCoach: Coach = {
      id: 1,
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@example.com',
      password: 'password',
      registrationDate: '2023-01-01T00:00:00',
      role: 'COACH',
      specialties: ['Dog Training', 'Behavior Modification']
    };

    service.getCurrentUser('coach', 1).subscribe(coach => {
      expect(coach).toEqual(mockCoach);
    });

    const req = httpMock.expectOne('http://localhost:8080/api/coaches/1');
    expect(req.request.method).toBe('GET');
    req.flush(mockCoach);
  });
});
