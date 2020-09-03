import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdatedeletenotesComponent } from './updatedeletenotes.component';

describe('UpdatedeletenotesComponent', () => {
  let component: UpdatedeletenotesComponent;
  let fixture: ComponentFixture<UpdatedeletenotesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdatedeletenotesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdatedeletenotesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
