const API_BASE_URL = 'http://localhost:3000';

interface ApiClientOptions extends RequestInit {
  headers?: HeadersInit;
}

export async function ApiClient(endpoint: string, options: ApiClientOptions, body) {
  const config: RequestInit = {
    method: 'GET',
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    body: body ? JSON.stringify(body) : undefined,
  };

  return fetch(`${API_BASE_URL}/${endpoint}`, config);
}
