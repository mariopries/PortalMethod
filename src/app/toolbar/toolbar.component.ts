import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { HostListener } from "@angular/core";
import { isMobile } from "../app.module";
import { XmlService } from "../services/xml.service";

@Component({
  selector: "app-toolbar",
  templateUrl: "./toolbar.component.html",
  styleUrls: ["./toolbar.component.css"]
})
export class ToolbarComponent implements OnInit {
  @Output()
  public sideMenuClick = new EventEmitter();
  public screenHeight: number;
  public screenWidth: number;
  public hasSideMenu = this.screenWidth < 1004;
  public isMobile = isMobile;

  constructor() {
    console.log(
      XmlService.parse(`<root>
    <desert>
      <met>sort</met>
      <class>
        <suddenly>process</suddenly>
        <congress>slope</congress>
        <her>twice</her>
        <potatoes>children</potatoes>
        <society>town</society>
        <balance>possible</balance>
      </class>
      <happened>-1849052110</happened>
      <chain>porch</chain>
      <underline>pressure</underline>
      <worse>lost</worse>
    </desert>
    <date>-868704398.0661106</date>
    <diagram>-5788260.558088303</diagram>
    <teacher>986782393</teacher>
    <brush>enemy</brush>
    <creature>fly</creature>
  </root>`)
    );
    this.onResize();
    this.sideMenuClick = new EventEmitter();
  }

  ngOnInit() {}

  onClickSideMenu($event) {
    this.sideMenuClick.emit($event);
  }

  @HostListener("window:resize", ["$event"])
  onResize(event?) {
    this.screenHeight = window.innerHeight;
    this.screenWidth = window.innerWidth;
    this.hasSideMenu = this.screenWidth < 1004;
  }
}
