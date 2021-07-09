import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AppLoaderComponent} from './app-loader.component';
import {AppLoaderDirective} from './app-loader.directive';


@NgModule({
  declarations: [AppLoaderComponent, AppLoaderDirective],
  entryComponents: [AppLoaderComponent],
  exports: [AppLoaderComponent, AppLoaderDirective],
  imports: [
    CommonModule,
  ],
})
export class AppLoaderModule { }
