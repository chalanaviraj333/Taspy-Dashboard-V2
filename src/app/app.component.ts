import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Labels } from './labels';
import { HttpRequestServiceService } from './services/http-request-service.service';


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {

  // public numberOfCarRemote: number;


  public appPages = [
    { title: 'Customers',
      numberofitems: 0,
      children: [
        {
          title: 'All Customers',
          url: '/allcustomers',
          icon: 'layers-outline'
        },
        {
          title: 'Add Customer',
          url: '/addcustomers',
          icon: 'add-circle-outline'
        },
      ]
    },
    { title: 'Car Remotes',
    numberofitems: 0,
      children: [
        {
          title: 'All Remotes',
          url: '/allremotes',
          icon: 'layers-outline'
        },
        {
          title: 'Add Remote',
          url: '/addremote',
          icon: 'add-circle-outline'
        },
        {
          title: 'Add Stock',
          url: '/add-remote-stock',
          icon: 'add-circle-outline'
        },

      ]
    },
    { title: 'Remote Shells',
    numberofitems: 0,
      children: [
        {
          title: 'All Remote-Shells',
          url: '/allremoteshells',
          icon: 'layers-outline'
        },
        {
          title: 'Add Remote-Shell',
          url: '/addremoteshell',
          icon: 'add-circle-outline'
        },
        {
          title: 'Add Stock',
          url: '/addremoteshellstock',
          icon: 'add-circle-outline'
        }
      ]
    },
    { title: 'KEYDIY Remotes',
    numberofitems: 0,
      children: [
        {
          title: 'All KEYDIY Remotes',
          url: '/all-keydiy-remotes',
          icon: 'layers-outline'
        },
        {
          title: 'Add KEYDIY Remote',
          url: '/add-keydiy-remote',
          icon: 'add-circle-outline'
        },
      ]
    },
    { title: 'Cars',
      numberofitems: 0,
      children: [
        {
          title: 'All Car Brands',
          url: '/allcarmodels',
          icon: 'layers-outline'
        },
        {
          title: 'All Car Models',
          url: '/allcarmodels',
          icon: 'layers-outline'
        },
        {
          title: 'Add Car Brand',
          url: '/addcarbrand',
          icon: 'add-circle-outline'
        },
        {
          title: 'Add Car Model',
          url: '/addcarmodel',
          icon: 'add-circle-outline'
        },
        {
          title: 'Add Car Sub Model',
          url: '/add-car-sub-model',
          icon: 'add-circle-outline'
        },
      ]
    },
    { title: 'Garage Remotes',
    numberofitems: 0,
    children: [
      {
        title: 'All Garage Remotes',
        url: '/all-garage-remotes',
        icon: 'layers-outline'
      },
      {
        title: 'Add Garage Remote',
        url: '/add-new-garage-remote',
        icon: 'add-circle-outline'
      },
    ]
  },
  { title: 'Restricted Keys',
    numberofitems: 0,
    children: [
      {
        title: 'All Restricted Keys',
        url: '/allcarmodels',
        icon: 'layers-outline'
      },
      {
        title: 'Generate New System',
        url: '/generate-new-system',
        icon: 'add-circle-outline'
      },
      {
        title: 'Add New Restricted Key',
        url: '/new-restricted-system',
        icon: 'add-circle-outline'
      },
    ]
  },
  ];

  public labels: Array<Labels> = [{title: 'Key Shells not in Shopify', url: '/notaddedkeyshells'},{title: 'Remote Keys not in Shopify', url: '/notaddedkeyremotes'}];
  constructor(private http: HttpClient, public allhttprequestservice: HttpRequestServiceService) {

  }


  async ngOnInit() {

    await this.http
   .get<{ [key: string]: string }>(
     "https://tapsystock-a6450-default-rtdb.firebaseio.com/remotes.json"
   )
   .subscribe((resData) => {
     for (const key in resData) {
       if (resData.hasOwnProperty(key)) {
         this.appPages[1].numberofitems++;
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
         this.appPages[3].numberofitems++;
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
         this.appPages[2].numberofitems++;
       }
     }

   });

   await this.http
   .get<{ [key: string]: string }>(
     "https://tapsystock-a6450-default-rtdb.firebaseio.com/garage-remotes.json"
   )
   .subscribe((resData) => {
     for (const key in resData) {
       if (resData.hasOwnProperty(key)) {
         this.appPages[4].numberofitems++;
       }
     }

   });

  //  this.allhttprequestservice.getAllRemotes();
  }

}
