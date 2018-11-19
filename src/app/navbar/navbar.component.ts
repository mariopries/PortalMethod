import { Component, HostListener, OnInit, EventEmitter } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { isMobile } from '../app.module';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {

  public sideMenuClick = new EventEmitter();
  public screenHeight: number;
  public screenWidth: number;
  public hasSideMenu = this.screenWidth < 1004;

  constructor() {
    this.onResize();
  }

  ngOnInit() {
    if (this.screenWidth < 1004) {
      isMobile.small = true;
    } else {
      isMobile.small = false;
    }
  }

  onClickSideMenu($event) {
    this.sideMenuClick.emit($event);
  }

  @HostListener('window:resize', ['$event'])
    onResize(event?) {
      this.screenHeight = window.innerHeight;
      this.screenWidth = window.innerWidth;
      if (this.screenWidth < 1004) {
        isMobile.small = true;
      } else {
        isMobile.small = false;
      }
  }

}
