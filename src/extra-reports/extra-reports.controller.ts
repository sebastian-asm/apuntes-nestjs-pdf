import { Controller, Get, Res } from '@nestjs/common'
import { Response } from 'express'

import { ExtraReportsService } from './extra-reports.service'

@Controller('extra-reports')
export class ExtraReportsController {
  constructor(private readonly extraReportsService: ExtraReportsService) {}

  @Get('html-report')
  htmlToPdf(@Res() response: Response) {
    const pdfDoc = this.extraReportsService.getHtmlReport()
    response.setHeader('Content-Type', 'application/pdf')
    pdfDoc.info.Title = 'html-report'
    pdfDoc.pipe(response)
    pdfDoc.end()
  }

  @Get('community-report')
  communityReport(@Res() response: Response) {
    const pdfDoc = this.extraReportsService.getCommunityReport()
    response.setHeader('Content-Type', 'application/pdf')
    pdfDoc.info.Title = 'html-report'
    pdfDoc.pipe(response)
    pdfDoc.end()
  }

  @Get('custom-size')
  customSize(@Res() response: Response) {
    const pdfDoc = this.extraReportsService.getCustomSize()
    response.setHeader('Content-Type', 'application/pdf')
    pdfDoc.info.Title = 'html-report'
    pdfDoc.pipe(response)
    pdfDoc.end()
  }
}
