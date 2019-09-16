import { FantasyManagerDTO } from '../fantasy-manager/fantasy-manager.model';

export class FantasyTeamAdapter {

    static toDTO(item: FantasyTeamDomain): FantasyTeamDTO {
        const fantasyTeamDTO: FantasyTeamDTO = new FantasyTeamDTO();

        fantasyTeamDTO.id = item.id;
        fantasyTeamDTO.teamValue = item.teamValue;
        fantasyTeamDTO.teamPoints = item.teamPoints;

        if (item.manager) {
            const fantasyManagerDTO: FantasyManagerDTO = new FantasyManagerDTO();

            fantasyManagerDTO.id = item.manager.id;
            fantasyManagerDTO.avatar = item.manager.avatar;
            fantasyManagerDTO.managerName = item.manager.managerName;

            fantasyTeamDTO.manager = fantasyManagerDTO;
        }

        return fantasyTeamDTO;
    }

}

export class FantasyTeamDomain {

    public id: string;
    public teamValue: number;
    public teamPoints: number;

    public manager: any;

}

export class FantasyTeamDTO {

    public id: string;
    public teamValue: number;
    public teamPoints: number;

    public manager: FantasyManagerDTO;

}
