export const getYearSuffix = (yearsCount: number) => {
  switch (yearsCount % 10) {
    case 1:
      return 'год';
    case 2:
    case 3:
    case 4:
      return 'года';
    default:
      return 'лет';
  }
}