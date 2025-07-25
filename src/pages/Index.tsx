import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ConsumptionChart } from '@/components/dashboard/ConsumptionChart';
import { RecentEntriesTable } from '@/components/dashboard/RecentEntriesTable';
import { NewDoseModal } from '@/components/coffee/NewDoseModal';
import { useCoffeeEntries } from '@/hooks/useCoffeeEntries';
import { Coffee, Plus, TrendingUp } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const Index = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const { entries, recentEntries, chartData, loading, addEntry } = useCoffeeEntries();

  const todayEntries = entries.filter(entry => {
    const today = new Date().toISOString().split('T')[0];
    return entry.created_at.split('T')[0] === today;
  });

  const totalEntries = entries.length;
  const todayCount = todayEntries.length;

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-warm">
        <div className="text-center">
          <Coffee className="h-12 w-12 mx-auto animate-pulse text-primary mb-4" />
          <p className="text-muted-foreground">Carregando seu dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-warm">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-2 flex items-center gap-3">
              <Coffee className="h-8 w-8 text-primary" />
              Controle de Café
            </h1>
            <p className="text-muted-foreground">
              Acompanhe seu consumo diário de café com precisão
            </p>
          </div>
          <Button 
            onClick={() => setModalOpen(true)}
            size="lg"
            className="bg-gradient-coffee shadow-coffee hover:shadow-warm transition-all duration-300 mt-4 md:mt-0"
          >
            <Plus className="h-5 w-5 mr-2" />
            Nova Dose
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="shadow-warm">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">Hoje</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary">{todayCount}</div>
              <p className="text-xs text-muted-foreground">
                {todayCount === 1 ? 'dose registrada' : 'doses registradas'}
              </p>
            </CardContent>
          </Card>

          <Card className="shadow-warm">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">Total</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary">{totalEntries}</div>
              <p className="text-xs text-muted-foreground">
                {totalEntries === 1 ? 'dose no total' : 'doses no total'}
              </p>
            </CardContent>
          </Card>

          <Card className="shadow-warm">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">Média Diária</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary">
                {chartData.length > 0 
                  ? (chartData.reduce((sum, day) => sum + day.doses, 0) / chartData.filter(day => day.doses > 0).length || 0).toFixed(1)
                  : '0'
                }
              </div>
              <p className="text-xs text-muted-foreground">doses por dia</p>
            </CardContent>
          </Card>
        </div>

        {/* Chart and Table */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          <div className="xl:col-span-2">
            <ConsumptionChart data={chartData} />
          </div>
          <div className="xl:col-span-1">
            <RecentEntriesTable entries={recentEntries} />
          </div>
        </div>

        {/* Modal */}
        <NewDoseModal
          open={modalOpen}
          onOpenChange={setModalOpen}
          onSave={addEntry}
        />
      </div>
    </div>
  );
};

export default Index;
