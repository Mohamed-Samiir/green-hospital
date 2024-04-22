import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DataGridAction } from 'src/app/core/interfaces/data-grid-action';
import { DataGridColumn } from 'src/app/core/interfaces/data-grid-column';
import { faEye, faPenToSquare, faTrashCan, faLock } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-data-grid',
  templateUrl: './data-grid.component.html',
  styleUrls: ['./data-grid.component.css']
})
export class DataGridComponent implements OnInit {

  @Input() data: any[] = []
  @Input() columns: DataGridColumn[] = []
  @Input() actions: DataGridAction = {}
  @Output() onShowAddClick: EventEmitter<boolean> = new EventEmitter<boolean>()

  faEye = faEye
  faPenToSquare = faPenToSquare
  faTrashCan = faTrashCan
  faLock = faLock

  constructor() { }

  ngOnInit() {
  }

  emitShowAddDialog() {
    this.onShowAddClick.emit(true)
  }

}
