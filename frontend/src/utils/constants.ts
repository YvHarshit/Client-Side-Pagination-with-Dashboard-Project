
export const TOTAL_LEAVE_ALLOWANCE = 24;
export const UPCOMING_HOLIDAYS = [
  { name: "Independence Day", date: "2026-08-15" },
  { name: "Gandhi Jayanti", date: "2026-10-02" },
  { name: "Diwali", date: "2026-11-08" },
];
export const ANNOUNCEMENTS = [
  { title: "Office closed for maintenance", message: "The office will be closed on 25th July for AC maintenance.", date: "2026-07-18" },
  { title: "New HR policy", message: "Updated leave policy is now live — check your email for details.", date: "2026-07-10" },
];





export enum DEPARTMENT {
  SDE = "SDE",
  AIML = "AI/ML",
  HR = "HR",
  TESTING = "Testing",
  OFFICE = "Office Staff",
}

export enum SKILLS {
  React = "React",
  TypeScript = "TypeScript",
  Node = "Node",
  Python = "Python",
  Design = "Design",
  CPP = "C++",
  Java = "Java",
  }

export enum GENDER {
  Male = "Male",
  Female = "Female",
}

export enum EXPERIENCE {
  ZeroToOneYears = "0-1 Years",
  OneToThreeYears = "1-3 Years",
  ThreeToFiveYears = "3-5 Years",
  FiveToSevenYears = "5-7 Years",
  SevenPlusYears = "7+ Years"
}


export enum LEAVE_TYPE {
  CASUAL = "Casual Leave",
  SICK = "Sick Leave",
  EMERGENCY = "Emergency Leave",
  WORK_FROM_HOME = "Work From Home",
  OTHER = "Other",
}

export const SKILL_COLORS = ["#A78BFA", "#86EFAC", "#38BDF8", "#FBBF24", "#F472B6"];