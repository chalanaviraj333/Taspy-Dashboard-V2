import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AddKeydiyRemotePage } from './add-keydiy-remote.page';

describe('AddKeydiyRemotePage', () => {
  let component: AddKeydiyRemotePage;
  let fixture: ComponentFixture<AddKeydiyRemotePage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AddKeydiyRemotePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AddKeydiyRemotePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
