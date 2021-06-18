import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BasicCreationComponent } from './basic-creation/basic-creation.component';
import { MaterialModule } from './material.module';
import { FormsModule } from '@angular/forms';
import { OperatorsComponent } from './operators/operators.component';
import { AsyncComponent } from './async/async.component';
import { ErrorHandlingComponent } from './error-handling/error-handling.component';

@NgModule({
  declarations: [
    AppComponent,
    BasicCreationComponent,
    OperatorsComponent,
    AsyncComponent,
    ErrorHandlingComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
