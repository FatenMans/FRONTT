import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from "@angular/common/http";
import { Observable, catchError, throwError } from "rxjs";

import { Injectable } from "@angular/core";
import { UserAuthService } from "../_services/user-auth.service";
@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    router: any;

    constructor(private userAuthService: UserAuthService) { }
    intercept(
        req: HttpRequest<any>,
        next: HttpHandler):
        Observable<HttpEvent<any>> {
        if (req.headers.get("No-Auth") === "True") {
            return next.handle(req.clone());
        }
        const token = this.userAuthService.getToken();

        if (token !== null) {
            req = this.addToken(req, token);
        }
        return next.handle(req).pipe(

            catchError(
                (err: HttpErrorResponse) => {
                    console.log(err.status);
                    if (err.status === 401) {
                        this.router.navigate(['/login']);
                    } else if (err.status === 403) {
                        this.router.navigate(['/forbidden']);
                    }
                    return throwError("Some thing is wrong");
                }
            )
        );
    }
    private addToken(request: HttpRequest<any>, token: string) {
        return request.clone({
            setHeaders: {
                Authorization: `Bearer ${token}`
            }
        });
    }

}