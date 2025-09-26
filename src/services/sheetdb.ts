
export const order = [
  "Mar 21","Jun 21","Sep 21","Dec 21","Mar 22","Jun 22",
  "Sep 22","Dec 22","Mar 23","3 Aug 23","2 Nov 23","1 Feb 24",
  "2 Mai 24","1 Aug 24","31 Oct 24","30 Jan 25","1 May 25","31 Jul 25"
]

const BASE_URL = 'https://sheetdb.io/api/v1/uuz1dgo37jao1?sheet='

export async function fetchStockData(symbol: string): Promise<Record<string,string>> {
  try {
    const res = await fetch(`${BASE_URL}${symbol}`)
    const data = await res.json()
    return data[3]
  } catch (error) {
    console.error('Error fetching stock data:', error)
    return {}
  }
}

export async function getRevenue(symbol: string): Promise<string[]> {
  const data = await fetchStockData(symbol)
  return order.map(key => data[key] ?? '')
}
