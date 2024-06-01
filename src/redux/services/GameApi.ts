import { Game } from "../models/Interfaces";
import { genericAPI } from "./GenericAPI";

class GameApi {
  static readonly endpoint = "/game";

  async getAllGames(): Promise<any[]> {
    const response = await genericAPI.get<Game[]>(`${GameApi.endpoint}`);
    console.log("curr games ",response.data);
    return response.data;
  }
}

export const gameAPI = new GameApi();