import { Routes, RouterModule } from '@angular/router';
import { ClientComponent } from './components/pages/home/client.component';

const routes: Routes = [
  { path: 'client', component: ClientComponent },
];

export const ClientRoutes = RouterModule.forChild(routes);
