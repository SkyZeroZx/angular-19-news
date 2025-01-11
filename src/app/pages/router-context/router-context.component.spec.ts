import { ComponentFixture, TestBed } from '@angular/core/testing';
import RouterContextComponent from './router-context.component';

describe('RouterContextComponent', () => {
  let component: RouterContextComponent;
  let fixture: ComponentFixture<RouterContextComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterContextComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(RouterContextComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
