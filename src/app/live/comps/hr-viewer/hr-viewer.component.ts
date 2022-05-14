import { Component, Input, OnInit } from '@angular/core';
import { HRValue } from 'src/app/models/hr-value.model';

@Component({
  selector: 'hrt-hr-viewer',
  templateUrl: './hr-viewer.component.html',
})
export class HrViewerComponent implements OnInit {

  @Input()
  value:HRValue | null = null;

  constructor() { }

  ngOnInit(): void {
  }

}
