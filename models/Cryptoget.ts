export type CryptoBalance = {
  symbol?: string
  holdings?: number
  price?: number
  total?: number
}

export type CryptoBalances = {
  [key: string]: CryptoBalance
}

export type BalanceTotalsResponse = {
  currencies: CryptoBalances
  total: number
}

export type GetBalanceQueryParams = {
  // ex. ETH: 1
  [key: string]: number
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
  NetHashesPerSecond?: number
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

export type ReducedCryptoListData = {
  fullName: string
  symbol: string
  totalCoinsMined: number
}

export type Cryptos = Array<ReducedCryptoListData>

export type BalancesRequest = {
  [index: string]: string
}
