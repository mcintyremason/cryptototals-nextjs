export type Crypto = {
  symbol?: string
  holdings?: number
  price?: number
  total?: number
}

export type CryptoWithToken = {
  [key: string]: Crypto
}

export type BalanceTotalsResponse = {
  currencies: CryptoWithToken
  total: number
}

export type CryptoListData = {
  Id: string
  Url: string
  ImageUrl: string
  ContentCreatedOn: number
  Name: string
  Symbol: string
  CoinName: string
  FullName: string
  Description: string
  AssetTokenStatus: string
  Algorithm: string
  ProofType: string
  SortOrder: string
  Sponsored: boolean
  Taxonomy: {
    Access: string
    FCA: string
    FINMA: string
    Industry: string
    CollateralizedAsset: string
    CollateralizedAssetType: string
    CollateralType: string
    CollateralInfo: string
  }
  Rating: {
    Weiss: {
      Rating: string
      TechnologyAdoptionRating: string
      MarketPerformanceRating: string
    }
  }
  IsTrading: boolean
  TotalCoinsMined: number
  CirculatingSupply: number
  BlockNumber: number
  NetHashesPerSecond: null
  BlockReward: number
  BlockTime: number
  AssetLaunchDate: string
  AssetWhitepaperUrl: string
  AssetWebsiteUrl: string
  MaxSupply: number
  MktCapPenalty: number
  IsUsedInDefi: number
  IsUsedInNft: number
  PlatformType: string
  AlgorithmType: string
  Difficulty: number
}

export type CryptoDataWithKey = {
  [key: string]: CryptoListData
}

export type ReducedCryptoListData = {
  fullName: string
  symbol: string
  totalCoinsMined: number
}
