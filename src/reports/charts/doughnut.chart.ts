import { Utils } from 'src/helpers'

interface DoughnutEntry {
  label: string
  value: number
}

interface DoughnutOptions {
  entries: DoughnutEntry[]
  position?: 'left' | 'right' | 'top' | 'bottom'
}

export const generateDoughnutChart = (options: DoughnutOptions): Promise<string> => {
  const { entries, position = 'top' } = options
  const data = {
    labels: entries.map((entry) => entry.label),
    datasets: [
      {
        label: 'Dataset 1',
        data: entries.map((entry) => entry.value),
        backgroundColor: Object.values(Utils.NAMED_COLORS)
      }
    ]
  }

  const config = {
    type: 'doughnut',
    data,
    options: {
      legend: { position },
      plugins: {
        datalabels: {
          color: 'white',
          font: { weight: 'bold', size: 14 }
        }
      }
    }
  }
  return Utils.chartJsToImage(config)
}
