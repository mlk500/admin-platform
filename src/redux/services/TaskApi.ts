import axios, { AxiosResponse } from "axios";
import {Task } from "../models/Interfaces";
import { genericAPI } from "./GenericAPI";

class TaskAPI {
  static readonly endpoint = "/Task";

  // async getAllTasks(): Promise<any[]> {
  //   const response = await genericAPI.get<Task[]>(`${TaskAPI.endpoint}`);
  //   // console.log("response.data: ",typeof(response.data[0]));
  //   return response.data;
  // }
  async getAllTasks(): Promise<Task[]> {
    const response = await genericAPI.get<Task[]>(`${TaskAPI.endpoint}/getAll`);
    return response.data;
  }

  async deleteTask(taskID: number): Promise<AxiosResponse> {
    try {
      const response = await genericAPI.delete<void>(`${TaskAPI.endpoint}/delete/${taskID}`);
      console.log("delete response ", response.data);
      return response;
    } catch (error: any) {
      if (axios.isAxiosError(error) && error.response) {
        if (error.response.data.includes('Task is part of an existing game')) {
          alert("המשימה היא חלק ממשחק קיים, נא לעדכן משחק ואז למחוק המשימה");
      }
        throw new Error(error.response.data.message || 'Error deleting task');
      } else {
        throw new Error('Error deleting task');
      }
    }
  }

  //  ---------------------------------- test the apis ----------------------------------------------------- 

  async createTask(formData: FormData){
    try{

      const response = await genericAPI.postFormData<any>(`${TaskAPI.endpoint}/create`, formData);
      return response.data;
    }
    catch (error) {
      console.error('Error creating task:', error);
      throw error;
  }
  }

  // async createTask(task: Task, questionTask?: QuestionTask, mediaFiles?: File[]): Promise<Task> {
  //   const formData = new FormData();
  //   formData.append('task', new Blob([JSON.stringify(task)], {type: 'application/json'}));
    
  //   if (questionTask) {
  //       formData.append('question', new Blob([JSON.stringify(questionTask)], {type: 'application/json'}));
  //   }

  //   // Ensure media files are appended properly
  //   if (mediaFiles) {
  //     mediaFiles.forEach(file => {
  //       console.log('Appending file:', file); 
  //       formData.append('media', file);
       
  //     });
  // }
    // if (mediaFiles) {
    //     mediaFiles.forEach(file => {
    //       console.log('Appending file:', file); 
    //       if (file instanceof File) {
    //           formData.append('media', file, file.name);
    //       } else {
    //           console.error('Error: Invalid file type', file);
    //       }
    //     });
    // }

    // const response = await genericAPI.post<Task>(`${TaskAPI.endpoint}/create`, formData);
    // return response.data;
// }



  // async updateTask(taskId: number, task: Task, questionTask?: QuestionTask, mediaFiles?: File[]): Promise<Task> {
  //   const formData = new FormData();
  //   formData.append('task', JSON.stringify(task));
  //   if (questionTask) {
  //     formData.append('question', JSON.stringify(questionTask));
  //   }
  //   mediaFiles?.forEach(file => formData.append('media', file));

  //   const response = await genericAPI.postFormData<Task>(`${TaskAPI.endpoint}/update/${taskId}`, formData);
  //   return response.data;
  // }

  async updateTask(taskId: number, formData: FormData): Promise<Task> {
    try {
        const response = await genericAPI.putFormData<Task>(`${TaskAPI.endpoint}/update/${taskId}`, formData);
        console.log(response.statusText);
        return response.data;
    } catch (error) {
        console.error('Error updating task:', error);
        throw error;
    }
}


}





export const taskAPI = new TaskAPI();
