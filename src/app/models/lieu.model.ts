import { Formation } from "./formation.model";

export interface Lieu {
    id: number;
    lieu: string;
    lastModifiedDate?: string;
    lastModifiedBy?: string;

    formations?: Formation[];
}