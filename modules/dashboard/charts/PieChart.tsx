'use client'

import { 
  Chart as ChartJS, 
  ArcElement, 
  Tooltip, 
  Legend,
  ChartOptions
} from 'chart.js'
import { Pie } from 'react-chartjs-2'

ChartJS.register(ArcElement, Tooltip, Legend)

interface PieChartProps {
  labels: string[]
  datasets: {
    label: string
    data: number[]
    backgroundColor: string[]
    borderColor?: string[]
    borderWidth?: number
  }[]
  title?: string
  height?: number
}

export default function PieChart({ 
  labels, 
  datasets, 
  title, 
  height = 300 
}: PieChartProps) {
  const options: ChartOptions<'pie'> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'right',
        labels: {
          color: '#fff',
          font: {
            size: 11
          },
          padding: 15
        }
      },
      title: {
        display: !!title,
        text: title || '',
        color: '#fff',
        font: {
          size: 14,
          weight: 'normal'
        }
      },
      tooltip: {
        callbacks: {
          label: function(context) {
            const label = context.label || '';
            const value = context.raw || 0;
            const total = context.chart.data.datasets[0].data.reduce((a, b) => a + (b as number), 0);
            const percentage = Math.round(((value as number) / total) * 100);
            return `${label}: ${percentage}% (${value})`;
          }
        }
      }
    }
  }

  const data = {
    labels,
    datasets
  }

  return (
    <div style={{ height: `${height}px` }}>
      <Pie options={options} data={data} />
    </div>
  )
}