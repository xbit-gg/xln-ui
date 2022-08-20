import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../auth.service';
import { environment } from 'src/environments/environment';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  private USER_ID_KEY = 'x-username';

  constructor(private authService: AuthService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const userAuth = this.authService.userAuth;
    if (userAuth) {
      request = request.clone({
        setHeaders: {
          [this.getCredsKey(userAuth.keyType)]: userAuth.apiKey,
        }
      })
      if (environment.requireUserId) {
        request = request.clone({
          setHeaders: {
            [this.USER_ID_KEY]: userAuth.userId,
          }
        })
      }
      return next.handle(request);
    }
    const walletAuth = this.authService.walletAuth;
    if (walletAuth) {
      request = request.clone({
        setHeaders: {
          [this.getCredsKey(walletAuth.keyType)]: walletAuth.apiKey,
        }
      })
      if (environment.requireUserId) {
        request = request.clone({
          setHeaders: {
            [this.USER_ID_KEY]: walletAuth.userId,
          }
        })
      }
    }
    return next.handle(request);
  }

  private getCredsKey(type: 'admin'|'user'|'wallet'): string {
    return `x-${type}-api-key`
  }
}
