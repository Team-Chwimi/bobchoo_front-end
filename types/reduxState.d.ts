import { LatLngType } from './MapType';
import { QuestionType, QuestionTotalType } from './qestionType';
import { SurveyRequestType } from './answerType';

export type LatLngState = LatLngType & {
  hasCurrentLoaction: boolean;
};

export type QuestionState = QuestionTotalType & {
  questions: QuestionType[];
};


export type AnswerState = SurveyRequestType