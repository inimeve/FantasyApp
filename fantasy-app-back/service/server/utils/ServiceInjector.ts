export class ServiceInjector {

    private static instance: ServiceInjector;

    private _di: any = {};

    private constructor(){}

    public static getInstance() {
        if (!ServiceInjector.instance) {
            ServiceInjector.instance = new ServiceInjector();
        }
        return ServiceInjector.instance;
    }

    public registerService(dependency: any, args?: any){
        if (this.serviceExist(dependency.name)) {
            return;
        }
        const construction = new dependency.prototype.constructor(args);
        this._di[dependency.name] = construction;
    }

    public getService<T> (dependency: any): T {
        if (!this.serviceExist(dependency.name)) {
            return {} as T;
        }
        const di: any = this._di as T;
        return this._di[dependency.name];
    }

    private serviceExist(name: string) {
        return this._di[name]? true: false;
    }

}
