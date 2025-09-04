import { HttpInterceptorFn, HttpRequest, HttpHandlerFn } from "@angular/common/http"
import { inject } from "@angular/core"
import { AuthService } from "./auth.service"
import { catchError, switchMap, throwError } from "rxjs"
import { Token, TokenType } from "@angular/compiler"
import { TokenResponse } from "./auth.interface"

let isRefreshing = false

export const authTokenInterceptor: HttpInterceptorFn  = (req: HttpRequest<unknown>, next: HttpHandlerFn) => {
    const authService = inject(AuthService)
    const token = authService.token

    if (!token) return next(req)

    if (isRefreshing) {
        return refreshAndProcceed(authService, req, next)
    }

    return next(addToken(req, token))
        .pipe(
            catchError(error => {
                if (error.status === 403) {
                    return refreshAndProcceed(authService, req, next)
                }

                return throwError(error)
            })
        )
}

const refreshAndProcceed = (
    authService: AuthService,
    req: HttpRequest<any>,
    next: HttpHandlerFn
) => {
    if (!isRefreshing) {
        isRefreshing = true
        return authService.refreshAuthToken()
            .pipe(
                switchMap((res: TokenResponse) => {
                    isRefreshing = false
                    return next(addToken(req, res.access_token))
                })
            )
    }

    return next(addToken(req, authService.token!))
}

const addToken = (req: HttpRequest<any>, token: string) => {
    return req.clone({
        setHeaders: {
            Authorization: `Bearer ${token}`
        }
    })
}