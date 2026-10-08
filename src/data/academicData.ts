import studentPortraitUrl from '../assets/images/student_tadhuba_samilu_portrait_1791431677439.jpg';

export interface CourseUnitRecord {
  id: string;
  code: string;
  title: string;
  category: 'Core Practical' | 'Systems & Networking' | 'Analytical & General';
  creditUnits: number;
  test1: number; // out of 15
  practicalLab: number; // out of 15
  assignment: number; // out of 10
  examScore: number; // out of 60
  lecturer: string;
  labVenue: string;
  practicalProject: string;
  competencySummary: string;
}

export interface GradeComputation {
  courseworkTotal: number; // out of 40
  examTotal: number; // out of 60
  finalMark: number; // out of 100
  letterGrade: string;
  gradePoint: number; // out of 5.0
  weightedPoints: number;
  remark: string;
  isPassed: boolean;
}

export interface StudentProfile {
  fullName: string;
  regNumber: string;
  studentNumber: string;
  examIndexNo: string;
  email: string;
  programme: string;
  department: string;
  academicYear: string;
  yearOfStudy: string;
  semester: string;
  intake: 'AUG / SEPT' | 'JAN / FEB' | 'MAY / JUNE';
  studySession: string;
  issueDate: string;
  verificationCode: string;
  portraitUrl: string;
}

export const INITIAL_STUDENT_PROFILE: StudentProfile = {
  fullName: 'TADHUBA SAMILU',
  regNumber: 'GIT/2026/0842',
  studentNumber: 'GIT/2026/0842',
  examIndexNo: 'UCPC/DIT/2026/0842',
  email: 'samilutads28@gmail.com',
  programme: 'Diploma in Information Technology',
  department: 'Computer Science Department',
  academicYear: '2025/2026',
  yearOfStudy: 'Year 1',
  semester: 'Semester 1',
  intake: 'AUG / SEPT',
  studySession: 'Day Programme (Hands-On)',
  issueDate: '08 October 2026',
  verificationCode: 'GIIT-MAK-2026-Y1S1-842TS',
  portraitUrl: studentPortraitUrl,
};

