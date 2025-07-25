import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KatanaDialogComponent } from './katana-dialog.component';

describe('KatanaDialogComponent', () => {
  let component: KatanaDialogComponent;
  let fixture: ComponentFixture<KatanaDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [KatanaDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(KatanaDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
