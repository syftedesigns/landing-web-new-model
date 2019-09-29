import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { PublicComponent } from './components/public/public.component';


const routes: Routes = [
  {
    path: '',
    component: PublicComponent,
    loadChildren: () => import('./components/public/public.module').then(m => m.PublicModule)
  }
];


export const APP_ROUTES = RouterModule.forRoot(routes, {
  useHash: false,
  preloadingStrategy: PreloadAllModules
});
