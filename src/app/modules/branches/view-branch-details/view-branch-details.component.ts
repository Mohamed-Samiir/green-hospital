import { Component, Input, OnInit } from '@angular/core';
import { BranchModel } from 'src/app/core/interfaces/branch/branch-model';

@Component({
  selector: 'app-view-branch-details',
  templateUrl: './view-branch-details.component.html',
  styleUrls: ['./view-branch-details.component.css']
})
export class ViewBranchDetailsComponent implements OnInit {

  @Input() selectedBranch: BranchModel | undefined

  constructor() { }

  ngOnInit(): void {
  }

}
