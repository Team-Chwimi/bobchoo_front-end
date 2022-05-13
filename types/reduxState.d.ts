import { LatLngType } from './MapType';
import { QuestionType, QuestionTotalType } from './qestionType';

export type LatLngState = LatLngType & {
  hasCurrentLoaction: boolean;
};

export type QuestionState = QuestionTotalType & {
  questions: QuestionType[];
};
