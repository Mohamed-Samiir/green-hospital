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
  @Output() onEditClick: EventEmitter<string> = new EventEmitter<string>()
  @Output() onDeleteClick: EventEmitter<string> = new EventEmitter<string>()
  @Output() onDetailsClick: EventEmitter<string> = new EventEmitter<string>()

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

  emitEditAction(rowId: string) {
    debugger
    this.onEditClick.emit(rowId)
  }

  emitDetailsAction(rowId: string) {
    this.onDetailsClick.emit(rowId)
  }

  emitDeleteAction(rowId: string) {
    this.onDeleteClick.emit(rowId)
  }

}
