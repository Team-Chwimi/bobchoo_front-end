import { LatLngType } from './MapType';
import { QuestionType, QuestionTotalType } from './qestionType';
import { SurveyRequestType, SurveyResponseItemType, SurveyResponseType } from './answerType';

export type LatLngState = LatLngType & {
  hasCurrentLoaction: boolean;
};

export type QuestionState = QuestionTotalType & {
  questions: QuestionType[];
};


export type AnswerState = SurveyRequestType

export type responseOneState = SurveyResponseType

export type responseMultiState = {
  foodList: SurveyResponseType[];
}

