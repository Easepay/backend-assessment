/**
 * email queue interface to force consistency in the email payload structure
 * @param emailSubject  the title of the email being sent, e.g "reset password",
 * @param recipient - the address to send the email to
 * @param emailTemplate - the template to parse and saturate with the data provided
 * @param data - the data to be used to saturate and parse a template
 */
export interface EmailQueuePayloadInterface {
  emailSubject: string;
  recipient: string;
  emailTemplate: EmailTemplateName;
  data?: object;
}

// email templates name
export enum EmailTemplateName {
  WELCOME = 'welcome',
  FORGOTTEN_PASSWORD = 'forgotten-password',
  PASSWORD_CHANGED = 'reset-password',
  VERIFY_EMAIL = 'verify-email',
  WAITLIST = 'waitlist',
  SALES = 'sales',
  NEWSLETTER = 'newsletter',
  ACCOUNT_VERIFIED = 'account-verified',
}
