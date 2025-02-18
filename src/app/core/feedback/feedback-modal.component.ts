import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

import isEmpty from 'lodash/isEmpty';
import { BsModalRef } from 'ngx-bootstrap';
import { first } from 'rxjs/operators';

import { ConfigService } from '../config.service';
import { FeedbackService } from './feedback.service';
import { Feedback } from './feedback.model';

@Component({
	templateUrl: 'feedback-modal.component.html'
})
export class FeedbackModalComponent implements OnInit {

	error: string;

	success: string;

	submitting: boolean = false;

	classificationOptions: any[];

	feedback: Feedback = new Feedback();

	constructor(
		private router: Router,
		private configService: ConfigService,
		private feedbackService: FeedbackService,
		public modalRef: BsModalRef
	) {}

	ngOnInit() {
		this.configService.getConfig().pipe(first()).subscribe((config: any) => {
			this.feedback.currentRoute = `${config.app.baseUrl}${this.router.url}`;

			if (Array.isArray(config.feedback.classificationOpts) && !isEmpty(config.feedback.classificationOpts)) {
				this.classificationOptions = config.feedback.classificationOpts;
			}
		});
	}

	submit() {
		this.error = null;
		this.submitting = true;
		this.feedbackService.submit(this.feedback).subscribe(() => {
			this.success = 'Feedback successfully submitted!';
			setTimeout(() => this.modalRef.hide(), 1500);
		}, (error: HttpErrorResponse) => {
			this.submitting = false;
			this.error = error.error.message;
		});
	}
}
