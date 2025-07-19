import { BetaAnalyticsDataClient } from "@google-analytics/data";

// Declare a variable to hold the client instance, allowing it to be globally accessible
// within the server context.
let analyticsDataClient: BetaAnalyticsDataClient | undefined;

// This function securely parses your credentials from environment variables.
// It's recommended to store the entire JSON as a string in one variable.
function getClientCredentials() {
  if (!process.env.GOOGLE_APPLICATION_CREDENTIALS_JSON) {
    throw new Error(
      "Environment variable GOOGLE_APPLICATION_CREDENTIALS_JSON is not set."
    );
  }
  return JSON.parse(process.env.GOOGLE_APPLICATION_CREDENTIALS_JSON);
}

// Function to get (or initialize) the GA4 Data API client
export function getAnalyticsDataClient(): BetaAnalyticsDataClient {
  if (!analyticsDataClient) {
    const credentials = getClientCredentials();
    analyticsDataClient = new BetaAnalyticsDataClient({
      credentials: {
        client_email: credentials.client_email,
        private_key: credentials.private_key,
      },
    });
  }
  return analyticsDataClient;
}

// Also export the GA4_PROPERTY_ID, as it's needed for API calls.
export const GA4_PROPERTY_ID = process.env.GA4_PROPERTY_ID;
