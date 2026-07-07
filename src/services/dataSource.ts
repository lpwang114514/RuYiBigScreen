export type DataSource = 'mock' | 'api'

export function getDataSource(): DataSource {
  const source = import.meta.env.VITE_DATA_SOURCE

  return source === 'api' ? 'api' : 'mock'
}
