import { axiosInstance } from '.';

class RandomService {
  public static async getRandomAPI() {
    const response = await axiosInstance.get(`/api/v1/random`);
    return response;
  }
}

export default RandomService;
