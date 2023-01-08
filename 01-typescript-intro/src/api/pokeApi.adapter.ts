import axios from "axios";

export class PokeApiFetchAdapter {
  async get<T>(url: string): Promise<T> {
    const resp = await fetch(url);
    const data = resp.json();

    return data as T;
  }
}

export class PokeApiAdapter {
  private readonly axios = axios;

  async get<T>(url: string): Promise<T> {
    const { data } = await this.axios.get<T>(url);

    return data;
  }

  async post(url: string, data: any) {
    return;
  }

  async patch(url: string, data: any) {
    return;
  }

  async delete(url: string) {
    return;
  }
}
