import { LatLngType } from './MapType';
import { QuestionType, QuestionTotalType } from './qestionType';
import { SurveyRequestType, SurveyResponseType, SurveyResponseItem } from './answerType';

export type LatLngState = LatLngType & {
  hasCurrentLoaction: boolean;
};

export type QuestionState = QuestionTotalType & {
  questions: QuestionType[];
};

export type AnswerState = SurveyRequestType;

export type responseOneState = SurveyResponseType;

export type responseMultiState = {
  foodList: SurveyResponseItem[];
};
