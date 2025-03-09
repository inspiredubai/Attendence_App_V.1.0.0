import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-attendance-detail',
  templateUrl: './attendance-detail.component.html',
  styleUrls: ['./attendance-detail.component.scss'],
  standalone: false,

})
export class AttendanceDetailComponent  implements OnInit {

  constructor() { }

  ngOnInit() {}

}
// {
//   public int AttendanceID { get; set; }
//   public long AttendanceEmpID { get; set; }
//   public long ProjectID { get; set; }
//   public DateTime? PunchDate { get; set; }
//   public string CheckOut { get; set; }
//   public string Latitude { get; set; }
//   public string Longitude { get; set; }
//   public string LocationName { get; set; }
//   public string ImageFile { get; set; }
//   public string Remarks { get; set; }
//   public bool? PunchMode { get; set; }
//   public bool? Active { get; set; }
// }