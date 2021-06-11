import { Component, OnInit } from '@angular/core';
import { from, fromEvent, interval } from 'rxjs';
import { delay, filter, map, tap } from 'rxjs/operators';

@Component({
  selector: 'app-operators',
  templateUrl: './operators.component.html',
  styleUrls: ['./operators.component.scss']
})
export class OperatorsComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  public mapClick(): void {
    from([1, 2, 3, 4, 5, 6, 7])
      .pipe(
        map((i) => "Number: " + i),
        delay(1000)
      )
      .subscribe((i) => console.log(i))

    // fromEvent(document, 'click')
    //   .pipe(
    //     map((e: MouseEvent) => ({ x: e.screenX, y: e.screenY }))
    //   )
    //   .subscribe((pos) => console.log(pos));

  }

  public filterClick(): void {
    from([1, 2, 3, 4, 5, 6, 7])
      .pipe(
        filter((i) => i % 2 == 1)
      )
      .subscribe((i) => console.log(i))

    interval(1000).pipe(
      filter((i) => i % 2 == 0),
      map(i => "Value: " + i),
      delay(1000)
    )
      .subscribe((pos) => console.log(pos));
  }

  public tapClick(): void {
    interval(1000).pipe(
      tap((i) => console.log('')),
      tap((i) => console.warn('Before filtering: ', i)),
      filter((i) => i % 2 == 0),
      tap((i) => console.warn('After filtering: ', i)),
      map(i => "Value: " + i),
      tap((i) => console.warn('After map: ', i)),
      delay(1000)
    )
      .subscribe((pos) => console.log(pos));
  }
}
