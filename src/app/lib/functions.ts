import { HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';
export class Functions {
    static handleHttpError(error: HttpErrorResponse){
        return throwError(error);
    }
}