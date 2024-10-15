import { Content, ContextPageSize } from 'pdfmake/interfaces'

export const footerSection = (currentPage: number, pageCount: number, pageSize: ContextPageSize): Content => {
  return {
    text: `${currentPage} de ${pageCount}`,
    alignment: 'center',
    fontSize: 10,
    margin: [0, 10, 0, 0],
    bold: true
  }
}
