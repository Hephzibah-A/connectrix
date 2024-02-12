import { NgModule } from "@angular/core";
import { MatInputModule } from "@angular/material/input"
import { MatSelectModule } from "@angular/material/select";
import { MatCardModule } from "@angular/material/card";
import { MatIconModule } from "@angular/material/icon";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { MatButtonModule } from '@angular/material/button';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from "@angular/material/sort";
import { MatDialogModule } from '@angular/material/dialog';

@NgModule({
    exports: [
        MatInputModule,
        MatSelectModule,
        MatCardModule,
        MatIconModule,
        MatCheckboxModule,
        MatButtonModule,
        MatPaginatorModule,
        MatTableModule,
        MatSortModule,
        MatDialogModule
    ]
})
export class MaterialModule { }