import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthComponent } from './components/auth/auth.component';
import { BookListComponent } from './components/book-list/book-list.component';
import { SearchBooksComponent } from './components/search-books/search-books.component';
import { AuthGuard } from './services/auth/auth.guard';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
const routes: Routes = [
  { path: '', redirectTo: '/app/home', pathMatch: 'full' },
  { path: 'login', component: AuthComponent },
  {
    path: 'app',
    component: AppComponent,
    canActivate: [AuthGuard],
    children: [
      { path: '', redirectTo: '/app/home', pathMatch: 'full' }, // Redirect to 'mybooks' by default within the 'app' route
      { path: 'home', component:HomeComponent},
      { path: 'mybooks', component: BookListComponent },
      { path: 'search-books', component: SearchBooksComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
