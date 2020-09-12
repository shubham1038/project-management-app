import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'project-management-app';
  lang : string = 'en';

  constructor(private translate: TranslateService){
    this.translate.setDefaultLang(this.lang);
    this.translate.use(this.lang)
  }
  ngOnInit(){
    this.translate.onLangChange.subscribe( event => {
      this.lang = event.lang
    })
  }
}
