import { Component, OnInit, Inject, Output, EventEmitter } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-base-popup',
  templateUrl: './base-popup.component.html',
  styleUrls: ['./base-popup.component.css']
})
export class BasePopupComponent implements OnInit {

  @Output('Closed') Closed = new EventEmitter();
  description: any;
  title: any;

  constructor(
    public dialogRef: MatDialogRef<BasePopupComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    this.description = data.description;
    this.title = data.title;
  }

  ngOnInit() {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  /**
   * close
   */
  public close() {
    this.Closed.emit();
    this.dialogRef.close();
  }

  /**
   * save
   */
  public save() {}
}
