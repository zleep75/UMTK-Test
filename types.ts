export interface QuestionData {
  id: number;
  promptParts: {
    prefix: string;
    highlight: string;
    suffix: string;
  };
  correctAnswer: string;
  distractors: string[];
  mandatoryDistractor?: string;
  failureImage?: string;
  failureText?: string;
}

export interface GameState {
  question: QuestionData | null;
  options: string[];
  selectedOption: string | null;
  isCorrect: boolean | null;
}