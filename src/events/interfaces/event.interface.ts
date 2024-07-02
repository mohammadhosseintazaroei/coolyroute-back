export interface ICourse {
  id: number;
  title: string;
  description?: string;
  price: number;
}

export interface ICreateCourse extends Omit<ICourse, 'id'> {}
