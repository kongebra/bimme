import { NgModule } from '@angular/core';

import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

const vendor = [CommonModule, RouterModule];

const material = [];

const local = [];

@NgModule({
  declarations: [...local],
  imports: [
    // vendor
    ...vendor,
    // material
    ...material,
  ],
  exports: [
    // vendor
    ...vendor,
    // material
    ...material,
    // local
    ...local,
  ],
})
export class SharedModule {}
