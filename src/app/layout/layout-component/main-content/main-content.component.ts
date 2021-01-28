import { NgxUiLoaderService } from 'ngx-ui-loader';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-main-content',
  templateUrl: './main-content.component.html',
  styleUrls: ['./main-content.component.css']
})
export class MainContentComponent implements OnInit {

  constructor(private ngxService: NgxUiLoaderService) { }

  ngOnInit(): void {
  }
}
