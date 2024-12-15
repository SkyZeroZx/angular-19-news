import { GlobalCacheConfig } from 'ts-cacheable';
import { environment } from '../../../../environments/environment';

/**
 * Global configuration default in the http call in the services
 * configure in the environment file
 */
function httpCacheConfig() {
  GlobalCacheConfig.maxAge = environment.httpCache.maxAge;
  GlobalCacheConfig.maxCacheCount = environment.httpCache.maxCacheCount;
}

export function initHttpCache() {
  return () => httpCacheConfig();
}