// Default scores perfectly aligned to Tadhuba's average-marks reference copy summing up to 395 / 600
export const INITIAL_SEM1_COURSES: CourseUnitRecord[] = [
  {
    id: 'tdit-111',
    code: 'TDIT 111',
    title: 'Introduction to Information and Communication Technology',
    category: 'Analytical & General',
    creditUnits: 3,
    test1: 9,
    practicalLab: 9,
    assignment: 7, // coursework: 25
    examScore: 40, // final: 65% (Grade C, Pass)
    lecturer: 'Mr. Ronald Mugisha, MSc. ICT',
    labVenue: 'Main Computing Lab 1 · Makerere Campus',
    practicalProject: 'Enterprise OS Deployment & File System Architecture Audit',
    competencySummary: 'Demonstrated solid grasp of ICT core definitions and computing platforms.',
  },
  {
    id: 'tdit-112',
    code: 'TDIT 112',
    title: 'Computational Mathematics',
    category: 'Analytical & General',
    creditUnits: 3,
    test1: 8,
    practicalLab: 6,
    assignment: 6, // coursework: 20
    examScore: 34, // final: 54% (Grade D, Pass)
    lecturer: 'Dr. Emmanuel Byaruhanga',
    labVenue: 'Lecture Room 4 · Makerere Campus',
    practicalProject: 'Boolean Algebra Gate Simplification & Truth Tables',
    competencySummary: 'Met basic thresholds in logic circuits and operations but needs continuous reinforcement.',
  },
  {
    id: 'tdit-113',
    code: 'TDIT 113',
    title: 'Computer Applications',
    category: 'Core Practical',
    creditUnits: 3,
    test1: 11,
    practicalLab: 11,
    assignment: 8, // coursework: 30
    examScore: 45, // final: 75% (Grade B, Credit)
    lecturer: 'Mr. Patrick Otim, BIT',
    labVenue: 'Main Computing Lab 1 · Makerere Campus',
    practicalProject: 'Automated Financial Payroll Workbook & Executive DB Suite',
    competencySummary: 'Demonstrated highly laudable competence in advanced financial modeling formulas.',
  },
  {
    id: 'tdit-114',
    code: 'TDIT 114',
    title: 'Computer Architecture',
    category: 'Core Practical',
    creditUnits: 3,
    test1: 9,
    practicalLab: 8,
    assignment: 6, // coursework: 23
    examScore: 38, // final: 61% (Grade C, Pass)
    lecturer: 'Eng. Denis Ssempijja, BSc. Comp. Eng',
    labVenue: 'Hardware & Diagnostics Workshop · Ground Floor',
    practicalProject: 'Full ATX Motherboard Diagnostics, BIOS Recovery & Fault Troubleshooting',
    competencySummary: 'Satisfactory mastery of motherboard assembly and basic bus fault analysis.',
  },
  {
    id: 'tdit-115',
    code: 'TDIT 115',
    title: 'Internet Technologies and Web Design',
    category: 'Core Practical',
    creditUnits: 3,
    test1: 10,
    practicalLab: 10,
    assignment: 6, // coursework: 26
    examScore: 42, // final: 68% (Grade C, Pass)
    lecturer: 'Ms. Sylvia Namukasa, MSc. CS',
    labVenue: 'Software Engineering Lab 2 · Makerere Campus',
    practicalProject: 'Responsive Academic Transcript Portfolio Page using HTML/CSS',
    competencySummary: 'Well-structured markup formatting and standard style definitions applied successfully.',
  },
  {
    id: 'tdch-111',
    code: 'TDCH 111',
    title: 'Communication Skills and Humanities',
    category: 'Analytical & General',
    creditUnits: 3,
    test1: 10,
    practicalLab: 10,
    assignment: 7, // coursework: 27
    examScore: 45, // final: 72% (Grade B, Credit)
    lecturer: 'Mrs. Grace Nakato, MBA',
    labVenue: 'Business Studies Hall · Makerere Campus',
    practicalProject: 'IT Service SLA Proposal & Technical Broad-sheet Writing',
    competencySummary: 'Commendable skills in drafting structured SLAs and presenting technical pitches.',
  },
];

// UBTEB Standard Grading System
export function computeCourseGrade(course: CourseUnitRecord): GradeComputation {
  const courseworkTotal = Math.min(40, Math.max(0, Math.round(course.test1 + course.practicalLab + course.assignment)));
  const examTotal = Math.min(60, Math.max(0, Math.round(course.examScore)));
  const finalMark = courseworkTotal + examTotal;

  let letterGrade = 'F';
  let gradePoint = 0.0;
  let remark = 'Fail';

  if (finalMark >= 80) {
    letterGrade = 'A';
    gradePoint = 5.0;
    remark = 'Distinction';
  } else if (finalMark >= 70) {
    letterGrade = 'B';
    gradePoint = 4.0;
    remark = 'Credit';
  } else if (finalMark >= 60) {
    letterGrade = 'C';
    gradePoint = 3.0;
    remark = 'Pass';
  } else if (finalMark >= 50) {
    letterGrade = 'D';
    gradePoint = 2.0;
    remark = 'Pass';
  } else if (finalMark >= 40) {
    letterGrade = 'E';
    gradePoint = 1.0;
    remark = 'Fail';
  }

  return {
    courseworkTotal,
    examTotal,
    finalMark,
    letterGrade,
    gradePoint,
    weightedPoints: Number((gradePoint * course.creditUnits).toFixed(1)),
    remark,
    isPassed: finalMark >= 50,
  };
}

