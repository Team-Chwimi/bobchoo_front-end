import { LatLngType } from './MapType';

export interface SurveyRequestType extends LatLngType {
  answerList: AnswerType[];
}

export interface AnswerType {
	questionId : number,
	answer: string[],
}

export interface SurveyResponseType {
  foodName: string;
  foodImg: string;
}
export interface SurveyResponseItem {
    foodId: number;
    foodName: string;
}

