import type { StyleDictionary, TDocumentDefinitions } from 'pdfmake/interfaces'

import { headerSection } from './sections'
import { DateFormatter } from 'src/helpers'

interface ReportValues {
  employerName: string
  employerPosition: string
  employeeName: string
  employeePosition: string
  employeeStartDate: Date
  employeeHours: number
  employeeWorkShedule: string
  employerCompany: string
}

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

export const getEmploymentLetterById = (values: ReportValues): TDocumentDefinitions => {
  const docDefinition: TDocumentDefinitions = {
    styles,
    header: headerSection({ showLogo: true, showDate: true }),
    content: [
      { text: 'CONSTANCIA DE EMPLEO', style: 'header' },
      {
        text: `
          Yo, ${values.employerName}, en mi calidad de ${values.employerPosition} de ${values.employerCompany}, por medio de la presente certifico que ${values.employeeName} ha sido empleado en nuestra empresa desde el ${DateFormatter.getDDMMMMYYY(values.employeeStartDate)}. \n
          Durante su empleo, el Sr./Sra. ${values.employeeName} ha desempeñado el cargo de ${values.employeePosition}, demostrando responsabilidad, compromiso y habilidades profesionales en sus labores. \n
          La jornada laboral del Sr./Sra. ${values.employeeName} es de ${values.employeeHours} horas semanales, con un horario de ${values.employeeWorkShedule}, cumpliendo con las políticas y procedimientos establecidos por la empresa. \n
          Esta constancia se extiende a solicitud del interesado para los fines que considere pertinente.
        `,
        style: 'body'
      },
      { text: `Atentamente,`, style: 'signature' },
      { text: values.employerName, style: 'signature' },
      { text: values.employerPosition, style: 'signature' },
      { text: values.employerCompany, style: 'signature' },
      { text: DateFormatter.getDDMMMMYYY(new Date()), style: 'signature' }
    ],
    footer: {
      text: 'Este documento es una constancia de empleo y no representa un compromiso laboral.',
      style: 'footer'
    }
  }
  return docDefinition
}
