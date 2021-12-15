import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AddXhroseKdRemotePage } from './add-xhrose-kd-remote.page';

describe('AddXhroseKdRemotePage', () => {
  let component: AddXhroseKdRemotePage;
  let fixture: ComponentFixture<AddXhroseKdRemotePage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AddXhroseKdRemotePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AddXhroseKdRemotePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
