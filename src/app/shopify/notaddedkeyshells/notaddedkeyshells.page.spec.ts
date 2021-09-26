import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { NotaddedkeyshellsPage } from './notaddedkeyshells.page';

describe('NotaddedkeyshellsPage', () => {
  let component: NotaddedkeyshellsPage;
  let fixture: ComponentFixture<NotaddedkeyshellsPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ NotaddedkeyshellsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(NotaddedkeyshellsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
