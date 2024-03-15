
import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { DetailsComponent } from './details/details.component';
import { FamilyComponent } from './family/family.component';
import { AddunitComponent } from './addunit/addunit.component';

const routeConfig: Routes = [
    {
      path: '',
      component: HomeComponent,
      title: 'Home page'
    },
    {
        path: 'home',
        component: HomeComponent,
        title: 'Home page'
      },
    {
      path: 'details/:id',
      component: DetailsComponent,
      title: 'Unit details'
    },{
      path: 'family/:id',
      component: FamilyComponent,
      title: 'Family details'
    },{
      path: 'addunit',
      component: AddunitComponent,
      title: 'Add Unit details'
    }
  ];
  
  export default routeConfig;
