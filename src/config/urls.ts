import { readEnv } from './envs'

export const QUERY_NODE_GRAPHQL_URL = readEnv('QUERY_NODE_URL')
export const QUERY_NODE_GRAPHQL_SUBSCRIPTION_URL = readEnv('QUERY_NODE_SUBSCRIPTION_URL')
export const ORION_GRAPHQL_URL = readEnv('ORION_URL')
export const NODE_URL = readEnv('NODE_URL')
export const FAUCET_URL = readEnv('FAUCET_URL')

export const SENTRY_DSN = readEnv('SENTRY_DSN', false)

export const WEB3_APP_NAME = 'Joystream Atlas'
export const STORAGE_URL_PATH = 'asset/v0'
