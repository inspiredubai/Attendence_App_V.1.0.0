import { Component, OnInit, ViewChild } from '@angular/core';
import { UntypedFormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IonModal } from '@ionic/angular';
import { DataService } from 'src/app/services/data.service';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-leave-entry',
  templateUrl: './leave-entry.component.html',
  styleUrls: ['./leave-entry.component.scss'],
  standalone: false,

})
export class LeaveEntryComponent implements OnInit {
  leaves: any
  popoverOpen = false;
  popoverEvent: any = null;
  leaveEntryFromGroup: any;
  isModalOpen = false;
  leavetypeArray: any;
  leavetypeList: any;
  userDetails: any;

  setOpen(isOpen: boolean) {
    this.isModalOpen = isOpen;
    this.leaves=null
    this.GetAlLeaveRequest();
  }

  constructor(
    private router: Router,
    private fb: UntypedFormBuilder,
    private dataservice: DataService,
    private toastService: ToastService
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
  goToChangePassword() {
    this.router.navigate(['/login/passwordchange']); // Adjust the route path accordingly
    this.popoverOpen = false;

  }
  ngOnInit() {
    this.userDetails = JSON.parse(localStorage.getItem('userDetails') || '{}');
    this.leaveEntryFromGroup = this.fb.group({
      fromDate: [this.getTodayDateString(), [Validators.required]],
      toDate: [this.getTodayDateString(), [Validators.required]],
      remarks: [null, [Validators.required]],
      leaveType: [null, [Validators.required]],
    })
    // this.GetAlLeaveRequest()
    this.GetAllHrLeaveType()
  }
  submit() {
    const fromDate = new Date(this.leaveEntryFromGroup.get('fromDate')?.value);
    const toDate = new Date(this.leaveEntryFromGroup.get('toDate')?.value);
    const applyDate = new Date()
    // Calculate difference in milliseconds and convert to days (+1 to include both start and end dates)
    const diffTime = Math.abs(toDate.getTime() - fromDate.getTime());
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24)) + 1;

    let payload = {
      LeavDataId: 0,
      LeaveEmpid: this.userDetails.userId,
      LeaveDataType: this.leaveEntryFromGroup.get('leaveType')?.value,
      LeaveDataFrom: this.leaveEntryFromGroup.get('fromDate')?.value,
      LeaveDataTo: this.leaveEntryFromGroup.get('toDate')?.value,
      LeaveDays: diffDays,
      LeaveDataReason: null,
      ReqDate: applyDate,
      ApproveDate: null,
      ApprovedBy: null,
      RejectedDate: null,
      RejectedBy: null,
      Remarks: this.leaveEntryFromGroup.get('remarks')?.value,
      Status: 0,
      AppStatus: null,
      LeaveReqImage: null,
      LeaveDataTypeNavigation: null,
      LeaveEmp: null,
    };
    this.dataservice.InserLeaveRequest(payload).subscribe((res) => {
      if (res) {
        this.toastService.presentToast("Leave Applied");
       this.leaveEntryFromGroup.reset();
      this.leaveEntryFromGroup.get('fromDate')?.setValue(this.getTodayDateString());
      this.leaveEntryFromGroup.get('toDate')?.setValue(this.getTodayDateString());

      } else {
        this.toastService.presentToastErrror("SomeThing Went Wrong");
      }
    })
  }
GetAlLeaveRequest() {
  this.dataservice.GetAlLeaveRequest().subscribe((res: any[]) => {
    if (res && this.userDetails?.userId) {
      this.leaves = res.filter(item => item.leaveEmpid === this.userDetails.userId);
    } else {
      this.leaves = [];
      console.warn('No userDetails or response data found.');
    }
  }, error => {
    console.error('Error fetching leave requests:', error);
  });
}
  GetAllHrLeaveType() {
    this.dataservice.GetAllHrLeaveType().subscribe((res) => {
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

  getleaveTypeById(id: any) {
    return this.leavetypeList.find((res: any) => res.value == id)?.label;
  }
  onDelete(id: any) {
    this.dataservice.deleteLeaveRequestById(id).subscribe((res)=>{
      if(res!=null){
     this.GetAlLeaveRequest()
      this.toastService.presentToast("Deleted Successfully");
      }
    })
  }
}
