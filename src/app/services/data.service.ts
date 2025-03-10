import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

export interface Message {
  
}

@Injectable({
  providedIn: 'root'
})
export class DataService {
     baseUrl: string = environment.apiRootURL;
   
  constructor(private httpClient: HttpClient) {

  
}

public attendancedatalist() {
    return this.httpClient.get<any>(this.baseUrl + 'Hr_AttendanceSheet/GetAllHr_AttendanceSheet',)
}
public attendancedatalistpost(data:any) {
  return this.httpClient.post<any>(this.baseUrl + 'Hr_AttendanceSheet/InsertHr_AttendanceSheet',data)
}
}