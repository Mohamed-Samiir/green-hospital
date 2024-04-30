import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { DoctorModel } from 'src/app/core/interfaces/doctor/doctor-model';

@Component({
  selector: 'app-view-doctor-details',
  templateUrl: './view-doctor-details.component.html',
  styleUrls: ['./view-doctor-details.component.css']
})
export class ViewDoctorDetailsComponent implements OnInit, OnChanges {

  @Input() selectedDoctor!: DoctorModel | undefined

  @Output() onIgnore: EventEmitter<any> = new EventEmitter<any>()


  constructor() { }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['selectedDoctor'].currentValue) {
      this.selectedDoctor = changes['selectedDoctor'].currentValue
    }
  }

  popupIgnor() {
    this.onIgnore.emit()
  }

}
