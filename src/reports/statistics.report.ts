import { TDocumentDefinitions } from 'pdfmake/interfaces'

import { generateDoughnutChart } from './charts/doughnut.chart'
import { footerSection, headerSection } from './sections'
import { generateLineChart } from './charts/line.chart'
import { generateBarsChart } from './charts/bars.chart'

interface TopCountry {
  country: string
  customers: number
}

interface ReportOptions {
  topCountries: TopCountry[]
}

export const getStatisticsReport = async (options: ReportOptions): Promise<TDocumentDefinitions> => {
  const { topCountries } = options
  const entries = topCountries.map(({ country, customers }) => ({ label: country, value: customers }))
  const [countryChart, lineChart, barChart1, barChart2] = await Promise.all([
    generateDoughnutChart({ entries, position: 'left' }),
    generateLineChart(),
    generateBarsChart(),
    generateBarsChart()
  ])

  return {
    pageMargins: [40, 100, 40, 60],
    header: headerSection({ title: 'Estadísticas de clientes' }),
    footer: footerSection,
    content: [
      {
        columns: [
          {
            stack: [
              {
                text: 'Top paises con más clientes',
                alignment: 'center',
                margin: [0, 0, 0, 15]
              },
              { image: countryChart, width: 350 }
            ]
          },
          {
            layout: 'lightHorizontalLines',
            width: 'auto',
            table: {
              headerRows: 1,
              widths: [100, 'auto'],
              body: [['País', 'Clientes'], ...topCountries.map(({ country, customers }) => [country, customers])]
            }
          }
        ]
      },
      {
        image: lineChart,
        width: 500,
        margin: [0, 20]
      },
      {
        columns: [
          {
            image: barChart1,
            width: 250
          },
          {
            image: barChart2,
            width: 250
          }
        ]
      }
    ]
  }
}
