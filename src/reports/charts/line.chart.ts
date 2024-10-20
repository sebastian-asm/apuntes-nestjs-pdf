import { Utils } from 'src/helpers'

export const generateLineChart = async (): Promise<string> => {
  const data = {
    labels: ['Day 1', 'Day 2', 'Day 3', 'Day 4', 'Day 5', 'Day 6'],
    datasets: [
      {
        label: 'Movimiento de inventario',
        data: Utils.numbers({ count: 6, min: -100, max: 100 }),
        borderColor: Utils.NAMED_COLORS.red,
        backgroundColor: Utils.transparentize(Utils.NAMED_COLORS.red, 0.5),
        pointStyle: 'circle',
        pointRadius: 5
      }
    ]
  }

  const config = { type: 'line', data }
  return Utils.chartJsToImage(config, { height: 200 })
}
