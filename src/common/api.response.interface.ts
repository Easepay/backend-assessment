/**
 * the Api response status could be
 * - success - everything went well
 * - error -  something bad happened
 */
export enum ResponseStatus {
  ERROR = 'error',
  SUCCESS = 'success',
  DUPLICATE = 'duplicate',
}

/**
 * @type ApiResponseInterface
 * the Interface let us return a consistent APi to the client
 * #Example
 * {
 * message:"user successfully created",
 * status:"success",
 * data:{
 * verificationToken :"76c094d1-958b-5552-9c67-643cf37c9e92"2e29b487-59bb-5f5e-951d-fa5195bd5981
 * }
 * }
 */
export interface ApiResponseInterface {
  message: string;
  status: ResponseStatus;
  data: object;
  error?: any;
}
