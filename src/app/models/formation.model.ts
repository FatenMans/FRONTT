export interface Formation {
    id?: number;
    numGroupe: number;
    dateDebutGroupe: string;
    dateFinGroupe: string;
    dureGroupe: string;
    typeformation: string;
    cout: number;
    tva: number;
    mtTva: number;
    fraisTotalFormateur: number;
    nomPers: string;
    matPers: string;
    libFonct: string;
    libServ: string;
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
        public dateDebutGroupe: string,
        public dateFinGroupe: string,
        public dureGroupe: string,
        public typeformation: string,
        public cout: number,
        public tva: number,
        public mtTva: number,
        public fraisTotalFormateur: number,
        public nomPers: string,
        public matPers: string,
        public libFonct: string,
        public libServ: string,
        public formateurId: number,
        public lieuId: number,
        public themeId: number,
        public participants: number[]
    ) { }
}
