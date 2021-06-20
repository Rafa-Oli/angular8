import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-drag-and-drop',
  templateUrl: './drag-and-drop.component.html',
  styleUrls: ['./drag-and-drop.component.scss']
})
export class DragAndDropComponent implements OnInit {

  @ViewChild('myrect') myrect: ElementRef;

  top: number = 40;
  left: number = 40;

  constructor() { }

  ngOnInit(): void {
  }

}
