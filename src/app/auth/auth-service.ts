import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, Subject, tap } from "rxjs";
import { environment } from "../../environments/environment";
import { LoginRequest } from "./login-request.model";
import { LoginResult } from "./login-result.model";

@Injectable({ providedIn: 'root' })

export class AuthService {
  constructor(private http: HttpClient) { }

  private baseURL = environment.apiBaseURL + "/Auth";

  private tokenKey: string = "token";
  private _authStatus = new Subject<boolean>();
  public authStatus = this._authStatus.asObservable();

  isAuthenticated(): boolean {
    return this.getToken() != null;
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  init(): void {
    if (this.isAuthenticated()) {
      this.setAuthStatus(true);
    }
  }

  login(item: LoginRequest): Observable<LoginResult> {
    var url = this.baseURL + "/Login";
    return this.http.post<LoginResult>(url, item).pipe(
      tap(loginResult => {
        if (loginResult.success && loginResult.token) {
          localStorage.setItem(this.tokenKey, loginResult.token);
          this.setAuthStatus(true);
        }
      })
    );
  }

  logout() {
    localStorage.clear();
    this.setAuthStatus(false);
  }

  private setAuthStatus(isAuthenicated: boolean): void {
    this._authStatus.next(isAuthenicated);
  }

  createUser(item: LoginRequest): Observable<LoginResult> {
    var url = this.baseURL + "/CreateUser";
    return this.http.post<LoginResult>(url, item).pipe(
      tap(loginResult => {
        if (loginResult.success && loginResult.token) {
          localStorage.setItem(this.tokenKey, loginResult.token);
          this.setAuthStatus(true);
        }
      })
    );
  }
}
