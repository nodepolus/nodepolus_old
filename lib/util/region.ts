export class Region {
  name: string;
  address: string;
  port: number;
  failures: number = 0;

  constructor(name: string, address: string, port: number) {
    this.name = name;
    this.address = address;
    this.port = port;
  }
}
