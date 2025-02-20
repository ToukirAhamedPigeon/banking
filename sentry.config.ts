import { withSentryConfig } from "@sentry/nextjs";

const sentryWebpackPluginOptions = {
  sourcemaps: {
    deleteSourcemapsAfterUpload: true, // Deletes source maps after upload
  },
};

export default withSentryConfig({}, sentryWebpackPluginOptions);
