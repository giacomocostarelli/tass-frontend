import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SecretPlacesComponent } from './secret-places.component';

describe('SecretPlacesComponent', () => {
  let component: SecretPlacesComponent;
  let fixture: ComponentFixture<SecretPlacesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SecretPlacesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SecretPlacesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
