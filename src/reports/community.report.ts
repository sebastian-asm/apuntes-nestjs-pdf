import { TDocumentDefinitions } from 'pdfmake/interfaces'

export const generateCommunityReport = (): TDocumentDefinitions => {
  return {
    defaultStyle: { fontSize: 10 },
    content: [
      {
        columns: [
          { image: 'src/assets/tucan-code-logo.png', width: 50 },
          {
            text: 'Forest Admin Community SAP\n RUT: 11.222.333-5\n Camino Montaña KM 14',
            alignment: 'center'
          },
          {
            layout: 'borderBlue',
            alignment: 'right',
            width: 140,
            table: {
              body: [
                [
                  {
                    layout: 'noBorders',
                    table: {
                      body: [
                        ['Orden', '12345'],
                        ['Fecha', '01-01-2024'],
                        ['Versión', '2024-00123']
                      ]
                    }
                  }
                ]
              ]
            }
          }
        ]
      },
      {
        margin: [0, 10],
        canvas: [
          {
            type: 'line',
            x1: 0,
            y1: 5,
            x2: 515,
            y2: 5,
            lineWidth: 2,
            lineColor: '#3a4546'
          }
        ]
      },
      {
        table: {
          // auto: se ajusta al tamaño del contenido
          // * toma el espacio restante
          widths: ['auto', '*', 'auto', '*'],
          body: [
            [
              {
                text: 'Datos del cliente',
                fillColor: '#5775e1',
                color: 'white',
                colSpan: 4
                // border: [false, false, false, false]
              },
              {},
              {},
              {}
            ],
            [
              {
                text: 'Razón social',
                fillColor: '#343a40',
                color: 'white',
                bold: true
              },
              {
                text: 'Nombre de la empresa',
                fillColor: 'white'
              },
              {
                text: 'Dirección',
                fillColor: '#343a40',
                color: 'white',
                bold: true
              },
              {
                text: 'Calle falsa 1234',
                fillColor: 'white'
              }
            ],
            [
              {
                text: 'RUT',
                fillColor: '#343a40',
                color: 'white',
                bold: true
              },
              {
                text: '22.222.555-9',
                fillColor: 'white'
              },
              {
                text: 'Teléfono',
                fillColor: '#343a40',
                color: 'white',
                bold: true
              },
              {
                text: '+56 9 1234 5678',
                fillColor: 'white'
              }
            ]
          ]
        }
      }
    ]
  }
}
