import { AxiosError } from "axios";

const getErrorMessage = (error: unknown) => {
  if (error instanceof AxiosError) {
    return error.response?.data?.message || error.message;
  }

  if (error instanceof Error) {
    return error.message;
  }
  return "An error occurred. Please try again later.";
};
export default getErrorMessage;
