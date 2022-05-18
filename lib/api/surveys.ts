import { axiosInstance } from '.';
import {SurveyRequestType} from '../../types/answerType'

class SurveyService {
  public static async getQuestionAPI() {
    const response = await axiosInstance.get(`/api/v1/surveys`);
    return response;
  }

  public static async postAnswerAPI(request:SurveyRequestType) {
    const response = await axiosInstance.post(`/api/v1/surveys/results`,request);
    return response;
  }
}

export default SurveyService;
