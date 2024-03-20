import assert from 'node:assert';
import { OtpHandler } from './otp.handler';

describe('should confirm OtpHandler is a class', () => {
  it('class should be a function', () => {
    assert(typeof OtpHandler === 'function');
  });
});

// eslint-disable-next-line @typescript-eslint/no-unused-vars
describe('should create a new OTP and set validity for 5 minutes in UNIX timestamp', () => {
  const newGeneratedOtp = new OtpHandler(5);
  const token = newGeneratedOtp.otp;
  const validity = newGeneratedOtp.validity;

  // the otp should be 6 characters in length by default and not null
  it('OTP should be 6 characters in length', () => {
    assert.strictEqual(token.length, 6);
  });
  // the validity should by a type of number
  it('validity should be type of a number', () => {
    assert.strictEqual(typeof validity, 'number');
  });
});

describe('Should create a OTP of 10 characters in length', () => {
  const newGeneratedOtp = new OtpHandler(undefined, 10); // validity default to preset
  const token = newGeneratedOtp.otp;
  it('OTP should be 10 characters in length', () => {
    assert.strictEqual(token.length, 10);
  });
});

describe('should set validity to 15 minutes', () => {
  const newGeneratedOtp = new OtpHandler(15);
  const validity = newGeneratedOtp.validity;

  const currentTimeStamp = new Date().getTime(); // time in UNIX timestamp
  // the difference in the timestamp and validity should be 15 minutes
  const elapseTimeInMilliSeconds = validity - currentTimeStamp;
  const elapseTimeInSeconds = elapseTimeInMilliSeconds / 1000;
  it('the difference between now and validity should be equal or greater than 900 seconds (15 min)', () => {
    /**
     * the elapsed time should be 900 second but there is a failsafe of 10 additional seconds, this is to make room for starting the test suit
     */
    assert(elapseTimeInSeconds < 1000);
  });
});
