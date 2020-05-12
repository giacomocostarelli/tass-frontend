import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AlternativeElementComponent } from './alternative-element.component';

describe('AlternativeElementComponent', () => {
  let component: AlternativeElementComponent;
  let fixture: ComponentFixture<AlternativeElementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AlternativeElementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlternativeElementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
