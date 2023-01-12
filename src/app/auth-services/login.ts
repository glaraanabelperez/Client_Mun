export interface LoginResponse{
    UserId: number;
    UserName:string;
    Password:string
  }

  export interface LoginRequest{
    UserName:string;
    Password:string
  }