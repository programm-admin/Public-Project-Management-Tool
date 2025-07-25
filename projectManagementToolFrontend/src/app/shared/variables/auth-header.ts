import { HttpHeaders } from '@angular/common/http';
import { LOCAL_STORAGE_USER_AUTH_TOKEN } from '../interfaces/CredentialsInterface';

const userToken: string =
  localStorage.getItem(LOCAL_STORAGE_USER_AUTH_TOKEN) ?? '';

export const USER_AUTH_HEADER = new HttpHeaders({
  'Content-Type': 'application/json',
  Authorization: `Bearer ${userToken}`,
});
