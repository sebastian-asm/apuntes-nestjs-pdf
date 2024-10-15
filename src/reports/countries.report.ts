import { TDocumentDefinitions } from 'pdfmake/interfaces'
import { countries as Country } from '@prisma/client'

import { headerSection, footerSection } from './sections'

interface ReportOptions {
  title?: string
  subtitle?: string
  countries: Country[]
}

export const countriesTableReport = (options: ReportOptions): TDocumentDefinitions => {
  const { title, subtitle, countries } = options
  return {
    pageOrientation: 'landscape',
    header: headerSection({
      title: title ?? 'Reporte de paises',
      subTitle: subtitle ?? 'Listado general'
    }),
    footer: footerSection,
    pageMargins: [40, 120, 40, 60],
    content: [
      {
        layout: 'theme01',
        table: {
          headerRows: 1,
          widths: [50, 50, 50, '*', 'auto', '*'],
          body: [
            ['ID', 'ISO2', 'ISO3', 'Nombre', 'Continente', 'Nombre Local'],
            ...countries.map((country) => [
              country.id.toString(),
              country.iso2,
              country.iso3,
              { text: country.name, bold: true },
              country.continent,
              country.local_name
            ]),
            ['', '', '', '', 'Total países', `${countries.length}`]
          ]
        }
      }
    ]
  }
}
