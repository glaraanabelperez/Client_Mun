export interface LoginResponse{
    UserId: number;
    BusinessName: string;
    email:string;
    Password:string
  }

  export interface LoginRequest{
    Email:string;
    Password:string
  }