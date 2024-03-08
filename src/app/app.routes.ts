import {Routes} from '@angular/router';
import {UserComponent} from "./user/user.component";
import {PageNotFoundComponent} from "./page-not-found/page-not-found.component";

export const routes: Routes = [
  {
    path: '',
    component: UserComponent
  },
  {
    path: '**',
    component: PageNotFoundComponent
  }
];
