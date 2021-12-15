import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AddNewGarageRemoteComponentPage } from './add-new-garage-remote-component.page';

describe('AddNewGarageRemoteComponentPage', () => {
  let component: AddNewGarageRemoteComponentPage;
  let fixture: ComponentFixture<AddNewGarageRemoteComponentPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AddNewGarageRemoteComponentPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AddNewGarageRemoteComponentPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
