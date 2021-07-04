import { HttpClient } from '@angular/common/http';
import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { fromEvent, Observable, of } from 'rxjs';
import { Person } from './person.model';

@Component({
  selector: 'app-switch-merge',
  templateUrl: './switch-merge.component.html',
  styleUrls: ['./switch-merge.component.scss']
})
export class SwitchMergeComponent implements OnInit, AfterViewInit {
  @ViewChild('searchBy', { static: false }) element: ElementRef<HTMLInputElement>;
  searchInput: string = '';
  people$: Observable<Person[]>;

  private readonly url: string = 'http://localhost:9000';

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
  }
  ngAfterViewInit(): void {
    this.firstOption();
  }

  filterPeople(searchInput: string): Observable<Person[]> {
    if (searchInput.length === 0) return of([]);
    return this.http.get<Person[]>(`${this.url}/${searchInput}`)
  }

  firstOption() {
    fromEvent(this.element.nativeElement, 'keyup')
      .subscribe(e => {
        this.filterPeople(this.searchInput)
          .subscribe(r => console.log(r))
      })
  }

}
