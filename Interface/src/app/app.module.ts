import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { GostsComponent } from './gosts/gosts.component';
import { GostsbyrtComponent } from './gostsbyrt/gostsbyrt.component';
import { KolpgaikaComponent } from './kolpgaika/kolpgaika.component';
import { KruglgaikaComponent } from './kruglgaika/kruglgaika.component';
import { ProrezngaikaComponent } from './prorezngaika/prorezngaika.component';

const appRoutes: Routes =[
  { path: '', component: HomeComponent},
  { path: 'gosts', component: GostsComponent},
  { path: 'byrt', component: GostsbyrtComponent},
  { path: 'kolp', component: KolpgaikaComponent},
  { path: 'krugl', component: KruglgaikaComponent},
  { path: 'prorezn', component: ProrezngaikaComponent}
]

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    GostsComponent,
    GostsbyrtComponent,
    KolpgaikaComponent,
    KruglgaikaComponent,
    ProrezngaikaComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
