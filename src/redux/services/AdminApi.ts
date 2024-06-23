import { Admin, AdminTBC } from "../models/Interfaces";
import { genericAPI } from "./GenericAPI";

class AdminApi {
    async getAllAdmins(): Promise<Admin[]> {
      const response = await genericAPI.get<Admin[]>("/admin/getAll");
      return response.data;
    }
  
    async createSectorAdmin(admin: AdminTBC): Promise<Admin> {
      const response = await genericAPI.post<Admin>("/admin/create", admin);
      return response.data;
    }
  
    async updateAdmin(admin: Admin): Promise<Admin> {
      const response = await genericAPI.put<Admin>("/admin/update", admin);
      return response.data;
    }
  
    async deleteAdmin(adminID: number): Promise<void> {
      await genericAPI.delete<void>(`/admin/delete/${adminID}`);
    }
  }
  
  export const adminAPI = new AdminApi();
  