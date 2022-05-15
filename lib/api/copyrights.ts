import { axiosInstance } from '.';

class CopyrightService {
  public static async getCopyrightsAPI() {
    const response = await axiosInstance.get(`/api/v1/info/copyrights`);
    return response;
  }
}

export default CopyrightService;
