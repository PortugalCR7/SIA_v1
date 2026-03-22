/**
 * Shim: @next/env 15.x bundles with __esModule:true but exports no .default property.
 * When Payload's loadEnv.js (ESM) is transpiled by tsx to CJS, the import:
 *   import nextEnvImport from '@next/env'
 * becomes:
 *   const import_env = __toESM(require('@next/env'))  // __toESM sees __esModule:true → returns as-is
 *   const nextEnvImport = import_env.default           // undefined → crash
 *
 * This preload patches the require cache BEFORE tsx processes Payload's loadEnv.js,
 * injecting a .default getter that returns the module itself, so destructuring works.
 *
 * Upstream issue: https://github.com/payloadcms/payload (loadEnv.js default import pattern)
 * Remove this shim once Payload switches to a named import: import { loadEnvConfig } from '@next/env'
 */
const m = require('@next/env');
if (m.__esModule && m.default === undefined) {
  Object.defineProperty(m, 'default', { get: () => m, configurable: true, enumerable: false });
}
