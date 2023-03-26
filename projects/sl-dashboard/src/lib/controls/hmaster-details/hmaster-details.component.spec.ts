import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HMasterDetailsComponent } from './hmaster-details.component';

describe('HMasterDetailsComponent', () => {
  let component: HMasterDetailsComponent;
  let fixture: ComponentFixture<HMasterDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HMasterDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HMasterDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
