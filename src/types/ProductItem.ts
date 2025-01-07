export interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
}

export interface Badge {
  type: string;
  color: string;
}

export interface ProductItem {
  id: number;
  image: string;
  title: string;
  price: string;
  timeLeft: TimeLeft;
  badge: Badge;
  liked: boolean;
}
