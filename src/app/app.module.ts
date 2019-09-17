import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { FundamentalsComponent } from './fundamentals/fundamentals.component';
import { Client } from './shared/client';
import { SortComponent } from './sort/sort.component';
import { SearchComponent } from './search/search.component';
import { GraphsComponent } from './graphs/graphs.component';

const routes = [
  { path: '', redirectTo: 'fundamentals', pathMatch: 'full' },
  { path: 'fundamentals', component: FundamentalsComponent },
  { path: 'sort', component: SortComponent },
  { path: 'search', component: SearchComponent },
  { path: 'graphs', component: GraphsComponent }
];

@NgModule({
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    HttpClientModule
  ],
  declarations: [
    AppComponent,
    FundamentalsComponent,
    SortComponent,
    SearchComponent,
    GraphsComponent
  ],
  providers: [Client],
  bootstrap: [AppComponent]
})
export class AppModule { }
