/// <reference types="astro/client" />
/// <reference types="@cloudflare/workers-types" />

declare namespace App {
  interface Locals {
    runtime: {
      env: {
        FROM_EMAIL: string;
        TO_EMAIL: string;
        CONTACT_EMAIL: SendEmail;
      };
      cf: CfProperties;
      ctx: ExecutionContext;
    };
  }
}