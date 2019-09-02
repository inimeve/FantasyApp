import { FantasyManagerSupplier } from './fantasy-manager.supplier'
import { FantasyManager } from './fantasy-manager.model'

export class FantasyManagerService {

    constructor(private fantasyManagerRepository: FantasyManagerSupplier) {
        this.fantasyManagerRepository = new FantasyManagerSupplier();
    }

    public getCurrentManagerInfo(accessToken: string): Promise<FantasyManager> {
        return this.fantasyManagerRepository.getCurrentManagerInfo(accessToken);
    }

}
