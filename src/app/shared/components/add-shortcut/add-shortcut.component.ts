import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AddShortcut } from 'src/app/core/interfaces/add-shortcut';
import { DataGridDdlsService } from 'src/app/core/services/dataGrid/data-grid-ddls.service';

@Component({
  selector: 'app-add-shortcut',
  templateUrl: './add-shortcut.component.html',
  styleUrls: ['./add-shortcut.component.css']
})
export class AddShortcutComponent implements OnInit {

  addShortcutFormGroup: FormGroup

  @Input() currentFilters: any[]
  @Output() onAddShortsut: EventEmitter<any> = new EventEmitter<any>()
  @Output() onIgnore: EventEmitter<any> = new EventEmitter<any>()

  constructor(
    private fb: FormBuilder,
    private dataGridDdlsService: DataGridDdlsService,
    private router: Router
  ) { }

  ngOnInit() {
    this.buildForm()
  }

  buildForm() {
    this.addShortcutFormGroup = this.fb.group({
      name: ["", [Validators.required, Validators.minLength(3), Validators.maxLength(50)]]
    })
  }

  get f() {
    return this.addShortcutFormGroup.controls
  }

  popupIgnor() {
    this.resetAddForm()
    this.onIgnore.emit()
  }

  resetAddForm() {
    this.addShortcutFormGroup.reset()
  }

  Submit() {
    if (this.addShortcutFormGroup.valid) {
      let currentUrl = this.router.url
      console.log(currentUrl);

      let addShortcutModel = {
        name: this.f["name"].value,
        route: this.router.url.split("?")[0],
        filters: this.currentFilters
      }

      this.dataGridDdlsService.saveShortcut(addShortcutModel as AddShortcut).subscribe(res => {
        if (res.isSuccess) {
          console.log(res);
          this.popupIgnor()
        }
      })
    }
  }

}
