import { HttpErrorResponse, HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError, lastValueFrom } from 'rxjs';
import { ApiLink } from '../constant/api-link';
import { IsLoggedInResponse } from '../interface/is-logged-in-response';

@Injectable()
export class Functions {

    constructor(private http: HttpClient) { }

    public static handleHttpError(error: HttpErrorResponse){
        return throwError(error);
    }

    /**
     * sleep is a lambda function returning a new promise
     * specifically, sleep implements a wait and it takes in an argument describing how many milliseconds to wait
     * NOTE: this is more of a just-in-case function--its current uses are for testing as of right now
     */
    public static sleep = (ms: number) => new Promise(r => setTimeout(r, ms));

    public async isLoggedIn(jwt: string) {
        let headers: HttpHeaders = new HttpHeaders()
        .set('Content-Type', 'application/json')
        .set('Authorization', `Bearer ${jwt}`)
        .set('jwt', jwt);
        console.log(headers.getAll);
        return await lastValueFrom(this.http.post<IsLoggedInResponse>(`${ApiLink.local}/functions/isLoggedIn`, null, {headers: headers}));
    }
}