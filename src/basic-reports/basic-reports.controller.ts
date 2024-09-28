import { Controller, Get } from '@nestjs/common'

import { BasicReportsService } from './basic-reports.service'

@Controller('basic-reports')
export class BasicReportsController {
  constructor(private readonly basicReportsService: BasicReportsService) {}

  @Get()
  async demo() {
    return this.basicReportsService.demo()
  }
}
