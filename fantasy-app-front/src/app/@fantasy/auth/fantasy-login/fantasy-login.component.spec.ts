import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FantasyLoginComponent } from './fantasy-login.component';

describe('FantasyLoginComponent', () => {
  let component: FantasyLoginComponent;
  let fixture: ComponentFixture<FantasyLoginComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FantasyLoginComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FantasyLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
