import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TreeGraphComponentComponent } from './tree-graph-component.component';

describe('TreeGraphComponentComponent', () => {
  let component: TreeGraphComponentComponent;
  let fixture: ComponentFixture<TreeGraphComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TreeGraphComponentComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TreeGraphComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
