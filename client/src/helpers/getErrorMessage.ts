const getErrorMessage = (error: unknown) => {
  if (error instanceof Error) {
    return error.message;
  }
  return "An error occurred. Please try again later.";
};
export default getErrorMessage;
