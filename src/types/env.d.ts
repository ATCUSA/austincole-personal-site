/// <reference types="astro/client" />
/// <reference types="@cloudflare/workers-types" />

declare namespace App {
  interface Locals {
    runtime?: {
      env?: {
        FROM_EMAIL?: string;
        TO_EMAIL?: string;
        CONTACT_EMAIL?: {
          send: (message: {
            from: string;
            to: string;
            subject: string;
            text?: string;
            html?: string;
          }) => Promise<void>;
        };
      };
      cf?: CfProperties;
      ctx?: ExecutionContext;
    };
  }
}