import { Component, OnInit } from '@angular/core';
import { MemberService } from 'src/app/shared/member.service';
import { NgForm } from '@angular/forms';
import {ToastrService} from 'ngx-toastr';
@Component({
  selector: 'app-member',
  templateUrl: './member.component.html',
  styleUrls: ['./member.component.css']
})
export class MemberComponent implements OnInit {

  constructor(public service: MemberService, private toastr: ToastrService) { }

  ngOnInit() {
    this.resetForm();
  }

  resetForm(form? :NgForm){
    if(form!=null)
      form.resetForm();
    this.service.formData ={
      MemberID: null,
      FullName: '',
      Position: '',
      MEMCode: '',
      Mobile: ''
    }
  }

  onSubmit(form : NgForm){
    if(form.value.MemberID == null){
      this.insertRecord(form);
    }else{
      this.updateRecord(form);
    }
  }
  
  insertRecord( form : NgForm){
    this.service.postMember(form.value).subscribe(res =>{
      this.toastr.success('Updated successfully', 'Member Registration');
      this.resetForm(form);
      this.service.refreshList();
    })
  }

  updateRecord( form : NgForm){
    this.service.putMember(form.value).subscribe(res =>{
      this.toastr.info('Updated successfully', 'Member Update');
      this.resetForm(form);
      this.service.refreshList();
    })
  }
}
