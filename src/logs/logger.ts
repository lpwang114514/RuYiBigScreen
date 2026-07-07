type LogMeta = Record<string, unknown>
type LogMethod = (message: string, meta?: LogMeta) => void

function write(level: 'info' | 'warn' | 'error' | 'debug', message: string, meta?: LogMeta) {
  if (import.meta.env.PROD && level === 'debug') {
    return
  }

  const payload = meta ? [message, meta] : [message]
  console[level](`[RuyiBigScreen] ${level.toUpperCase()}`, ...payload)
}

export const logger: Record<'info' | 'warn' | 'error' | 'debug', LogMethod> = {
  info: (message, meta) => write('info', message, meta),
  warn: (message, meta) => write('warn', message, meta),
  error: (message, meta) => write('error', message, meta),
  debug: (message, meta) => write('debug', message, meta),
}
