import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KeyApiComponent } from './key-api.component';

describe('KeyApiComponent', () => {
  let component: KeyApiComponent;
  let fixture: ComponentFixture<KeyApiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KeyApiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KeyApiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
