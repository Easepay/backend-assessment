//WARNING! imports not working , use require for otp generator module
// import OtpGenerator from 'otp-generator';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const OtpGenerator = require('otp-generator');

export class OtpHandler {
  validity: number; //UUIX timestamp
  otp: string; // string
  // eslint-disable-next-line @typescript-eslint/no-inferrable-types
  constructor(validity: number = 5, otpLength = 6) {
    const now = new Date();
    const expiration: number = now.getTime() + validity * 60000;

    // generate the token
    const otp: string = OtpGenerator.generate(otpLength, {
      upperCaseAlphabets: false,
      specialChars: false,
      lowerCaseAlphabets: false,
    });

    this.validity = expiration;
    this.otp = otp;

    return {
      otp: this.otp,
      validity: this.validity,
    };
  }
}
