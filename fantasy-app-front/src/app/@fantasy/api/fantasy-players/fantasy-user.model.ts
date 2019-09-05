import {Adapter} from './fantasy-players';
import {Injectable} from '@angular/core';

export class FantasyUser {
  constructor(
    public id: number,
    public name: string,
    public position: number,
    public points: number,
    public teamPoints: number,
    public teamValue: number,
  ) {}
}

@Injectable({
  providedIn: 'root',
})
export class FantasyUserAdapter implements  Adapter<FantasyUser> {

  adapt(item: any): FantasyUser {
    return new FantasyUser(
      item.team.manager.id,
      item.team.manager.managerName,
      item.position,
      item.points,
      item.team.teamPoints,
      item.team.teamValue,
    );
  }

}