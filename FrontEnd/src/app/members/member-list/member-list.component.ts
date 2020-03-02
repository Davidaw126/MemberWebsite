import { Component, OnInit } from '@angular/core';
import { MemberService } from 'src/app/shared/member.service';
import { Member } from 'src/app/shared/member.model';
import { ɵNgClassImpl } from '@angular/common';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-member-list',
  templateUrl: './member-list.component.html',
  styleUrls: ['./member-list.component.css']
})
export class MemberListComponent implements OnInit {

  constructor(public service : MemberService, private toastr: ToastrService) { }

  ngOnInit() {
    this.service.refreshList();
  }

  populateForm(mem: Member){
    this.service.formData = Object.assign({}, mem);
  }

  onDelete(id : number){
    if(confirm('Are you sure to delete this record?'))
    this.service.deleteMember(id).subscribe(res=>{
      this.service.refreshList();
      this.toastr.warning('Deleted successfully', 'Member deletion');
      
    })
  }
}
