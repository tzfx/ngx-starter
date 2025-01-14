import { Component, Input } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';

import { SessionService } from '../auth/session.service';
import { SystemAlertService } from '../../common/system-alert.module';

@Component({
	templateUrl: 'user-eua.component.html'
})
export class UserEuaComponent {

	agree: boolean = false;

	eua: any;

	showAlerts: boolean = false;

	constructor(
		private sessionService: SessionService,
		private alertService: SystemAlertService
	) {}

	ngOnInit() {
		this.alertService.clearAllAlerts();
		this.sessionService.getCurrentEua().subscribe( (eua: any) => this.eua = eua);
	}

	accept() {
		this.alertService.clearAllAlerts();
		this.showAlerts = true;
		this.sessionService.acceptEua().subscribe(() => {
			this.sessionService.goToPreviousRoute();
		}, (error: HttpErrorResponse) => {
			this.alertService.addAlert(error.error.message);
		});
	}
}
