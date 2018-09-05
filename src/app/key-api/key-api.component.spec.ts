import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { KeyApiComponent } from './key-api.component';
import { KeyApiService } from '../key-api.service';
import { MovieService} from '../movie.service';

describe('KeyApiComponent', () => {
  let component: KeyApiComponent;
  let fixture: ComponentFixture<KeyApiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ FormsModule,
               HttpClientTestingModule],
      declarations: [ KeyApiComponent ],
      providers: [ KeyApiService,
                 MovieService]
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
