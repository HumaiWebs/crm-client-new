export type TEmployee = {
  _id: string;
  name: string;
  email: string;
};

export type TEmployeeRecord = {
  _id: string;
  employee: Employee;
  phone: string;
  designation: string;
  joiningDate: string; // ISO date string (e.g., "2024-09-09")
  salary: number;
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
  __v: number;
};
