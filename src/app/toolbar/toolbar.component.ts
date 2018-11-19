import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { HostListener } from "@angular/core";

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent implements OnInit {

  @Output()
  public sideMenuClick = new EventEmitter();
  public screenHeight: number;
  public screenWidth: number;
  public hasSideMenu = this.screenWidth < 1004;

  constructor() {
    this.onResize();
    this.sideMenuClick = new EventEmitter();
  }

  ngOnInit() {
  }

  onClickSideMenu($event) {
    this.sideMenuClick.emit($event);
  }

  @HostListener('window:resize', ['$event'])
    onResize(event?) {
      this.screenHeight = window.innerHeight;
      this.screenWidth = window.innerWidth;
      this.hasSideMenu = this.screenWidth < 1004;
  }

}
