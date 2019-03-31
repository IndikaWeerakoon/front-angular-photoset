import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { ImageDescriptionComponent } from './image-description/image-description.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ImguploadService } from './services/imgupload.service';
import { HttpClientModule } from '@angular/common/http';
// import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@NgModule({
  declarations: [
    AppComponent,
    ImageDescriptionComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule
    
  ],
  providers: [ImguploadService],
  bootstrap: [AppComponent]
})
export class AppModule { }
