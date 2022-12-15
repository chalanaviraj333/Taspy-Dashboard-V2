import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-product-card-keydiy',
  templateUrl: './product-card-keydiy.component.html',
  styleUrls: ['./product-card-keydiy.component.scss'],
})
export class ProductCardKeydiyComponent implements OnInit {

  @Input() productInformations: any;

  constructor() { }

  ngOnInit() {}

}
