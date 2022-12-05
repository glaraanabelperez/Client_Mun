export interface LoginResponse{
    UserId: number;
    email:string;
    Password:string
  }

  export interface LoginRequest{
    Email:string;
    Password:string
  }