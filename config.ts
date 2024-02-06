export const REMOTE_CONFIG = {
  hostname: 'core.waldo.com',
  port: 443,
  protocol: 'https',
  path: '/wd/hub',
};

export function getRemoteBaseUrl() {
  return `${REMOTE_CONFIG.protocol}://${REMOTE_CONFIG.hostname}`;
}

export function getWdUrl(path: string) {
  return `${getRemoteBaseUrl()}${REMOTE_CONFIG.path ?? '/'}${path}`;
}
