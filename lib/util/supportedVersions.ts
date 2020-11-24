import { ClientVersion } from "../packets/packetElements/clientVersion";

export const SupportedVersions: readonly ClientVersion[] = [
  new ClientVersion(2020, 9, 7, 0),
  new ClientVersion(2020, 10, 8, 0),
  new ClientVersion(2020, 11, 17, 0),
];
