import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BatchForCreateUpdate } from '../components/batch-creator/batch-for-create-update';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root'
})
export class BatchesService extends BaseService {

  constructor(private http: HttpClient) {
    super();
  }

  public getAllBatches(): Observable<ArrayBuffer> {
    return this.http.get(this.getAPIUrl(`/batches/`), this.httpOptions);
  }

  public getUserBatches(userId: number): Observable<ArrayBuffer> {
    return this.http.get(this.getAPIUrl(`/batches/?user__id=${userId}`), this.httpOptions);
  }

  public getNotBottledBatches(): Observable<ArrayBuffer> {
    return this.http.get(this.getAPIUrl(`/batches/not_bottled/`), this.httpOptions);
  }

  public getBatch(id: number): Observable<ArrayBuffer> {
    return this.http.get(this.getAPIUrl(`/batches/${id}`), this.httpOptions);
  }

  public createBatch(newBatch: BatchForCreateUpdate): Observable<ArrayBuffer> {
    return this.http.post(this.getAPIUrl(`/batches/`), newBatch, this.httpOptions);
  }

  public updateBatch(id: number, batch: BatchForCreateUpdate): Observable<ArrayBuffer> {
    return this.http.put(this.getAPIUrl(`/batches/${id}/`), batch, this.httpOptions);
  }

  public deleteBatch(batchId: number): Observable<ArrayBuffer> {
    return this.http.delete(this.getAPIUrl(`/batches/${batchId}/`), this.httpOptions);
  }
}
