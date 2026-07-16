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


//=============================================================================================================

// export const countByGender = (employees: Employee[]): Record<string, number> => {
//   const result: Record<string, number> = {}
  
//   employees.forEach(emp => {
//     if (!emp.gender) {
//       result[missingGender] = result[missingGender] + 1 ;
//     }

//     if(result[emp.gender] === undefined) 
//       result[emp.gender] = 1 ;
//     else result[emp.gender] = result[emp.gender] + 1 ;
//   })
//   return result
// }

export const countByGender = (employees: Employee[]): Record<string, number> => {
  const result: Record<string, number> = {};

  employees.forEach((emp) => {
    const genderKey = emp.gender?.trim() || 'Missing Gender';

    result[genderKey] = (result[genderKey] ?? 0) + 1;
  });

  return result;
};

export const departDistribution = (employees: Employee[]) : Record<string, number> => {
  const result : Record<string , number> = {} ;
  employees.forEach((emp) => {
    const departmentKey = emp.department?.trim() || "Mising Department" ;
    result[departmentKey] = (result[departmentKey] ?? 0) + 1 ;
  })
  return result ;
}

export const avgAge = (employees: Employee[]): number => {
  if (employees.length === 0) return 0;
  let ageSum = 0;
  employees.forEach((emp) => {
    ageSum += emp.age ?? 0;
  });
  return Math.floor(ageSum / employees.length);
};

export const salaryInfo = ( employees: Employee[]): [number, number, number] => {
  if (employees.length === 0)    return [0, 0, 0];

  let highestSalary = employees[0].salary;
  let lowestSalary = employees[0].salary;
  let totalSalary = 0;

  employees.forEach((emp) => {
    highestSalary = Math.max(highestSalary, emp.salary);
    lowestSalary = Math.min(lowestSalary, emp.salary);
    totalSalary += emp.salary;
  });
  const averageSalary = Math.floor(totalSalary / employees.length);
  return [highestSalary, lowestSalary, averageSalary];
};

export const ageInfo = (employees: Employee[]): [number, number, number, number] => {
  const validEmployees = employees.filter(
    (emp) => typeof emp.age === "number" && !isNaN(emp.age)
  );

  if (validEmployees.length === 0) return [0, 0, 0,0];

  let youngestEmp = validEmployees[0].age;
  let oldestEmp = validEmployees[0].age;
  let totalAge = 0;

  validEmployees.forEach((emp) => {
    youngestEmp = Math.min(youngestEmp, emp.age);
    oldestEmp = Math.max(oldestEmp, emp.age);
    totalAge += emp.age;
  });

  return [youngestEmp, oldestEmp, Math.floor(totalAge / validEmployees.length), validEmployees.length];
};


export const mailSummary = (employees: Employee[]): Record<string, number> => {
  const result: Record<string, number> = {};

  employees.forEach((emp) => {
    const domain = emp.email.split("@")[1];

    result[domain] = (result[domain] ?? 0) + 1;
  });
  return result;
};


export const skillsSummary = ( employees: Employee[]): Record<string, number> => {
  const result: Record<string, number> = {};

  employees.forEach((emp) => {
    emp.skills.forEach((skill) => {
      const skillName = skill.trim() || "No Skill";

      result[skillName] = (result[skillName] ?? 0) + 1;
    });
  });
  return result;
};