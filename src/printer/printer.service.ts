import { Injectable } from '@nestjs/common'
import type { BufferOptions, CustomTableLayout, TDocumentDefinitions } from 'pdfmake/interfaces'
import PdfPtinter from 'pdfmake'

const fonts = {
  Roboto: {
    normal: 'fonts/Roboto-Regular.ttf',
    bold: 'fonts/Roboto-Bold.ttf',
    italics: 'fonts/Roboto-Italic.ttf',
    bolditalics: 'fonts/Roboto-BoldItalic.ttf'
  }
}

const tableLayouts: Record<string, CustomTableLayout> = {
  theme01: {
    hLineWidth: (i, node) => {
      if (i === 0 || i === node.table.body.length) return 0
      return i === node.table.headerRows ? 2 : 1
    },
    vLineWidth: () => 0,
    hLineColor: (i) => (i === 1 ? 'black' : '#aaa'),
    paddingLeft: (i) => (i === 0 ? 0 : 8),
    paddingRight: (i, node) => (i === node.table.widths.length - 1 ? 0 : 8),
    fillColor: (i) => {
      if (i === 0) return '#7b90be'
      return i % 2 === 0 ? '#f3f3f3' : null
    }
  },
  borderBlue: {
    hLineColor: () => '#5f96d4',
    vLineColor: () => '#5f96d4'
  }
}

@Injectable()
export class PrinterService {
  private printer = new PdfPtinter(fonts)

  createPdf(
    docDefinition: TDocumentDefinitions,
    options: BufferOptions = {
      // habilitando el layout de la tabla a nivel global
      tableLayouts
    }
  ): PDFKit.PDFDocument {
    return this.printer.createPdfKitDocument(docDefinition, options)
  }
}
