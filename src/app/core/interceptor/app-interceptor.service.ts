import { Injectable } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { HttpInterceptor, HttpHandler, HttpRequest, HttpEvent, HttpResponse, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { ModalService } from 'src/app/shared/components/confirmok/data/modal-service';

@Injectable()
export class AppInterceptorService implements HttpInterceptor {


  constructor(private spinner: NgxSpinnerService,
    private modalService: ModalService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // All HTTP requests are going to go through this method
    this.spinner.show();
    const header = new HttpHeaders({
      'name': 'dev'
    })
    const clone = req.clone({
      headers: header
    })

    return next.handle(clone).pipe(
      tap((event: HttpEvent<any>) => {
        if (event instanceof HttpResponse) {
          console.log('call received')
          this.spinner.hide();
        }
        // },catchError(this.errorHandler))
      }, error => {
        this.spinner.hide();
        //this.modalService.confirmOK("Error Occured" + error.message, () => {}, "Error");
        console.log('Error--->' + error.message)
      }
      ));
  }
  /*errorHandler(error: HttpErrorResponse){
    console.log('call received')
    return throwError(error || 'Server Error')
  }*/
}
