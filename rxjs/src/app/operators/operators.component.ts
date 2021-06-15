import { Component, OnInit, ViewChild } from '@angular/core';
import { from, fromEvent, interval, Observable, Subject, Subscription, timer } from 'rxjs';
import { debounceTime, delay, filter, first, last, map, take, takeUntil, takeWhile, tap } from 'rxjs/operators';
import { MatRipple } from '@angular/material/core';

@Component({
  selector: 'app-operators',
  templateUrl: './operators.component.html',
  styleUrls: ['./operators.component.scss']
})
export class OperatorsComponent {
  public searchInput: string = '';
  searchEntry$: Subject<string> = new Subject<string>();

  constructor() { }

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

  public takeClick() {
    const observable = new Observable((observer) => {
      let i;
      for (i = 0; i < 20; i++)
        setTimeout(() => observer.next(Math.floor(Math.random() * 100)), i * 100);
      setTimeout(() => observer.complete(), i * 100);
    });
    const s: Subscription = observable
      .pipe(
        tap(i => console.log(i)),
        // take(10)
        // first()
        last()
      )
      .subscribe(v => console.log('Output: ', v),
        (error) => (console.error(error)),
        () => console.log('Complete')
      );

    const interval = setInterval(() => {
      console.log('Checking...')
      if (s.closed)
        console.warn('Subscription closed');
      clearInterval(interval)
    }, 200)
  }

  public debounceTimeClick(): void {
    fromEvent(document, 'click')
      .pipe(
        tap((e) => console.log('Click')),
        debounceTime(1000)
      )
      .subscribe((e) => {
        console.log("click with debounceTime", e);
      })

  }

  public searchBy_UsingDebounce(event: Event): void {
    this.searchEntry$.next(this.searchInput)

  }
  public debounceTimeSearch(): void {
    this.searchEntry$
      .pipe(debounceTime(100))
      .subscribe((result) => console.log(result))
  }

  takeWhileClick(){
    interval(500)
    .pipe(
      takeWhile((value, index) => (value < 5))
    )
    .subscribe(
      (i) => console.log('takeWhile: ', i),
      (error) => console.error(error),
      () => console.log('Completed')
      )

  }

  takeUntilClick(){

    let duetime$ = timer(5000); //emite um evento em 5 seg

    interval(500)
      .pipe(
       takeUntil(duetime$)
      )
      .subscribe(
        (i) => console.log('takeUntil: ', i),
        (error) => console.error(error),
        () => console.log('Completed')
      )
  }
}
