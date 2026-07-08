import type { Employee } from '../types/user.types'

export const searchedFilterEmployees = (employees: Employee[], search: string): Employee[] => {
  if (!search) return employees

  const searchList = employees.filter((emp) => 
    (emp.name).toLowerCase().includes(search.toLowerCase()))
  return searchList
}


export const getMostCommonDomain = (employees: Employee[]): string => {
  if (employees.length === 0) return '-'

  const domainCount: Record<string, number> = {} 
  employees.forEach(emp => {
    const parts = (emp.email).split('@')
    const domain = parts[1]

    if(domainCount[domain] === undefined)  
      domainCount[domain] = 1 ;
    else domainCount[domain] += 1 ;
  })
  let topDomain = '-'
  let topCount = 0

for (const domain in domainCount) {
  if (domainCount[domain] > topCount) {
    topCount = domainCount[domain];
    topDomain = domain;
  }
}
return topDomain;
}


export const countByDomain = (employees: Employee[], domain: string): number => {
  const domainList = employees.filter(emp => 
    (emp.email).endsWith('@' + domain))

    return domainList.length ;
}

export const countPerDepart = (employees: Employee[]): Record<string, number> => {
  const result: Record<string, number> = {}
  
  employees.forEach(emp => {
    if (!emp.department)  return 

    if(result[emp.department] === undefined) 
      result[emp.department] = 1 ;
    else result[emp.department] = result[emp.department] + 1 ;

  })
  return result
}
