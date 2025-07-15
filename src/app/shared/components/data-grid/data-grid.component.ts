import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DataGridAction } from 'src/app/core/interfaces/data-grid-action';
import { DataGridColumn } from 'src/app/core/interfaces/data-grid-column';
import { faEye, faPenToSquare, faTrashCan, faLock } from '@fortawesome/free-solid-svg-icons';
import { GridColumnTypes } from 'src/app/core/enums/grid-column-types.enum';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-data-grid',
  templateUrl: './data-grid.component.html',
  styleUrls: ['./data-grid.component.css']
})
export class DataGridComponent implements OnInit {

  @Input() data: any[] = []
  @Input() isGetObject: boolean = false
  @Input() columns: DataGridColumn[] = []
  @Input() actions: DataGridAction = {}
  @Output() onShowAddClick: EventEmitter<boolean> = new EventEmitter<boolean>()
  @Output() onEditClick: EventEmitter<string> = new EventEmitter<string>()
  @Output() onEditObjectClick: EventEmitter<any> = new EventEmitter<string>()
  @Output() onDeleteClick: EventEmitter<string> = new EventEmitter<string>()
  @Output() onDeleteObjectClick: EventEmitter<any> = new EventEmitter<string>()
  @Output() onDetailsClick: EventEmitter<string> = new EventEmitter<string>()
  @Output() onDetailsObjectClick: EventEmitter<any> = new EventEmitter<string>()

  ageUnits = [
    {
      id: 1,
      name: "يوم"
    },
    {
      id: 2,
      name: "شهر"
    },
    {
      id: 3,
      name: "سنة"
    }
  ]

  gridColumnTypes = GridColumnTypes
  faEye = faEye
  faPenToSquare = faPenToSquare
  faTrashCan = faTrashCan
  faLock = faLock

  constructor(
    public authService: AuthService
  ) { }

  ngOnInit() {
  }

  emitShowAddDialog() {
    this.onShowAddClick.emit(true)
  }

  emitEditAction(rowId: string) {
    this.onEditClick.emit(rowId)
  }

  emitEditObjectAction(element: any) {
    debugger
    this.onEditObjectClick.emit(element)
  }

  emitDetailsAction(rowId: string) {
    this.onDetailsClick.emit(rowId)
  }

  emitDetailsObjectAction(element: any) {
    this.onDetailsObjectClick.emit(element)
  }

  emitDeleteAction(rowId: string) {
    this.onDeleteClick.emit(rowId)
  }

  emitDeleteObjectAction(element: any) {
    this.onDeleteObjectClick.emit(element)
  }

  getUnitName(unitId: number) {
    if (unitId) {
      let unitName = this.ageUnits.find(unit => unit.id == unitId)
      if (unitName)
        return unitName.name
    }

    return null
  }

}
