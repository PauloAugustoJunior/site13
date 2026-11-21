import { Routes } from '@angular/router';
export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/home').then((module) => module.Home),
    title: 'Nexo — Tecnologia para conectar possibilidades',
  },
  { path: '**', redirectTo: '' },
];
