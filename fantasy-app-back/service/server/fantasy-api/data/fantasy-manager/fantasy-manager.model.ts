import { FantasyLeagueDTO } from '../fantasy-league/fantasy-league.model';

export class FantasyManagerAdapter {

    static toDTO(item: FantasyManagerDomain): FantasyManagerDTO {
        const fantasyManagerDTO: FantasyManagerDTO = new FantasyManagerDTO();

        fantasyManagerDTO.id = item.id;
        fantasyManagerDTO.managerName = item.managerName;
        fantasyManagerDTO.avatar = item.avatar;

        return fantasyManagerDTO;
    }

}

export class FantasyManagerDomain {

    public id: string;
    public managerName: string;
    public avatar: string;

}

export class FantasyManagerDTO {

    public id: string;
    public managerName: string;
    public avatar: string;

    public leagues: FantasyLeagueDTO[];

}
