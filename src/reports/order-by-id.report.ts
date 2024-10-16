import { StyleDictionary, TDocumentDefinitions } from 'pdfmake/interfaces'

import { CurrencyFormatted, DateFormatter } from 'src/helpers'
import { footerSection } from './sections'
import { CompleteOrder } from './interfaces/complete-order.interface'

interface ReportValues {
  data: CompleteOrder
}

const styles: StyleDictionary = {
  header: {
    fontSize: 18,
    bold: true,
    margin: [0, 5]
  }
}

export const orderByIdReport = ({ data }: ReportValues): TDocumentDefinitions => {
  const { customers, order_details, order_id, order_date } = data
  const subtotal = order_details.reduce((acc, order) => acc + order.quantity * +order.products.price, 0)
  const total = subtotal * 1.19

  return {
    styles,
    header: {
      image: 'src/assets/tucan-banner.png',
      width: 100,
      height: 30,
      margin: [10, 20]
    },
    footer: footerSection,
    pageMargins: [20, 60],
    content: [
      {
        text: 'Tucan Code',
        style: 'header'
      },
      {
        columns: [
          {
            text: `Avenida Siempreviva 742
            Springfield
            https://sebastiansanchez-dev.vercel.app`
          },
          {
            text: [
              { text: `Orden #${order_id}\n`, bold: true },
              `Fecha: ${DateFormatter.getDDMMMMYYY(order_date)}
              Pagar hasta: ${DateFormatter.getDDMMMMYYY(new Date())}`
            ],
            alignment: 'right'
          }
        ]
      },
      { qr: 'https://sebastiansanchez-dev.vercel.app', fit: 80, alignment: 'right', margin: [0, 10] },
      {
        text: [
          { text: 'Cobrar a:\n', bold: true },
          `Razón Social: ${customers.customer_name}
          Contacto: ${customers.contact_name}
          ${customers.address}, ${customers.city}, ${customers.country}`
        ]
      },
      {
        layout: 'headerLineOnly',
        margin: [0, 20],
        table: {
          headerRows: 1,
          widths: [50, '*', 'auto', 'auto', 'auto'],
          body: [
            ['ID', 'Descripción', 'Cantidad', 'Precio', 'Total'],
            ...order_details.map((order) => [
              order.order_id.toString(),
              order.products.product_name,
              order.quantity.toString(),
              CurrencyFormatted.formatter(+order.products.price),
              CurrencyFormatted.formatter(+order.products.price * order.quantity)
            ])
          ]
        }
      },
      {
        columns: [
          { width: '*', text: '' },
          {
            width: 'auto',
            layout: 'noBorders',
            table: {
              body: [
                ['Subtotal', { text: CurrencyFormatted.formatter(subtotal) }],
                [
                  { text: 'Total', bold: true },
                  { text: CurrencyFormatted.formatter(total), bold: true }
                ]
              ]
            }
          }
        ]
      }
    ]
  }
}
