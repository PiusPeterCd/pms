import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateunitComponent } from './updateunit.component';

describe('UpdateunitComponent', () => {
  let component: UpdateunitComponent;
  let fixture: ComponentFixture<UpdateunitComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpdateunitComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UpdateunitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
