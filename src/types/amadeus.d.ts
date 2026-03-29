declare module 'amadeus' {
  interface AmadeusEndpoint {
    get: (params?: Record<string, unknown>) => Promise<{ data: unknown[] }>;
    post: (params?: Record<string, unknown>) => Promise<{ data: unknown[] }>;
  }

  interface AmadeusNamespace {
    [key: string]: AmadeusEndpoint & AmadeusNamespace;
  }

  export default class Amadeus {
    constructor(config: {
      clientId: string;
      clientSecret: string;
      hostname?: string;
    });
    shopping: AmadeusNamespace;
    referenceData: AmadeusNamespace;
    analytics: AmadeusNamespace;
    travel: AmadeusNamespace;
    [key: string]: unknown;
  }

  export interface Client {
    shopping: AmadeusNamespace;
    referenceData: AmadeusNamespace;
    [key: string]: unknown;
  }
}
