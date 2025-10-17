import { DealStage, ViewMode } from "../enums/deal";

export interface Deal {
    name: string;
    title?: string;
    company: string;
    amount?: number;
    responsible?: string; 
    stage: DealStage;
    progress?: number; 
    deadline?: string;
  }
