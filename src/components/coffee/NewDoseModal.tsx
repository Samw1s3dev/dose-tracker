import { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { CoffeeQuantity, CoffeeRoast, CoffeeSpecies, CoffeeBrewMethod, NewCoffeeEntry } from '@/types/coffee';
import { QuantitySelector } from './QuantitySelector';
import { RoastSelector } from './RoastSelector';
import { SpeciesSelector } from './SpeciesSelector';
import { BrewMethodSelector } from './BrewMethodSelector';

interface NewDoseModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (entry: NewCoffeeEntry) => void;
}

export const NewDoseModal = ({ open, onOpenChange, onSave }: NewDoseModalProps) => {
  const [quantidade, setQuantidade] = useState<CoffeeQuantity | null>(null);
  const [torra, setTorra] = useState<CoffeeRoast | null>(null);
  const [especie, setEspecie] = useState<CoffeeSpecies | null>(null);
  const [especieCustomizada, setEspecieCustomizada] = useState('');
  const [preparo, setPreparo] = useState<CoffeeBrewMethod | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const { toast } = useToast();

  const resetForm = () => {
    setQuantidade(null);
    setTorra(null);
    setEspecie(null);
    setEspecieCustomizada('');
    setPreparo(null);
    setIsSubmitting(false);
  };

  const handleClose = () => {
    resetForm();
    onOpenChange(false);
  };

  const handleSubmit = async () => {
    if (!quantidade || !torra || !especie || !preparo) {
      toast({
        title: "Campos obrigatórios",
        description: "Por favor, preencha todos os campos obrigatórios.",
        variant: "destructive",
      });
      return;
    }

    if (especie === 'outros' && !especieCustomizada.trim()) {
      toast({
        title: "Espécie customizada obrigatória",
        description: "Por favor, especifique o tipo da espécie.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const newEntry: NewCoffeeEntry = {
        quantidade,
        torra,
        especie,
        preparo,
        ...(especie === 'outros' && { especie_customizada: especieCustomizada.trim() })
      };

      await onSave(newEntry);
      
      toast({
        title: "Dose registrada!",
        description: "Sua dose de café foi registrada com sucesso.",
      });
      
      handleClose();
    } catch (error) {
      toast({
        title: "Erro ao registrar",
        description: "Ocorreu um erro ao registrar a dose. Tente novamente.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const isFormValid = quantidade && torra && especie && preparo && 
    (especie !== 'outros' || especieCustomizada.trim());

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[500px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">Nova Dose de Café</DialogTitle>
          <DialogDescription>
            Registre sua nova dose de café com todos os detalhes
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-6 py-4">
          <div>
            <Label className="text-base font-medium mb-3 block">Quantidade *</Label>
            <QuantitySelector selected={quantidade} onSelect={setQuantidade} />
          </div>

          <div>
            <Label className="text-base font-medium mb-3 block">Tipo de Torra *</Label>
            <RoastSelector selected={torra} onSelect={setTorra} />
          </div>

          <div>
            <Label className="text-base font-medium mb-3 block">Espécie *</Label>
            <SpeciesSelector selected={especie} onSelect={setEspecie} />
            
            {especie === 'outros' && (
              <div className="mt-3">
                <Label htmlFor="custom-species" className="text-sm font-medium">
                  Especifique a espécie
                </Label>
                <Input
                  id="custom-species"
                  placeholder="Ex: Bourbon, Typica, etc."
                  value={especieCustomizada}
                  onChange={(e) => setEspecieCustomizada(e.target.value)}
                  maxLength={50}
                  className="mt-1"
                />
              </div>
            )}
          </div>

          <div>
            <Label className="text-base font-medium mb-3 block">Método de Preparo *</Label>
            <BrewMethodSelector selected={preparo} onSelect={setPreparo} />
          </div>
        </div>

        <div className="flex gap-3 pt-4">
          <Button 
            variant="outline" 
            onClick={handleClose}
            className="flex-1"
            disabled={isSubmitting}
          >
            Cancelar
          </Button>
          <Button 
            onClick={handleSubmit}
            className="flex-1"
            disabled={!isFormValid || isSubmitting}
          >
            {isSubmitting ? 'Registrando...' : 'Registrar Dose'}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};