export function computeSemesterSummary(courses: CourseUnitRecord[]) {
  const evaluated = courses.map((course) => ({
    course,
    grade: computeCourseGrade(course),
  }));

  const totalCreditUnits = evaluated.reduce((sum, item) => sum + item.course.creditUnits, 0);
  const totalWeightedPoints = evaluated.reduce((sum, item) => sum + item.grade.weightedPoints, 0);
  
  // Calculate average percentage
  const totalMarks = evaluated.reduce((sum, item) => sum + item.grade.finalMark, 0);
  const averageMark = evaluated.length > 0 ? Number((totalMarks / evaluated.length).toFixed(1)) : 0;
  
  // UBTEB Standard GPA Calculation
  const gpa = totalCreditUnits > 0 ? Number((totalWeightedPoints / totalCreditUnits).toFixed(2)) : 0;
  const failedCount = evaluated.filter((item) => !item.grade.isPassed).length;

  let academicStanding = 'Normal Progress (NP)';
  let honoursClass = 'First Class';

  if (failedCount > 0) {
    academicStanding = `Probationary Progress · ${failedCount} Retake(s) Required`;
  } else if (gpa >= 4.4) {
    academicStanding = "Normal Progress (NP) · Top of Class (Top 5%)";
  }

  if (gpa >= 4.4) {
    honoursClass = 'First Class (Distinction)';
  } else if (gpa >= 3.6) {
    honoursClass = 'Second Class Upper (Credit)';
  } else if (gpa >= 2.8) {
    honoursClass = 'Second Class Lower (Pass)';
  } else if (gpa >= 2.0) {
    honoursClass = 'Pass';
  } else {
    honoursClass = 'Academic Probation';
  }

  return {
    evaluated,
    totalCreditUnits,
    totalWeightedPoints: Number(totalWeightedPoints.toFixed(1)),
    totalMarks,
    averageMark,
    gpa,
    cgpa: gpa, // Sem 1 CGPA equals SGPA
    failedCount,
    academicStanding,
    honoursClass,
  };
}

export const GRADING_SCALE_TABLE = [
  { range: '80% – 100%', letter: 'A', gp: '5.0', interpretation: 'Distinction' },
  { range: '70% – 79%', letter: 'B', gp: '4.0', interpretation: 'Credit' },
  { range: '60% – 69%', letter: 'C', gp: '3.0', interpretation: 'Pass' },
  { range: '50% – 59%', letter: 'D', gp: '2.0', interpretation: 'Pass' },
  { range: '40% – 49%', letter: 'E', gp: '1.0', interpretation: 'Fail' },
  { range: '00% – 39%', letter: 'F', gp: '0.0', interpretation: 'Fail / Retake' },
];

