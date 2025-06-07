export interface Skip {
  id: string;
  size: number;
  hirePeriod: number;
  price: number;
  imageUrl: string;
  allowedOnRoad: boolean;
}

export interface SkipResponse {
  skips: Skip[];
} 