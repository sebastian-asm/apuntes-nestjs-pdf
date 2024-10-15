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
  const headerLogo: Content = showLogo ? { image: 'src/assets/tucan-code-logo.png', width: 100, height: 100 } : null
  const headerDate: Content = showDate
    ? { text: DateFormatter.getDDMMMMYYY(new Date()), style: 'date', width: 150, margin: [0, 20, 0, 0] }
    : null
  const headerSubtitle: Content = subTitle
    ? {
        text: subTitle,
        alignment: 'center',
        margin: [0, 2, 0, 0],
        style: { bold: true, fontSize: 16 }
      }
    : null
  const headerTitle: Content = title
    ? {
        stack: [
          {
            text: title,
            alignment: 'center',
            margin: [0, 20, 0, 0],
            style: { bold: true, fontSize: 22 }
          },
          headerSubtitle
        ]
      }
    : null
  return { columns: [headerLogo, headerTitle, headerDate] }
}
