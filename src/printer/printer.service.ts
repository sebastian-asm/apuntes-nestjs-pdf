import { Injectable } from '@nestjs/common'
import type { BufferOptions, TDocumentDefinitions } from 'pdfmake/interfaces'
import PdfPtinter from 'pdfmake'

const fonts = {
  Roboto: {
    normal: 'fonts/Roboto-Regular.ttf',
    bold: 'fonts/Roboto-Bold.ttf',
    italics: 'fonts/Roboto-Italic.ttf',
    bolditalics: 'fonts/Roboto-BoldItalic.ttf'
  }
}

@Injectable()
export class PrinterService {
  private printer = new PdfPtinter(fonts)

  createPdf(docDefinition: TDocumentDefinitions, options: BufferOptions = {}): PDFKit.PDFDocument {
    return this.printer.createPdfKitDocument(docDefinition, options)
  }
}
