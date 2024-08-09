export interface EnrolledFormation {
    id: number;
    enrollmentDate: string;
    formation: {
      id: number;
      nomFormation: string;
      theme: { theme: string };
      numGroupe: number;
      dateDebut: string;
      dateFin: string;
      duree: string;
      typeformation: string;
      fraisTotalFormateur: number;
      formateur: { nom: string };
    };
  }
  