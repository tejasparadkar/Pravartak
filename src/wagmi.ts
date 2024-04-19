import { http, createConfig } from 'wagmi'
import { mainnet, sepolia , localhost, hardhat } from 'wagmi/chains'
import { coinbaseWallet, injected, metaMask, walletConnect } from 'wagmi/connectors'

export const config = createConfig({
  chains: [localhost],
  connectors: [
    injected(),
    // metaMask(),
    // coinbaseWallet({ appName: 'Create Wagmi' }),
    // walletConnect({ projectId: process.env.NEXT_PUBLIC_WC_PROJECT_ID }),
  ],
  ssr: true,
  transports: {
    // [mainnet.id]: http(),
    // [localhost.id]:http(),
    [localhost.id]:http()
  },
})


declare module 'wagmi' {
  interface Register {
    config: typeof config
  }
}
