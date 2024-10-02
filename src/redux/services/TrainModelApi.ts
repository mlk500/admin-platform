import axios, { AxiosResponse } from "axios";

class TrainModelApi {
  private readonly baseUrl: string =
    "https://custom-fastapi-service-tm3zus3bzq-uc.a.run.app";

  async retrainModel(): Promise<AxiosResponse> {
    try {
      const config = {
        method: "post",
        maxBodyLength: Infinity,
        url: `${this.baseUrl}/retrain`,
        headers: {},
      };

      const response = await axios.request(config);
      return response;
    } catch (error) {
      console.error("Error retraining model:", error);
      throw error;
    }
  }
}

export const trainModelApi = new TrainModelApi();
