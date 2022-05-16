import { axiosInstance } from '.';

class SurveyService {
  public static async getQuestionAPI() {
    const response = await axiosInstance.get(`/api/v1/surveys`);
    return response;
  }
}

export default SurveyService;
