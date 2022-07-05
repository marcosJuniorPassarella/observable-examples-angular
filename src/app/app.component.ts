import { Component, OnInit, OnDestroy } from '@angular/core';
import { UserService } from './user/user.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
  private activatedSub!: Subscription;
  userActivated = false;

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.activatedSub = this.userService.activatedEmitter.subscribe({
      next: (status: boolean) => (this.userActivated = status),
    });
  }

  ngOnDestroy(): void {
    this.activatedSub && this.activatedSub.unsubscribe();
  }
}
