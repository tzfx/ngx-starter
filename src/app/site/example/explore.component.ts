import { Component } from '@angular/core';
import { NavbarTopics } from '../../core/core.module';

@Component({
	template: `
		<div class="container">
			<div class="row">
				<div class="col">
					<h2>Explore Page</h2>
					<p>Simple demonstration of routing.</p>
				</div>
			</div>
		</div>`,
	styles: [ '' ]
})
export class ExploreComponent {


}

NavbarTopics.registerTopic({
	id: 'explore',
	title: 'Explore',
	ordinal: 1,
	path: 'explore',
	iconClass: 'fa-compass',
	hasSomeRoles: ['user']
});
