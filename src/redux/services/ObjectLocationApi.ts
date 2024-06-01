import { ObjectLocation } from "../models/Interfaces";
import { genericAPI } from "./GenericAPI";

class ObjectLocationAPI{
    static readonly endpoint = "/locationobject";

    async getAllObjetsOfLocation(locationId: number): Promise<any[]>{
        console.log("in location object " + locationId);
        const response = await genericAPI.get<ObjectLocation[]>(`${ObjectLocationAPI.endpoint}/getAll/${locationId}`);
        console.log("object data ", response.data);
        return response.data;
    }

    async createObject(locationId: number, formData: FormData): Promise<any[]>{
        console.log("in create location object " + locationId);
        try{
            
            const response = await genericAPI.postFormData<any>(`${ObjectLocationAPI.endpoint}/create/${locationId}`, formData);
            return response.data;
        }
        catch (error) {
            console.error('Error creating object:', error);
            throw error;
        }
    }

}

export const objectAPI = new ObjectLocationAPI();
