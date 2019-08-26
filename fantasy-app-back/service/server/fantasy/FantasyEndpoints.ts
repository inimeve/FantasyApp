import { NextFunction, Request, Response } from 'express'

export class FantasyEndpoints {

    public getPlayer = async (req: Request, res: Response, next: NextFunction) => {
        try {
            req.services.fantasyService.getPlayer()
                .then((data: any) => res.json(data));
        } catch (err) {
            next(err);
        }
    };

}
