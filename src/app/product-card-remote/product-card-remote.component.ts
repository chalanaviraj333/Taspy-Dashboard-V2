import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-product-card-remote',
  templateUrl: './product-card-remote.component.html',
  styleUrls: ['./product-card-remote.component.scss'],
})
export class ProductCardRemoteComponent implements OnInit {

  @Input() productInformations: any;

  constructor() { }

  ngOnInit() {}

}
