import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClickableListComponent } from './clickable-list.component';

describe('ClickableListComponent', () => {
  let component: ClickableListComponent;
  let fixture: ComponentFixture<ClickableListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClickableListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClickableListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
