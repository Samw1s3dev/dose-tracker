import { Button } from '@/components/ui/button';
import { CoffeeQuantity } from '@/types/coffee';
import { cn } from '@/lib/utils';

interface QuantitySelectorProps {
  selected: CoffeeQuantity | null;
  onSelect: (quantity: CoffeeQuantity) => void;
}

const quantities: { value: CoffeeQuantity; label: string; description: string }[] = [
  { value: 'pequena', label: 'Pequena', description: '~50ml' },
  { value: 'média', label: 'Média', description: '~150ml' },
  { value: 'grande', label: 'Grande', description: '~250ml' },
];

export const QuantitySelector = ({ selected, onSelect }: QuantitySelectorProps) => {
  return (
    <div className="grid grid-cols-3 gap-2">
      {quantities.map((quantity) => (
        <Button
          key={quantity.value}
          variant={selected === quantity.value ? 'default' : 'outline'}
          onClick={() => onSelect(quantity.value)}
          className={cn(
            'flex flex-col h-auto py-3 px-2 text-center',
            selected === quantity.value && 'bg-gradient-coffee'
          )}
        >
          <span className="font-medium">{quantity.label}</span>
          <span className="text-xs opacity-75">{quantity.description}</span>
        </Button>
      ))}
    </div>
  );
};