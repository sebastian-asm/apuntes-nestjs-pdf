import { JSDOM } from 'jsdom'
import htmlToPdfmake from 'html-to-pdfmake'

interface ContentReplacer {
  [key: string]: string
}

export const generateHtmlToPdf = (html: string, replacers: ContentReplacer = {}) => {
  const { window } = new JSDOM()
  Object.entries(replacers).forEach(([key, value]) => {
    const k1 = `{{ ${key} }}`
    const k2 = `{{${key}}}`
    html = html.replaceAll(k1, value).replaceAll(k2, value)
  })
  return htmlToPdfmake(html, { window })
}
