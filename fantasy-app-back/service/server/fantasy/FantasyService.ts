import { FantasyRepository } from './FantasyRepository';

export class FantasyService {
    
    constructor(private fantasyRepository: FantasyRepository) {
    }

    public getPlayer(): any {
        return this.fantasyRepository.getPlayer();
    }

}