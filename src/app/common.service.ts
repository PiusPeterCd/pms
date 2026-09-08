import { Injectable, PLATFORM_ID, inject, signal } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class CommonService {
  private readonly platformId = inject(PLATFORM_ID);
  private readonly roleStorageKey = 'carmel-connect-role';
  readonly userRole = signal<'admin' | 'member' | null>(this.readStoredRole());

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
  setUserRole(role: 'admin' | 'member'): void {
    this.userRole.set(role);
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem(this.roleStorageKey, role);
    }
  }

  clearUserRole(): void {
    this.userRole.set(null);
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem(this.roleStorageKey);
    }
  }

  isAdmin(): boolean {
    return this.userRole() === 'admin';
  }

  private readStoredRole(): 'admin' | 'member' | null {
    if (!isPlatformBrowser(this.platformId)) {
      return null;
    }

    const storedRole = localStorage.getItem(this.roleStorageKey);
    return storedRole === 'admin' || storedRole === 'member' ? storedRole : null;
  }
}
