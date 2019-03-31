import { Component } from '@angular/core';
import { RequestSuccessEmit } from './models/RequstSuccessEmit';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  discripHide:boolean = false;
  recieveStatus:RequestSuccessEmit = new RequestSuccessEmit();
  badResponseMsg:boolean = false;

  toggleDescription(){
    this.discripHide = !this.discripHide;
  }
  recieveMessage($event){
    this.recieveStatus = $event;
  }
  badResponse($event){
    this.badResponseMsg = $event;
  }

}
