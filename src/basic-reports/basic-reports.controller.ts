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
    pdfDoc.info.Title = 'Reporte modelo'
    pdfDoc.pipe(response)
    pdfDoc.end()
  }

  @Get('employment-letter/:id')
  async employmentLetterById(@Res() response: Response, @Param('id') id: string) {
    const pdfDoc = await this.basicReportsService.employmentLetterById(+id)
    response.setHeader('Content-Type', 'application/pdf')
    pdfDoc.info.Title = 'Reporte por empleado'
    pdfDoc.pipe(response)
    pdfDoc.end()
  }

  @Get('countries')
  async countriesReport(@Res() response: Response) {
    const pdfDoc = await this.basicReportsService.countriesReport()
    response.setHeader('Content-Type', 'application/pdf')
    pdfDoc.info.Title = 'Reporte de paises'
    pdfDoc.pipe(response)
    pdfDoc.end()
  }
}
