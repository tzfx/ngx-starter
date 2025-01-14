import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AuthGuard } from '../auth/auth.guard';
import { ListTeamsComponent } from './list-teams/list-teams.component';
import { CreateTeamComponent } from './create-team/create-team.component';
import { ViewTeamComponent } from './view-team/view-team.component';
import { TeamsResolve } from './teams.resolver';

@NgModule({
	imports: [
		RouterModule.forChild([
			{
				path: 'teams',
				component: ListTeamsComponent,
				canActivate: [AuthGuard],
				data: { roles: [ 'user' ] }
			},
			{
				path: 'team/create',
				component: CreateTeamComponent,
				canActivate: [AuthGuard],
				data: {
					roles: [ 'editor' ]
				}
			},
			{
				path: 'team/:id',
				component: ViewTeamComponent,
				canActivate: [AuthGuard],
				data: { roles: [ 'user' ] },
				resolve: {
					team: TeamsResolve
				}
			}
		])
	],
	exports: [
		RouterModule
	]
})
export class TeamsRoutingModule { }
