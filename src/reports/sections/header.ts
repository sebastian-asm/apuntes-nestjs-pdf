import type { Content } from 'pdfmake/interfaces'

import { DateFormatter } from 'src/helpers'

interface HeaderOptions {
  title?: string
  subTitle?: string
  showLogo?: boolean
  showDate?: boolean
}

export const headerSection = (options: HeaderOptions): Content => {
  const { title, subTitle, showLogo = true, showDate = true } = options
  const logo: Content = showLogo ? { image: 'src/assets/tucan-code-logo.png', width: 100, height: 100 } : null
  const date: Content = showDate ? { text: DateFormatter.getDDMMMMYYY(new Date()), style: 'date' } : null
  return { columns: [logo, date] }
}
