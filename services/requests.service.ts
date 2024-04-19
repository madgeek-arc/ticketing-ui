/*
 * Copyright 2021-2024 OpenAIRE AMKE
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import {Injectable} from "@angular/core";
import {environment} from "../../environments/environment";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Ticket, TicketComment} from "../entities/ticket";

@Injectable()
export class RequestsService {
  base = environment.REQUESTS_ENDPOINT;
  // auth_token = getCookie('AccessToken');
  //
  // headers = new HttpHeaders({
  //   'Content-Type': 'application/json',
  //   'Authorization': `Bearer ${this.auth_token}`
  // });
  // requestOptions = { headers: this.headers };

  constructor(public http: HttpClient) {}

  getAllRequests() {
    return this.http.get<Ticket[]>(this.base + '/tickets');
  }

  getRequestById(requestId: string) {
    return this.http.get<Ticket>(this.base + `/tickets/${requestId}`);
  }

  createRequest(ticket: Ticket, token: string) {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
    let requestOptions = { headers: headers };

    return this.http.post<Ticket>(this.base + '/tickets', ticket, requestOptions);
  }

  editRequest(requestId: string, ticket: Ticket, token: string) {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
    let requestOptions = { headers: headers };
    return this.http.put<Ticket>(this.base + `/tickets/${requestId}`, ticket, requestOptions);
  }

  postComment(ticketId: string, comment: TicketComment) {
    return this.http.post<Ticket>(this.base + `/tickets/${ticketId}/comments`, comment);
  }
}
