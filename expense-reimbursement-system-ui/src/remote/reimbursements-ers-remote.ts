import { ersClient } from "./ers-client";
import { InternalServerError } from "../errors/InternalServerError";
import { Reimbursement } from "../models/Reimbursement";

//function to get all reimbursements
export const ersGetAllReimbursements = async () => {
  try {
    let response = await ersClient.get("/reimbursements");
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
//add functions for finding by status and user id
export const ersGetReimbursementsByStatus = async (statusId: number) => {
  try {
    let response = await ersClient.get(`/reimbursements/status/${statusId}`);
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

export const ersGetReimbursementsByUserId = async (userId: number) => {
  try {
    let response = await ersClient.get(
      `/reimbursements/author/userId/${userId}`
    );
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

//update reimbursement
export async function ersUpdateReimbursement(
  reimbursementId: number,
  author: number,
  amount: number,
  dateSubmitted: number,
  dateResolved: number,
  description: string,
  resolver: number,
  status: number,
  type: number
): Promise<Reimbursement> {
  let updateReimbursement = {
    reimbursementId,
    author,
    amount,
    dateSubmitted,
    dateResolved,
    description,
    resolver,
    status,
    type
  };
  try {
    let response = await ersClient.patch(
      "/reimbursements",
      updateReimbursement
    );
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

//submit reimbursement
export async function ersSubmitReimbursement(
  reimbursementId: number,
  author: number,
  amount: number,
  dateSubmitted: number,
  dateResolved: number,
  description: string,
  resolver: number,
  status: number,
  type: number
): Promise<Reimbursement> {
  let newReimbursement = {
    reimbursementId,
    author,
    amount,
    dateSubmitted,
    dateResolved,
    description,
    resolver,
    status,
    type
  };
  try {
    let response = await ersClient.post("/reimbursements/", newReimbursement);
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
