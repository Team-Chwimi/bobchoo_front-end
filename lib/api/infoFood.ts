import { axiosInstance } from '.';

class InfoFoodService {
  public static async getInfoFood(foodName:string) {
    const response = await axiosInstance.get(`/api/v1/info/food/${foodName}`);
    return response;
  }
}

export default InfoFoodService;
