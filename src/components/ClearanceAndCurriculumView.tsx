import React, { useState } from 'react';
import { GIIT_INSTITUTION_INFO, StudentProfile } from '../data/academicData';

interface ClearanceAndCurriculumViewProps {
  student: StudentProfile;
  mode: 'clearance' | 'curriculum';
}

export const ClearanceAndCurriculumView: React.FC<ClearanceAndCurriculumViewProps> = ({
  student,
  mode,
}) => {
  const [selectedSemIndex, setSelectedSemIndex] = useState<number>(0);
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const handleCopy = (value: string, label: string) => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(value).catch(() => {});
    }
    setCopiedCode(label);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  if (mode === 'clearance') {
    return (
      <div className="space-y-8">
        {/* Financial & Requirements Clearance Summary */}
        <section
          aria-label="Semester 1 Financial and Requirements Clearance Statement"
          className="bg-white border border-stone-200 p-6 sm:p-8"
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-stone-200 pb-5">
            <div>
              <div className="text-xs font-mono text-[#6B215C] font-semibold">
                BURSAR &amp; ACADEMIC REGISTRAR CLEARANCE RECORD · {student.regNumber}
              </div>
              <h2 className="text-xl font-bold text-stone-900 font-display mt-0.5">
                01. Semester 1 Tuition &amp; Mandatory Requirements Clearance
              </h2>
              <p className="text-sm text-stone-600 mt-0.5">
                At GI-IT Makerere, examination reports are unlocked upon 100% completion of tuition fees, UNEB verification, and semester store items.
              </p>
            </div>

            <div className="text-left sm:text-right font-mono tabular-data shrink-0">
              <div className="text-xs text-stone-500">Outstanding Balance</div>
              <div className="text-2xl font-bold text-emerald-800">UGX 0</div>
              <div className="text-xs text-emerald-800 font-sans font-medium mt-0.5">
                ✓ Cleared for Transcript Issuance
              </div>
            </div>
          </div>

          {/* Clearance Ledger Table */}
          <div className="mt-6 overflow-x-auto border border-stone-200">
            <table className="w-full text-left border-collapse text-sm">
              <thead>
                <tr className="border-b border-stone-200 bg-stone-100 text-xs font-semibold text-stone-700">
                  <th className="py-2.5 px-3">Clearance Item / Semester Requirement</th>
                  <th className="py-2.5 px-3 text-right font-mono">Billed / Required</th>
                  <th className="py-2.5 px-3 text-right font-mono">Cleared / Paid</th>
                  <th className="py-2.5 px-3 text-right font-mono">Balance</th>
                  <th className="py-2.5 px-3 font-mono">Receipt / Ref No.</th>
                  <th className="py-2.5 px-3">Payment / Verification Channel</th>
                  <th className="py-2.5 px-3">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-200">
                {GIIT_INSTITUTION_INFO.semesterClearanceItems.map((entry, idx) => (
                  <tr key={idx} className="hover:bg-stone-50 transition-colors">
                    <td className="py-3 px-3 font-medium text-stone-900">{entry.item}</td>
                    <td className="py-3 px-3 text-right font-mono tabular-data text-stone-700">
                      {entry.requirement}
                    </td>
                    <td className="py-3 px-3 text-right font-mono tabular-data text-stone-900 font-medium">
                      {entry.paid}
                    </td>
                    <td className="py-3 px-3 text-right font-mono tabular-data text-stone-600">
                      {entry.balance}
                    </td>
                    <td className="py-3 px-3 font-mono text-xs text-[#6B215C] tabular-data">
                      {entry.receiptNo}
                      <span className="text-stone-400"> · {entry.date}</span>
                    </td>
                    <td className="py-3 px-3 text-xs text-stone-600">{entry.channel}</td>
                    <td className="py-3 px-3 text-xs font-semibold text-emerald-800 whitespace-nowrap">
                      ✓ {entry.status}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Official GI-IT Makerere Payment Options Reference */}
        <section
          aria-label="Official GI-IT Makerere Bank and SchoolPay Channels"
          className="bg-white border border-stone-200 p-6 sm:p-8"
        >
          <h2 className="text-lg font-bold text-stone-900 font-display">
            02. Official GI-IT Makerere Payment Channels (For Year 1 Semester 2 Registration)
          </h2>
          <p className="text-sm text-stone-600 mt-1">
            Official bank accounts and SchoolPay merchant code for Global Institute of Information Technology and Business, Makerere.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-5">
            <div className="border border-stone-200 p-5 bg-stone-50/50">
              <div className="text-xs font-mono text-stone-500">OPTION 01 · BANK DEPOSIT</div>
              <h3 className="text-base font-bold text-stone-900 mt-1">
                Diamond Trust Bank (DTB)
              </h3>
              <div className="font-mono text-lg font-bold text-[#6B215C] tabular-data mt-2">
                A/C: 000 246 1002
              </div>
              <div className="mt-3">
                <button
                  type="button"
                  onClick={() => handleCopy('0002461002', 'DTB')}
                  className="text-xs font-medium text-[#6B215C] hover:underline cursor-pointer"
                >
                  {copiedCode === 'DTB' ? '✓ Account Number Copied' : 'Copy Account Number'}
                </button>
              </div>
            </div>

            <div className="border border-stone-200 p-5 bg-stone-50/50">
              <div className="text-xs font-mono text-stone-500">OPTION 02 · BANK DEPOSIT</div>
              <h3 className="text-base font-bold text-stone-900 mt-1">
                Housing Finance Bank
              </h3>
              <div className="font-mono text-lg font-bold text-[#6B215C] tabular-data mt-2">
                A/C: 010 046 1953
              </div>
              <div className="mt-3">
                <button
                  type="button"
                  onClick={() => handleCopy('0100461953', 'HFB')}
                  className="text-xs font-medium text-[#6B215C] hover:underline cursor-pointer"
                >
                  {copiedCode === 'HFB' ? '✓ Account Number Copied' : 'Copy Account Number'}
                </button>
              </div>
            </div>

            <div className="border border-stone-200 p-5 bg-stone-50/50">
              <div className="text-xs font-mono text-stone-500">OPTION 03 · MTN &amp; AIRTEL</div>
              <h3 className="text-base font-bold text-stone-900 mt-1">
                SchoolPay Mobile Money
              </h3>
              <div className="font-mono text-lg font-bold text-[#6B215C] tabular-data mt-2">
                CODE: 1004185834
              </div>
              <div className="mt-3">
                <button
                  type="button"
                  onClick={() => handleCopy('1004185834', 'SP')}
                  className="text-xs font-medium text-[#6B215C] hover:underline cursor-pointer"
                >
                  {copiedCode === 'SP' ? '✓ SchoolPay Code Copied' : 'Copy SchoolPay Code'}
                </button>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Two-Column Curriculum & Programme Objectives */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left 7 Cols: 2-Year Diploma in IT Curriculum Structure */}
        <section
          aria-label="2-Year Diploma in Information Technology Curriculum"
          className="lg:col-span-7 bg-white border border-stone-200 p-6 sm:p-8"
        >
          <div className="border-b border-stone-200 pb-4">
            <div className="text-xs font-mono text-[#6B215C] font-semibold">
              COMPUTER SCIENCE DEPARTMENT · 2 YEARS HANDS-ON DURATION
            </div>
            <h2 className="text-xl font-bold text-stone-900 font-display mt-0.5">
              01. Diploma in Information Technology Curriculum Roadmap
            </h2>
            <p className="text-sm text-stone-600 mt-1">
              Select a semester below to inspect the course units required for graduation at GI-IT Makerere.
            </p>
          </div>

          <div className="flex flex-wrap gap-1.5 mt-4" role="tablist">
            {GIIT_INSTITUTION_INFO.fullCurriculumRoadmap.map((sem, idx) => (
              <button
                key={sem.semesterLabel}
                type="button"
                role="tab"
                aria-selected={selectedSemIndex === idx}
                onClick={() => setSelectedSemIndex(idx)}
                className={`px-3 py-1.5 text-xs font-medium transition-colors whitespace-nowrap cursor-pointer ${
                  selectedSemIndex === idx
                    ? 'bg-[#6B215C] text-white'
                    : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
                }`}
              >
                Year {Math.floor(idx / 2) + 1} · Sem {(idx % 2) + 1}
              </button>
            ))}
          </div>

          <div className="mt-5 border border-stone-200 p-5 bg-stone-50/40">
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-stone-200 pb-3">
              <h3 className="text-base font-bold text-stone-900">
                {GIIT_INSTITUTION_INFO.fullCurriculumRoadmap[selectedSemIndex].semesterLabel}
              </h3>
              <span className="text-xs font-mono text-[#6B215C] font-semibold">
                {GIIT_INSTITUTION_INFO.fullCurriculumRoadmap[selectedSemIndex].status}
              </span>
            </div>

            <ul className="divide-y divide-stone-200 mt-2 text-sm">
              {GIIT_INSTITUTION_INFO.fullCurriculumRoadmap[selectedSemIndex].units.map(
                (unit, unitIdx) => (
                  <li key={unitIdx} className="py-2.5 flex items-center justify-between gap-4">
                    <span className="text-stone-800 font-mono text-xs sm:text-sm">{unit}</span>
                    <span className="text-xs text-stone-500 shrink-0">
                      {selectedSemIndex === 0 ? '✓ Graded on Report' : 'Scheduled'}
                    </span>
                  </li>
                )
              )}
            </ul>
          </div>
        </section>

        {/* Right 5 Cols: Official GI-IT Programme Objectives (From Campus Brochure) */}
        <section
          aria-label="Official GI-IT Diploma in Information Technology Programme Objectives"
          className="lg:col-span-5 bg-white border border-stone-200 p-6 sm:p-8"
        >
          <div className="border-b border-stone-200 pb-4">
            <div className="text-xs font-mono text-[#6B215C] font-semibold">
              GI-IT MAKERERE ACADEMIC CHARTER
            </div>
            <h2 className="text-xl font-bold text-stone-900 font-display mt-0.5">
              02. Programme Objectives
            </h2>
            <p className="text-sm text-stone-600 mt-1">
              With in-house technicians, companies are more secure in terms of business secrets and internal knowledge sharing, which is why GI-IT started the Diploma in Information Technology. This course aims at:
            </p>
          </div>

          <ul className="mt-4 space-y-3 text-sm text-stone-800 leading-relaxed">
            {GIIT_INSTITUTION_INFO.programmeObjectives.map((objective, idx) => (
              <li key={idx} className="pb-2.5 border-b border-stone-100 last:border-none">
                {objective}
              </li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  );
};
