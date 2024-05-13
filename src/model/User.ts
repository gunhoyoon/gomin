export interface User {
  uid: string;
  email?: string;
  phoneNumber?: string;
  emailVerified: boolean;
  displayName?: string;
  photoURL?: string;
  disabled: boolean;
  metadata: {
    creationTime?: string;
    lastSignInTime?: string;
  };
  customClaims?: { [key: string]: any };
}
