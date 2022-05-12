import { LatLngType } from './MapType';
import {QuestionType, QestionTotalType} from './qestionType'

export type LatLngState = LatLngType & {
  hasCurrentLoaction: boolean;
};

export type QuestionState = {
  questions: QuestionType[];
  questionTotalCount: QestionTotalType | null;
};
