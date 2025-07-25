import { Button } from '@/components/ui/button';
import { CoffeeRoast } from '@/types/coffee';
import { cn } from '@/lib/utils';

interface RoastSelectorProps {
  selected: CoffeeRoast | null;
  onSelect: (roast: CoffeeRoast) => void;
}

const roasts: { value: CoffeeRoast; label: string; color: string }[] = [
  { value: 'clara', label: 'Clara', color: 'bg-amber-200' },
  { value: 'média', label: 'Média', color: 'bg-amber-600' },
  { value: 'escura', label: 'Escura', color: 'bg-amber-900' },
];

export const RoastSelector = ({ selected, onSelect }: RoastSelectorProps) => {
  return (
    <div className="grid grid-cols-3 gap-2">
      {roasts.map((roast) => (
        <Button
          key={roast.value}
          variant={selected === roast.value ? 'default' : 'outline'}
          onClick={() => onSelect(roast.value)}
          className={cn(
            'flex items-center gap-2 h-auto py-3',
            selected === roast.value && 'bg-gradient-coffee'
          )}
        >
          <div className={cn('w-3 h-3 rounded-full', roast.color)} />
          <span className="font-medium">{roast.label}</span>
        </Button>
      ))}
    </div>
  );
};