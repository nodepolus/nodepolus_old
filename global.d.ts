declare module "udp-proxy" {
  export interface UDPProxyOptions {
    address: string,
    port: number,
    ipv6: boolean,
    localaddress: string,
    localport: number,
    localipv6: boolean,
    proxyaddress: string,
    timeOutTime: number
  }

  export type MessageHandler = (message: unknown, senderRaw: unknown) => void
  export type ProxyMessageHandler = (message: unknown, sender: unknown, peer: unknown) => void

  export interface UDPProxyServer {
    on(event: 'message', MessageHandler): this
    on(event: 'proxyMsg', ProxyMessagehandler): this
  }

  function createServer(options: UDPProxyOptions): UDPProxyServer
}
