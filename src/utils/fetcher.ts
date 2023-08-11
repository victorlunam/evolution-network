const formatQuery = (url: string, objectParams?: Record<string, string>) => {
  if (!objectParams) return url;

  const query = new URLSearchParams(objectParams);
  return `${url}?${query.toString()}`;
};

const getHeaders = (
  objectHeaders?: Record<string, string>,
  defaultHeaders?: Record<string, string>,
) => {
  const initialHeaders = {
    ...(defaultHeaders ?? {}),
    ...(objectHeaders ?? {}),
  };

  const headers = new Headers(initialHeaders);
  return headers;
};

type FetcherConfig = Omit<RequestInit, "method" | "headers " | "body"> & {
  params?: Record<string, string>;
  headers?: Record<string, string>;
  data?: Record<string, unknown>;
};

class Fetcher {
  config: RequestInit;
  baseUrl: string;

  constructor(url: string) {
    this.config = {};
    this.baseUrl = url;
  }

  setConfig(config: RequestInit) {
    this.config = {
      ...this.config,
      ...config,
    };
  }

  get(url: string, config?: Omit<FetcherConfig, "data">) {
    const { params, headers } = config ?? {};

    return fetch(formatQuery(`${this.baseUrl}/${url}`, params), {
      ...this.config,
      ...config,
      method: "get",
      headers: getHeaders(headers),
    })
      .then((res) => res.json())
      .catch(console.error);
  }

  post(url: string, config?: FetcherConfig) {
    const { params, headers, data } = config ?? {};

    return fetch(formatQuery(`${this.baseUrl}/${url}`, params), {
      ...this.config,
      ...config,
      method: "post",
      headers: getHeaders(headers, {
        "Content-Type": "application/json",
      }),
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .catch(console.error);
  }

  put(url: string, config?: FetcherConfig) {
    const { params, headers, data } = config ?? {};

    return fetch(formatQuery(`${this.baseUrl}/${url}`, params), {
      ...this.config,
      ...config,
      method: "put",
      headers: getHeaders(headers, {
        "Content-Type": "application",
      }),
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .catch(console.error);
  }

  delete(url: string, config?: FetcherConfig) {
    const { params, headers } = config ?? {};

    return fetch(formatQuery(`${this.baseUrl}/${url}`, params), {
      ...this.config,
      ...config,
      method: "delete",
      headers: getHeaders(headers),
    })
      .then((res) => res.json())
      .catch(console.error);
  }
}
const fetcher = new Fetcher("http://localhost:8000");

export default fetcher;
