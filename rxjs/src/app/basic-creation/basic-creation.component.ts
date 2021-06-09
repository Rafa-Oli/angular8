import { Component, OnInit } from '@angular/core';
import { Observable, Observer } from 'rxjs';

@Component({
  selector: 'app-basic-creation',
  templateUrl: './basic-creation.component.html',
  styleUrls: ['./basic-creation.component.scss']
})
export class BasicCreationComponent implements OnInit {

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
}
