import { Component, inject } from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import {MatDividerModule} from '@angular/material/divider';
import {MatListModule} from '@angular/material/list';
import {MatTabsModule} from '@angular/material/tabs';
import {MatChipsModule} from '@angular/material/chips';
import {MatIconModule} from '@angular/material/icon';
import { ApiService } from '../api.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-family',
  standalone: true,
  imports: [MatIconModule,MatTabsModule,MatButtonModule,MatCardModule,HttpClientModule,MatListModule, MatDividerModule,MatChipsModule],
  templateUrl: './family.component.html',
  styleUrl: './family.component.css'
})
export class FamilyComponent {
  family: any = { members: [] };
  id: string = '';

  constructor(private apiservice: ApiService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      this.id = id ? id : '';
      this.fetchfamily();
    });
  }

  fetchfamily() {
    if (!this.id) {
      return;
    }

    this.apiservice.getFamilyDetails(this.id).subscribe((response: any) => {
      this.family = response || { members: [] };

      this.apiservice.getFamilyMembers(this.id).subscribe((membersResponse: any) => {
        this.family.members = Array.isArray(membersResponse) ? membersResponse : [];
      });
    });
  }
}
