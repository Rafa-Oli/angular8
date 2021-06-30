import { Component, OnInit } from '@angular/core';
import { fromEvent, interval, Subject, Subscription } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-unsubscribe',
  templateUrl: './unsubscribe.component.html',
  styleUrls: ['./unsubscribe.component.scss']
})
export class UnsubscribeComponent implements OnInit {

  public subscriptionsAreActive = false;
  private subscriptions: Subscription[] = [];
  private unsubscribeAll$ : Subject<any> = new Subject();

  constructor() { }

  ngOnInit(): void {
    this.checkSubscriptions();
  }

  checkSubscriptions(){
    interval(100).subscribe(() =>{
      let active = false;
      this.subscriptions.forEach((s) => {
        if(!s.closed) active = true;
      })
      this.subscriptionsAreActive = active;
    })
  }

  subscribe() {
    const subscription1 = interval(100)
    .pipe(takeUntil(this.unsubscribeAll$))
      .subscribe((i) => {
        console.log(i);
      })

    const subscription2 = fromEvent(document, 'mousemove')
      .pipe(takeUntil(this.unsubscribeAll$))
      .subscribe((i) => {
        console.log(i);
      });
    this.subscriptions.push(subscription1);
    this.subscriptions.push(subscription2);

  }
  unSubscribe(){
    this.unsubscribeAll$.next();
  }
}
