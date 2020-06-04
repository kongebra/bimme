import { NgModule } from '@angular/core';

import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [],
  imports: [
    // vendor
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule,

    // material
    MatToolbarModule,
    MatButtonModule,
  ],
})
export class CoreModule {}
