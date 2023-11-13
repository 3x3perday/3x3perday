export const http = {
  get(input: RequestInfo | URL, init?: RequestInit): Promise<Response> {
    return fetch(input, init);
  },
  post<P>(input: RequestInfo | URL, payload: P, init?: RequestInit): Promise<Response> {
    return fetch(input, {
      method: 'POST',
      headers: { 'content-Type': 'application/json' },
      body: JSON.stringify(payload),
      ...init
    });
  },
  patch<P>(input: RequestInfo | URL, payload: P, init?: RequestInit): Promise<Response> {
    return fetch(input, {
      method: 'PATCH',
      headers: { 'content-Type': 'application/json' },
      body: JSON.stringify(payload),
      ...init
    });
  },
  put<P>(input: RequestInfo | URL, payload: P, init?: RequestInit): Promise<Response> {
    return fetch(input, {
      method: 'PUT',
      headers: { 'content-Type': 'application/json' },
      body: JSON.stringify(payload),
      ...init
    });
  },
  delete(input: RequestInfo | URL, init?: RequestInit): Promise<Response> {
    return fetch(input, {
      method: 'DELETE',
      ...init
    });
  }
}
