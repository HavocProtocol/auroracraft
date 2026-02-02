export interface Rank {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  description: string;
  features: string[];
  color: string;
  icon: string;
}

export interface ServerStatusData {
  online: boolean;
  players?: {
    online: number;
    max: number;
  };
  motd?: {
    clean: string[];
  };
  version?: string;
}

export type Page = 'home' | 'rules' | 'privacy' | 'terms' | 'cart' | 'checkout';