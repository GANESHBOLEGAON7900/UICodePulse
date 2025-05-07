import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddBolgPostComponent } from './add-bolg-post.component';

describe('AddBolgPostComponent', () => {
  let component: AddBolgPostComponent;
  let fixture: ComponentFixture<AddBolgPostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddBolgPostComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddBolgPostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
