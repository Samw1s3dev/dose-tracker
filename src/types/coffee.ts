export type CoffeeQuantity = 'pequena' | 'média' | 'grande';
export type CoffeeRoast = 'clara' | 'média' | 'escura';
export type CoffeeSpecies = 'arábica' | 'robusta' | 'outros';
export type CoffeeBrewMethod = 
  | 'coado' 
  | 'moka' 
  | 'prensa' 
  | 'expresso' 
  | 'aeropress' 
  | 'hario_v60' 
  | 'chemex' 
  | 'sifão' 
  | 'turco';

export interface CoffeeEntry {
  id: string;
  created_at: string;
  quantidade: CoffeeQuantity;
  torra: CoffeeRoast;
  especie: CoffeeSpecies;
  especie_customizada?: string;
  preparo: CoffeeBrewMethod;
}

export interface NewCoffeeEntry {
  quantidade: CoffeeQuantity;
  torra: CoffeeRoast;
  especie: CoffeeSpecies;
  especie_customizada?: string;
  preparo: CoffeeBrewMethod;
}

export interface ChartData {
  date: string;
  doses: number;
}