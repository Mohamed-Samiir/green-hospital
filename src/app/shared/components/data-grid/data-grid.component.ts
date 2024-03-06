import { Component, Input, OnInit } from '@angular/core';
import { DataGridColumn } from 'src/app/core/interfaces/data-grid-column';

@Component({
  selector: 'app-data-grid',
  templateUrl: './data-grid.component.html',
  styleUrls: ['./data-grid.component.css']
})
export class DataGridComponent implements OnInit {

  @Input() data: any[] = []
  @Input() columns: DataGridColumn[] = []

  constructor() { }

  ngOnInit() {
  }

}
