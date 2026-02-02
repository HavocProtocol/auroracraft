import { Rank } from './types';

export const SERVER_IP = "auroracraft.playghosting.com";
export const DISCORD_LINK = "https://discord.gg/aF6GYxj68x";
// The webhook URL allows the website to send transaction screenshots to your Discord channel.
export const DISCORD_WEBHOOK_URL = "https://discord.com/api/webhooks/1467915979819319307/spWqPB2Rt4v6JhkZWvY0CmDvebMXNYpLvlJJOTc-lzvMv-D6bNJhN8dwPotDyDIpJJab"; 

export const RANKS: Rank[] = [
  {
    id: 'rank_0',
    name: 'Space Cadet',
    price: 0,
    description: 'Every astronaut starts somewhere. Welcome to the fleet.',
    features: ['Prefix [Cadet]', '1 Set Home', 'Wooden Kit', 'Land Claiming Access'],
    color: 'text-gray-500',
    icon: '🧑‍🚀'
  },
  {
    id: 'rank_1',
    name: 'Asteroid Miner',
    price: 100,
    description: 'Start your cosmic journey with essential tools.',
    features: ['Prefix [Miner]', '2 Set Homes', '/workbench command', '1000 Claim Blocks'],
    color: 'text-gray-400',
    icon: '🪨'
  },
  {
    id: 'rank_2',
    name: 'Comet Rider',
    price: 200,
    description: 'Speed through the galaxy with enhanced travel.',
    features: ['Prefix [Rider]', '4 Set Homes', '/speed command', 'Keep XP on Death', 'Iron Kit'],
    color: 'text-cyan-400',
    icon: '☄️'
  },
  {
    id: 'rank_3',
    name: 'Moon Walker',
    price: 350,
    description: 'Low gravity jumps and lunar exploration gear.',
    features: ['Prefix [Moon]', '6 Set Homes', '/jump command', 'No Fall Damage', 'Gold Kit'],
    color: 'text-indigo-300',
    icon: '🌑'
  },
  {
    id: 'rank_4',
    name: 'Nebula Explorer',
    price: 600,
    description: 'Stand out with custom cosmic particles.',
    features: ['Prefix [Nebula]', '8 Set Homes', 'Cosmic Wings Particles', '/hat command', 'Diamond Kit'],
    color: 'text-purple-400',
    icon: '🌌'
  },
  {
    id: 'rank_5',
    name: 'Galaxy Guardian',
    price: 1000,
    description: 'Help maintain peace across the star systems.',
    features: ['Prefix [Guardian]', '12 Set Homes', 'Priority Queue', '/fly (Lobby)', 'Netherite Kit'],
    color: 'text-green-400',
    icon: '🛡️'
  },
  {
    id: 'rank_6',
    name: 'Black Hole Overlord',
    price: 1500,
    description: 'Ultimate power and command over the void.',
    features: ['Prefix [Overlord]', 'Unlimited Homes', 'Custom Login Message', '/glow command', 'God Kit'],
    color: 'text-red-500',
    icon: '🕳️'
  }
];

