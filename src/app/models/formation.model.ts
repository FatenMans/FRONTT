export interface Formation {
    id?: number;
    numGroupe: number;
    nomFormation: string;
    dateDebut: string;
    dateFin: string;
    duree: string;
    typeformation: string;
    fraisTotalFormateur: number;
    dureeParJour?: number;
    formateurId: number; // ID du formateur
    lieuId: number; // ID du lieu
    themeId: number; // ID du thème
    participants: number[]; // Liste des IDs des participants
    lastModifiedDate?: string;
    lastModifiedBy?: string;
}

export class FormationImpl implements Formation {
    constructor(
        public numGroupe: number,
        public nomFormation: string,
        public dateDebut: string,
        public dateFin: string,
        public duree: string,
        public typeformation: string,
        public fraisTotalFormateur: number,
        public formateurId: number,
        public lieuId: number,
        public themeId: number,
        public participants: number[],
        public dureeParJour?: number // Optionnel
    ) { }
    
    id?: number;
    lastModifiedDate?: string;
    lastModifiedBy?: string;
}
