import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BestWinningBetsComponent } from './best-winning-bets.component';

describe('BestWinningBetsComponent', () => {
  let component: BestWinningBetsComponent;
  let fixture: ComponentFixture<BestWinningBetsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BestWinningBetsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BestWinningBetsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
