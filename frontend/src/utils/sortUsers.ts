import type { Employee } from '../types/user.types'

// ASC by Department Name & if Department name is same the sort in DES by User's name

export const sortData = (employees: Employee[]): Employee[] => {
  return [...employees].sort((a, b) => {
    
    const departemtDiff = (a.department || '').localeCompare(b.department || '')
    
    if (departemtDiff !== 0) return departemtDiff

    
    return (b.name || '').localeCompare(a.name || '')
  })
}
