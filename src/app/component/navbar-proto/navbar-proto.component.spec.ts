import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavbarProtoComponent } from './navbar-proto.component';

describe('NavbarProtoComponent', () => {
  let component: NavbarProtoComponent;
  let fixture: ComponentFixture<NavbarProtoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NavbarProtoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NavbarProtoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
