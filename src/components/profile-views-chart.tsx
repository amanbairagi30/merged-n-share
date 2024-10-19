'use client';

import {
  Area,
  AreaChart,
  Bar,
  Tooltip,
  CartesianGrid,
  XAxis,
  YAxis,
} from 'recharts';

import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';
import { useEffect, useState } from 'react';
import { Button } from './ui/button';

const chartData = [
  { month: 'January', desktop: 186 },
  { month: 'February', desktop: 305 },
  { month: 'March', desktop: 237 },
  { month: 'April', desktop: 73 },
  { month: 'May', desktop: 209 },
  { month: 'June', desktop: 214 },
];
const chartConfig = {
  views: {
    label: 'Views',
    color: '#facc15',
  },
} satisfies ChartConfig;

export function ProfileChart() {
  const [viewsData, setViewsData] = useState<any[]>([]);
  const [range, setRange] = useState<'24h' | '7d' | '30d'>('7d');

  useEffect(() => {
    const fetchViewsData = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_URL}/api/analytics?range=${range}`,
        );
        if (!response.ok) throw new Error('Failed to fetch data');
        const data = await response.json();
        setViewsData(data);
      } catch (error) {
        console.error('Error fetching profile views:', error);
      }
    };

    fetchViewsData();
  }, [range]);

  const formatXAxis = (tickItem: string) => {
    const date = new Date(tickItem);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  return (
    <>
      <div className="mb-4 flex justify-end space-x-2">
        <Button
          variant={range === '24h' ? 'default' : 'outline'}
          onClick={() => setRange('24h')}
        >
          24h
        </Button>
        <Button
          variant={range === '7d' ? 'default' : 'outline'}
          onClick={() => setRange('7d')}
        >
          7d
        </Button>
        <Button
          variant={range === '30d' ? 'default' : 'outline'}
          onClick={() => setRange('30d')}
        >
          30d
        </Button>
      </div>
      <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
        <AreaChart
          data={viewsData}
          margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
        >
          <CartesianGrid className="opacity-40" vertical={false} />
          <XAxis dataKey="date" tickFormatter={formatXAxis} />
          <YAxis tickLine={false} axisLine={false} tickMargin={30} />
          <ChartTooltip content={<ChartTooltipContent />} />
          <Area
            type="linear"
            dataKey="views"
            stroke="#facc15"
            fill="#facc15"
            fillOpacity={0.3}
          />
        </AreaChart>
      </ChartContainer>
    </>
  );
}
