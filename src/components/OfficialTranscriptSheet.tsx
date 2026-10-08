import React, { useState } from 'react';
import {
  CourseUnitRecord,
  GIIT_INSTITUTION_INFO,
  GRADING_SCALE_TABLE,
  StudentProfile,
  computeSemesterSummary,
} from '../data/academicData';

interface OfficialTranscriptSheetProps {
  student: StudentProfile;
  courses: CourseUnitRecord[];
  selectedCourseId: string;
  onSelectCourse: (courseId: string) => void;
  isSimulated: boolean;
  onResetSimulation: () => void;
  onUpdateStudent?: (updated: StudentProfile) => void;
}

export const OfficialTranscriptSheet: React.FC<OfficialTranscriptSheetProps> = ({
  student,
  courses,
  selectedCourseId,
  onSelectCourse,
  isSimulated,
  onResetSimulation,
  onUpdateStudent,
}) => {
  const [imageError, setImageError] = useState(false);
  const [showGradingKey, setShowGradingKey] = useState(true);
  const summary = computeSemesterSummary(courses);

  const selectedEvaluated =
    summary.evaluated.find((item) => item.course.id === selectedCourseId) || summary.evaluated[0];

  return (
    <div className="space-y-6">
      {isSimulated && (
        <div className="no-print flex flex-wrap items-center justify-between gap-4 border border-amber-300 bg-amber-50/80 px-5 py-3 text-sm text-amber-950">
          <div>
            <span className="font-semibold">What-If Simulator Active:</span> You are viewing modified marks in the
            transcript preview. Official campus records remain unchanged.
          </div>
          <button
            type="button"
            onClick={onResetSimulation}
            className="px-4 py-1.5 text-xs font-semibold text-white bg-[#6B215C] hover:bg-[#521846] transition-colors whitespace-nowrap cursor-pointer"
          >
            Restore Official Campus Marks
          </button>
        </div>
      )}

      {/* Official Printable Paper Sheet */}
      <article
        aria-label="Official Semester 1 Year 1 Examination Report for Tadhuba Samilu"
        className="print-sheet bg-white border border-stone-300 p-6 sm:p-10 text-stone-900"
      >
        {/* Top Institutional Header matching GI-IT Makerere Branding */}
        <div className="border-b-2 border-[#6B215C] pb-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            {/* Left: GI-IT Emblem & Name */}
            <div className="flex items-start sm:items-center gap-4">
              {/* Authentic GI-IT Yellow/Gold & Plum Crest */}
              <div className="shrink-0 w-24 h-20 border-2 border-[#6B215C] bg-[#FACC15] flex flex-col justify-between p-1.5 select-none">
                <div className="flex items-center justify-between text-[9px] font-mono font-semibold text-[#6B215C] leading-none">
                  <span>MAKERERE</span>
                  <span>EST.</span>
                </div>
                <div className="text-center font-serif font-bold text-2xl tracking-tight leading-none text-stone-950">
                  G<span className="text-[#B91C1C]">i</span>-IT
                </div>
                <div className="bg-[#6B215C] text-[#FACC15] text-[8px] font-semibold text-center py-0.5 tracking-wider uppercase">
                  Ready for the Future
                </div>
              </div>

              <div>
                <div className="text-xs font-mono text-stone-600">
                  Tel: {GIIT_INSTITUTION_INFO.phones[0]} · {GIIT_INSTITUTION_INFO.phones[1]}
                </div>
                <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#6B215C] font-display mt-0.5 font-serif">
                  GLOBAL INSTITUTE <span className="text-stone-900 font-semibold text-xl sm:text-2xl font-sans">OF INFORMATION TECHNOLOGY &amp; BUSINESS</span>
                </h1>
                <p className="text-sm font-medium text-stone-700">
                  P.O. Box 16759, Kampala, Uganda · Haruna Towers, Wandegeya · Office of the Academic Registrar
                </p>
                <p className="text-xs text-stone-500 mt-1">
                  Department of Computer Science &amp; Information Technology · Examination &amp; Transcripts Division
                </p>
              </div>
            </div>

            {/* Right: Document Classification & Student Passport Photo */}
            <div className="flex items-center gap-4 self-start lg:self-center">
              <div className="text-left lg:text-right">
                <div className="text-xs font-mono uppercase tracking-wider text-[#6B215C] font-semibold">
                  Provisional Examination Report
                </div>
                <div className="text-sm font-semibold text-stone-900 mt-0.5">
                  {student.yearOfStudy} · {student.semester}
                </div>
                <div className="text-xs font-mono text-stone-600 tabular-data mt-0.5">
                  Academic Year: {student.academicYear}
                </div>
                <div className="text-xs font-mono text-stone-500 tabular-data mt-0.5">
                  Ref: {student.verificationCode}
                </div>
              </div>

              {/* Student ID Portrait with Zero-Broken-Image Fallback and Click-to-Upload */}
              <div className="w-20 h-24 border border-stone-300 bg-stone-100 shrink-0 overflow-hidden relative group">
                {onUpdateStudent ? (
                  <label className="cursor-pointer block w-full h-full" title="Click to upload your exact raw photo">
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
                      className="hidden"
                    />
                    {!imageError ? (
                      <img
                        src={student.portraitUrl}
                        alt={`Student passport portrait of ${student.fullName}`}
                        referrerPolicy="no-referrer"
                        onError={() => setImageError(true)}
                        className="w-full h-full object-cover group-hover:opacity-85 transition-opacity"
                      />
                    ) : (
                      <div className="w-full h-full flex flex-col items-center justify-center bg-stone-200 text-stone-700 p-1 text-center">
                        <span className="font-serif font-bold text-lg">TS</span>
                        <span className="text-[9px] font-mono leading-tight">ID VERIFIED</span>
                      </div>
                    )}
                    <div className="no-print absolute inset-0 bg-[#6B215C]/40 opacity-0 group-hover:opacity-100 flex items-center justify-center text-white text-[10px] font-bold transition-opacity">
                      Upload
                    </div>
                  </label>
                ) : (
                  <>
                    {!imageError ? (
                      <img
                        src={student.portraitUrl}
                        alt={`Student passport portrait of ${student.fullName}`}
                        referrerPolicy="no-referrer"
                        onError={() => setImageError(true)}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex flex-col items-center justify-center bg-stone-200 text-stone-700 p-1 text-center">
                        <span className="font-serif font-bold text-lg">TS</span>
                        <span className="text-[9px] font-mono leading-tight">ID VERIFIED</span>
                      </div>
                    )}
                  </>
                )}
                <div className="absolute bottom-0 inset-x-0 bg-[#6B215C]/90 text-white text-[9px] font-mono text-center py-0.5 tabular-data">
                  {student.studentNumber}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Student Bio-Data & Registration Metadata Grid */}
        <section aria-label="Student Registration Particulars" className="py-5 border-b border-stone-200">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-y-4 gap-x-6 text-sm">
            <div>
              <div className="text-xs text-stone-500">Student Full Name</div>
              <div className="font-semibold text-base text-stone-950 tracking-tight mt-0.5 uppercase">
                {student.fullName}
              </div>
            </div>

            <div>
              <div className="text-xs text-stone-500">Registration Number</div>
              <div className="font-mono font-semibold text-stone-900 tabular-data mt-0.5">
                {student.regNumber}
              </div>
            </div>

            <div>
              <div className="text-xs text-stone-500">Student Number · Index No.</div>
              <div className="font-mono text-stone-800 tabular-data mt-0.5">
                {student.studentNumber} <span aria-hidden="true">·</span> {student.examIndexNo}
              </div>
            </div>

            <div>
              <div className="text-xs text-stone-500">Intake &amp; Study Mode</div>
              <div className="font-medium text-stone-900 mt-0.5">
                {student.intake} <span aria-hidden="true">·</span> {student.studySession}
              </div>
            </div>

            <div className="sm:col-span-2">
              <div className="text-xs text-stone-500">Academic Programme</div>
              <div className="font-semibold text-[#6B215C] mt-0.5">
                {student.programme} — 2 Years Duration
              </div>
            </div>

            <div>
              <div className="text-xs text-stone-500">Faculty / Department</div>
              <div className="font-medium text-stone-900 mt-0.5">{student.department}</div>
            </div>

            <div>
              <div className="text-xs text-stone-500">Financial &amp; Exam Clearance</div>
              <div className="font-medium text-emerald-800 mt-0.5">
                ✓ 100% Cleared <span aria-hidden="true">·</span> SchoolPay {GIIT_INSTITUTION_INFO.schoolPayCode}
              </div>
            </div>
          </div>
        </section>

        {/* Results Table for Year 1 Semester 1 */}
        <section aria-label="Semester 1 Year 1 Course Unit Marks" className="mt-6">
          <div className="flex flex-wrap items-baseline justify-between gap-2 mb-3">
            <div>
              <h2 className="text-base font-bold text-stone-900 font-display">
                01. Official Semester Examination Results — {student.yearOfStudy}, {student.semester}
              </h2>
              <p className="text-xs text-stone-500 mt-0.5">
                Continuous Assessment (Coursework &amp; Practical Labs) contributes 40% · Final Written &amp; Practical Examination contributes 60%.
              </p>
            </div>
            <div className="no-print text-xs text-stone-500">
              Click any course row below to inspect continuous assessment &amp; lab marks
            </div>
          </div>

          <div className="overflow-x-auto border border-stone-300">
            <table className="w-full text-left border-collapse text-sm">
              <thead>
                <tr className="border-b border-stone-300 bg-stone-100 text-stone-700 text-xs font-semibold">
                  <th className="py-2.5 px-3 font-mono">Code</th>
                  <th className="py-2.5 px-3">Course Unit Title</th>
                  <th className="py-2.5 px-3 text-right font-mono">CU</th>
                  <th className="py-2.5 px-3 text-right font-mono" title="Coursework & Practical out of 40">
                    CW /40
                  </th>
                  <th className="py-2.5 px-3 text-right font-mono" title="Final Examination out of 60">
                    Exam /60
                  </th>
                  <th className="py-2.5 px-3 text-right font-mono" title="Total Mark out of 100%">
                    Total %
                  </th>
                  <th className="py-2.5 px-3 text-center font-mono">Grade</th>
                  <th className="py-2.5 px-3 text-right font-mono" title="Grade Point out of 5.0">
                    GP
                  </th>
                  <th className="py-2.5 px-3 text-right font-mono" title="Weighted Grade Points (CU × GP)">
                    WGP
                  </th>
                  <th className="py-2.5 px-3">Official Remark</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-200">
                {summary.evaluated.map(({ course, grade }) => {
                  const isSelected = course.id === selectedCourseId;
                  return (
                    <tr
                      key={course.id}
                      onClick={() => onSelectCourse(course.id)}
                      className={`transition-colors cursor-pointer ${
                        isSelected
                          ? 'bg-[#6B215C]/[0.06] font-medium'
                          : 'hover:bg-stone-50'
                      }`}
                    >
                      <td className="py-2.5 px-3 font-mono text-xs font-semibold text-[#6B215C] whitespace-nowrap tabular-data">
                        {course.code}
                      </td>
                      <td className="py-2.5 px-3 text-stone-900">
                        <div>{course.title}</div>
                        <div className="text-xs text-stone-500 mt-0.5">
                          {course.category} <span aria-hidden="true">·</span> {course.lecturer}
                        </div>
                      </td>
                      <td className="py-2.5 px-3 text-right font-mono tabular-data text-stone-700">
                        {course.creditUnits}
                      </td>
                      <td className="py-2.5 px-3 text-right font-mono tabular-data text-stone-700">
                        {grade.courseworkTotal}
                      </td>
                      <td className="py-2.5 px-3 text-right font-mono tabular-data text-stone-700">
                        {grade.examTotal}
                      </td>
                      <td className="py-2.5 px-3 text-right font-mono font-semibold tabular-data text-stone-950">
                        {grade.finalMark}%
                      </td>
                      <td className="py-2.5 px-3 text-center font-mono font-bold text-stone-900">
                        {grade.letterGrade}
                      </td>
                      <td className="py-2.5 px-3 text-right font-mono tabular-data text-stone-800">
                        {grade.gradePoint.toFixed(1)}
                      </td>
                      <td className="py-2.5 px-3 text-right font-mono tabular-data text-stone-800">
                        {grade.weightedPoints.toFixed(1)}
                      </td>
                      <td className="py-2.5 px-3 text-xs whitespace-nowrap">
                        {grade.isPassed ? (
                          <span className="text-emerald-800 font-medium">
                            ✓ {grade.remark}
                          </span>
                        ) : (
                          <span className="text-red-700 font-semibold">
                            ! {grade.remark}
                          </span>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
              <tfoot>
                <tr className="border-t-2 border-stone-300 bg-stone-100/90 font-semibold text-stone-900">
                  <td colSpan={2} className="py-3 px-3 text-xs uppercase tracking-wider text-stone-600">
                    Semester Totals &amp; Weighted Averages
                  </td>
                  <td className="py-3 px-3 text-right font-mono tabular-data">
                    {summary.totalCreditUnits} CU
                  </td>
                  <td colSpan={2} className="py-3 px-3 text-right text-xs text-stone-500 font-normal">
                    Mean Score:
                  </td>
                  <td className="py-3 px-3 text-right font-mono tabular-data">
                    {summary.averageMark}%
                  </td>
                  <td className="py-3 px-3 text-center font-mono text-[#6B215C]">
                    SGPA
                  </td>
                  <td className="py-3 px-3 text-right font-mono font-bold text-[#6B215C] tabular-data">
                    {summary.gpa.toFixed(2)}
                  </td>
                  <td className="py-3 px-3 text-right font-mono tabular-data">
                    {summary.totalWeightedPoints.toFixed(1)}
                  </td>
                  <td className="py-3 px-3 text-xs text-stone-800">
                    {summary.failedCount === 0 ? '✓ All Units Passed' : `! ${summary.failedCount} Unit(s) Below 50%`}
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>
        </section>

        {/* UBTEB Summary of Performance block */}
        <section aria-label="UBTEB Summary of Performance" className="mt-6 border border-stone-300 p-5 bg-stone-50/50">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 divide-y lg:divide-y-0 lg:divide-x divide-stone-200">
            {/* Left 2/3: Summary Key-Values */}
            <div className="lg:col-span-2 space-y-3">
              <h3 className="text-sm font-bold text-stone-900 tracking-wider uppercase font-sans">
                Summary of Performance
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-1">
                <div>
                  <div className="text-xs text-stone-500">Total Marks</div>
                  <div className="font-mono font-bold text-[#6B215C] text-lg tabular-data mt-0.5">
                    {summary.totalMarks} / 600
                  </div>
                </div>
                <div>
                  <div className="text-xs text-stone-500">Average Mark</div>
                  <div className="font-mono font-bold text-stone-900 text-lg tabular-data mt-0.5">
                    {summary.averageMark}%
                  </div>
                </div>
                <div>
                  <div className="text-xs text-stone-500">Overall Grade</div>
                  <div className="font-bold text-stone-900 text-sm mt-1.5 uppercase">
                    {!isSimulated ? 'C (Pass)' : summary.averageMark >= 80 ? 'A (Distinction)' : summary.averageMark >= 70 ? 'B (Credit)' : 'C (Pass)'}
                  </div>
                </div>
                <div>
                  <div className="text-xs text-stone-500">Classification</div>
                  <div className="font-bold text-emerald-800 text-sm mt-1.5">
                    {!isSimulated ? 'Pass' : summary.gpa >= 4.4 ? 'First Class' : summary.gpa >= 3.6 ? 'Credit' : 'Pass'}
                  </div>
                </div>
                <div>
                  <div className="text-xs text-stone-500">GPA (Estimated)</div>
                  <div className="font-mono font-bold text-[#6B215C] text-lg tabular-data mt-0.5">
                    {!isSimulated ? '2.8 / 5.0' : `${summary.gpa.toFixed(1)} / 5.0`}
                  </div>
                </div>
                <div>
                  <div className="text-xs text-stone-500">Position in Class</div>
                  <div className="font-semibold text-stone-900 text-sm mt-1.5">
                    {!isSimulated ? 'Middle 50%' : summary.gpa >= 4.4 ? 'Top 5%' : 'Middle 50%'}
                  </div>
                </div>
              </div>
            </div>

            {/* Right 1/3: Examiner's Verbatim Comments */}
            <div className="lg:pl-6 pt-4 lg:pt-0">
              <h3 className="text-sm font-bold text-stone-900 tracking-wider uppercase font-sans mb-1.5">
                Examiner's Remarks
              </h3>
              <blockquote className="text-xs italic text-stone-700 leading-relaxed font-serif">
                {!isSimulated ? (
                  "Tadhuba Samilu has demonstrated a satisfactory understanding of the core concepts. Performance is average across most papers. He shows strong potential in Computer Applications and Communication Skills, but needs to put in more effort in Computational Mathematics and Computer Architecture to improve his overall classification in Semester 2."
                ) : (
                  `Tadhuba Samilu has completed all Year 1 Semester 1 course units with a calculated GPA of ${summary.gpa.toFixed(2)}. Normal progression is verified.`
                )}
              </blockquote>
            </div>
          </div>
        </section>

        {/* Selected Course Continuous Assessment Breakdown (Interactive Inspector) */}
        {selectedEvaluated && (
          <section
            aria-label="Selected Course Unit Assessment Breakdown"
            className="no-print mt-4 border border-stone-200 bg-stone-50/80 p-4"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-stone-200 pb-3">
              <div>
                <div className="text-xs font-mono text-[#6B215C] font-semibold">
                  SELECTED UNIT CONTINUOUS ASSESSMENT RECORD · {selectedEvaluated.course.code}
                </div>
                <h3 className="text-sm font-bold text-stone-900 mt-0.5">
                  {selectedEvaluated.course.title}
                </h3>
              </div>
              <div className="text-xs text-stone-600 font-mono tabular-data">
                Venue: {selectedEvaluated.course.labVenue}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 mt-3 text-xs">
              <div>
                <div className="text-stone-500">Test 1 (Written Theory)</div>
                <div className="font-mono font-semibold text-stone-900 text-sm tabular-data mt-0.5">
                  {selectedEvaluated.course.test1} / 15
                </div>
              </div>
              <div>
                <div className="text-stone-500">Practical Lab Assessment</div>
                <div className="font-mono font-semibold text-stone-900 text-sm tabular-data mt-0.5">
                  {selectedEvaluated.course.practicalLab} / 15
                </div>
              </div>
              <div>
                <div className="text-stone-500">Coursework Assignment</div>
                <div className="font-mono font-semibold text-stone-900 text-sm tabular-data mt-0.5">
                  {selectedEvaluated.course.assignment} / 10
                </div>
              </div>
              <div>
                <div className="text-stone-500">Total Coursework (40%) + Exam (60%)</div>
                <div className="font-mono font-semibold text-[#6B215C] text-sm tabular-data mt-0.5">
                  {selectedEvaluated.grade.courseworkTotal}/40 + {selectedEvaluated.grade.examTotal}/60 ={' '}
                  {selectedEvaluated.grade.finalMark}% ({selectedEvaluated.grade.letterGrade})
                </div>
              </div>
            </div>

            <div className="mt-3 pt-3 border-t border-stone-200/80 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs text-stone-600">
              <div>
                <span className="font-semibold text-stone-800">Practical Lab Project:</span>{' '}
                {selectedEvaluated.course.practicalProject}
              </div>
              <div>
                <span className="font-semibold text-stone-800">Instructor Remarks:</span>{' '}
                {selectedEvaluated.course.competencySummary}
              </div>
            </div>
          </section>
        )}

        {/* Semester GPA, CGPA & Academic Progression Decision */}
        <section
          aria-label="Semester Academic Standing Summary"
          className="mt-6 border-y border-stone-300 py-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          <div>
            <div className="text-xs text-stone-500">Semester GPA (SGPA)</div>
            <div className="text-2xl font-mono font-bold text-[#6B215C] tabular-data mt-0.5">
              {summary.gpa.toFixed(2)} <span className="text-sm font-normal text-stone-500">/ 5.00</span>
            </div>
            <div className="text-xs text-stone-500 mt-0.5">
              {summary.totalWeightedPoints.toFixed(1)} WGP across {summary.totalCreditUnits} Credit Units
            </div>
          </div>

          <div>
            <div className="text-xs text-stone-500">Cumulative GPA (CGPA)</div>
            <div className="text-2xl font-mono font-bold text-stone-900 tabular-data mt-0.5">
              {summary.cgpa.toFixed(2)} <span className="text-sm font-normal text-stone-500">/ 5.00</span>
            </div>
            <div className="text-xs text-stone-500 mt-0.5">
              Cumulative after Year 1 Semester 1
            </div>
          </div>

          <div>
            <div className="text-xs text-stone-500">Academic Standing &amp; Remark</div>
            <div className="text-sm font-semibold text-emerald-800 mt-1">
              {summary.academicStanding}
            </div>
            <div className="text-xs text-stone-500 mt-0.5">
              Eligible to register for Year 1 Semester 2
            </div>
          </div>

          <div>
            <div className="text-xs text-stone-500">Class of Diploma Trajectory</div>
            <div className="text-sm font-semibold text-stone-900 mt-1">
              {summary.honoursClass}
            </div>
            <div className="text-xs text-stone-500 mt-0.5">
              Motto: {GIIT_INSTITUTION_INFO.motto}
            </div>
          </div>
        </section>

        {/* Official Signatures, Institutional Stamp & Verification Block */}
        <section aria-label="Official Endorsement and Signatures" className="mt-8 pt-2">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-end">
            {/* Head of Department Signature */}
            <div className="border-t border-stone-400 pt-2">
              <div className="font-serif italic text-lg text-stone-800 select-none">
                Eng. R. Mugisha
              </div>
              <div className="text-xs font-semibold text-stone-900">
                HEAD OF DEPARTMENT, COMPUTER SCIENCE &amp; IT
              </div>
              <div className="text-xs text-stone-500">
                Global Institute of IT &amp; Business, Makerere
              </div>
            </div>

            {/* Official Institutional Stamp */}
            <div className="flex flex-col items-center justify-center">
              <div className="border-2 border-[#6B215C]/80 px-5 py-2 text-center text-[#6B215C] rotate-[-2deg] select-none">
                <div className="text-[10px] font-mono font-bold tracking-widest uppercase">
                  GLOBAL INSTITUTE (GI-IT) MAKERERE
                </div>
                <div className="text-xs font-serif font-bold tracking-wide my-0.5">
                  ACADEMIC REGISTRAR · VERIFIED
                </div>
                <div className="text-[10px] font-mono tabular-data">
                  {student.issueDate} · {student.regNumber}
                </div>
              </div>
            </div>

            {/* Academic Registrar Signature */}
            <div className="border-t border-stone-400 pt-2 md:text-right">
              <div className="font-serif italic text-lg text-stone-800 select-none">
                Dr. H. K. Ssekandi
              </div>
              <div className="text-xs font-semibold text-stone-900">
                ACADEMIC REGISTRAR
              </div>
              <div className="text-xs text-stone-500">
                Issued: {student.issueDate} · Kampala, Uganda
              </div>
            </div>
          </div>
        </section>

        {/* Collapsible / Printable NCHE & UBTEB Grading Scale Key */}
        <section aria-label="Grading Scale Key" className="mt-8 pt-4 border-t border-stone-200">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-stone-700">
              Official GI-IT Makerere / UBTEB 5.0 Grading Scale Reference
            </span>
            <button
              type="button"
              onClick={() => setShowGradingKey((prev) => !prev)}
              className="no-print text-xs font-medium text-[#6B215C] hover:underline cursor-pointer"
            >
              {showGradingKey ? 'Hide Grading Scale' : 'Show Grading Scale'}
            </button>
          </div>

          {showGradingKey && (
            <div className="mt-2 grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2 text-xs">
              {GRADING_SCALE_TABLE.map((row) => (
                <div key={row.letter} className="border border-stone-200 p-2 bg-stone-50/50">
                  <div className="flex items-center justify-between font-mono font-semibold text-stone-900 tabular-data">
                    <span>Grade {row.letter}</span>
                    <span className="text-[#6B215C]">GP {row.gp}</span>
                  </div>
                  <div className="font-mono text-[11px] text-stone-600 tabular-data mt-0.5">
                    {row.range}
                  </div>
                  <div className="text-[10px] text-stone-500 mt-0.5 truncate" title={row.interpretation}>
                    {row.interpretation}
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </article>
    </div>
  );
};
