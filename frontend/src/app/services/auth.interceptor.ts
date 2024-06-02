import {Injectable, Provider} from "@angular/core";
import {HTTP_INTERCEPTORS, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {AuthService} from "./auth.service";
import {Observable} from "rxjs";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(public auth: AuthService) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    const authToken = this.auth.getToken();

    const authReq = req.clone({
      headers: req.headers.set('Authorization', 'Bearer ' + authToken)
    });
    return next.handle(authReq);
  }
}

export const authInterceptorProvider: Provider = {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true}
