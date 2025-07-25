import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartData } from '@/types/coffee';

interface ConsumptionChartProps {
  data: ChartData[];
}

export const ConsumptionChart = ({ data }: ConsumptionChartProps) => {
  return (
    <Card className="shadow-coffee">
      <CardHeader>
        <CardTitle className="text-xl font-semibold">Consumo dos Últimos 7 Dias</CardTitle>
        <CardDescription>Quantidade de doses de café por dia</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
              <XAxis 
                dataKey="date" 
                tick={{ fontSize: 12 }}
                tickFormatter={(value) => {
                try {
                  const date = new Date(value);
                  if (isNaN(date.getTime())) return value;
                  return `${String(date.getDate()).padStart(2, '0')}/${String(date.getMonth() + 1).padStart(2, '0')}`;
                   } catch (error) {
                  return value;
     }
  }}
              />
              <YAxis tick={{ fontSize: 12 }} />
              <Tooltip 
                labelFormatter={(value) => {
                  const date = new Date(value);
                  return date.toLocaleDateString('pt-BR');
                }}
                formatter={(value) => [`${value} doses`, 'Café']}
                contentStyle={{
                  backgroundColor: 'hsl(var(--card))',
                  border: '1px solid hsl(var(--border))',
                  borderRadius: '8px',
                }}
              />
              <Bar 
                dataKey="doses" 
                fill="hsl(var(--primary))"
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};