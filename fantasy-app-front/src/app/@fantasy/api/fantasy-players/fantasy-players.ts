import { Observable } from 'rxjs';

export interface FantasyPlayer {
  id: number;
  name: string;
  status: string;
  points: number;
  value: number;
  position: string;
  images: string[];
}

export abstract class FantasyPlayerData {
  abstract getAll(): Observable<FantasyPlayer[]>;
  abstract getRankingLeague(): Observable<any>;
}

export interface Adapter<T> {
  adapt(item: any): T;
}
