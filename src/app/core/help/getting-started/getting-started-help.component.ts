import {Component, Output, EventEmitter, OnInit} from '@angular/core';

import isArray from 'lodash/isArray';
import isEmpty from 'lodash/isEmpty';
import { first } from 'rxjs/operators';

import { HelpTopics } from '../help-topic.component';
import { ConfigService } from '../../../core/config.service';

@Component({
	templateUrl: 'getting-started-help.component.html'
})
export class GettingStartedHelpComponent implements OnInit {
	@Output() backEvent = new EventEmitter();

	config: any;

	externalLinksEnabled: boolean;

	appName: string = 'Application';

	constructor(private configService: ConfigService) {}

	ngOnInit() {
		this.configService.getConfig().pipe(first()).subscribe((config: any) => {
			this.config = config;
			this.externalLinksEnabled = config.welcomeLinks
				&& config.welcomeLinks.enabled
				&& isArray(config.welcomeLinks.links)
				&& !isEmpty(config.welcomeLinks.links);
			this.appName = config.app.title;
		});
	}

	back() {
		this.backEvent.emit({});
	}
}
HelpTopics.registerTopic('getting-started', GettingStartedHelpComponent, 0);
