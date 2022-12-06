export interface Root {
    id: number
    data: Teams[]
  }
  export interface Teams {
      id: number
      takim: string
      oynananMac: number
      beraberlik: number
      maglubiyet: number
      atilanGol:number
      yenilenGol:number
      avaraj: number
      puan: number
    }