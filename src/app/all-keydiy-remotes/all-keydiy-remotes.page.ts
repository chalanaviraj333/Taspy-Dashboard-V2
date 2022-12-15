import { Component, OnInit } from '@angular/core';
import { KeydiyProductUploadService } from '../services/keydiy-product-upload.service';

@Component({
  selector: 'app-all-keydiy-remotes',
  templateUrl: './all-keydiy-remotes.page.html',
  styleUrls: ['./all-keydiy-remotes.page.scss'],
})
export class AllKeydiyRemotesPage implements OnInit {

  constructor(public keyProductUploadService: KeydiyProductUploadService) { }

  ngOnInit() {
    this.keyProductUploadService.getallKeydiyRemotes();
  }

}