export const RANK_KEYS: Rank[] = [
  {
    id: 'key_miner',
    name: 'Miner Key',
    price: 50,
    originalPrice: 100,
    description: 'Opens the Miner Crate. Chance to win the rank!',
    features: ['1x Miner Key', 'Win Miner Rank', 'Resources & Money'],
    color: 'text-gray-400',
    icon: '🗝️'
  },
  {
    id: 'key_rider',
    name: 'Rider Key',
    price: 100,
    originalPrice: 200,
    description: 'Opens the Rider Crate. Chance to win the rank!',
    features: ['1x Rider Key', 'Win Rider Rank', 'Iron Spawners'],
    color: 'text-cyan-400',
    icon: '🗝️'
  },
  {
    id: 'key_moon',
    name: 'Moon Key',
    price: 175,
    originalPrice: 350,
    description: 'Opens the Moon Crate. Chance to win the rank!',
    features: ['1x Moon Key', 'Win Moon Rank', 'Gold Spawners'],
    color: 'text-indigo-300',
    icon: '🗝️'
  },
  {
    id: 'key_nebula',
    name: 'Nebula Key',
    price: 300,
    originalPrice: 600,
    description: 'Opens the Nebula Crate. Chance to win the rank!',
    features: ['1x Nebula Key', 'Win Nebula Rank', 'Diamond Spawners'],
    color: 'text-purple-400',
    icon: '🗝️'
  },
  {
    id: 'key_guardian',
    name: 'Guardian Key',
    price: 500,
    originalPrice: 1000,
    description: 'Opens the Guardian Crate. Chance to win the rank!',
    features: ['1x Guardian Key', 'Win Guardian Rank', 'Netherite Gear'],
    color: 'text-green-400',
    icon: '🗝️'
  },
  {
    id: 'key_overlord',
    name: 'Overlord Key',
    price: 750,
    originalPrice: 1500,
    description: 'Opens the Overlord Crate. Chance to win the rank!',
    features: ['1x Overlord Key', 'Win Overlord Rank', 'God Items'],
    color: 'text-red-500',
    icon: '🗝️'
  }
];

export const GAME_KITS: Rank[] = [
  {
    id: 'kit_iron',
    name: 'Iron Kit',
    price: 40,
    description: 'Reliable gear for the prepared survivor.',
    features: ['Full Iron Armor', 'Iron Tools', 'Food & Torches', 'Shield'],
    color: 'text-gray-300',
    icon: '🛡️'
  },
  {
    id: 'kit_gold',
    name: 'Gold Kit',
    price: 60,
    description: 'Enchanted golden gear for special occasions.',
    features: ['Full Gold Armor', 'Gold Tools', 'Golden Apples', 'XP Bottles'],
    color: 'text-yellow-300',
    icon: '👑'
  },
  {
    id: 'kit_diamond',
    name: 'Diamond Kit',
    price: 100,
    description: 'High durability equipment for deep exploration.',
    features: ['Full Diamond Armor', 'Diamond Tools', 'Enchanted Book', 'Ender Pearls'],
    color: 'text-cyan-300',
    icon: '💎'
  },
  {
    id: 'kit_netherite',
    name: 'Netherite Kit',
    price: 180,
    description: 'Fire-resistant gear from the nether depths.',
    features: ['Full Netherite Armor', 'Netherite Tools', 'Fire Res Potion', 'Totem of Undying'],
    color: 'text-emerald-400',
    icon: '🔥'
  },
  {
    id: 'kit_god',
    name: 'God Kit',
    price: 350,
    description: 'The ultimate loadout for commanding the server.',
    features: ['Prot IV Netherite Armor', 'Sharp V Sword', 'Eff V Pickaxe', 'Notch Apple'],
    color: 'text-red-500',
    icon: '⚡'
  }
];

export const GAME_ITEMS: Rank[] = [
  {
    id: 'item_elytra',
    name: 'Ultra Elytra',
    price: 25,
    description: 'Soar through the skies without limits.',
    features: ['Unbreakable', 'Custom Trail', 'Infinite Flight'],
    color: 'text-pink-400',
    icon: '🪽'
  },
  {
    id: 'item_sword',
    name: 'God Slayer',
    price: 25,
    description: 'A Netherite Sword forged in the core of a star.',
    features: ['Sharpness X', 'Unbreaking III', 'Fire Aspect II'],
    color: 'text-red-600',
    icon: '⚔️'
  },
  {
    id: 'item_pickaxe',
    name: 'Drill Pickaxe',
    price: 25,
    description: 'Melt through stone like a hot knife through butter.',
    features: ['Efficiency X', 'Fortune V', 'Auto-Smelt'],
    color: 'text-yellow-500',
    icon: '⛏️'
  }
];
