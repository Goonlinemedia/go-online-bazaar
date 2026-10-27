import type { IncomingMessage, ServerResponse } from "http";

declare module "@vercel/node" {
  export type VercelRequestCookies = { [key: string]: string };
  export type VercelRequestQuery = { [key: string]: string | string[] };
  export type VercelRequestBody = any;

  export interface VercelRequest extends IncomingMessage {
    query: VercelRequestQuery;
    cookies: VercelRequestCookies;
    body: VercelRequestBody;
  }

  export interface VercelResponse extends ServerResponse {
    send: (body: any) => VercelResponse;
    json: (jsonBody: any) => VercelResponse;
    status: (statusCode: number) => VercelResponse;
    redirect: (statusOrUrl: string | number, url?: string) => VercelResponse;
  }
}
