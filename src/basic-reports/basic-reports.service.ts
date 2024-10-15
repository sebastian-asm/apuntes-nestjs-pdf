import { Injectable, Logger, NotFoundException, OnModuleInit } from '@nestjs/common'
import { PrismaClient } from '@prisma/client'

import { PrinterService } from 'src/printer/printer.service'
import { getEmploymentLetter, getEmploymentLetterById, countriesTableReport } from 'src/reports'

@Injectable()
export class BasicReportsService extends PrismaClient implements OnModuleInit {
  private readonly logger = new Logger('basic-reports')

  constructor(private readonly printerService: PrinterService) {
    super()
  }

  async onModuleInit() {
    await this.$connect()
    this.logger.log('✅ Connected to the database')
  }

  employmentLetter() {
    const docDefinition = getEmploymentLetter()
    return this.printerService.createPdf(docDefinition)
  }

  async employmentLetterById(id: number) {
    const employee = await this.employees.findFirst({ where: { id } })
    if (!employee) throw new NotFoundException(`Empleado no encontrado`)
    const docDefinition = getEmploymentLetterById({
      employerName: 'Sebastián Sánchez',
      employerPosition: 'Gerente de Capital Humano',
      employerCompany: 'TECO',
      employeeName: employee.name,
      employeePosition: employee.position,
      employeeStartDate: employee.start_date,
      employeeHours: employee.hours_per_day,
      employeeWorkShedule: employee.work_schedule
    })
    return this.printerService.createPdf(docDefinition)
  }

  async countriesReport() {
    const countries = await this.countries.findMany({
      where: { local_name: { not: null } }
    })
    const docDefinition = countriesTableReport({ countries })
    return this.printerService.createPdf(docDefinition)
  }
}
