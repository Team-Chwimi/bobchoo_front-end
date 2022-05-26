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

export interface QuestionResultType extends QuestionTotalType {
  // /api/v1/surveys response 양식
  questionList: QuestionType[];
}
