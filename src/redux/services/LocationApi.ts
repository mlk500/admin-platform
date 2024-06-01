import { Location } from "../models/Interfaces";
import { genericAPI } from "./GenericAPI";

class LocationAPI {
  static readonly endpoint = "/location";

  async getAllLocations(): Promise<any[]> {
    const response = await genericAPI.get<Location[]>(`${LocationAPI.endpoint}/getAll`);
    return response.data;
  }

  async createLocation(formData: FormData){
    try{

      const response = await genericAPI.postFormData<any>(`${LocationAPI.endpoint}/create`, formData);
      return response.data;
    }
    catch (error) {
      console.error('Error creating task:', error);
      throw error;
  }
  }

}

export const locationAPI = new LocationAPI();
