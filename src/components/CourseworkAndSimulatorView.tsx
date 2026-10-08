import React, { useState } from 'react';
import {
  CourseUnitRecord,
  StudentProfile,
  computeCourseGrade,
  computeSemesterSummary,
} from '../data/academicData';

interface CourseworkAndSimulatorViewProps {
  student: StudentProfile;
  onUpdateStudent: (updated: StudentProfile) => void;
  courses: CourseUnitRecord[];
  onUpdateCourseScore: (
    courseId: string,
    field: 'test1' | 'practicalLab' | 'assignment' | 'examScore',
    value: number
  ) => void;
  onResetCourses: () => void;
  isSimulated: boolean;
  onSwitchToOfficialReport: () => void;
}

export const CourseworkAndSimulatorView: React.FC<CourseworkAndSimulatorViewProps> = ({
  student,
  onUpdateStudent,
  courses,
  onUpdateCourseScore,
  onResetCourses,
  isSimulated,
  onSwitchToOfficialReport,
}) => {
  const [categoryFilter, setCategoryFilter] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const summary = computeSemesterSummary(courses);

  const filteredCourses = summary.evaluated.filter(({ course }) => {
    const matchesCategory = categoryFilter === 'ALL' || course.category === categoryFilter;
    const matchesSearch =
      searchQuery.trim() === '' ||
      course.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.lecturer.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="space-y-8">
      {/* Top Two-Zone Summary & Particulars Editor */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left 7 Cols: Live GPA & Assessment Telemetry */}
        <section
          aria-label="Live Semester GPA Calculation"
          className="lg:col-span-7 bg-white border border-stone-200 p-6"
        >
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-stone-200 pb-4">
            <div>
              <h2 className="text-xl font-bold text-stone-900 font-display">
                01. Interactive Grade &amp; Coursework Simulator
              </h2>
              <p className="text-sm text-stone-600 mt-0.5">
                Adjust continuous assessment (/40) or final exam (/60) sliders below to see how marks impact your Official GI-IT Transcript.
              </p>
            </div>
            <div className="flex items-center gap-2">
              {isSimulated && (
                <button
                  type="button"
                  onClick={onResetCourses}
                  className="px-3 py-1.5 text-xs font-medium text-stone-700 border border-stone-300 hover:bg-stone-100 transition-colors whitespace-nowrap cursor-pointer"
                >
                  Reset Official Marks
                </button>
              )}
              <button
                type="button"
                onClick={onSwitchToOfficialReport}
                className="px-4 py-2 text-xs font-semibold text-white bg-[#6B215C] hover:bg-[#521846] transition-colors whitespace-nowrap cursor-pointer"
              >
                View Updated Transcript Sheet
              </button>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 pt-5">
            <div>
              <div className="text-xs text-stone-500">Semester GPA</div>
              <div className="text-2xl font-mono font-bold text-[#6B215C] tabular-data mt-1">
                {summary.gpa.toFixed(2)} <span className="text-xs font-normal text-stone-500">/ 5.00</span>
              </div>
              <div className="text-xs text-stone-500 mt-0.5">
                {isSimulated ? 'Simulated SGPA' : 'Official Recorded SGPA'}
              </div>
            </div>

            <div>
              <div className="text-xs text-stone-500">Weighted Points</div>
              <div className="text-2xl font-mono font-bold text-stone-900 tabular-data mt-1">
                {summary.totalWeightedPoints.toFixed(1)}
              </div>
              <div className="text-xs text-stone-500 mt-0.5">
                Across {summary.totalCreditUnits} Credit Units
              </div>
            </div>

            <div>
              <div className="text-xs text-stone-500">Mean Percentage</div>
              <div className="text-2xl font-mono font-bold text-stone-900 tabular-data mt-1">
                {summary.averageMark}%
              </div>
              <div className="text-xs text-stone-500 mt-0.5">
                7 Diploma IT Units
              </div>
            </div>

            <div>
              <div className="text-xs text-stone-500">Progression Status</div>
              <div className="text-sm font-semibold text-emerald-800 mt-1.5">
                {summary.failedCount === 0 ? '✓ Normal Progress (NP)' : `! ${summary.failedCount} Retake(s)`}
              </div>
              <div className="text-xs text-stone-500 mt-1">
                {summary.honoursClass}
              </div>
            </div>
          </div>
        </section>

        {/* Right 5 Cols: Customize Student Particulars on Report */}
        <section
          aria-label="Customize Report Student Particulars"
          className="lg:col-span-5 bg-white border border-stone-200 p-6"
        >
          <h2 className="text-base font-bold text-stone-900 font-display border-b border-stone-200 pb-3">
            02. Customize Student Particulars on Report
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4 text-xs">
            <label className="block">
              <span className="text-stone-600 font-medium">Student Full Name</span>
              <input
                type="text"
                value={student.fullName}
                onChange={(e) => onUpdateStudent({ ...student, fullName: e.target.value })}
                className="mt-1 w-full border border-stone-300 bg-white px-3 py-2 text-sm text-stone-900 focus:border-[#6B215C] focus:outline-none"
              />
            </label>

            <label className="block">
              <span className="text-stone-600 font-medium">Registration Number</span>
              <input
                type="text"
                value={student.regNumber}
                onChange={(e) => onUpdateStudent({ ...student, regNumber: e.target.value })}
                className="mt-1 w-full border border-stone-300 bg-white px-3 py-2 text-sm font-mono text-stone-900 focus:border-[#6B215C] focus:outline-none"
              />
            </label>

            <label className="block">
              <span className="text-stone-600 font-medium">GI-IT Intake Session</span>
              <select
                value={student.intake}
                onChange={(e) =>
                  onUpdateStudent({
                    ...student,
                    intake: e.target.value as StudentProfile['intake'],
                  })
                }
                className="mt-1 w-full border border-stone-300 bg-white px-3 py-2 text-sm text-stone-900 focus:border-[#6B215C] focus:outline-none"
              >
                <option value="AUG / SEPT">AUG / SEPT Intake</option>
                <option value="JAN / FEB">JAN / FEB Intake</option>
                <option value="MAY / JUNE">MAY / JUNE Intake</option>
              </select>
            </label>

            <label className="block">
              <span className="text-stone-600 font-medium">Student Number</span>
              <input
                type="text"
                value={student.studentNumber}
                onChange={(e) => onUpdateStudent({ ...student, studentNumber: e.target.value })}
                className="mt-1 w-full border border-stone-300 bg-white px-3 py-2 text-sm font-mono text-stone-900 focus:border-[#6B215C] focus:outline-none"
              />
            </label>

            <div className="sm:col-span-2 pt-2 mt-2 border-t border-stone-100">
              <span className="text-stone-600 font-medium block mb-1">Upload Your Exact Campus Photo (IMG_20260927...)</span>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) {
                    const reader = new FileReader();
                    reader.onload = (event) => {
                      if (event.target?.result) {
                        onUpdateStudent({ ...student, portraitUrl: event.target.result as string });
                      }
                    };
                    reader.readAsDataURL(file);
                  }
                }}
                className="w-full text-xs text-stone-500 file:mr-3 file:py-1.5 file:px-3 file:border-0 file:text-xs file:font-semibold file:bg-[#6B215C] file:text-white hover:file:bg-[#521846] cursor-pointer"
              />
              <p className="text-[10px] text-stone-500 mt-1">
                Select your raw picture directly from your phone or PC storage to update the portal instantly.
              </p>
            </div>
          </div>
        </section>
      </div>

      {/* Filter & Search Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white border border-stone-200 p-4">
        <div className="flex flex-wrap items-center gap-1.5" role="group" aria-label="Filter courses by category">
          {(['ALL', 'Core Practical', 'Systems & Networking', 'Analytical & General'] as const).map(
            (cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setCategoryFilter(cat)}
                className={`px-3 py-1.5 text-xs font-medium transition-colors whitespace-nowrap cursor-pointer ${
                  categoryFilter === cat
                    ? 'bg-[#6B215C] text-white'
                    : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
                }`}
              >
                {cat === 'ALL' ? 'All 7 Course Units' : cat}
              </button>
            )
          )}
        </div>

        <div className="w-full sm:w-72">
          <input
            type="search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search course code, title, lecturer..."
            aria-label="Search course units"
            className="w-full border border-stone-300 px-3 py-1.5 text-xs text-stone-900 focus:border-[#6B215C] focus:outline-none"
          />
        </div>
      </div>

      {/* Course Unit Breakdown & Sliders List */}
      {filteredCourses.length === 0 ? (
        <div className="bg-white border border-stone-200 p-10 text-center">
          <p className="text-sm text-stone-600">No course units match your current filter criteria.</p>
          <button
            type="button"
            onClick={() => {
              setCategoryFilter('ALL');
              setSearchQuery('');
            }}
            className="mt-3 px-4 py-2 text-xs font-medium text-white bg-[#6B215C] hover:bg-[#521846] transition-colors cursor-pointer"
          >
            Show All Year 1 Semester 1 Units
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredCourses.map(({ course, grade }) => {
            const currentGrade = computeCourseGrade(course);
            return (
              <div
                key={course.id}
                className="bg-white border border-stone-200 p-6 transition-colors"
              >
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-stone-200 pb-4">
                  <div>
                    <div className="text-xs font-mono text-[#6B215C] font-semibold">
                      {course.code} <span aria-hidden="true">·</span> {course.creditUnits} Credit Units{' '}
                      <span aria-hidden="true">·</span> {course.category}
                    </div>
                    <h3 className="text-base font-bold text-stone-900 mt-0.5">{course.title}</h3>
                    <div className="text-xs text-stone-500 mt-0.5">
                      Lecturer: {course.lecturer} <span aria-hidden="true">·</span> {course.labVenue}
                    </div>
                  </div>

                  <div className="flex items-center gap-6 shrink-0 font-mono tabular-data">
                    <div className="text-right">
                      <div className="text-[11px] text-stone-500">CW /40 + Exam /60</div>
                      <div className="text-sm font-semibold text-stone-900">
                        {currentGrade.courseworkTotal}/40 + {currentGrade.examTotal}/60
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-[11px] text-stone-500">Total Mark</div>
                      <div className="text-lg font-bold text-[#6B215C]">{currentGrade.finalMark}%</div>
                    </div>
                    <div className="text-right">
                      <div className="text-[11px] text-stone-500">Grade · GP</div>
                      <div className="text-lg font-bold text-stone-900">
                        {currentGrade.letterGrade} · {currentGrade.gradePoint.toFixed(1)}
                      </div>
                    </div>
                  </div>
                </div>

                {/* 4 Labeled Assessment Component Sliders */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-4">
                  <div>
                    <div className="flex items-center justify-between text-xs mb-1.5">
                      <label htmlFor={`${course.id}-test1`} className="font-medium text-stone-700">
                        Test 1 Score
                      </label>
                      <span className="font-mono font-semibold text-stone-900 tabular-data">
                        {course.test1} / 15 pts
                      </span>
                    </div>
                    <input
                      id={`${course.id}-test1`}
                      type="range"
                      min={0}
                      max={15}
                      step={1}
                      value={course.test1}
                      onChange={(e) =>
                        onUpdateCourseScore(course.id, 'test1', Number(e.target.value))
                      }
                      className="w-full accent-[#6B215C] cursor-pointer"
                    />
                  </div>

                  <div>
                    <div className="flex items-center justify-between text-xs mb-1.5">
                      <label htmlFor={`${course.id}-lab`} className="font-medium text-stone-700">
                        Practical Lab Score
                      </label>
                      <span className="font-mono font-semibold text-stone-900 tabular-data">
                        {course.practicalLab} / 15 pts
                      </span>
                    </div>
                    <input
                      id={`${course.id}-lab`}
                      type="range"
                      min={0}
                      max={15}
                      step={1}
                      value={course.practicalLab}
                      onChange={(e) =>
                        onUpdateCourseScore(course.id, 'practicalLab', Number(e.target.value))
                      }
                      className="w-full accent-[#6B215C] cursor-pointer"
                    />
                  </div>

                  <div>
                    <div className="flex items-center justify-between text-xs mb-1.5">
                      <label htmlFor={`${course.id}-assign`} className="font-medium text-stone-700">
                        Assignment Score
                      </label>
                      <span className="font-mono font-semibold text-stone-900 tabular-data">
                        {course.assignment} / 10 pts
                      </span>
                    </div>
                    <input
                      id={`${course.id}-assign`}
                      type="range"
                      min={0}
                      max={10}
                      step={1}
                      value={course.assignment}
                      onChange={(e) =>
                        onUpdateCourseScore(course.id, 'assignment', Number(e.target.value))
                      }
                      className="w-full accent-[#6B215C] cursor-pointer"
                    />
                  </div>

                  <div>
                    <div className="flex items-center justify-between text-xs mb-1.5">
                      <label htmlFor={`${course.id}-exam`} className="font-medium text-stone-700">
                        Final Exam Score
                      </label>
                      <span className="font-mono font-semibold text-[#6B215C] tabular-data">
                        {course.examScore} / 60 pts
                      </span>
                    </div>
                    <input
                      id={`${course.id}-exam`}
                      type="range"
                      min={0}
                      max={60}
                      step={1}
                      value={course.examScore}
                      onChange={(e) =>
                        onUpdateCourseScore(course.id, 'examScore', Number(e.target.value))
                      }
                      className="w-full accent-[#6B215C] cursor-pointer"
                    />
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-stone-100 flex flex-wrap items-center justify-between gap-2 text-xs text-stone-600">
                  <div>
                    <span className="font-semibold text-stone-800">Hands-On Practical Project:</span>{' '}
                    {course.practicalProject}
                  </div>
                  <div className="font-mono text-stone-700 tabular-data">
                    Status: {grade.isPassed ? `✓ ${grade.remark}` : `! ${grade.remark}`}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
