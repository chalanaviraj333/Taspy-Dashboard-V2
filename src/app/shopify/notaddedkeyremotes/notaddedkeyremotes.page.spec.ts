import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { NotaddedkeyremotesPage } from './notaddedkeyremotes.page';

describe('NotaddedkeyremotesPage', () => {
  let component: NotaddedkeyremotesPage;
  let fixture: ComponentFixture<NotaddedkeyremotesPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ NotaddedkeyremotesPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(NotaddedkeyremotesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
