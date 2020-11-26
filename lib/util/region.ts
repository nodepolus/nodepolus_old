export class Region {
  name: string;
  address: string;
  port: number;

  constructor(name: string, address: string, port: number) {
    this.name = name;
    this.address = address;
    this.port = port;
  }
}
