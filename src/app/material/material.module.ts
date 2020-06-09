import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import {MatListModule, MatListIconCssMatStyler} from '@angular/material/list';
import {MatIconModule} from '@angular/material/icon';
import {MatFormFieldModule, MatFormField} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatToolbarModule} from '@angular/material/toolbar';
import { FormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import {MatSelectModule} from '@angular/material/select';

const MaterialComponenets = [
  MatButtonModule,
  MatListModule,
  MatIconModule,
  MatFormFieldModule,
  MatInputModule,
  MatToolbarModule,
  MatInputModule,
  MatSelectModule,
  MatTableModule


];

@NgModule({
  imports: [MaterialComponenets],
  exports: [MaterialComponenets],
})
export class MaterialModule { }