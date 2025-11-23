export interface LearningStep {
  title: string;
  description: string;
  duration: string;
  resources: string[];
}

export interface LearningPath {
  topic: string;
  steps: LearningStep[];
}

export enum AppView {
  LOGIN = 'LOGIN',
  DASHBOARD = 'DASHBOARD'
}
