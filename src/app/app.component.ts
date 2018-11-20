import { Component } from '@angular/core';
import { topHeight } from './util/constants';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'portal';
  topHeight = topHeight;
}
