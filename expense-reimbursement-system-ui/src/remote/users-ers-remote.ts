import { ersClient } from "./ers-client";
import { InternalServerError } from "../errors/InternalServerError";
import { User } from "../models/User";

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
export const ersGetUser = async (user: User) => {
  try {
    let response = await ersClient.get(`/users/${user.userId}`);
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
