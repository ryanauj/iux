import type { HttpHandler } from 'msw'
import { todoHandlers } from '../demos/todo/handlers'

export const handlers: HttpHandler[] = [...todoHandlers]
