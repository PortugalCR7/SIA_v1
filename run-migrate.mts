import { register } from 'node:module'
import { pathToFileURL } from 'node:url'

// Register tsconfig paths for @/ alias resolution
register('tsconfig-paths/register', pathToFileURL('./'))

const { getPayload } = await import('payload')
const { default: config } = await import('./payload.config.js')

const payload = await getPayload({ config })
await payload.db.createMigration({ payload, file: undefined, forceAcceptWarning: false })
console.log('Migration created successfully')
process.exit(0)
