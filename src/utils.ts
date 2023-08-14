export function isDifferenceGreaterThanOneYear(date1: Date, date2: Date): boolean {
  const differenceInMilliseconds: number = Math.abs(date2.getTime() - date1.getTime())
  const differenceInYears: number = differenceInMilliseconds / (1000 * 60 * 60 * 24 * 365)
  return differenceInYears > 1
}
