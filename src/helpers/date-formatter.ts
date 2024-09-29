export class DateFormatter {
  static getDDMMMMYYY(date: Date): string {
    const formatter = new Intl.DateTimeFormat('es-Es', {
      year: 'numeric',
      month: 'long',
      day: '2-digit'
    })
    return formatter.format(date)
  }
}
