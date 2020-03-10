import { User } from "../models/User";
import { BadCredentialsError } from "../errors/BadCredentialsError";
import { InternalServerError } from "../errors/InternalServerError";
import { ersClient } from "./ers-client";

export async function ersLogin(
  username: string,
  password: string
): Promise<User> {
  let credentials = {
    username,
    password
  };
  try {
    let response = await ersClient.post("/login", credentials);
    console.log(response);
    if (response.status === 400) {
      throw new BadCredentialsError();
    }

    return response.data;
  } catch (e) {
    if (e.status === 400) {
      throw e;
    } else {
      throw new InternalServerError();
    }
  }
}
