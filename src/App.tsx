/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import {
  CourseUnitRecord,
  GIIT_INSTITUTION_INFO,
  INITIAL_SEM1_COURSES,
  INITIAL_STUDENT_PROFILE,
  StudentProfile,
  computeSemesterSummary,
} from './data/academicData';
import { OfficialTranscriptSheet } from './components/OfficialTranscriptSheet';
import { CourseworkAndSimulatorView } from './components/CourseworkAndSimulatorView';
import { ClearanceAndCurriculumView } from './components/ClearanceAndCurriculumView';

type ActiveTab = 'report' | 'simulator' | 'clearance' | 'curriculum';
type FontTheme = 'classic' | 'archival' | 'royal' | 'tech';

export default function App() {
  const [activeTab, setActiveTab] = useState<ActiveTab>('report');
  const [fontTheme, setFontTheme] = useState<FontTheme>('classic');
  const [student, setStudent] = useState<StudentProfile>(INITIAL_STUDENT_PROFILE);
  const [courses, setCourses] = useState<CourseUnitRecord[]>(INITIAL_SEM1_COURSES);
  const [selectedCourseId, setSelectedCourseId] = useState<string>(INITIAL_SEM1_COURSES[0].id);
  const [isSimulated, setIsSimulated] = useState<boolean>(false);
  const [exportNotice, setExportNotice] = useState<string | null>(null);

  const summary = computeSemesterSummary(courses);

  const handleUpdateCourseScore = (
    courseId: string,
    field: 'test1' | 'practicalLab' | 'assignment' | 'examScore',
    value: number
  ) => {
    setCourses((prev) =>
      prev.map((course) => (course.id === courseId ? { ...course, [field]: value } : course))
    );
    setIsSimulated(true);
  };

  const handleResetSimulation = () => {
    setCourses(INITIAL_SEM1_COURSES);
    setIsSimulated(false);
  };

  const handlePrintReport = () => {
    if (activeTab !== 'report') {
      setActiveTab('report');
      setTimeout(() => {
        window.print();
      }, 120);
    } else {
      window.print();
    }
  };

  const handleExportCsv = () => {
    const headers = [
      'Course Code',
      'Course Title',
      'Category',
      'Credit Units',
      'Test 1 (/15)',
      'Practical Lab (/15)',
      'Assignment (/10)',
      'Coursework Total (/40)',
      'Final Exam (/60)',
      'Final Mark (/100)',
      'Letter Grade',
      'Grade Point',
      'Weighted Points',
      'Remark',
    ];

    const rows = summary.evaluated.map(({ course, grade }) => [
      course.code,
      `"${course.title.replace(/"/g, '""')}"`,
      `"${course.category}"`,
      course.creditUnits,
      course.test1,
      course.practicalLab,
      course.assignment,
      grade.courseworkTotal,
      grade.examTotal,
      grade.finalMark,
      grade.letterGrade,
      grade.gradePoint.toFixed(1),
      grade.weightedPoints.toFixed(1),
      `"${grade.remark}"`,
    ]);

    const csvContent = [
      `# GLOBAL INSTITUTE OF INFORMATION TECHNOLOGY AND BUSINESS, MAKERERE (GI-IT)`,
      `# Student Name: ${student.fullName}, Registration No: ${student.regNumber}, Programme: ${student.programme}`,
      `# Academic Level: ${student.yearOfStudy} ${student.semester}, SGPA: ${summary.gpa.toFixed(2)}, CGPA: ${summary.cgpa.toFixed(2)}`,
      headers.join(','),
      ...rows.map((r) => r.join(',')),
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `GI-IT_Sem1_Year1_Report_${student.fullName.replace(/\s+/g, '_')}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    setExportNotice('Report CSV exported');
    setTimeout(() => setExportNotice(null), 2500);
  };

  return (
    <div className={`min-h-screen flex flex-col bg-[#F8F7F4] text-[#18181B] theme-font-${fontTheme}`}>
      {/* Strict 3-Zone Top Bar Contract */}
      <header className="no-print sticky top-0 z-30 flex items-center justify-between px-6 py-4 bg-white border-b border-stone-200">
        {/* Zone 1: Single text element wordmark */}
        <a
          href="#report"
          onClick={(e) => {
            e.preventDefault();
            setActiveTab('report');
          }}
          className="text-lg font-bold tracking-tight text-[#6B215C] font-display whitespace-nowrap shrink-0"
        >
          GI-IT Makerere
        </a>

        {/* Zone 2: 4 clean text navigation links */}
        <nav aria-label="Student Portal Navigation" className="hidden md:flex items-center gap-6 text-sm font-medium text-stone-600">
          <a
            href="#report"
            onClick={(e) => {
              e.preventDefault();
              setActiveTab('report');
            }}
            className={`transition-colors whitespace-nowrap py-0.5 ${
              activeTab === 'report'
                ? 'text-[#6B215C] font-semibold underline underline-offset-8 decoration-2'
                : 'hover:text-stone-950 hover:underline underline-offset-8'
            }`}
          >
            Official Report
          </a>
          <a
            href="#simulator"
            onClick={(e) => {
              e.preventDefault();
              setActiveTab('simulator');
            }}
            className={`transition-colors whitespace-nowrap py-0.5 ${
              activeTab === 'simulator'
                ? 'text-[#6B215C] font-semibold underline underline-offset-8 decoration-2'
                : 'hover:text-stone-950 hover:underline underline-offset-8'
            }`}
          >
            Grade Simulator
          </a>
          <a
            href="#clearance"
            onClick={(e) => {
              e.preventDefault();
              setActiveTab('clearance');
            }}
            className={`transition-colors whitespace-nowrap py-0.5 ${
              activeTab === 'clearance'
                ? 'text-[#6B215C] font-semibold underline underline-offset-8 decoration-2'
                : 'hover:text-stone-950 hover:underline underline-offset-8'
            }`}
          >
            Fee Clearance
          </a>
          <a
            href="#curriculum"
            onClick={(e) => {
              e.preventDefault();
              setActiveTab('curriculum');
            }}
            className={`transition-colors whitespace-nowrap py-0.5 ${
              activeTab === 'curriculum'
                ? 'text-[#6B215C] font-semibold underline underline-offset-8 decoration-2'
                : 'hover:text-stone-950 hover:underline underline-offset-8'
            }`}
          >
            IT Curriculum
          </a>
        </nav>

        {/* Zone 3: 2 primary actions */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={handleExportCsv}
            className="px-3.5 py-2 text-xs font-medium text-stone-800 border border-stone-300 hover:bg-stone-100 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            {exportNotice ? '✓ CSV Saved' : 'Export CSV'}
          </button>
          <button
            type="button"
            onClick={handlePrintReport}
            className="px-4 py-2 text-xs font-semibold text-white bg-[#6B215C] hover:bg-[#521846] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            Print Official Report
          </button>
        </div>
      </header>

      {/* Campus Student Context Strip & Mobile View Switcher */}
      <div className="no-print bg-[#2E1029] text-stone-100 border-b border-[#47183F]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-3 text-xs">
          <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
            <span className="text-[#FACC15] font-semibold">Campus Student Kiosk</span>
            <span aria-hidden="true" className="text-stone-400">·</span>
            <span className="font-semibold text-white">{student.fullName}</span>
            <span aria-hidden="true" className="text-stone-400">·</span>
            <span className="font-mono text-stone-200 tabular-data">{student.regNumber}</span>
            <span aria-hidden="true" className="text-stone-400">·</span>
            <span>{student.programme}</span>
            <span aria-hidden="true" className="text-stone-400">·</span>
            <span className="text-[#FACC15] font-mono tabular-data">
              {student.yearOfStudy}, {student.semester} (SGPA: {summary.gpa.toFixed(2)})
            </span>
          </div>

          {/* Mobile & Quick Action Segmented Bar */}
          <div className="flex md:hidden items-center gap-1 overflow-x-auto pt-1">
            {(
              [
                { id: 'report', label: 'Official Report' },
                { id: 'simulator', label: 'Simulator' },
                { id: 'clearance', label: 'Clearance' },
                { id: 'curriculum', label: 'Curriculum' },
              ] as const
            ).map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={`px-2.5 py-1 text-xs font-medium whitespace-nowrap shrink-0 cursor-pointer ${
                  activeTab === tab.id
                    ? 'bg-[#FACC15] text-stone-950 font-semibold'
                    : 'text-stone-300 hover:text-white'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2.5">
            <span className="text-stone-300 font-medium">Font Style:</span>
            <select
              value={fontTheme}
              onChange={(e) => setFontTheme(e.target.value as FontTheme)}
              aria-label="Select typography style theme"
              className="bg-[#41183A] text-[#FACC15] text-[11px] font-mono border border-[#631e56] px-2 py-1 focus:outline-none focus:ring-1 focus:ring-[#FACC15] cursor-pointer"
            >
              <option value="classic">Classic Academic (Fraunces &amp; Jakarta)</option>
              <option value="archival">Traditional Archival (Playfair &amp; Lora)</option>
              <option value="royal">Royal Institutional (Cinzel &amp; Lora)</option>
              <option value="tech">Tech Modern (Jakarta &amp; Inter)</option>
            </select>
          </div>

          <div className="hidden lg:flex items-center gap-2 text-stone-300 font-mono tabular-data">
            <span>SchoolPay: {GIIT_INSTITUTION_INFO.schoolPayCode}</span>
            <span aria-hidden="true">·</span>
            <span>Makerere Campus</span>
          </div>
        </div>
      </div>

      {/* Main Content Container (1440px Desktop Baseline, 1280px Max Container) */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'report' && (
          <OfficialTranscriptSheet
            student={student}
            courses={courses}
            selectedCourseId={selectedCourseId}
            onSelectCourse={(id) => setSelectedCourseId(id)}
            isSimulated={isSimulated}
            onResetSimulation={handleResetSimulation}
            onUpdateStudent={setStudent}
          />
        )}

        {activeTab === 'simulator' && (
          <CourseworkAndSimulatorView
            student={student}
            onUpdateStudent={setStudent}
            courses={courses}
            onUpdateCourseScore={handleUpdateCourseScore}
            onResetCourses={handleResetSimulation}
            isSimulated={isSimulated}
            onSwitchToOfficialReport={() => setActiveTab('report')}
          />
        )}

        {activeTab === 'clearance' && (
          <ClearanceAndCurriculumView student={student} mode="clearance" />
        )}

        {activeTab === 'curriculum' && (
          <ClearanceAndCurriculumView student={student} mode="curriculum" />
        )}
      </main>

      {/* Clean Institutional Footer */}
      <footer className="no-print bg-white border-t border-stone-200 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs text-stone-600">
          <div>
            <span className="font-semibold text-stone-900">
              Global Institute of Information Technology and Business, Makerere (GI-IT)
            </span>{' '}
            <span aria-hidden="true">·</span> Motto: {GIIT_INSTITUTION_INFO.motto}
          </div>
          <div className="font-mono tabular-data">
            Contacts: {GIIT_INSTITUTION_INFO.phones[0]} / {GIIT_INSTITUTION_INFO.phones[1]}{' '}
            <span aria-hidden="true">·</span> SchoolPay: {GIIT_INSTITUTION_INFO.schoolPayCode}
          </div>
        </div>
      </footer>
    </div>
  );
}
