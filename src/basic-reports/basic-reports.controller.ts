import { Controller, Get, Param, Res } from '@nestjs/common'
import { Response } from 'express'

import { BasicReportsService } from './basic-reports.service'

@Controller('basic-reports')
export class BasicReportsController {
  constructor(private readonly basicReportsService: BasicReportsService) {}

  @Get('employment-letter')
  employmentLetter(@Res() response: Response) {
    const pdfDoc = this.basicReportsService.employmentLetter()
    response.setHeader('Content-Type', 'application/pdf')
    pdfDoc.info.Title = 'demo'
    pdfDoc.pipe(response)
    pdfDoc.end()
  }

  @Get('employment-letter/:id')
  async employmentLetterById(@Res() response: Response, @Param('id') id: string) {
    const pdfDoc = await this.basicReportsService.employmentLetterById(+id)
    response.setHeader('Content-Type', 'application/pdf')
    pdfDoc.info.Title = 'demo 2'
    pdfDoc.pipe(response)
    pdfDoc.end()
  }
}
