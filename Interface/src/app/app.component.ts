import { LiteralExpr } from '@angular/compiler';
import {Component, OnInit} from '@angular/core';

type GostParamRezb = {
  Param: any;
  Rezbs: any[];
};

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'Interface';
  
  constructor() {

  }
}
