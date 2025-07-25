import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { Observable } from 'rxjs';
import { FileForProject } from '../../shared/interfaces/FileForProject';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BACKEND_URL } from '../../shared/variables/backend';
import { isPlatformBrowser } from '@angular/common';
import { LOCAL_STORAGE_USER_AUTH_TOKEN } from '../../shared/interfaces/CredentialsInterface';

@Injectable({
  providedIn: 'root',
})
export class FileService {
  constructor(
    private http: HttpClient,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  getFileNamesForProject = (
    projectID: string,
    accountID: string
  ): Observable<FileForProject[]> => {
    let token: string = '';

    if (isPlatformBrowser(this.platformId)) {
      token = localStorage.getItem(LOCAL_STORAGE_USER_AUTH_TOKEN) ?? '';
    }

    const headers = new HttpHeaders().set('Authorization', `Bearer: ${token}`);

    return this.http.post<FileForProject[]>(
      `${BACKEND_URL}/file/files`,
      {
        projectID,
        accountID,
      },
      {
        headers,
      }
    );
  };

  uploadFiles = (
    filesForUpload: File[],
    projectID: string,
    accountID: string
  ): Observable<string> => {
    let token: string = '';

    if (isPlatformBrowser(this.platformId)) {
      token = localStorage.getItem(LOCAL_STORAGE_USER_AUTH_TOKEN) ?? '';
    }

    const headers = new HttpHeaders().set('Authorization', `Bearer: ${token}`);

    const formData = new FormData();

    Object.entries(filesForUpload).forEach((fileArray) => {
      formData.append(
        'files',
        fileArray[1],
        `${projectID}----${encodeURIComponent(fileArray[1].name)}`
      );
    });

    Object.values(filesForUpload).forEach((file: File) => {
      formData.append('fileNames', encodeURIComponent(file.name));
    });

    formData.append('projectID', projectID);
    formData.append('accountID', accountID);

    return this.http.post<string>(
      `${BACKEND_URL}/file/multiple-files`,
      formData,
      {
        headers,
      }
    );
  };

  uploadFile = (
    filesForUpload: File[],
    projectID: string,
    accountID: string
  ): Observable<string> => {
    // uploading a single file
    let token: string = '';

    if (isPlatformBrowser(this.platformId)) {
      token = localStorage.getItem(LOCAL_STORAGE_USER_AUTH_TOKEN) ?? '';
    }

    const headers = new HttpHeaders().set('Authorization', `Bearer: ${token}`);

    const formData = new FormData();

    Object.entries(filesForUpload).forEach((fileArray) => {
      formData.append(
        'files',
        fileArray[1],
        `${projectID}----${encodeURIComponent(fileArray[1].name)}`
      );
    });

    Object.values(filesForUpload).forEach((file: File) => {
      formData.append('fileNames', encodeURIComponent(file.name));
    });

    formData.append('projectID', projectID);
    formData.append('accountID', accountID);

    return this.http.post<string>(`${BACKEND_URL}/file/single-file`, formData, {
      headers,
    });
  };

  downloadFile = (fileName: string): Observable<Blob> => {
    let token: string = '';

    if (isPlatformBrowser(this.platformId)) {
      token = localStorage.getItem(LOCAL_STORAGE_USER_AUTH_TOKEN) ?? '';
    }

    const headers = new HttpHeaders()
      .set('Authorization', `Bearer: ${token}`)
      .set('responseType', 'blob');

    return this.http.get(
      `http://localhost:8000/file/download?fileName=${encodeURIComponent(
        fileName
      )}`,
      {
        responseType: 'blob',
      }
    );
  };
}
