export function formatarMl(ml: number): string{
  if(ml >= 1000) return (ml / 1000).toString() + "L";
  else return ml.toString() + "mL"
}
