import difference from 'lodash/difference';
import findIndex from 'lodash/findIndex';
import get from 'lodash/get';

import { User } from '../auth/user.model';
import { Team } from './team.model';
import { TeamRole } from './team-role.model';

export class TeamMember extends User {

	public explicit: boolean = false;

	public active: boolean = false;

	public role: string = 'member';

	public roleDisplay: string;

	constructor() {
		super();
	}

	hasTeams(): boolean {
		return this.userModel.teams.length > 0;
	}

	public getRoleInTeam(team: Team| { _id: string }): string {
		if (null != this.userModel) {
			let teams = get(this, 'userModel.teams', []);
			// Find the role of this user in the team
			let ndx = findIndex(teams, (t: any) => t._id === team._id);

			if (-1 !== ndx) {
				return teams[ndx].role;
			}
		}

		return null;
	}

	public setFromTeamMemberModel(team: Team, userModel: any): TeamMember {
		// Set the user model
		super.setFromUserModel(userModel);

		if (null != this.userModel) {
			// Initialize the teams array if needed
			if (null == userModel.teams) {
				this.userModel.teams = [];
			}
			else if (null != team) {
				this.role = this.getRoleInTeam(team);
				this.roleDisplay = TeamRole.getDisplay(this.role);
			}

			// Determine if user is implicit/explicit and active/inactive
			this.explicit = (null != userModel.teams && userModel.teams.length > 0);

			if (userModel.bypassAccessCheck) {
				this.active = true;
			}
			else if (null != team) {
				this.active = (0 === difference(team.requiresExternalTeams, userModel.externalGroups).length);
			}
		}

		return this;
	}
}
