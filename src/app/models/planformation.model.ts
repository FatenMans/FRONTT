export interface PlanFormation {
    id: number;
    code_action: string;
    groupe_N: string;
    dateDebut: string;
    datefin: string;
    duree: string;
    nbreCandidat: string;
    formation: any; // Ajuste selon ton modèle
    formateur: any; // Ajuste selon ton modèle
    theme: any; // Ajuste selon ton modèle
    participants: any[]; // Ajuste selon ton modèle
    lieux: any[]; // Ajuste selon ton modèle
    lieuxHebergement: any[]; // Ajuste selon ton modèle
    cabinetFormation: any; // Ajuste selon ton modèle
    lastModifiedDate?: string;
  lastModifiedBy?: string;
  }
  