import { Component, OnInit, ViewChild } from '@angular/core';
import { UntypedFormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IonModal } from '@ionic/angular';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-leave-entry',
  templateUrl: './leave-entry.component.html',
  styleUrls: ['./leave-entry.component.scss'],
  standalone: false,

})
export class LeaveEntryComponent  implements OnInit {
  // leaves = [
  //   {
  //     fromDate: '01-Jan',
  //     toDate: '02-Jan',
  //     leaveNo: '001',
  //     leaveType: 'Sick',
  //     remarks: 'Flu',
  //     time: 'Full Day'
  //   },

  // ];
  leaves:any
  popoverOpen = false;
  popoverEvent: any = null;
  leaveEntryFromGroup:any;
  isModalOpen = false;
  leavetypeArray: any;
  leavetypeList: any;

  setOpen(isOpen: boolean) {
    this.isModalOpen = isOpen;
    this.GetAlLeaveRequest();
  }
 
  constructor(  
     private router: Router,
     private fb: UntypedFormBuilder,
     private dataservice:DataService
     

  ) { }
  openPopover(event: Event) {
    this.popoverEvent = event;
    this.popoverOpen = true;
  }

  selectOption(option: string) {
    console.log('Selected:', option);
    this.popoverOpen = false;

    if (option === 'logout') {
      this.logout();
    }
  }
 
  logout() {
    localStorage.clear(); 
    sessionStorage.clear();
    this.router.navigate(['/login']); 
  }
  ngOnInit() {
     this.leaveEntryFromGroup = this.fb.group({
      // fromDate : [null, [Validators.required]],
      // toDate: [null, [Validators.required]],
      fromDate: [this.getTodayDateString()],
      toDate: [this.getTodayDateString()],
      remarks: [null],
      leaveType: [null,],
            })
            this.GetAlLeaveRequest()
           this.GetAllHrLeaveType()
  }
  submit(){
    let payload={
       LeavDataId :0,
       LeaveEmpid :this.leaveEntryFromGroup.get('leaveType')?.value,
       LeaveDataType  :null,
       LeaveDataFrom : this.leaveEntryFromGroup.get('fromDate')?.value,
       LeaveDataTo : this.leaveEntryFromGroup.get('toDate')?.value,
       LeaveDays  :null,
       LeaveDataReason :null, 
       ReqDate  :null,
       ApproveDate :null, 
       ApprovedBy  :null, 
       RejectedDate  :null, 
       RejectedBy  :null, 
       Remarks : this.leaveEntryFromGroup.get('remarks')?.value,
       Status  :null, 
      AppStatus  :null, 
      LeaveReqImage  :null, 
      LeaveDataTypeNavigation:null,
      LeaveEmp :null,   
    }
    this.dataservice.InserLeaveRequest(payload).subscribe((res)=>{
    })
  }
  GetAlLeaveRequest(){
    this.dataservice.GetAlLeaveRequest().subscribe((res)=>{
      if(res)
      this.leaves=res
    //  this.GetAlLeaveRequest();
    })
  }
  GetAllHrLeaveType(){
    this.dataservice.GetAllHrLeaveType().subscribe((res)=>{
      this.leavetypeArray = res;
      this.leavetypeList = this.leavetypeArray.map((kl: any) => ({
        label: kl.leaveType,
        value: kl.leaveTypeId,
      }));

    })

  }
  getTodayDateString(): string {
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, '0'); // Month is 0-based
    const dd = String(today.getDate()).padStart(2, '0');
    return `${yyyy}-${mm}-${dd}`;
  }
  
getleaveTypeById(id:any){
 return this.leavetypeList.find((res:any)=>res.value==id)?.label;
}

}
