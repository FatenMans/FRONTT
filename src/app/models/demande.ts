import { Participant } from "./participant.model";

export interface Demande {
 
    id?: number;           // L'identifiant de la demande (optionnel si c'est généré par le backend)
    participantId?: number; // ID du participant faisant la demande (ou d'autres données nécessaires)
    dateDemande?: string;  // Date à laquelle la demande a été faite
    // Ajoutez d'autres propriétés selon les besoins
  }
  
  