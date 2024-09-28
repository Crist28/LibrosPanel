import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookActualizarComponent } from './book-actualizar.component';

describe('BookActualizarComponent', () => {
  let component: BookActualizarComponent;
  let fixture: ComponentFixture<BookActualizarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BookActualizarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BookActualizarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
