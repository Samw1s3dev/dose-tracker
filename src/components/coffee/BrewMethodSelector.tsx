import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { CoffeeBrewMethod } from '@/types/coffee';

interface BrewMethodSelectorProps {
  selected: CoffeeBrewMethod | null;
  onSelect: (method: CoffeeBrewMethod) => void;
}

const brewMethods: { value: CoffeeBrewMethod; label: string }[] = [
  { value: 'coado', label: 'Coado' },
  { value: 'moka', label: 'Moka' },
  { value: 'prensa', label: 'Prensa Francesa' },
  { value: 'expresso', label: 'Expresso' },
  { value: 'aeropress', label: 'AeroPress' },
  { value: 'hario_v60', label: 'Hario V60' },
  { value: 'chemex', label: 'Chemex' },
  { value: 'sifão', label: 'Sifão' },
  { value: 'turco', label: 'Café Turco' },
];

export const BrewMethodSelector = ({ selected, onSelect }: BrewMethodSelectorProps) => {
  return (
    <Select value={selected || ''} onValueChange={(value) => onSelect(value as CoffeeBrewMethod)}>
      <SelectTrigger className="w-full">
        <SelectValue placeholder="Selecione o método de preparo" />
      </SelectTrigger>
      <SelectContent>
        {brewMethods.map((method) => (
          <SelectItem key={method.value} value={method.value}>
            {method.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};