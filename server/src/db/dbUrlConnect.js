import { getEnv } from '../utils/common'

export const uriConnection = `mongodb+srv://${getEnv('DB_USER_NAME')}:${getEnv(
  'DB_PASSWORD'
)}@cluster0.xtyfl.mongodb.net/${getEnv('DB_NAME')}?retryWrites=true&w=majority`

