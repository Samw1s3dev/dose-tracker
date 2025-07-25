import { Button } from '@/components/ui/button';
import { CoffeeSpecies } from '@/types/coffee';
import { cn } from '@/lib/utils';

interface SpeciesSelectorProps {
  selected: CoffeeSpecies | null;
  onSelect: (species: CoffeeSpecies) => void;
}

const species: { value: CoffeeSpecies; label: string; description: string }[] = [
  { value: 'arábica', label: 'Arábica', description: 'Suave e aromático' },
  { value: 'robusta', label: 'Robusta', description: 'Forte e encorpado' },
  { value: 'outros', label: 'Outros', description: 'Variedade específica' },
];

export const SpeciesSelector = ({ selected, onSelect }: SpeciesSelectorProps) => {
  return (
    <div className="grid grid-cols-3 gap-2">
      {species.map((specie) => (
        <Button
          key={specie.value}
          variant={selected === specie.value ? 'default' : 'outline'}
          onClick={() => onSelect(specie.value)}
          className={cn(
            'flex flex-col h-auto py-3 px-2 text-center',
            selected === specie.value && 'bg-gradient-coffee'
          )}
        >
          <span className="font-medium">{specie.label}</span>
          <span className="text-xs opacity-75">{specie.description}</span>
        </Button>
      ))}
    </div>
  );
};