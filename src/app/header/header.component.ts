import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth/auth-service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  constructor(private authService: AuthService, private router: Router) {
    this.authStatusSub = authService.authStatus.subscribe(
      (loginStatus: boolean) => {
        this.loggedIn = loginStatus;
      }
    );
  }

  authStatusSub: Subscription;
  loggedIn = true;

  ngOnInit() {
    this.loggedIn = this.authService.isAuthenticated();
  }

  ngOnDestroy() {
    this.authStatusSub.unsubscribe();
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login'])
  }

  //@Output() menuClicked = new EventEmitter<string>();

//  onMenuClicked(menuName: string) {
//    this.menuClicked.emit(menuName);
//  }
}
