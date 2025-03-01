import { withSentryConfig } from "@sentry/nextjs";

const sentryWebpackPluginOptions = {
  sourcemaps: {
    deleteSourcemapsAfterUpload: true, // Removes source maps after uploading
  },
};

export default withSentryConfig({}, sentryWebpackPluginOptions);
