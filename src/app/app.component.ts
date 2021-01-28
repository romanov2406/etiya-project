import { Component } from '@angular/core';
import { NgxUiLoaderService } from "ngx-ui-loader"; 
import { OnInit } from "@angular/core";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'proto';
  
  constructor(){}
  ngOnInit(): void {
  }
}
