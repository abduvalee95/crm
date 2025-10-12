import { DealStage, ViewMode } from "../enums/deal";

export interface Deal {
    id: number;
    title: string;
    company: string;
    amount: number;
    responsible: string; 
    stage: DealStage;
    progress: number; // 0-100gacha 
    deadline: string;
  }
