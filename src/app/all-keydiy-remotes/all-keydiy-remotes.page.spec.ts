import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AllKeydiyRemotesPage } from './all-keydiy-remotes.page';

describe('AllKeydiyRemotesPage', () => {
  let component: AllKeydiyRemotesPage;
  let fixture: ComponentFixture<AllKeydiyRemotesPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AllKeydiyRemotesPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AllKeydiyRemotesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
