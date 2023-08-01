class LocalCache {
  setCache(key: string, value: any) {
    localStorage.setItem(key, JSON.stringify(value))
  }
  getCache(key: string): string | null {
    return localStorage.getItem(key)
  }
  deleteCache(key: string) {
    localStorage.removeItem(key)
  }
  clearCache() {
    localStorage.clear()
  }
}
export default new LocalCache()
