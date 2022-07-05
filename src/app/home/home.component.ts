import { Component, OnDestroy, OnInit } from '@angular/core';
import { filter, interval, map, Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, OnDestroy {
  private firstObsSubscription!: Subscription;

  constructor() {}

  ngOnInit(): void {
    const customObservable = new Observable((observer) => {
      let count = 0;
      setInterval(() => {
        observer.next(count);
        count > 3 && observer.error(new Error('Count is greater 3'));
        count++;
      }, 1000);
    });

    customObservable
      .pipe(
        filter((data: any) => {
          return data > 0;
        }),
        map((data: any) => {
          return 'Round: ' + (data + 1);
        })
      )
      .subscribe({
        next: (data) => console.log(data),
        error: (err) => console.log(err),
      });
  }

  ngOnDestroy(): void {
    this.firstObsSubscription.unsubscribe();
  }
}
