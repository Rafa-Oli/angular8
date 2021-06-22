import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { fromEvent } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

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

  ngAfterViewInit(): void {
    let mousedown = fromEvent(this.myrect.nativeElement, 'mousedown');
    let mousemove = fromEvent(document, 'mousemove');
    let mouseup = fromEvent(document, 'mouseup');

    mousedown.subscribe((ed: MouseEvent) => {
      let x = ed.pageX;
      let y = ed.pageY;

      mousemove
      .pipe(takeUntil(mouseup))
      .subscribe((em: MouseEvent) => {
        let offsetx = x - em.pageX;
        let offsety = y - em.pageY;
        this.top -= offsety;
        this.left -= offsetx; 

        x = em.pageX;
        y = em.pageY;

      })
    })
  }

}
