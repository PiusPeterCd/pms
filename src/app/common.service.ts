import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class CommonService {
  

  constructor(private http: HttpClient,private apiService:ApiService) { }

  getTotalunitCount(block_no:string){
   this.apiService.getUnitbyBlock(block_no).subscribe((response: any) => {
    let count=response.length+1
    return count.tostring() ;
  });
  }
  getTotalFamilyCount(unitid: any) {
    this.apiService.getFamily(unitid).subscribe((response: any) => {
      let count=response.length+1
      return count.tostring();
    });
  }
  
}