export const GIIT_INSTITUTION_INFO = {
  name: 'GLOBAL INSTITUTE OF INFORMATION TECHNOLOGY & BUSINESS',
  subtitle: 'Haruna Towers, Wandegeya · Kampala, Uganda',
  motto: 'READY FOR THE FUTURE',
  phones: ['+256 702 945 602', '+256 702 772 516 354'],
  location: 'Haruna Towers, Wandegeya, Kampala',
  schoolPayCode: '1004185834',
  bankAccounts: [
    { bank: 'Diamond Trust Bank (DTB)', accountNumber: '000 246 1002', branch: 'Kampala / Makerere' },
    { bank: 'Housing Finance Bank', accountNumber: '010 046 1953', branch: 'Kampala Main' },
    { bank: 'SchoolPay (MTN & Airtel Mobile Money)', accountNumber: 'CODE: 1004185834', branch: 'Instant Student Portal Sync' },
  ],
  semesterClearanceItems: [
    {
      item: 'Tuition Fee — Diploma in Information Technology Sem 1',
      requirement: 'UGX 600,000',
      paid: 'UGX 600,000',
      balance: 'UGX 0',
      receiptNo: 'SP-1004185834-891',
      date: '02 Sept 2026',
      channel: 'SchoolPay (MTN) · Code 1004185834',
      status: 'Cleared',
    },
    {
      item: 'Functional & Computer Lab Practical Fee (Year 1 Sem 1)',
      requirement: 'UGX 150,000',
      paid: 'UGX 150,000',
      balance: 'UGX 0',
      receiptNo: 'DTB-0002461002-412',
      date: '05 Sept 2026',
      channel: 'Diamond Trust Bank (DTB)',
      status: 'Cleared',
    },
    {
      item: 'UNEB O-Level & A-Level Pass Slips + Previous School ID Copy',
      requirement: '2 Certified Copies + Original Verification',
      paid: 'Verified',
      balance: 'None',
      receiptNo: 'REG-VER-26-0842',
      date: '28 Aug 2026',
      channel: 'Academic Registrar Office',
      status: 'Verified',
    },
    {
      item: '1 Ream of Rwenzori Duplicating Papers (Per Semester Requirement)',
      requirement: '1 Ream (80gsm A4)',
      paid: '1 Ream Received',
      balance: '0',
      receiptNo: 'STR-RWZ-26-0842',
      date: '03 Sept 2026',
      channel: 'Campus Stores Office, Makerere',
      status: 'Submitted',
    },
    {
      item: '1 Dozen of Compact Toilet Paper Rolls (Per Semester Requirement)',
      requirement: '1 Dozen (12 Rolls)',
      paid: '1 Dozen Received',
      balance: '0',
      receiptNo: 'STR-CMP-26-0842',
      date: '03 Sept 2026',
      channel: 'Campus Stores Office, Makerere',
      status: 'Submitted',
    },
  ],
  programmeObjectives: [
    'i) Introducing the students to IT concepts.',
    'ii) To develop professionals with theoretical and practical skills in Information Communications Technology.',
    'iii) To strengthen ICT capacity at institutional, the private and public sectors.',
    'iv) To prepare students to undertake further studies in related IT fields.',
    'v) To produce quality graduates to manage and maintain computer systems of organizations.',
    'vi) To equip students with skills for self-employment.',
    'vii) To develop the learners skills to handle basic issues and challenges of ITs in companies and for individuals using ITs.',
    'viii) Stimulate the learners creative mind to participate in development of IT-based applications for use in IT-based companies like telecoms.',
  ],
  fullCurriculumRoadmap: [
    {
      semesterLabel: 'Year 1 · Semester 1 (Current Completed Report)',
      status: 'Completed · GPA 5.00',
      units: [
        'TDIT 111 · Introduction to Information and Communication Technology (3 CU)',
        'TDIT 112 · Computational Mathematics (3 CU)',
        'TDIT 113 · Computer Applications (3 CU)',
        'TDIT 114 · Computer Architecture (3 CU)',
        'TDIT 115 · Internet Technologies and Web Design (3 CU)',
        'TDCH 111 · Communication Skills and Humanities (3 CU)',
      ],
    },
    {
      semesterLabel: 'Year 1 · Semester 2 (Upcoming Registration)',
      status: 'Next Semester · Opens June 2026',
      units: [
        'TDIT 121 · Systems Analysis & Design (3 CU)',
        'TDIT 122 · Database Management (3 CU)',
        'TDIT 123 · Programming (Python/Java) (3 CU)',
        'TDIT 124 · Networking Essentials (3 CU)',
        'TDCH 121 · Entrepreneurship (3 CU)',
      ],
    },
    {
      semesterLabel: 'Year 2 · Semester 1',
      status: 'Year 2 Progression',
      units: [
        'TDIT 211 · Dynamic Web App Development (4 CU)',
        'TDIT 212 · CISCO Routing & Switching II (4 CU)',
        'TDIT 213 · Mobile Application Development (4 CU)',
        'TDIT 214 · Graphics Design & Multimedia (3 CU)',
        'TDIT 215 · IT Project Management (3 CU)',
      ],
    },
    {
      semesterLabel: 'Year 2 · Semester 2 (Final Diploma Capstone)',
      status: 'Graduation Semester',
      units: [
        'TDIT 221 · Cyber Security & Ethical Hacking (4 CU)',
        'TDIT 222 · Cloud Computing & Server Infra (4 CU)',
        'TDIT 223 · E-Commerce & Digital Marketing (3 CU)',
        'TDIT 224 · Final Diploma IT Capstone Project (6 CU)',
        'TDIT 225 · Field Industrial Training & Report (4 CU)',
      ],
    },
  ],
};
