import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';

import { MaterialModule } from './material/material.module';
import { AppComponent } from './app.component';
import { TodoComponent } from './components/todo/todo.component';
import { ModalComponent } from './components/modal/modal.component';
import { HeaderComponent } from './components/header/header.component';
import { ProjectComponent } from './components/project/project.component';
import { ContainerComponent } from './components/container/container.component';

import { ProjectService } from './services/project.service';

@NgModule({
  declarations: [
    AppComponent,
    TodoComponent,
    ModalComponent,
    HeaderComponent,
    ProjectComponent,
    ContainerComponent,
  ],
  imports: [
    BrowserModule,
    MaterialModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
  ],
  providers: [ProjectService],
  bootstrap: [AppComponent],
})
export class AppModule {}
