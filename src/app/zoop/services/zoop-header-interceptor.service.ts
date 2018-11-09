import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_KEY } from '../constants/api_key.constant';

@Injectable({providedIn: 'root'})
export class ZoopHeaderInterceptor implements HttpInterceptor {
  constructor() {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const headers = req.headers
    .set("Authorization", `Basic ${btoa(API_KEY + ":")}`)
    .append("Accept", "application/json")
    .append("Content-Type", "application/json");
    const authReq = req.clone({ headers });
    return next.handle(authReq);
  }
}
