import { Injectable } from '@angular/core';
import { Member } from './member.model';
import {HttpClient} from "@angular/common/http";
@Injectable({
  providedIn: 'root'
})
export class MemberService {
  formData: Member;
  list: Member[];

  readonly url = "https://localhost:44366/api"
  constructor(private http : HttpClient) { }

  postMember(formData : Member){
    return this.http.post(this.url + '/Member', formData);
  }

  refreshList(){
    this.http.get(this.url + '/Member').toPromise().then(res => this.list = res as Member[]);
  }

  putMember(formData : Member){
    return this.http.put(this.url + '/Member/' + formData.MemberID, formData);
  }
  
  deleteMember(id: Number){
    return this.http.delete(this.url + '/Member/' + id);
  }
}
