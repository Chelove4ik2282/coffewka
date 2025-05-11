import path from 'path'
import { readFile } from 'fs/promises'

const USERS_FILE = path.join(process.cwd(), 'data', 'users.json')

export async function findUser(email: string) {
  try {
    const data = await readFile(USERS_FILE, 'utf-8')
    const users = JSON.parse(data)
    return users.find((user: any) => user.email === email)
  } catch {
    return null
  }
}
