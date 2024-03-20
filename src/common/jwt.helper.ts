/**
 * the JWT helper is responsible for sectioning JWTs into use cses
 * - BEARER - TO get access to services such as verify email, for, forgotten password protected routes
 * - RESET_BEARER= request fresh permission to access protected routes such as verify email, for, forgotten password
 * - ACCESS access ton user profile and sub routes
 * - REFRESH - renew access token
 */

import { sign, verify } from 'jsonwebtoken';

export enum JwtScope {
  REGISTER = 'register',
  EMAIL_VERIFICATION = 'email-verification',
  PASSWORD_RESET = 'password-reset',
  BEARER_TOKEN = 'bearer',
  RESET_BEARER_TOKEN = 'reset-bearer',
  ACCESS_TOKEN = 'access',
  REFRESH_TOKEN = 'reset-access',
}

// for type consistency in the JWT Interface
export interface JwtPayloadInterface {
  userId: string;
  userEmail: string;
  scope: JwtScope;
}

/**
 * @class JwtBuilder - constructs a new JWT, set validity to 5 minutes
 * @param userId - the user  Universal Unique Identifier [UUID], for example - 25b897a3-03ee-5b56-a29c-5719d7acb492
 * @param userEmail - the user email or business email
 * @param scope- the part of the application where the JWT is being used, scoping restrict user from using sign-up JWT as Login JWT
 * @param jwtPayload  - {userId, userEmail}
 * @param validity the JWT Validity, default to 5 minutes, the syntax mirrors the @npm/jsonwebtoken package syntax found here https://www.npmjs.com/package/jsonwebtoken
 */
export class JwtBuilder {
  private readonly userId: string;
  private readonly userEmail: string;
  private readonly scope: JwtScope;
  private readonly jwtPayload: JwtPayloadInterface;
  private readonly validity: string; // the JWT validity, default to 15 minutes
  // accept the user information and make a token
  constructor(
    { userId, userEmail, scope = JwtScope.BEARER_TOKEN }: JwtPayloadInterface,
    validity = '15m',
  ) {
    this.userId = userId.trim();
    this.userEmail = userEmail.trim();
    this.scope = scope;
    this.validity = validity;
    this.jwtPayload = {
      userEmail: this.userEmail,
      userId: this.userId,
      scope: this.scope,
    };
  }

  // generate new JWT context
  public gen(): string {
    // generate the token by signing the payload
    const jwt = sign(this.jwtPayload, process.env.JWT_SECRET, {
      expiresIn: this.validity,
    });

    return jwt;
  }
}

// a type to enforce decrypted data from the jwt
// this will help avoid potential name collision
export interface AuthorizedUserRequest extends Request {
  user?: JwtPayloadInterface;
}

// an interface to retrieve the bearer token form the request header
export interface AuthorizationHeader extends Request {
  Headers: {
    authorization?: string;
  };
}

// verify the  retrieve the user dat form the JWt
export function validateJwt(token: string): JwtPayloadInterface {
  //:TODO: handle the errors
  const userInfo = verify(token, process.env.JWT_SECRET);
  return userInfo as JwtPayloadInterface;
}
