import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { CoffeeEntry } from '@/types/coffee';
import { Coffee } from 'lucide-react';

interface RecentEntriesTableProps {
  entries: CoffeeEntry[];
}

const quantityLabels = {
  pequena: 'Pequena',
  média: 'Média',
  grande: 'Grande'
};

const roastLabels = {
  clara: 'Clara',
  média: 'Média',
  escura: 'Escura'
};

const speciesLabels = {
  arábica: 'Arábica',
  robusta: 'Robusta',
  outros: 'Outros'
};

const brewMethodLabels = {
  coado: 'Coado',
  moka: 'Moka',
  prensa: 'Prensa Francesa',
  expresso: 'Expresso',
  aeropress: 'AeroPress',
  hario_v60: 'Hario V60',
  chemex: 'Chemex',
  sifão: 'Sifão',
  turco: 'Café Turco'
};

export const RecentEntriesTable = ({ entries }: RecentEntriesTableProps) => {
  if (entries.length === 0) {
    return (
      <Card className="shadow-coffee">
        <CardHeader>
          <CardTitle className="text-xl font-semibold flex items-center gap-2">
            <Coffee className="h-5 w-5" />
            Últimas Doses
          </CardTitle>
          <CardDescription>Suas 5 últimas doses de café registradas</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8">
            <Coffee className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
            <p className="text-muted-foreground">Nenhuma dose registrada ainda</p>
            <p className="text-sm text-muted-foreground mt-2">Comece registrando sua primeira dose!</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="shadow-coffee">
      <CardHeader>
        <CardTitle className="text-xl font-semibold flex items-center gap-2">
          <Coffee className="h-5 w-5" />
          Últimas Doses
        </CardTitle>
        <CardDescription>Suas 5 últimas doses de café registradas</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Data/Hora</TableHead>
              <TableHead>Quantidade</TableHead>
              <TableHead>Torra</TableHead>
              <TableHead>Espécie</TableHead>
              <TableHead>Preparo</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {entries.map((entry) => (
              <TableRow key={entry.id}>
                <TableCell className="font-medium">
                  {new Date(entry.created_at).toLocaleString('pt-BR', {
                    day: '2-digit',
                    month: '2-digit',
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
                </TableCell>
                <TableCell>
                  <Badge variant="secondary">
                    {quantityLabels[entry.quantidade]}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Badge variant="outline">
                    {roastLabels[entry.torra]}
                  </Badge>
                </TableCell>
                <TableCell>
                  {entry.especie === 'outros' && entry.especie_customizada 
                    ? entry.especie_customizada 
                    : speciesLabels[entry.especie]
                  }
                </TableCell>
                <TableCell>
                  {brewMethodLabels[entry.preparo]}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};