import { Game, GameTBC, Unit } from "../models/Interfaces";
import { genericAPI } from "./GenericAPI";

class GameApi {
  static readonly endpoint = "/game";

  async getAllGames(): Promise<Game[]> {
    const response = await genericAPI.get<Game[]>(`${GameApi.endpoint}/getAll`);
    console.log("games from api ", response.data);
    return response.data;
  }

  async createGame(game: GameTBC, image: File | null, units: Unit[]): Promise<any> {
    const formData = new FormData();
    formData.append('game', new Blob([JSON.stringify(game)], { type: 'application/json' }));
    if (image) {
      formData.append('image', image);
    }
    if (units.length > 0) {
      formData.append('units', new Blob([JSON.stringify(units)], { type: 'application/json' }));
    }
    const response = await genericAPI.postFormData(`${GameApi.endpoint}/create`, formData);
    console.log("response from game" + response.data);
    return response;
  }
}

export const gameAPI = new GameApi();
