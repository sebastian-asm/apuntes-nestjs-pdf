import { Controller, Get, Param, Res } from '@nestjs/common'
import { Response } from 'express'

import { StoreReportsService } from './store-reports.service'

@Controller('store-reports')
export class StoreReportsController {
  constructor(private readonly storeReportsService: StoreReportsService) {}

  @Get('orders/:id')
  async getOrderReport(@Param('id') id: string, @Res() response: Response) {
    const pdfDoc = await this.storeReportsService.orderReportById(+id)
    response.setHeader('Content-Type', 'application/pdf')
    pdfDoc.info.Title = 'Reporte de orden'
    pdfDoc.pipe(response)
    pdfDoc.end()
  }
}
