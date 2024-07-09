import { Formation } from "./formation.model";

export interface Lieu {
    id: number;
    lieu: string;

    formations?: Formation[];
}