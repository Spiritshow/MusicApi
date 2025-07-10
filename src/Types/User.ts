export interface IUser{
    id: number,
    username: string,
    password: string
}

export interface IJWTUser{
    id: number,
    username: string
}

export interface ISignUp{
    FIO: string,
    nickname: string,
    numberPhone: Number, 
    address: string, 
    email: string,
    birthday: Date,
    password: string
}

export interface IUserInfo{
    id: number,
    FIO: string,
    nickname: string,
    numberPhone: Number, 
    address: string, 
    email: string,
    birthday: Date,
}