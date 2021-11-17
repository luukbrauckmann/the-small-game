import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Routes, RouterModule } from '@angular/router';
import { MenubarModule } from 'primeng/menubar';
import { ToastModule } from 'primeng/toast';
import { MenuModule } from 'primeng/menu';
import { ButtonModule } from 'primeng/button';
import { SidebarModule } from 'primeng/sidebar';

import { AppComponent } from './app.component';
import { NavigationComponent } from './ui/navigation/navigation.component';
import { FooterComponent } from './ui/footer/footer.component';

import { environment } from '../environments/environment';

import { AuthenticationModule } from './authentication/authentication.module';
import { HomeModule } from './home/home.module';
import { UsersModule } from './users/users.module';
import { AngularFireModule } from '@angular/fire/compat';
import { MessageService } from 'primeng/api';

const routes: Routes = [];

@NgModule({
	declarations: [
		AppComponent,
		NavigationComponent,
		FooterComponent
	],
	imports: [
		BrowserModule,
		BrowserAnimationsModule,
		RouterModule.forRoot(routes),
		AngularFireModule.initializeApp(environment.firebase),
		MenubarModule,
		MenuModule,
		ButtonModule,
		SidebarModule,
		ToastModule,
		HomeModule,
		AuthenticationModule,
		UsersModule
	],
	providers: [MessageService],
	bootstrap: [AppComponent]
})
export class AppModule { }
