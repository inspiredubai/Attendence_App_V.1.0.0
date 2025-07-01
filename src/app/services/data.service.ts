import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { environment } from 'src/environments/environment';

export interface Message {
  
}

@Injectable({
  providedIn: 'root'
})
export class DataService {
     baseUrl: string = environment.apiRootURL;
     private dataSubject = new Subject<any>(); 

  constructor(private httpClient: HttpClient) {}

    data$ = this.dataSubject.asObservable();
    sendData(data: any) {
    this.dataSubject.next(data);
  }
   public attendancedatalist() {
    return this.httpClient.get<any>(this.baseUrl + 'Hr_AttendanceSheet/GetAllHr_AttendanceSheet',)
}
public attendancedatalistpost(data:any) {
  return this.httpClient.post<any>(this.baseUrl + 'Hr_AttendanceSheet/InsertHr_AttendanceSheet',data)
}
public Reportattendancedatal(data:any) {
  return this.httpClient.post<any>(this.baseUrl + 'Hr_AttendanceSheet/Report_AttendanceSheet',data)
}
public GetAlLeaveRequest() {
  return this.httpClient.get<any>(this.baseUrl + 'LeaveData/GetAlLeaveRequest',)
}
public InserLeaveRequest(data:any) {
  return this.httpClient.post<any>(this.baseUrl + 'LeaveData/InsertLeaveRequest',data)
}
public GetAllHrLeaveType() {
  return this.httpClient.get<any>(this.baseUrl + 'HrLeaveType/GetAllHrLeaveType',)
}
public deleteLeaveRequestById(id: number) {
  return this.httpClient.post<any>(`${this.baseUrl}LeaveData/DeleteLeaveDataReqById/${id}`, null);
}

}