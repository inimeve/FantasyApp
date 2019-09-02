import { FantasyManager } from '../fantasy-manager/fantasy-manager.model'

export class FantasyTeam {

    constructor (
        public id: number,
        public teamValue: number,
        public teamPoints: number,
        public manager: FantasyManager,
    ) {}

}

export class FantasyTeamAdapter {

    static adapt(item: any): FantasyTeam {
        return new FantasyTeam(
            item.team.id,
            item.team.teamValue,
            item.team.teamPoints,
            new FantasyManager(
                item.team.manager.id,
                item.team.manager.managerName,
                item.team.manager.avatar
            )
        );
    }

}
