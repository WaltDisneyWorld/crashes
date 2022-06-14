import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BetsFormComponent } from './bets-form.component';

describe('BetsFormComponent', () => {
  let component: BetsFormComponent;
  let fixture: ComponentFixture<BetsFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BetsFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BetsFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
