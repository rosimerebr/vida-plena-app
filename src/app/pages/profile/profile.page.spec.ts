import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProfilePage } from './profile.page';
import { AuthService } from '../../services/auth.service';
import { UserService } from '../../services/user.service';
import { of } from 'rxjs';

class MockAuthService {
  getUserIdFromToken() { return 'mock-user-id'; }
}
class MockUserService {
  getUserProfile() { return of({ fullName: 'Teste', email: 'teste@teste.com', dateOfBirth: '2000-01-01', weight: 70 }); }
  updateUserProfile() { return of({}); }
}

describe('ProfilePage', () => {
  let component: ProfilePage;
  let fixture: ComponentFixture<ProfilePage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProfilePage],
      providers: [
        { provide: AuthService, useClass: MockAuthService },
        { provide: UserService, useClass: MockUserService }
      ]
    }).compileComponents();
    fixture = TestBed.createComponent(ProfilePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('deve criar o componente', () => {
    expect(component).toBeTruthy();
  });
}); 