
import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { DetailsComponent } from './details/details.component';
import { FamilyComponent } from './family/family.component';
import { AddunitComponent } from './addunit/addunit.component';
import { UpdateunitComponent } from './updateunit/updateunit.component';

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
      title: 'Add Family details'
    },{
      path: 'updateunit',
      component: UpdateunitComponent,
      title: 'Update Family details'
    }
  ];
  
  export default routeConfig;
