import { Injectable, NotFoundException, OnModuleInit } from '@nestjs/common'
import { PrismaClient } from '@prisma/client'

import { PrinterService } from 'src/printer/printer.service'
import { orderByIdReport } from 'src/reports'

@Injectable()
export class StoreReportsService extends PrismaClient implements OnModuleInit {
  constructor(private readonly printerService: PrinterService) {
    super()
  }

  async onModuleInit() {
    await this.$connect()
  }

  async orderReportById(id: number) {
    const order = await this.orders.findUnique({
      where: { order_id: id },
      include: {
        customers: true,
        order_details: { include: { products: true } }
      }
    })
    if (!order) throw new NotFoundException(`Orden #${id} no encontrada`)
    const docDefinition = orderByIdReport({ data: order as any })
    return this.printerService.createPdf(docDefinition)
  }
}
