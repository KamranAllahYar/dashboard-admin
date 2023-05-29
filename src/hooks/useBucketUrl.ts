import { getAppEnvConfig } from '@/utils/env';

export function useBucketUrl() {
  const { VITE_GLOB_AWS_S3_URL } = getAppEnvConfig();

  function s3Url(url) {
    if (url) {
      if (url.includes('://')) {
        return url;
      }
      return `${VITE_GLOB_AWS_S3_URL}/${url}`;
    }
    return '';
  }

  return {
    s3Url,
  };
}
