import { NgModel } from "@angular/forms";
import { UserService, ProjectService, ViewTaskService, ParentTaskService } from './service';

import { CommonModule } from '@angular/common';
import { NgModule, Optional, SkipSelf, ModuleWithProviders } from '@angular/core';
import { InteractionService } from './service/interaction.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppInterceptorService } from './interceptor/app-interceptor.service';
import { ModalModule } from 'ngx-bootstrap/modal';
import { SharedModule } from '../shared/shared.module';


@NgModule({
    declarations: [],
    imports: [
        CommonModule,
        ModalModule.forRoot(), 
        SharedModule,
    ],
    providers: [
        UserService,
        ProjectService,
        ViewTaskService,
        ParentTaskService,
        InteractionService,
        {
            provide: HTTP_INTERCEPTORS, 
            useClass: AppInterceptorService, 
            multi: true
          }
    ]
})
export class CoreModule {

    constructor(@Optional() @SkipSelf() parentModule?: CoreModule) {
        if (parentModule) {
            throw new Error(
                'CoreModule is already loaded. Import it in the AppModule only');
        }
    }

    static forRoot(): ModuleWithProviders {
        return {
            ngModule: CoreModule,
            providers: [
                UserService,
                InteractionService
            ]
        }
    }
}
