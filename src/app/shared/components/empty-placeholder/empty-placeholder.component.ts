import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-empty-placeholder',
  templateUrl: './empty-placeholder.component.html',
  styleUrls: ['./empty-placeholder.component.css']
})
export class EmptyPlaceholderComponent implements OnInit {

  @Input() displayedText: string = "Empty"

  constructor() { }

  ngOnInit() {
  }

}
