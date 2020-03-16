import { ersClient } from "./ers-client";
import { InternalServerError } from "../errors/InternalServerError";
import { User } from "../models/User";
import { UserNotFoundError } from "../errors/UserNotFoundError";

//function to get all users
export const ersGetAllUsers = async () => {
  try {
    let response = await ersClient.get("/users");
    console.log(response);

    if (response.status === 200) {
      console.log(response.data);

      return response.data;
    } else {
      throw new InternalServerError();
    }
  } catch (e) {
    throw new InternalServerError();
  }
};

//function to get one user
export const ersGetUser = async (id: number) => {
  try {
    let response = await ersClient.get(`/users/${id}`);
    console.log(response);
    console.log(response.status);

    //check for 404s
    if (response.status === 200) {
      console.log(response.data);

      return response.data;
    } else {
      throw new InternalServerError();
    }
  } catch (e) {
    //console.log(e);

    if ((e.message = "Request failed with status code 404")) {
      //console.log("throw user e");

      throw new UserNotFoundError();
    } else {
      //console.log("throwing internal");

      throw new InternalServerError();
    }
  }
};

//function to update user
export async function ersUpdateUser(
  userId: number,
  username: string,
  firstName: string,
  lastName: string,
  email: string,
  role: number
): Promise<User> {
  let updateUser = {
    userId,
    username,
    firstName,
    lastName,
    email,
    role
  };
  try {
    let response = await ersClient.patch("/users", updateUser);
    console.log(response);
    //change to !== 200?
    // if (response.status === 400) {
    //   throw new BadCredentialsError();
    // }

    return response.data;
  } catch (e) {
    if (e.status === 400) {
      throw e;
    } else {
      throw new InternalServerError();
    }
  }
}
