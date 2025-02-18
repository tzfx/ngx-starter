import { Router } from '@angular/router';
import { Observable } from 'rxjs';

import { Message } from '../message.class';
import { ConfigService } from '../../config.service';
import { SystemAlertService } from 'src/app/common/system-alert.module';
import { HttpErrorResponse } from '@angular/common/http';

export abstract class ManageMessageComponent {

	message: Message;
	error: string = null;
	okDisabled: boolean;

	// Variables that will be set by implementing classes
	title: string;
	subtitle: string;
	okButtonText: string;

	typeOptions: any[] = [
		{ value: 'MOTD', display: 'MOTD' },
		{ value: 'INFO', display: 'INFO' },
		{ value: 'WARN', display: 'WARN' },
		{ value: 'ERROR', display: 'ERROR' }
	];

	protected config: any;
	protected navigateOnSuccess: string;

	constructor(
		protected router: Router,
		protected configService: ConfigService,
		public alertService: SystemAlertService
	) {}

	ngOnInit() {
		this.configService.getConfig()
			.subscribe((config: any) => {
				this.config = config;

				this.initialize();
			});
	}

	abstract initialize(): void;

	abstract submitMessage(message: Message): Observable<any>;

	submit() {
		this.submitMessage(this.message)
			.subscribe(
				() => this.router.navigate([this.navigateOnSuccess]),
				(response: HttpErrorResponse) => {
					if (response.status >= 400 && response.status < 500) {
						let errors = response.message.split('\n');
						this.error = errors.join(', ');
					}
				});
	}

}
