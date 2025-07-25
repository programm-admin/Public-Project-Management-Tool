import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KatanaStartComponent } from './katana-start.component';

describe('KatanaStartComponent', () => {
  let component: KatanaStartComponent;
  let fixture: ComponentFixture<KatanaStartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [KatanaStartComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(KatanaStartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
