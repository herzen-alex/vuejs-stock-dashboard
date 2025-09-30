const sheetTickerMap: Record<string, string> = {
  AAPL: 'AAPL',
  AMZN: 'AMZN',
  GOOGL: 'GOOG',
  META: 'META',
  MSFT: 'MSFT',
  NVDA: 'NVDA',
  TSLA: 'TSLA'
}

const BASE_URL = 'https://sheetdb.io/api/v1/uuz1dgo37jao1?sheet='

export async function fetchStockData(symbol: string): Promise<Record<string,string>> {
  try {
    const cleanSymbol = symbol.replace(/^\$/, '')
    const sheetSymbol = sheetTickerMap[cleanSymbol] ?? cleanSymbol
    const res = await fetch(`${BASE_URL}$${sheetSymbol}`)
    const data = await res.json()
    return data[0] ?? {}
  } catch (error) {
    console.error('Error fetching stock data:', error)
    return {}
  }
}

export async function getOrder(symbol: string): Promise<string[]> {
  const row = await fetchStockData(symbol)
  return Object.keys(row)
}

export async function getRevenue(symbol: string): Promise<string[]> {
  const row = await fetchStockData(symbol)
  const order = Object.keys(row)
  return order.map(key => row[key] ?? '')
}
