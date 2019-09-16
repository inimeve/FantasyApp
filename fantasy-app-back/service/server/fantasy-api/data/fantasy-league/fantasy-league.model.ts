import { FantasyTeamDTO } from '../fantasy-team/fantasy-team.model';

export class FantasyLeagueAdapter {

    static toDTO(item: FantasyLeagueDomain): FantasyLeagueDTO {
        const fantasyLeagueDto: FantasyLeagueDTO = new FantasyLeagueDTO();

        fantasyLeagueDto.id = item.id;
        fantasyLeagueDto.managerNumber = item.managerNumber;
        fantasyLeagueDto.name = item.name;

        if (item.team) {
            const fantasyTeamDto: FantasyTeamDTO = new FantasyTeamDTO();

            fantasyTeamDto.id = item.team.id;
            fantasyTeamDto.teamPoints = item.team.teamPoints;
            fantasyTeamDto.teamValue = item.team.teamValue;

            fantasyLeagueDto.team = fantasyTeamDto;
        }

        return fantasyLeagueDto;
    }

}

export class FantasyLeagueDomain {

    public id: string;
    public managerNumber: number;
    public name: string;
    public team: any;

}

export class FantasyLeagueDTO {

    public id: string;
    public managerNumber: number;
    public name: string;

    public team: FantasyTeamDTO;

}
