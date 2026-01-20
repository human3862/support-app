import { withPayload } from '@payloadcms/next/withPayload'
import path from 'path'

/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config, { isServer: _isServer }) => {
    config.resolve.alias['@payload-config'] = path.join(
      process.cwd(),
      'src/payload/payload.config.ts',
    )

    config.resolve.extensionAlias = {
      '.cjs': ['.cts', '.cjs'],
      '.js': ['.ts', '.tsx', '.js', '.jsx'],
      '.mjs': ['.mts', '.mjs'],
    }

    return config
  },
}

export default withPayload(nextConfig, {
  devBundleServerPackages: false,
  configPath: './src/payload/payload.config.ts',
})
