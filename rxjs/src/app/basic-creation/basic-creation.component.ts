import { Component, OnInit } from '@angular/core';
import { from, interval, Observable, Observer, of, Subscription, timer } from 'rxjs';

@Component({
  selector: 'app-basic-creation',
  templateUrl: './basic-creation.component.html',
  styleUrls: ['./basic-creation.component.scss']
})
export class BasicCreationComponent implements OnInit {

  subscription: Subscription = new Subscription();

  constructor() { }

  ngOnInit(): void {
  }

  observableCreate(){
    const hello = new Observable((observer: Observer<string>) => {
      observer.next("hello");
      observer.next("from");
      observer.next("observable");
      observer.complete();
    });

    hello.subscribe((value) => console.log(value))
  }

  fromClick(): void{
    const source = from([1, 2, 3, 4, 5, { x: 10, y: 20 }])
    source.subscribe((v) => console.log(v))
  }

  ofClick(): void{
    of([1, 2, 3, 4, 5, { x: 10, y: 20 }])
    .subscribe((v) => console.log(v))
  }

  intervalClick(): void{
    const source = interval(1000);
    this.subscription.add(source.subscribe((v) => console.log(v)))
  }

  timerClick(): void {
    // const source = timer(1000);
    const source = timer(3000,1000);
    this.subscription.add(source.subscribe((v) => console.log(v)))
  }

  unsubscribeClick(): void{
    this.subscription.unsubscribe();
    this.subscription = new Subscription();
  }
}
