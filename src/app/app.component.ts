import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {

  public numberOfCarRemote: number;


  public appPages = [
    { title: 'Customers',
      numberofitems: 0,
      children: [
        {
          title: 'All Customers',
          url: '/allcustomers',
          icon: 'assets/icon/all.svg'
        },
        {
          title: 'Add Customer',
          url: '/addcustomers',
          icon: 'assets/icon/add.svg'
        },
        {
          title: 'Edit Customer',
          url: '/editcustomer',
          icon: 'assets/icon/edit.svg'
        },
        {
          title: 'Delete Customer',
          url: '/deletecustomer',
          icon: 'assets/icon/delete.svg'
        },
        {
          title: 'Export Customers',
          url: '/exportcustomers',
          icon: 'assets/icon/export.svg'
        }
      ]
    },
    { title: 'Car Remotes',
    numberofitems: 0,
      children: [
        {
          title: 'All Remotes',
          url: '/allremotes',
          icon: 'assets/icon/all.svg'
        },
        {
          title: 'Add Remote',
          url: '/addremote',
          icon: 'assets/icon/add.svg'
        },
        {
          title: 'Edit Remote',
          url: '/editremote',
          icon: 'assets/icon/edit.svg'
        },
        {
          title: 'Delete Remote',
          url: '/deleteremote',
          icon: 'assets/icon/delete.svg'
        },
      ]
    },
    { title: 'Remote Shells',
    numberofitems: 0,
      children: [
        {
          title: 'All Remote-Shells',
          url: '/allremoteshells',
          icon: 'assets/icon/all.svg'
        },
        {
          title: 'Add Remote-Shell',
          url: '/addremoteshell',
          icon: 'assets/icon/add.svg'
        },
        {
          title: 'Edit Remote-Shell',
          url: '/editremoteshell',
          icon: 'assets/icon/edit.svg'
        },
        {
          title: 'Delete Remote-Shell',
          url: '/deleteremoteshell',
          icon: 'assets/icon/delete.svg'
        },
      ]
    },
    { title: 'Car Brands',
    numberofitems: 0,
      children: [
        {
          title: 'All Car Brands',
          url: '/allcarbrands',
          icon: 'assets/icon/all.svg'
        },
        {
          title: 'Add Car Brand',
          url: '/addcarbrand',
          icon: 'assets/icon/add.svg'
        },
        {
          title: 'Edit Car Brand',
          url: '/editcarbrand',
          icon: 'assets/icon/edit.svg'
        },
        {
          title: 'Delete Car Brand',
          url: '/deletecarbrand',
          icon: 'assets/icon/delete.svg'
        },
      ]
    },
    { title: 'Car Models',
      numberofitems: 0,
      children: [
        {
          title: 'All Car Models',
          url: '/allcarmodels',
          icon: 'assets/icon/all.svg'
        },
        {
          title: 'Add Car Model',
          url: '/addcarmodel',
          icon: 'assets/icon/add.svg'
        },
        {
          title: 'Edit Car Model',
          url: '/editcarmodel',
          icon: 'assets/icon/edit.svg'
        },
        {
          title: 'Delete Car Model',
          url: '/deletecarmodel',
          icon: 'assets/icon/delete.svg'
        },
      ]
    },

  ];

  public labels = ['Family', 'Friends', 'Notes', 'Work', 'Travel', 'Reminders'];
  constructor(private http: HttpClient ) {

  }


  async ngOnInit() {

    await this.http
   .get<{ [key: string]: string }>(
     "https://tapsystock-a6450-default-rtdb.firebaseio.com/remotes.json"
   )
   .subscribe((resData) => {
     for (const key in resData) {
       if (resData.hasOwnProperty(key)) {
         this.appPages[1].numberofitems = this.appPages[1].numberofitems + 1;
       }
     }

   });

   await this.http
   .get<{ [key: string]: string }>(
     "https://tapsystock-a6450-default-rtdb.firebaseio.com/car-brand.json"
   )
   .subscribe((resData) => {
     for (const key in resData) {
       if (resData.hasOwnProperty(key)) {
         this.appPages[3].numberofitems = this.appPages[3].numberofitems + 1;
       }
     }

   });

   await this.http
   .get<{ [key: string]: string }>(
     "https://tapsystock-a6450-default-rtdb.firebaseio.com/car-model.json"
   )
   .subscribe((resData) => {
     for (const key in resData) {
       if (resData.hasOwnProperty(key)) {
         this.appPages[4].numberofitems = this.appPages[4].numberofitems + 1;
       }
     }

   });

   await this.http
   .get<{ [key: string]: string }>(
     "https://tapsystock-a6450-default-rtdb.firebaseio.com/remote-shells.json"
   )
   .subscribe((resData) => {
     for (const key in resData) {
       if (resData.hasOwnProperty(key)) {
         this.appPages[2].numberofitems = this.appPages[2].numberofitems + 1;
       }
     }

   });
  }

}
