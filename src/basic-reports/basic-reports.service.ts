import { Injectable, Logger, OnModuleInit } from '@nestjs/common'
import { PrismaClient } from '@prisma/client'

@Injectable()
export class BasicReportsService extends PrismaClient implements OnModuleInit {
  private readonly logger = new Logger('basic-reports')

  async onModuleInit() {
    await this.$connect()
    this.logger.log('✅ Connected to the database')
  }

  async demo() {
    return this.employees.findMany()
  }
}
