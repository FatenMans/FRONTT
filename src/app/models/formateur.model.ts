export class Formateur {
    code?: string;
    nom: string;
    prenom: string;
    cin: string;
    matricule: string;
    telephone: string;
    type: string;
    montant?: number;
    moyenne?: number;
    rang?: string;
    autorisation?: string;
    typeFormateur: string;
    email: string;
    id: any;
    lastModifiedDate?: string;
    lastModifiedBy?: string;

    constructor() {
        this.nom = '';
        this.prenom = '';
        this.cin = '';
        this.matricule = '';
        this.telephone = '';
        this.type = '';
        this.typeFormateur = '';
        this.email = '';
    }
}
