import { HttpErrorResponse, HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError, lastValueFrom } from 'rxjs';
import { ApiLink } from '../constant/api-link';
import { IsLoggedInResponse } from '../interface/is-logged-in-response';

@Injectable()
export class Functions {

    /**
     * Injects objects to the private attributes of the Functions class.
     * @param http Allows for sending HTTP requests to the API.
     */
    constructor(private http: HttpClient) { }

    /**
     * Handles HTTP errors in various services and classes that call the API.
     * @param error The error returned by the HTTP call.
     * @returns Returns an observable of the error.
     */
    public static handleHttpError(error: HttpErrorResponse){
        return throwError(error);
    }

    /**
     * Pauses execution of the program.
     * @param ms The amount of time execution will be paused for in milliseconds.
     * @returns Returns a Promise that calls the setTimeout function.
     */
    public static sleep = (ms: number) => new Promise(r => setTimeout(r, ms));

    /**
     * Calls the API to check if the user is logged in by sending the user's JSON web token for verification.
     * @param jwt The JSON web token of the user.
     * @returns Returns a Promise containing the response of the API.
     */
    public async isLoggedIn(jwt: string) {
        let headers: HttpHeaders = new HttpHeaders()
        .set('Content-Type', 'application/json')
        .set('Authorization', `Bearer ${jwt}`)
        .set('jwt', jwt);
        console.log(headers.getAll);
        return await lastValueFrom(this.http.post<IsLoggedInResponse>(`${ApiLink.local}/functions/isLoggedIn`, null, {headers: headers}));
    }
}