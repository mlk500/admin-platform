export interface Task {
  taskID: number;
  name: string;
  description: string;
  taskFreeTexts?: string[];
  questionTask?: QuestionTask; 
  mediaList?: MediaTask[];
}
export interface QuestionTask {
  questionTaskID: number;
  question: string;
  answers: string[];
  correctAnswer: number;
  taskID: number;
}
export interface MediaTask {
  mediaTaskID: number;
  fileName: string;
  mediaPath: string;
  mediaType: string;
  // fileSize?: number; 
  // uploadedDate?: Date; 
  taskID: number; 
}


export interface Location {
  locationID: number;
  name: string;
  description?: string;
  floor: number;
  qrcode: string;
  locationImage?: LocationImage; 
  objectsList?: ObjectLocation[];
}

export interface LocationImage {
  locationImgID: number;
  name: string;
  type: string;
  imagePath: string;
}


export interface ObjectLocation {
  objectID: number;
  name: string;
  description?: string;
  // location: Location;
  // objectImages: ObjectImage[];
}

export interface ObjectImage {
  id: number;
  name: string;
  imagePath: string;
  object: ObjectLocation;
}


export interface Game {
  gameID: number;
  adminID: number;
  gameName: string;
  description: string;
  QRCodePath: string;
  gameImage: GameImage;
  units: Unit[];
}

export interface GameImage {
  gameImgID: number;
  name: string;
  type: string;
  imagePath: string;
}

export interface Unit {
  unitID: number;
  unitOrder: number;
  name: string;
  description?: string;
  hint: string;
  objectID: number;
  taskID: number;
  locationID: number;
}

export interface Admin {
  adminID: number;
  username: string;
  password: string;
  color: string;
  sector: string;
  role: UserRole;
  gamesList: Game[];
  tasksList: Task[];
}

export enum UserRole {
  MainAdmin, SectorAdmin
}

