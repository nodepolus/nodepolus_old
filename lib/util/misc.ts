import { RemoteInfo } from "dgram";

/**
 * @description Converts a RemoteInfo object to a string for client management.
 * @see RemoteInfo
 */
export function addr2str(value: RemoteInfo) {
  return `${value.address}:${value.port}`;
}
