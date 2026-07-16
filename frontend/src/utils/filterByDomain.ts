import type { Employee } from "../types/user.types";

export const filterByEmailDomain = (emp : Employee[], selectedDomain :string): Employee[] => {
    if(selectedDomain === "all") return emp ;
    const filterList = emp.filter((e) => e.email.endsWith(`@${selectedDomain}`) );
    return filterList ;
}


