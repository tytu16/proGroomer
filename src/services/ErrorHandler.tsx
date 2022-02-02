export const errorHandler = (error: any) => {
    const { request, response } = error;
    if (response) {
      const { errMessage } = response.data;
      const status = response.status;
      console.log('in error handler');
      console.log(errMessage);
      console.log(status);
      return {
        errMessage,
        status,
      };
    } else if (request) {
      //request sent but no response received
      return {
        errMessage: "server time out",
        status: 503,
      };
    } else {
      // Something happened in setting up the request that triggered an Error
      return { errMessage: "opps! something went wrong while setting up request" };
    }
  };