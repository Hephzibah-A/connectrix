import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImagePostComponent } from './image-post.component';

describe('ImagePostComponent', () => {
  let component: ImagePostComponent;
  let fixture: ComponentFixture<ImagePostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ImagePostComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ImagePostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
