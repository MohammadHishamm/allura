import { userModel } from "../modules/userModel";
import bcrypt from "bcrypt";
import dotenv from "dotenv";

dotenv.config();

interface RegisterParams {
    username: string;
    email: string;
    password: string;
    plan: string;
    createdAt: Date;
    isAdmin: boolean;
}

interface LoginParams {
  email: string;
  password: string;
}

export const register = async (registerData: RegisterParams) => {
  try{
      const findUser = await userModel.findOne({ email: registerData.email });

  if (findUser) {
    return { data: { message: "User already exists" }, statusCode: 400 };
  }

  const newUser = new userModel(registerData);
  newUser.password = await bcrypt.hash(newUser.password, 10);
  await newUser.save();
  return {data : newUser, statusCode: 200};

  }catch(err){
    return {data: "Internal Server Error", statusCode: 500};
  }
};


export const login = async (loginData: LoginParams) => {
  try{
    const findUser = await userModel.findOne({ email: loginData.email });

  if (!findUser) {
    throw {data: "User not found",statusCode: 404};
  }

  const isMatch = await bcrypt.compare(loginData.password, findUser.password);
  if (!isMatch) {
    throw {data: "Invalid credentials",statusCode: 401};
  }

  return {data: findUser, statusCode: 200};

  }catch(err){
    return {data: "Internal Server Error", statusCode: 500};
  } 
}
