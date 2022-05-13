export interface QuestionType {
  answerList: Array<string>;
  description: string;
  overlap: boolean;
  question: string;
  questionId: number;
}

export interface QuestionTotalType {
  questionTotalCount: number;
}
