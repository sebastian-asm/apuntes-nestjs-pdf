import type { StyleDictionary, TDocumentDefinitions } from 'pdfmake/interfaces'

import { headerSection } from './sections'

const styles: StyleDictionary = {
  header: {
    fontSize: 22,
    bold: true,
    alignment: 'center',
    margin: [0, 80, 0, 20]
  },
  body: { margin: [0, 0, 0, 50] },
  signature: { bold: true },
  date: {
    alignment: 'right',
    margin: [0, 20, 20, 0]
  },
  footer: {
    alignment: 'center',
    italics: true,
    fontSize: 10
  }
}

export const getEmploymentLetter = (): TDocumentDefinitions => {
  const docDefinition: TDocumentDefinitions = {
    styles,
    header: headerSection({ showLogo: true, showDate: true }),
    content: [
      { text: 'CONSTANCIA DE EMPLEO', style: 'header' },
      {
        text: `
          Yo, [Nombre del Empleador], en mi calidad de [Cargo del Empleador] de [Nombre de la Empresa], por medio de la presente certifico que [Nombre del Empleado] ha sido empleado en nuestra empresa desde el [Fecha de Inicio del Empleado]. \n
          Durante su empleo, el Sr./Sra. [Nombre del Empleado] ha desempeñado el cargo de [Cargo del Empleado], demostrando responsabilidad, compromiso y habilidades profesionales en sus labores. \n
          La jornada laboral del Sr./Sra. [Nombre del Empleado] es de [Número de Horas] horas semanales, con un horario de [Horario de Trabajo], cumpliendo con las políticas y procedimientos establecidos por la empresa. \n
          Esta constancia se extiende a solicitud del interesado para los fines que considere pertinente.
        `,
        style: 'body'
      },
      { text: `Atentamente,`, style: 'signature' },
      { text: `[Nombre del empleador]`, style: 'signature' },
      { text: `[Cargo del empleador]`, style: 'signature' },
      { text: `[Nombre de la empresa]`, style: 'signature' },
      { text: `[Fecha de emisión]`, style: 'signature' }
    ],
    footer: {
      text: 'Este documento es una constancia de empleo y no representa un compromiso laboral.',
      style: 'footer'
    }
  }
  return docDefinition
}
