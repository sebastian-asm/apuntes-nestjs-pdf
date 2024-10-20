import fs from 'fs'
import { Injectable } from '@nestjs/common'
import { TDocumentDefinitions } from 'pdfmake/interfaces'

import { PrinterService } from 'src/printer/printer.service'
import { generateHtmlToPdf } from 'src/helpers'
import { generateCommunityReport } from 'src/reports'

@Injectable()
export class ExtraReportsService {
  constructor(private readonly printerService: PrinterService) {}

  getHtmlReport() {
    const html = fs.readFileSync('src/reports/html/template.html', 'utf-8')
    const content = generateHtmlToPdf(html, { client: 'Belu Manrique' })
    const docDefinition: TDocumentDefinitions = { content }
    const doc = this.printerService.createPdf(docDefinition)
    return doc
  }

  getCommunityReport() {
    const docDefinition = generateCommunityReport()
    const doc = this.printerService.createPdf(docDefinition)
    return doc
  }

  getCustomSize() {
    const docDefinition: TDocumentDefinitions = {
      // indicar el tamaño de la hoja
      // pageSize: 'TABLOID',
      // tamaño personalizado
      pageSize: { width: 150, height: 200 },
      content: [
        {
          qr: 'https://google.com',
          fit: 100,
          alignment: 'center'
        }
      ]
    }
    const doc = this.printerService.createPdf(docDefinition)
    return doc
  }
}
