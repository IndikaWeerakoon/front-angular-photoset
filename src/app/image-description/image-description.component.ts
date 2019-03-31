import { Component, OnInit, ChangeDetectorRef, Output,EventEmitter } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ImguploadService } from '../services/imgupload.service';
import { RequestSuccessEmit } from '../models/RequstSuccessEmit';

@Component({
  selector: 'app-image-description',
  templateUrl: './image-description.component.html',
  styleUrls: ['./image-description.component.css']
})
export class ImageDescriptionComponent implements OnInit {

  @Output() outputMsg = new EventEmitter<RequestSuccessEmit>();
  @Output() outputBadRequst = new EventEmitter<boolean>();
  expandDis1:boolean = false;
  expandDis2:boolean = false;
  spinner:boolean=false;
  errorState:boolean=false;
  uploadCount:number = 0;
  uploadBuilder:FormGroup;
  uploadBuilder2:FormGroup;
  filelist:File
  fileList2:File;
  constructor(public fb:FormBuilder,private cd: ChangeDetectorRef,private se:ImguploadService) { }

  ngOnInit() {
    this.uploadBuilder = this.fb.group({
      image1:[''],
      
    })

    this.uploadBuilder2 = this.fb.group({
      
      image2:[''],
    })
    this.badRequestEmit(false);
    this.emitter(false);

  }
/*
  description expand according to the belove status
*/
  toggleExp1(){
    this.expandDis1 = !this.expandDis1;
  }
  toggleExp2(){
    this.expandDis2 = !this.expandDis2;
  }
  /*
    upload count measure
  */
  increaseUploadCount(){
    this.uploadCount++;
  }
  /*
    First and Second file refer as FileList
  */
  onFileChange1(event){
    this.filelist = event.target.files[0];
    this.errorState=false;
  }
  onFileChange2(event){
    this.fileList2 = event.target.files[0];
    this.errorState =false;
  }
/**
 * submet data to the server
 * return=>{}
 */
  submit(){
    
    this.spinner = true;
    let formData = new FormData();
    
    if(this.filelist){
      let fileToUpload = this.filelist;
      formData.append('file',fileToUpload,fileToUpload.name);

      if(this.fileList2){
        formData.append('expected',this.fileList2,this.fileList2.name);
        this.se.multiFileUpload(formData).subscribe(
          val=>{
            window.scroll(0,0);
            this.spinner =false;
            this.uploadCount++;
            this.emitter(true);
            this.badRequestEmit(false);
          },
          error=>{
            window.scroll(0,0);
            this.spinner = false;
            this.emitter(false);
            this.badRequestEmit(true);
          }
          
        )
      }
      else{
        this.se.fileUpload(formData).subscribe(val=>{
          window.scroll(0,0);
          this.spinner =false;
          this.uploadCount++;
          this.emitter(true);
          this.badRequestEmit(false);
        },
            error=>{
            window.scroll(0,0);
            this.spinner = false;
            this.emitter(false);
            this.badRequestEmit(true);
        });
      }
    }else{
      this.spinner =false;
      this.errorState = true;
    }
    // formData.append('expected',this.uploadBuilder2.value.image2,this.uploadBuilder2.value.image2.name);
    
  }
/**
 * communicate with main module aboute upload status
 * @param status boolean status whether it isi successfull or not
 */
  emitter(status:boolean){
    let RequstEmit:RequestSuccessEmit = new RequestSuccessEmit();
    RequstEmit.status = status;
    RequstEmit.numOfUploadedImg = this.uploadCount;
    this.outputMsg.emit(RequstEmit);
  }

  badRequestEmit(status:boolean){
    this.outputBadRequst.emit(status);
  }

}
