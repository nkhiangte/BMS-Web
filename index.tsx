
import React, { useState, useEffect, useRef } from 'react';
import { createRoot } from 'react-dom/client';
import jsPDF from 'jspdf';

interface CalendarEvent {
  date: string;
  day: string;
  particulars: string;
}

type CalendarSection = 'primary' | 'middle' | 'high' | 'higherSecondary';

const calendarData: Record<CalendarSection, CalendarEvent[]> = {
  primary: [
    { date: '07.04.2025', day: 'Monday', particulars: 'School Re-Opens for 2025-2026' },
    { date: '10.04.2025', day: 'Thursday', particulars: 'Mahavir Jayanti (Holiday)' },
    { date: '18.04.2025', day: 'Friday', particulars: 'Good Friday (Holiday)' },
    { date: '12.05.2025', day: 'Monday', particulars: 'Buddha Purnima (Holiday)' },
    { date: '07.06.2025', day: 'Saturday', particulars: "Idu'l Zuha (Holiday)" },
    { date: '15.06.2025', day: 'Sunday', particulars: 'YMA Day (Holiday)' },
    { date: '30.06.2025', day: 'Monday', particulars: 'Remna Ni (Holiday)' },
    { date: '06.07.2025', day: 'Sunday', particulars: 'MHIP Day (Holiday)' },
    { date: '06.07.2025', day: 'Sunday', particulars: 'Muharram (Holiday)' },
    { date: '18.07.2025 - 29.07.2025', day: 'Tuesday - Thursday', particulars: 'First Term Exam, Publication of Result' },
    { date: '30.07.2025 - 01.08.2025', day: 'Wednesday - Friday', particulars: 'Vacation (3 days)' },
    { date: '04.08.2025', day: 'Monday', particulars: 'School Re-Opens for 2nd Term.' },
    { date: '15.08.2025', day: 'Friday', particulars: 'Independence Day (Holiday)' },
    { date: '16.08.2025', day: 'Saturday', particulars: 'Janmashtami (Holiday)' },
    { date: '05.09.2025', day: 'Friday', particulars: "Teachers' Day (will be Calibrate on 4th September 2025)" },
    { date: '05.09.2025', day: 'Friday', particulars: "Prophet Mohamed's Birthday (Id-e- Milad)" },
    { date: '02.10.2025', day: 'Thursday', particulars: "Mahatma Gandhi's Birthday (Holiday" },
    { date: '02.10.2025', day: 'Thursday', particulars: 'Dussehra (Vijay Dashmi) (Holiday)' },
    { date: '20.10.2025', day: 'Monday', particulars: 'Diwali (Deepavalli) (Holiday)' },
    { date: '27.10.2025', day: 'Monday', particulars: 'Zirlaite Ni (Not Holiday)' },
    { date: '05.11.2025', day: 'Wednesday', particulars: "Guru Nanak's Birthday (Holiday)" },
    { date: '03.11.2025 - 14.11.2025', day: 'Monday - Friday', particulars: 'Second Term Exam, Publication of Result' },
    { date: '17.11.2025', day: 'Monday', particulars: 'Vacation (1 day)' },
    { date: '18.11.2025', day: 'Tuesday', particulars: 'School re- Open for 3rd Term' },
    { date: '19.11.2025 - 21.11.2025', day: 'Wednesday - Friday', particulars: 'Primary School Zonal Sport' },
    { date: '15.12.2025 - 06.01.2026', day: 'Monday - Tuesday', particulars: 'Winter vacation (23 days)' },
    { date: '07.01.2026', day: 'Wednesday', particulars: 'School Re-Open for On-going session' },
    { date: '11.01.2026', day: 'Saturday', particulars: 'Missionary Day (Holiday)' },
    { date: '26.01.2026', day: 'Sunday', particulars: 'Republic Day (Holiday)' },
    { date: '20.02.2026', day: 'Thursday', particulars: 'State Day (Holiday)' },
    { date: '16.02.2026 - 27.02.2026', day: 'Monday - Friday', particulars: 'Third Term Exam, Publication of Result' },
    { date: '02.03.2026 - 31.03.2026', day: 'Monday - Tuesday', particulars: 'Year End vacation (30 Days)' },
    { date: '01.04.2026', day: 'Wednesday', particulars: 'SCHOOL OPEN FOR 2025 - 2026' },
  ],
  middle: [
    { date: '07.04.2025', day: 'Monday', particulars: 'School Re-Open for 2025 - 2026' },
    { date: '10.04.2025', day: 'Thursday', particulars: 'Mahavir Jayanti (Holiday)' },
    { date: '18.04.2025', day: 'Friday', particulars: 'Good Friday (Holiday)' },
    { date: '12.05.2025', day: 'Monday', particulars: 'Buddha Purnima (Holiday)' },
    { date: '07.06.2025', day: 'Saturday', particulars: "Idu'l Zuha (Holiday)" },
    { date: '15.06.2025', day: 'Sunday', particulars: 'YMA Day (Holiday)' },
    { date: '30.06.2025', day: 'Monday', particulars: 'Remna Ni (Holiday)' },
    { date: '06.07.2025', day: 'Sunday', particulars: 'MHIP Day (Holiday)' },
    { date: '06.07.2025', day: 'Sunday', particulars: 'Muharram (Holiday)' },
    { date: '18.07.2025 - 31.07.2025', day: 'Friday - Thursday', particulars: 'First Term Examination & Result Publication' },
    { date: '01.8.2025', day: 'Friday', particulars: 'Vacation (1 days)' },
    { date: '04.08.2025', day: 'Monday', particulars: 'School Re-Open for 2nd Term.' },
    { date: '15.08.2025', day: 'Friday', particulars: 'Independence Day (Holiday)' },
    { date: '16.08.2025', day: 'Saturday', particulars: 'Janmashtami (Holiday)' },
    { date: '05.09.2025', day: 'Friday', particulars: "Teachers' Day (Will be Calibrate on 4th September 2025)" },
    { date: '05.09.2025', day: 'Friday', particulars: "Prophet Mohamed's Birthday (Id-e-Milad) (Holiday)" },
    { date: '02.10.2025', day: 'Thursday', particulars: "Mahatma Gandhi's Birthday (Holiday)" },
    { date: '02.10.2025', day: 'Thursday', particulars: 'Dussehra (Vijay Dashmi) (Holiday)' },
    { date: '20.10.2025', day: 'Monday', particulars: 'Diwali (Deepavalli) (Holiday)' },
    { date: '27.10.2025', day: 'Monday', particulars: 'Zirlaite Ni (Not Holiday)' },
    { date: '05.11.2025', day: 'Wednesday', particulars: "Guru Nanak's Birthday (Holiday)" },
    { date: '03.11.2025 - 14.11.2025', day: 'Monday - Friday', particulars: 'Second Term Examination & Result Publication' },
    { date: '17.11.2025', day: 'Monday', particulars: 'Vacation (1 days)' },
    { date: '18.11.2025', day: 'Tuesday', particulars: 'School Re-Open for 3rd Term' },
    { date: '25.11.2025 - 28.11.2025', day: 'Tuesday - Friday', particulars: 'Middle School Zonal Sport' },
    { date: '15.12.2025 - 06.01.2026', day: 'Monday - Tuesday', particulars: 'Winter vacation (23 days)' },
    { date: '07.01.2026', day: 'Wednesday', particulars: 'School Re-Open for On-going session' },
    { date: '11.01.2026', day: 'Sunday', particulars: 'Missionary Day (Holiday)' },
    { date: '26.01.2026', day: 'Monday', particulars: 'Republic Day (Holiday)' },
    { date: '20.02.2026', day: 'Friday', particulars: 'State Day (Holiday)' },
    { date: '16.02.2026 - 27.02.2026', day: 'Monday - Friday', particulars: 'Third Term Examination & Result Publication' },
    { date: '02.03.2026 - 20.03.2026', day: 'Monday - Friday', particulars: 'Preparation of School Gardening & CCA' },
    { date: '06.03.2026', day: 'Friday', particulars: 'Chapchar kut (Holiday)' },
    { date: '23.3.2026 - 31.03.2026', day: 'Monday - Tuesday', particulars: 'Year End Vacation (9 Days)' },
    { date: '01.04.2026', day: 'Wednesday', particulars: 'SCHOOL OPEN FOR 2025 - 2026 SESSION' },
  ],
  high: [
    { date: '07.04.2025', day: 'Monday', particulars: 'School Re- Opens for 2025 - 2026' },
    { date: '10.04.2025', day: 'Thursday', particulars: 'Mahavir Jayanti (Holiday)' },
    { date: '18.04.2025', day: 'Friday', particulars: 'Good Friday (Holiday)' },
    { date: '12.05.2025', day: 'Monday', particulars: 'Buddha Purnima (Holiday)' },
    { date: '07.06.2025', day: 'Saturday', particulars: "Idu'l Zuha (Holiday)" },
    { date: '15.06.2025', day: 'Sunday', particulars: 'YMA Day (Holiday)' },
    { date: '30.06.2025', day: 'Monday', particulars: 'Remna Ni (Holiday)' },
    { date: '06.07.2025', day: 'Sunday', particulars: 'MHIP DAY (Holiday)' },
    { date: '06.07.2025', day: 'Sunday', particulars: 'Muharan (Holiday)' },
    { date: '18.07.2025 - 31.07.2025', day: 'Monday - Friday', particulars: 'First Term Examination & Result Publication' },
    { date: '03.08.2025', day: 'Friday', particulars: 'Vacation (1 day)' },
    { date: '04.08.2025', day: 'Monday', particulars: 'School Re- Open for 2nd Term.' },
    { date: '15.08.2025', day: 'Friday', particulars: 'Independence Day (Holiday)' },
    { date: '16.08.2025', day: 'Saturday', particulars: 'Janmashtami (Holiday)' },
    { date: '05.09.2025', day: 'Friday', particulars: "Teachers' Day (Will be Calibration on 4th September 2025)" },
    { date: '05.09.2025', day: 'Friday', particulars: "Prophet Mohamed's Birthday (Id-e-Milad (Holiday))" },
    { date: '02.10.2025', day: 'Thursday', particulars: "Mahatma Gandhi's Birthday (Holiday)" },
    { date: '02.10.2025', day: 'Thursday', particulars: 'Dussehra (Vijay Dashmi) (Holiday)' },
    { date: '07.10.2025 - 10.10.2025', day: 'Tuesday - Friday', particulars: 'District Secondary School Sport' },
    { date: '20.10.2025', day: 'Monday', particulars: 'Diwali (Deepavalli) (Holiday)' },
    { date: '27.10.2025', day: 'Monday', particulars: 'Zirlaite Ni (Not Holiday)' },
    { date: '05.11.2025', day: 'Wednesday', particulars: "Guru Nanak's Birthday (Holiday)" },
    { date: '03.11.2025 - 14.11.2025', day: 'Monday - Friday', particulars: 'Second Term Examination & Result Publication' },
    { date: '17.11.2025', day: 'Monday', particulars: 'Vacation (1 day)' },
    { date: '18.11.2025', day: 'Tuesday', particulars: 'School Re- Open for 3rd Term' },
    { date: '09.12.2025 - 12.12.2025', day: 'Tuesday - Friday', particulars: 'Secondary School Games' },
    { date: '15.12.2025 - 06.01.2026', day: 'Monday -Tuesday', particulars: 'Winter vacation (23 days)' },
    { date: '07.01.2026', day: 'Wednesday', particulars: 'School Re- Open for On-going session' },
    { date: '11.01.2026', day: 'Sunday', particulars: 'Missionary Day (Holiday)' },
    { date: '26.01.2026', day: 'Monday', particulars: 'Republic Day (Holiday)' },
    { date: '20.01.2026', day: 'Friday', particulars: 'Sate Day (Holiday)' },
    { date: '16.02.2026 - 27.02.2026', day: 'Monday - Friday', particulars: 'Third Term Examination & Result Publication' },
    { date: '16.02.2026 - 27.02.2026', day: 'Monday - Friday', particulars: 'Preparation for HSLC Exam' },
    { date: '02.03.2026 - 31.03.2026', day: 'Monday - Tuesday', particulars: 'Year End Vacation (30 Days)' },
    { date: 'HSLC Examination will be Conducted within February to March, 2026', day: '', particulars: 'Class XI School will start within two weeks after publication of HSLC Result.' },
    { date: '01.04.2026', day: 'Wednesday', particulars: 'SCHOOL OPEN FOR 2025 - 2026 ACADEMIC SESSION' },
  ],
  higherSecondary: [
    { date: '07.04.2025', day: 'Monday', particulars: 'School Re- Opens for 2025 -2026' },
    { date: '10.04.2025', day: 'Thursday', particulars: 'Mahavir Jayanti (Holiday)' },
    { date: '18.04.2025', day: 'Friday', particulars: 'Good Friday (Holiday)' },
    { date: '12.05.2025', day: 'Monday', particulars: 'Buddha Purnima (Holiday)' },
    { date: '07.06.2025', day: 'Saturday', particulars: "Idu'l Zuha (Holiday)" },
    { date: '15.06.2025', day: 'Sunday', particulars: 'YMA Day (Holiday)' },
    { date: '30.06.2025', day: 'Monday', particulars: 'Remna Ni (Holiday)' },
    { date: '06.07.2025', day: 'Sunday', particulars: 'MHIP Day (Holiday)' },
    { date: '06.07.2025', day: 'Sunday', particulars: 'Muharram (Holiday)' },
    { date: '18.07.2025 - 31.07.2025', day: 'Friday - Thursday', particulars: 'First Term Examination & Result Publication' },
    { date: '01.08.2025', day: 'Friday', particulars: 'Vacation (1 day)' },
    { date: '04.08.2025', day: 'Monday', particulars: 'School Re- Open for 2nd Term.' },
    { date: '15.08.2025', day: 'Friday', particulars: 'Independence Day (Holiday)' },
    { date: '16.08.2025', day: 'Saturday', particulars: 'Janmashtami (Holiday)' },
    { date: '05.09.2025', day: 'Friday', particulars: "Teachers' Day (Will be Calibrate on 4th September 2025)" },
    { date: '05.09.2025', day: 'Friday', particulars: "Prophet Mohomed's Birthday (Id-e-Milad) (Holiday)" },
    { date: '02.10.2025', day: 'Thursday', particulars: "Mahatma Gandhi's Birthday (Holiday)" },
    { date: '02.10.2025', day: 'Thursday', particulars: 'Dussehra (Vijay Dashmi) (Holiday)' },
    { date: '20.10.2025', day: 'Monday', particulars: 'Diwali (Deepavalli) (Holiday)' },
    { date: '27.10.2025', day: 'Monday', particulars: 'Zirlaite Ni (Not Holiday)' },
    { date: '05.11.2025', day: 'Wednesday', particulars: "Guru Nanak's Birthday (Holiday)" },
    { date: '03.11.2025 - 14.11.2025', day: 'Monday - Friday', particulars: 'Second Term Examination & Result Publication' },
    { date: '17.11.2025', day: 'Monday', particulars: 'Vacation (1 day)' },
    { date: '18.11.2025', day: 'Tuesday', particulars: 'School Re- Open for 3rd Term' },
    { date: '01.12.2025 - 05.12.2025', day: 'Monday-Friday', particulars: 'Higher Secondary School Games' },
    { date: '15.12.2025 - 06.01.2026', day: 'Monday -Tuesday', particulars: 'Winter Vacation (23 days)' },
    { date: '07.01.2026', day: 'Wednesday', particulars: 'School Re- Open for On-going session' },
    { date: '11.01.2026', day: 'Sunday', particulars: 'Missionary Day (Holiday)' },
    { date: '26.01.2026', day: 'Monday', particulars: 'Republic Day (Holiday)' },
    { date: '20.02.2026', day: 'Friday', particulars: 'State Day (Holiday)' },
    { date: '16.02.2026 - 27.02.2026', day: 'Monday - Friday', particulars: 'Third Term Examination & Result Publication' },
    { date: '16.02.2026 - 27.02.2026', day: 'Monday - Friday', particulars: 'Practical Exam and Preparation for HSSLC Exam' },
    { date: '02.03.2026 - 31.03.2026', day: 'Monday - Tuesday', particulars: 'Year End Vacation (30 days)' },
    { date: 'HSSLC Examination Will Conducted within February to March, 2026', day: '', particulars: '' },
    { date: '01.04.2026', day: 'Wednesday', particulars: 'SCHOOL OPEN FOR 2025 - 2026 ACADEMIC SESSION' },
  ],
};

const initialFormData = {
  studentName: '',
  className: '',
  dob: '',
  gender: '',
  aadhaar: '',
  fatherName: '',
  motherName: '',
  parentOccupation: '',
  parentAadhaar: '',
  guardianName: '',
  address: '',
  contactNo: '',
  pen: '',
  cwsn: '',
  bloodGroup: '',
  lastSchool: '',
  lastGrade: '',
  achievements: '',
  healthIssues: ''
};

interface PageProps {
  onBack: () => void;
}

const AdmissionsPage = ({ onBack }: PageProps) => {
  const [admissionView, setAdmissionView] = useState('main'); // 'main', 'guidelines', 'online-form', 'fee-structure'
  const [formData, setFormData] = useState(initialFormData);
  const [submittedData, setSubmittedData] = useState<{ id: string; name: string } | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const uniqueId = `BMS-${Date.now()}`;
    setSubmittedData({ id: uniqueId, name: formData.studentName });
    setFormData(initialFormData); // Reset form
  };

  const handleOnlineApplyClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    setAdmissionView('online-form');
    setSubmittedData(null); // Reset submission state when opening form
  };
  
  const handleProspectusDownload = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const doc = new jsPDF();
    const pageHeight = doc.internal.pageSize.height;
    const pageWidth = doc.internal.pageSize.width;
    const margin = 15;
    let y = 20;

    const addWrappedText = (text: string) => {
        const lines = doc.splitTextToSize(text, pageWidth - (margin * 2));
        doc.text(lines, margin, y);
        y += (lines.length * 5) + 3; // Adjust spacing after paragraph
    };
    
    const addSectionTitle = (title: string) => {
        if (y > pageHeight - 30) { doc.addPage(); y = 20; }
        y += 5;
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(14);
        doc.text(title, margin, y);
        y += 8;
        doc.setFont('helvetica', 'normal');
        doc.setFontSize(11);
    }
    
    // Title
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(16);
    doc.text('Bethel Mission School, Champhai — Prospectus (2025)', pageWidth / 2, y, { align: 'center' });
    y += 12;

    // Sub-details
    doc.setFontSize(11);
    doc.setFont('helvetica', 'normal');
    doc.text('Established: 1996', margin, y);
    doc.text('Principal: K Malsawmdawngi', pageWidth / 2, y, { align: 'center' });
    doc.text('Affiliation: Mizoram Board of School Education (MBSE)', pageWidth - margin, y, { align: 'right' });
    y+=5;
    doc.text('Management: Private, Unaided', pageWidth - margin, y, { align: 'right' });
    y += 10;
    
    // Vision
    addSectionTitle('Vision');
    addWrappedText('To develop responsible, compassionate, and academically strong citizens who serve God and humanity.');

    // Mission
    addSectionTitle('Mission');
    addWrappedText('• Provide a safe, disciplined, and God-centered learning environment.');
    addWrappedText('• Deliver a balanced academic programme that builds knowledge, skills, and character.');
    addWrappedText('• Encourage co-curricular and community activities to develop leadership and service.');

    // Motto
    addSectionTitle('School Motto');
    doc.setFont('helvetica', 'bolditalic');
    addWrappedText('Service to God & Men');
    doc.setFont('helvetica', 'normal');

    // Principal's Message
    addSectionTitle("Principal's Message");
    addWrappedText("It is my honour to welcome you to Bethel Mission School, Champhai. Since our founding in 1996, our school has aimed to provide quality education rooted in Christian values. We strive not only for academic excellence but also for the spiritual and moral growth of every student. Our dedicated teachers and staff work together to create a nurturing environment where children can discover their gifts and grow in confidence. We invite you to partner with us in your child’s education and formation. Together we will ensure a safe, disciplined, and joyful learning experience for every student. Warm regards, K Malsawmdawngi \nPrincipal");
    
    // About
    addSectionTitle("About the School");
    addWrappedText("Bethel Mission School is a private unaided institution located in Champhai. We are affiliated with the Mizoram Board of School Education and currently offer education from Nursery through Class X. Over the years we have maintained high standards of teaching while keeping fees affordable, in keeping with our mission to serve the community.");
    
    // Academic Programme
    addSectionTitle("Academic Programme");
    addWrappedText("• Pre-Primary & Primary (Nursery — Class V): Foundational literacy and numeracy, environmental awareness, and moral instruction.");
    addWrappedText("• Upper Primary & Secondary (Class VI — Class X): Strong focus on subject knowledge and exam preparation aligned with MBSE curricular standards.");
    addWrappedText("• Regular assessments, remedial support, and parent-teacher meetings to support student progress.");
    
    // Co-curricular
    addSectionTitle("Co-curricular & Enrichment");
    addWrappedText("Music, Choir & Worship Teams, Sports (Football, Volleyball, Athletics), Debates, Elocution & Quiz Teams, Scouts/Guides and Community Service Projects.");
    
    // Facilities
    addSectionTitle("Facilities");
    addWrappedText("Classrooms with adequate seating and natural ventilation; Library with age-appropriate books and reference materials; Playground and sports area; Basic first-aid and a tie-up with a local clinic for emergencies; Clean drinking water and hygienic toilets.");

    // Admission Guidelines
    if (y > pageHeight - 50) { doc.addPage(); y = 20; }
    addSectionTitle("Admission Guidelines");
    addWrappedText("Eligibility: Nursery (as per school’s age criteria). Other classes based on previous school records and seat availability.");
    addWrappedText("Required Documents: Birth certificate, Transfer certificate (if applicable), Proof of residence, and 2 passport-size photographs.");
    addWrappedText("Steps: Collect and submit application form with documents, attend assessments/interview if required, and pay admission fee to confirm seat.");
    
    // Fee Structure
    addSectionTitle("Fee Structure (2025)");
    const tableData = [
        ['Nursery – Class II', '₹2,000', '₹1,000', '₹1,000'],
        ['Class III – V', '₹2,500', '₹1,500', '₹1,000'],
        ['Class VI – X', '₹3,000', '₹2,000', '₹1,000'],
    ];
    doc.setFont('helvetica', 'bold');
    doc.text('Stage / Class', margin, y);
    doc.text('Admission Fee', margin + 60, y);
    doc.text('Monthly Tuition Fee', margin + 100, y);
    doc.text('Annual Fee', margin + 150, y);
    y += 7;
    doc.setFont('helvetica', 'normal');
    tableData.forEach(row => {
        doc.text(row[0], margin, y);
        doc.text(row[1], margin + 60, y);
        doc.text(row[2], margin + 100, y);
        doc.text(row[3], margin + 150, y);
        y += 7;
    });
    y += 5;
    addWrappedText("Fees are payable on or before the 10th of every month. Late payment will attract a fine as per school policy. Uniforms, books, transport and activity fees are charged separately. Fees once paid are non-refundable.");

    doc.save('Bethel-Mission-School-Prospectus-2025.pdf');
  };

  const renderMainView = () => (
    <section className="card">
      <h3>Admission Information</h3>
      <ul>
        <li><a href="#" onClick={(e) => { e.preventDefault(); setAdmissionView('guidelines'); }}>Admission Guidelines</a></li>
        <li><a href="#">Important Dates</a></li>
        <li><a href="#" onClick={(e) => { e.preventDefault(); setAdmissionView('fee-structure'); }}>Fee Structure</a></li>
        <li><a href="#" onClick={handleProspectusDownload}>Prospectus Download</a></li>
        <li><a href="#" onClick={handleOnlineApplyClick}>Online Application Form</a></li>
      </ul>
    </section>
  );

  const renderGuidelinesView = () => (
    <section className="card admission-details">
      <button onClick={() => setAdmissionView('main')} className="back-button-inline">&larr; Back to Admissions</button>
      <div className="admission-header">
        <h3>Bethel Mission School, Champhai</h3>
        <p><em>“Service to God & Men”</em></p>
      </div>

      <p>Admissions are open from Nursery to Class X.</p>

      <h4>Eligibility:</h4>
      <ul className="guidelines-list">
        <li>Nursery – Child must be 5 years old by 1st April.</li>
        <li>For Class IX – Based on entrance personal interview and past records.</li>
        <li>No new admission for Class X</li>
      </ul>

      <h4>How to Apply:</h4>
      <ul className="guidelines-list">
        <li>Collect and fill the admission form from the school office or you can apply <a href="#" onClick={handleOnlineApplyClick}>online</a>.</li>
        <li>Submit the form with required documents.</li>
        <li>Appear for interview (Class IX).</li>
        <li>Admission is confirmed after selection & fee payment.</li>
      </ul>

      <h4>Documents Needed:</h4>
      <ul className="guidelines-list">
        <li>Birth Certificate (Nursery & Primary)</li>
        <li>Transfer Certificate & last report card (Class II onwards)</li>
        <li>Passport size photos (3)</li>
        <li>Aadhaar copy (student & parent/guardian)</li>
      </ul>

      <p>Admission is subject to availability of seats and school rules.</p>
      <p>The school reserves the right to grant or refuse admission.</p>
    </section>
  );
  
  const renderFeeStructureView = () => (
    <section className="card admission-details">
      <button onClick={() => setAdmissionView('main')} className="back-button-inline">&larr; Back to Admissions</button>
      <h3>Fee Structure (2025)</h3>
      <p>Fees are payable on or before the 10th of every month. Late payment will attract a fine as per school policy. Uniforms, books, transport and activity fees are charged separately. Fees once paid are non-refundable.</p>
      <div className="fee-table-container">
        <table className="fee-structure-table">
          <thead>
            <tr>
              <th>Stage / Class</th>
              <th>Admission Fee</th>
              <th>Monthly Tuition Fee</th>
              <th>Annual Fee (if any)</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Nursery – Class II</td>
              <td>₹2,000</td>
              <td>₹1,000</td>
              <td>₹1,000</td>
            </tr>
            <tr>
              <td>Class III – V</td>
              <td>₹2,500</td>
              <td>₹1,500</td>
              <td>₹1,000</td>
            </tr>
            <tr>
              <td>Class VI – X</td>
              <td>₹3,000</td>
              <td>₹2,000</td>
              <td>₹1,000</td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  );

  const renderOnlineFormView = () => (
     <section className="card admission-details">
      <button onClick={() => setAdmissionView('main')} className="back-button-inline">&larr; Back to Admissions</button>
      <h3>Online Application Form</h3>

      {submittedData ? (
        <div className="submission-success">
            <h4>Application Submitted Successfully!</h4>
            <p>Thank you, <strong>{submittedData.name}</strong>, for applying to Bethel Mission School.</p>
            <p>Please save your unique Admission ID for future reference:</p>
            <p className="admission-id">{submittedData.id}</p>
        </div>
      ) : (
        <>
        <p>Please fill out the form below to apply for admission. Ensure all details are accurate.</p>
        <form className="online-application-form" onSubmit={handleSubmit}>
          <div className="form-grid">
            <div className="form-group full-width">
              <label htmlFor="studentName">Student's Name</label>
              <input type="text" id="studentName" name="studentName" value={formData.studentName} onChange={handleInputChange} required />
            </div>
            <div className="form-group">
              <label htmlFor="className">Applying for Class</label>
              <select id="className" name="className" value={formData.className} onChange={handleInputChange} required>
                <option value="" disabled>Select a class</option>
                {[...Array(10).keys()].map(i => <option key={`class-${i+1}`} value={i + 1}>Class {i + 1}</option>)}
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="dob">Date of Birth</label>
              <input type="date" id="dob" name="dob" value={formData.dob} onChange={handleInputChange} required />
            </div>
             <div className="form-group">
              <label htmlFor="gender">Gender</label>
              <select id="gender" name="gender" value={formData.gender} onChange={handleInputChange} required>
                <option value="" disabled>Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="aadhaar">Aadhaar No.</label>
              <input type="text" id="aadhaar" name="aadhaar" pattern="\\d{12}" title="12 digit Aadhaar number" value={formData.aadhaar} onChange={handleInputChange} required />
            </div>
            <div className="form-group">
              <label htmlFor="fatherName">Father’s Name</label>
              <input type="text" id="fatherName" name="fatherName" value={formData.fatherName} onChange={handleInputChange} required />
            </div>
            <div className="form-group">
              <label htmlFor="motherName">Mother’s Name</label>
              <input type="text" id="motherName" name="motherName" value={formData.motherName} onChange={handleInputChange} required />
            </div>
            <div className="form-group">
              <label htmlFor="parentOccupation">Parent's Occupation</label>
              <input type="text" id="parentOccupation" name="parentOccupation" value={formData.parentOccupation} onChange={handleInputChange} required />
            </div>
            <div className="form-group">
              <label htmlFor="parentAadhaar">Mother/Father Aadhaar No.</label>
              <input type="text" id="parentAadhaar" name="parentAadhaar" pattern="\\d{12}" title="12 digit Aadhaar number" value={formData.parentAadhaar} onChange={handleInputChange} required />
            </div>
            <div className="form-group">
              <label htmlFor="guardianName">Guardian’s Name (if different)</label>
              <input type="text" id="guardianName" name="guardianName" value={formData.guardianName} onChange={handleInputChange} />
            </div>
             <div className="form-group">
              <label htmlFor="contactNo">Contact No.</label>
              <input type="tel" id="contactNo" name="contactNo" value={formData.contactNo} onChange={handleInputChange} required />
            </div>
            <div className="form-group full-width">
              <label htmlFor="address">Address</label>
              <textarea id="address" name="address" value={formData.address} onChange={handleInputChange} required></textarea>
            </div>
            <div className="form-group">
              <label htmlFor="pen">PEN</label>
              <input type="text" id="pen" name="pen" value={formData.pen} onChange={handleInputChange} />
            </div>
            <div className="form-group">
              <label htmlFor="cwsn">Whether CWSN?</label>
              <select id="cwsn" name="cwsn" value={formData.cwsn} onChange={handleInputChange} required>
                <option value="" disabled>Select an option</option>
                <option value="No">No</option>
                <option value="Yes">Yes</option>
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="bloodGroup">Blood Group</label>
              <select id="bloodGroup" name="bloodGroup" value={formData.bloodGroup} onChange={handleInputChange} required>
                  <option value="" disabled>Select Blood Group</option>
                  <option value="Under Investigation">Under Investigation</option>
                  <option value="A+">A+</option>
                  <option value="A-">A-</option>
                  <option value="B+">B+</option>
                  <option value="B-">B-</option>
                  <option value="AB+">AB+</option>
                  <option value="AB-">AB-</option>
                  <option value="O+">O+</option>
                  <option value="O-">O-</option>
              </select>
            </div>
             <div className="form-group">
              <label htmlFor="lastSchool">Last School Attended</label>
              <input type="text" id="lastSchool" name="lastSchool" value={formData.lastSchool} onChange={handleInputChange} />
            </div>
            <div className="form-group">
              <label htmlFor="lastGrade">Division/Grade in which he/she passed</label>
              <select id="lastGrade" name="lastGrade" value={formData.lastGrade} onChange={handleInputChange}>
                <option value="" disabled>Select Division/Grade</option>
                <option value="O">O</option>
                <option value="A">A</option>
                <option value="B">B</option>
                <option value="C">C</option>
                <option value="D">D</option>
                <option value="I">I</option>
                <option value="II">II</option>
                <option value="III">III</option>
              </select>
            </div>
            <div className="form-group full-width">
              <label htmlFor="achievements">Achievements (Academics/Extra-curricular)</label>
              <textarea id="achievements" name="achievements" value={formData.achievements} onChange={handleInputChange}></textarea>
            </div>
            <div className="form-group full-width">
              <label htmlFor="healthIssues">Any health issues the school should be aware of?</label>
              <textarea id="healthIssues" name="healthIssues" value={formData.healthIssues} onChange={handleInputChange}></textarea>
            </div>
          </div>
          <button type="submit">Submit Application</button>
        </form>
        </>
      )}
    </section>
  );

  const renderContent = () => {
    switch(admissionView) {
      case 'guidelines':
        return renderGuidelinesView();
      case 'online-form':
        return renderOnlineFormView();
      case 'fee-structure':
        return renderFeeStructureView();
      default:
        return renderMainView();
    }
  };

  return (
    <main className="site-main admissions-page">
      <div className="page-nav-buttons">
        <button onClick={onBack} className="back-button">
          &larr; Back
        </button>
        <button onClick={onBack} className="home-button">
          Home
        </button>
      </div>
      <h2 className="page-title">Admissions</h2>
      {renderContent()}
    </main>
  );
};

const FacultyPage = ({ onBack }: PageProps) => {
  return (
    <main className="site-main admissions-page">
      <div className="page-nav-buttons">
        <button onClick={onBack} className="back-button">
          &larr; Back
        </button>
        <button onClick={onBack} className="home-button">
          Home
        </button>
      </div>
      <h2 className="page-title">Faculty & Staff</h2>
      <section className="card">
        <h3>Our Team</h3>
        <ul>
          <li><a href="#">Teaching Staff Profiles</a></li>
          <li><a href="#">Administrative Staff</a></li>
          <li><a href="#">Non Teaching Staff</a></li>
        </ul>
      </section>
    </main>
  );
};

const FacilitiesPage = ({ onBack }: PageProps) => {
  return (
    <main className="site-main admissions-page">
      <div className="page-nav-buttons">
        <button onClick={onBack} className="back-button">
          &larr; Back
        </button>
        <button onClick={onBack} className="home-button">
          Home
        </button>
      </div>
      <h2 className="page-title">Facilities</h2>
      <section className="card">
        <h3>Our Facilities</h3>
        <ul>
          <li><a href="#">Classrooms & Labs</a></li>
          <li><a href="#">Library</a></li>
          <li><a href="#">Transport</a></li>
          <li><a href="#">Hostel</a></li>
        </ul>
      </section>
    </main>
  );
};

const FeePaymentPage = ({ onBack }: PageProps) => {
  return (
    <main className="site-main admissions-page">
      <div className="page-nav-buttons">
        <button onClick={onBack} className="back-button">
          &larr; Back
        </button>
        <button onClick={onBack} className="home-button">
          Home
        </button>
      </div>
      <h2 className="page-title">Fee Payment</h2>
      <section className="card">
        <h3>Online Fee Payment Portal</h3>
        <p>Please have your student's Admission ID or Registration Number ready before proceeding.</p>
        <p>Click the button below to be redirected to our secure payment gateway to complete the transaction.</p>
        <button className="payment-button" onClick={() => alert('Redirecting to payment gateway...')}>
          Proceed to Payment
        </button>
      </section>

      <section className="card" style={{ marginTop: '32px' }}>
        <h3>Fee Structure</h3>
        <div className="fee-table-container">
          <table className="fee-structure-table">
            <thead>
              <tr>
                <th>Stage / Class</th>
                <th>Admission Fee</th>
                <th>Monthly Tuition Fee</th>
                <th>Annual Fee (if any)</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Nursery – Class II</td>
                <td>₹2,000</td>
                <td>₹1,000</td>
                <td>₹1,000</td>
              </tr>
              <tr>
                <td>Class III – V</td>
                <td>₹2,500</td>
                <td>₹1,500</td>
                <td>₹1,000</td>
              </tr>
              <tr>
                <td>Class VI – X</td>
                <td>₹3,000</td>
                <td>₹2,000</td>
                <td>₹1,000</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </main>
  );
};

const AcademicsPage = ({ onBack }: PageProps) => {
  const [activeCalendarTab, setActiveCalendarTab] = useState<CalendarSection>('primary');

  return (
    <main className="site-main admissions-page">
      <div className="page-nav-buttons">
        <button onClick={onBack} className="back-button">
          &larr; Back
        </button>
        <button onClick={onBack} className="home-button">
          Home
        </button>
      </div>
      <h2 className="page-title">Academics</h2>
      <section className="card">
        <h3>Academic Information</h3>
        <ul>
          <li><a href="#">Curriculum Details</a></li>
          <li><a href="#">Subjects Offered</a></li>
          <li><a href="#">Teaching Methodology</a></li>
          <li><a href="#academic-calendar-section">Academic Calendar</a></li>
          <li><a href="#">Examination System / Grading</a></li>
        </ul>
      </section>

      <section id="academic-calendar-section" className="card" style={{ marginTop: '32px', scrollMarginTop: '120px' }}>
        <h3>Academic Calendar 2025-2026</h3>
        <div className="calendar-tabs">
          <button onClick={() => setActiveCalendarTab('primary')} className={activeCalendarTab === 'primary' ? 'active' : ''}>Primary</button>
          <button onClick={() => setActiveCalendarTab('middle')} className={activeCalendarTab === 'middle' ? 'active' : ''}>Middle</button>
          <button onClick={() => setActiveCalendarTab('high')} className={activeCalendarTab === 'high' ? 'active' : ''}>High School</button>
          <button onClick={() => setActiveCalendarTab('higherSecondary')} className={activeCalendarTab === 'higherSecondary' ? 'active' : ''}>Higher Secondary</button>
        </div>
        <div className="calendar-table-container">
          <table className="calendar-table">
            <thead>
              <tr>
                <th>Date</th>
                <th>Day</th>
                <th>Particulars</th>
              </tr>
            </thead>
            <tbody>
              {calendarData[activeCalendarTab].map((item, index) => (
                <tr key={index}>
                  <td>{item.date}</td>
                  <td>{item.day}</td>
                  <td>{item.particulars}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </main>
  );
};


const AboutUsPage = ({ onBack }: PageProps) => {
  return (
    <main className="site-main admissions-page">
      <div className="page-nav-buttons">
        <button onClick={onBack} className="back-button">
          &larr; Back
        </button>
        <button onClick={onBack} className="home-button">
          Home
        </button>
      </div>
      <h2 className="page-title">About Bethel Mission School, Champhai</h2>
      <section className="card">
        <h3>Introduction</h3>
        <p>Founded in 1996, Bethel Mission School, Champhai has grown from a small mission initiative into a respected institution affiliated with the Mizoram Board of School Education (MBSE). We provide education from Nursery to Class X, guided by our motto “Service to God & men.”</p>
        <p>The administration of the school is managed by a private unaided body, ensuring independence in vision, management, and the pursuit of excellence. This autonomy allows us to adapt quickly to the needs of our students and community while maintaining high academic and moral standards.</p>

        <h3>Vision</h3>
        <p>To form young people of character and competence who honor God, serve others, and excel in learning and life.</p>

        <h3>Mission</h3>
        <p>Bethel Mission School, Champhai educates the whole child — mind, heart, and character — so each learner grows in faith-inspired values, academic excellence, and joyful service to God and fellow human beings.</p>
        <p>We commit to:</p>
        <ul className="mission-list">
          <li><strong>Christ-centered values & character</strong> – cultivating integrity, humility, compassion, respect, and responsibility.</li>
          <li><strong>Academic excellence</strong> – delivering a rigorous, student-focused curriculum.</li>
          <li><strong>Whole-child formation</strong> – encouraging growth through sports, arts, and co-curricular activities.</li>
          <li><strong>Service & community engagement</strong> – promoting meaningful outreach and stewardship.</li>
          <li><strong>Inclusive & safe environment</strong> – ensuring a supportive campus where every learner can flourish.</li>
          <li><strong>Future readiness</strong> – preparing students with technology, guidance, and life skills for higher studies and purposeful careers.</li>
        </ul>

        <h3>Principal’s Message</h3>
        <p>Welcome to Bethel Mission School, Champhai. Since our founding in 1996, our vision has been to provide quality education rooted in Christian values and dedicated to our motto, “Service to God & men.”</p>
        <p>It is my joy and privilege to serve as Principal and to partner with families in nurturing the next generation. At Bethel Mission School, we believe that true education goes beyond textbooks — it shapes character, builds resilience, and instills a heart for service. Our teachers are committed to providing excellent academic instruction while also fostering compassion, discipline, and leadership in our students.</p>
        <p>We aim to prepare learners not only for examinations, but for life itself — equipping them to honor God, serve their community, and contribute positively to society. I warmly invite you to visit our campus and experience the vibrant learning environment that makes Bethel Mission School unique.</p>
        <p className="principal-signature">
          — K. Malsawmdawngi<br/>
          Principal, Bethel Mission School, Champhai
        </p>

        <h3>History</h3>
        <p>Bethel Mission School was established in the year 1996 by R. Vanhnuaithanga at Bethel Veng Champhai with classes ranging from Nursery to Class VII. At that time, there were only about 160 students, the majority of whom were from the locality itself. At that time Class VII annual examination was a Board Examination, where candidates from all over the state of Mizoram competed.</p>
        <p>In 2001 the ownership of the school was transferred to K. Malsawmdawngi who then became the Principal and remains so till date. In 2004, Class VIII was introduced and in the subsequent years classes IX and X were also added. The School also changed its location in 2005 to its current location with entirely new infrastructure.</p>
        <p>Since its inception, the school has had residential boarding facilities for both genders located nearby the school itself.</p>
        
        <div className="quick-facts">
          <h3>Quick Facts</h3>
          <ul className="quick-facts-list">
            <li><strong>Founded:</strong> 1996</li>
            <li><strong>Motto:</strong> Service to God & men</li>
            <li><strong>Grades:</strong> Nursery to Class X</li>
            <li><strong>Affiliation:</strong> Mizoram Board of School Education (MBSE)</li>
            <li><strong>Administration:</strong> Private Unaided</li>
            <li><strong>Campus Facilities:</strong> Classrooms, Library, Science & Computer Labs, Playground</li>
          </ul>
        </div>
      </section>
    </main>
  );
};

const StudentSuppliesPage = ({ onBack }: PageProps) => {
  const supplyItems = [
    {
      id: 1,
      name: 'School Uniform Set',
      price: '₹1500',
      image: 'https://i.postimg.cc/P5BQDpCg/school-uniform-isolated-white-background-93675-133534.jpg',
      stock: 'In Stock',
    },
    {
      id: 2,
      name: 'Notebooks (Set of 6)',
      price: '₹300',
      image: 'https://i.postimg.cc/hG12wWvT/stack-notebooks-isolated-white-background-93675-133543.jpg',
      stock: 'In Stock',
    },
    {
      id: 3,
      name: 'Geometry Box',
      price: '₹150',
      image: 'https://i.postimg.cc/Y0d9F0q9/geometry-box-isolated-white-background-93675-133529.jpg',
      stock: 'Low Stock',
    },
     {
      id: 4,
      name: 'School Bag',
      price: '₹1200',
      image: 'https://i.postimg.cc/W17hQZjg/school-bag-isolated-white-background-93675-133527.jpg',
      stock: 'Out of Stock',
    },
  ];

  return (
    <main className="site-main admissions-page">
      <div className="page-nav-buttons">
        <button onClick={onBack} className="back-button">
          &larr; Back
        </button>
        <button onClick={onBack} className="home-button">
          Home
        </button>
      </div>
      <h2 className="page-title">Student Supplies</h2>
      <section className="card">
        <h3>Supplies Price List & Inventory</h3>
        <p>Below is the list of available student supplies, their prices, and current stock status. Items can be purchased at the school office.</p>
        <div className="supplies-table-container">
          <table className="supplies-table">
            <thead>
              <tr>
                <th>Item</th>
                <th>Price</th>
                <th>Inventory Status</th>
              </tr>
            </thead>
            <tbody>
              {supplyItems.map(item => (
                <tr key={item.id}>
                  <td>
                    <div className="supply-item-cell">
                      <img src={item.image} alt={item.name} className="supply-item-image" />
                      <span>{item.name}</span>
                    </div>
                  </td>
                  <td>{item.price}</td>
                  <td>
                    <span className={`stock-status ${item.stock.toLowerCase().replace(' ', '-')}`}>
                      {item.stock}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </main>
  );
};


const App = () => {
  const navItems = ['Home', 'About', 'Academics', 'Admissions', 'Fees', 'Student Life', 'Facilities', 'Faculty', 'Supplies', 'Contact'];
  const [activeSection, setActiveSection] = useState('home');
  const sectionsRef = useRef<Record<string, HTMLElement | null>>({});
  const [isCalendarModalOpen, setCalendarModalOpen] = useState(false);
  const [activeCalendarTab, setActiveCalendarTab] = useState<CalendarSection>('primary');
  const [currentPage, setCurrentPage] = useState('home');

  const slugify = (text: string) => text.toLowerCase().replace(/\s+/g, '-');
  
  const openCalendarModal = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    setCalendarModalOpen(true);
  };
  
  const closeCalendarModal = () => {
    setCalendarModalOpen(false);
  };

  useEffect(() => {
    if (currentPage !== 'home') return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: '-30% 0px -70% 0px', threshold: 0 }
    );

    const currentSections = sectionsRef.current;
    Object.values(currentSections).forEach(section => {
      if (section) observer.observe(section);
    });

    return () => {
      Object.values(currentSections).forEach(section => {
        if (section) observer.unobserve(section);
      });
    };
  }, [currentPage]);

  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        closeCalendarModal();
      }
    };
    window.addEventListener('keydown', handleEsc);

    return () => {
      window.removeEventListener('keydown', handleEsc);
    };
  }, []);


  const renderNavLinks = (isFooter = false) => {
    const pageItems: { [key: string]: string } = {
      'About': 'about-us',
      'Academics': 'academics',
      'Admissions': 'admissions',
      'Faculty': 'faculty',
      'Facilities': 'facilities',
      'Fees': 'fee-payment',
      'Supplies': 'student-supplies',
    };

    return navItems.map(item => {
      const slug = slugify(item);
      const pageName = pageItems[item];

      if (pageName) {
        return (
          <li key={`${isFooter ? 'footer-' : ''}${item}`}>
            <a href="#" onClick={(e) => { e.preventDefault(); setCurrentPage(pageName); window.scrollTo(0, 0); }} className={currentPage === pageName ? 'active' : ''}>
              {item}
            </a>
          </li>
        );
      } else {
        const handleScrollLinkClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
          if (currentPage !== 'home') {
            e.preventDefault();
            setCurrentPage('home');
            requestAnimationFrame(() => {
              document.getElementById(slug)?.scrollIntoView({ behavior: 'smooth' });
            });
          }
        };
        return (
          <li key={`${isFooter ? 'footer-' : ''}${item}`}>
            <a href={`#${slug}`} onClick={handleScrollLinkClick} className={!isFooter && currentPage === 'home' && activeSection === slug ? 'active' : ''}>
              {item}
            </a>
          </li>
        );
      }
    });
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'about-us':
        return <AboutUsPage onBack={() => setCurrentPage('home')} />;
      case 'academics':
        return <AcademicsPage onBack={() => setCurrentPage('home')} />;
      case 'admissions':
        return <AdmissionsPage onBack={() => setCurrentPage('home')} />;
      case 'faculty':
        return <FacultyPage onBack={() => setCurrentPage('home')} />;
      case 'facilities':
        return <FacilitiesPage onBack={() => setCurrentPage('home')} />;
      case 'fee-payment':
        return <FeePaymentPage onBack={() => setCurrentPage('home')} />;
      case 'student-supplies':
        return <StudentSuppliesPage onBack={() => setCurrentPage('home')} />;
      default:
        return (
           <main className="site-main">
              <h2 id="home" ref={el => { sectionsRef.current['home'] = el; }} className="page-title">Home</h2>

              <section className="announcements card" aria-labelledby="announcements-title">
                <h3 id="announcements-title">Latest News & Announcements</h3>
                <div className="announcement-item">
                  <h4>Annual Sports Day 2024</h4>
                  <p className="announcement-meta">Posted on: August 15, 2024</p>
                  <p>We are excited to announce our Annual Sports Day! Students will compete in various track and field events. Parents are welcome to join and cheer for our young athletes.</p>
                  <a href="#" className="read-more">Read More &raquo;</a>
                </div>
              </section>

              <section id="contact" ref={el => { sectionsRef.current['contact'] = el; }} className="quick-links" aria-label="Quick Links">
                <a href="#" className="card quick-link-card" role="button" onClick={(e) => { e.preventDefault(); setCurrentPage('fee-payment'); window.scrollTo(0, 0); }}>
                  <div>Fee Payment</div>
                </a>
                <a href="#" className="card quick-link-card" role="button" onClick={openCalendarModal}>
                  <div>Calendar</div>
                </a>
                <article className="card contact-card">
                  <h3>Contact Us</h3>
                  <p>Call: <a href="tel:9862148342">9862148342</a> / <a href="tel:9612447703">9612447703</a></p>
                  <p>Email: <a href="mailto:bmschamphai@gmail.com">bmschamphai@gmail.com</a></p>
                  <p>Bethel Mission School, Bethel Veng,<br/>Champhai, 796321, Mizoram</p>
                  <a href="https://maps.app.goo.gl/K6gvNPaJtpUbupp38?g_st=aw" target="_blank" rel="noopener noreferrer" className="map-link">View on Google Maps</a>
                  <div className="social-links">
                    <a href="https://www.instagram.com/bms_champhai?igsh=MWFtdm9idW90NWlmcQ==" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                      <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
                    </a>
                    <a href="https://youtube.com/@bethelmissionschoolchamphai?si=1P3McgnoZpPNB7gH" target="_blank" rel="noopener noreferrer" aria-label="YouTube">
                      <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2A29 29 0 0 0 23 11.75a29 29 0 0 0-.46-5.33z"></path><polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"></polygon></svg>
                    </a>
                  </div>
                </article>
              </section>

              <section className="info-cards" aria-label="School Information">
                <article id="about-us" ref={el => { sectionsRef.current['about-us'] = el; }} className="card">
                  <h3>About Us</h3>
                  <p>Discover our history, mission, and the values that guide us in providing a nurturing and excellent educational environment.</p>
                  <a href="#" onClick={(e) => { e.preventDefault(); setCurrentPage('about-us'); window.scrollTo(0, 0); }} className="read-more" style={{display: 'block', marginBottom: '24px'}}>Learn More About Us &raquo;</a>
                </article>
                <article id="academics" ref={el => { sectionsRef.current['academics'] = el; }} className="card">
                  <h3>Academics</h3>
                  <p>Explore our curriculum, teaching methodologies, and evaluation systems designed to foster academic excellence.</p>
                  <a href="#" onClick={(e) => { e.preventDefault(); setCurrentPage('academics'); window.scrollTo(0, 0); }} className="read-more" style={{display: 'block', marginBottom: '24px'}}>Explore Academics &raquo;</a>
                </article>
                <article id="student-life" ref={el => { sectionsRef.current['student-life'] = el; }} className="card">
                  <h3>Student Life</h3>
                  <ul>
                    <li><a href="#">Clubs & Societies</a></li>
                    <li><a href="#">Sports & Arts</a></li>
                    <li><a href="#">Student Council</a></li>
                  </ul>
                </article>
              </section>
          </main>
        );
    }
  };

  return (
    <div className="container">
      <div className="banner-container">
        <img src="https://i.postimg.cc/vmS6DnyK/IMG-4967.jpg" alt="Bethel Mission School Group Photo" className="banner-image" />
      </div>
      
      <header className="site-header">
        <a href="#" className="logo-container" onClick={(e) => { e.preventDefault(); setCurrentPage('home'); }}>
          <img src="https://i.postimg.cc/d7PLjvNv/image.png" alt="Bethel Mission School Logo" className="logo" />
          <div className="school-title">
            <h1 className="school-name">Bethel Mission School</h1>
            <p className="school-details">
              Champhai, Mizoram<br />
              DISE Code: 15040100705/15040100708
            </p>
          </div>
        </a>
        <nav className="main-nav" aria-label="Main navigation">
          <ul>
            {renderNavLinks()}
          </ul>
        </nav>
        <div className="search-icon" aria-label="Search" role="button" tabIndex={0}>
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
          </svg>
        </div>
      </header>

      {renderPage()}

      {isCalendarModalOpen && (
        <div className="modal-overlay" onClick={closeCalendarModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={closeCalendarModal} aria-label="Close calendar">&times;</button>
            <h3 className="modal-title">Academic Calendar 2025-2026</h3>
            <div className="calendar-tabs">
              <button onClick={() => setActiveCalendarTab('primary')} className={activeCalendarTab === 'primary' ? 'active' : ''}>Primary</button>
              <button onClick={() => setActiveCalendarTab('middle')} className={activeCalendarTab === 'middle' ? 'active' : ''}>Middle</button>
              <button onClick={() => setActiveCalendarTab('high')} className={activeCalendarTab === 'high' ? 'active' : ''}>High School</button>
              <button onClick={() => setActiveCalendarTab('higherSecondary')} className={activeCalendarTab === 'higherSecondary' ? 'active' : ''}>Higher Secondary</button>
            </div>
            <div className="calendar-table-container">
              <table className="calendar-table">
                <thead>
                  <tr>
                    <th>Date</th>
                    <th>Day</th>
                    <th>Particulars</th>
                  </tr>
                </thead>
                <tbody>
                  {calendarData[activeCalendarTab].map((item, index) => (
                    <tr key={index}>
                      <td>{item.date}</td>
                      <td>{item.day}</td>
                      <td>{item.particulars}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      <footer className="site-footer">
        <div className="footer-content">
            <div className="footer-branding">
                <img src="https://i.postimg.cc/d7PLjvNv/image.png" alt="Bethel Mission School Logo" className="footer-logo" />
                <h4>Bethel Mission School</h4>
            </div>
            <div className="footer-links">
                <h5>Quick Links</h5>
                <ul>
                    {renderNavLinks(true)}
                </ul>
            </div>
            <div className="footer-contact">
                <h5>Contact Us</h5>
                <p>Email: <a href="mailto:bmschamphai@gmail.com">bmschamphai@gmail.com</a></p>
                <p>Phone: <a href="tel:9862148342">9862148342</a></p>
                <p>Bethel Mission School, Bethel Veng, Champhai, 796321, Mizoram</p>
            </div>
        </div>
        <div className="footer-bottom">
            <p>&copy; {new Date().getFullYear()} Bethel Mission School. All Rights Reserved.</p>
        </div>
      </footer>
    </div>
  );
};

const styles = `
  :root {
    --background-color: #FAFAD2;
    --text-color: #333;
    --card-background: #ffffff;
    --border-color: #eee;
    --heading-color: #222;
    --link-color: #555;
    --link-hover-color: #000;
  }
  
  *, *::before, *::after {
    box-sizing: border-box;
  }

  html {
    scroll-behavior: smooth;
    font-size: 112.5%; /* Sets base font to 18px */
    background-color: var(--background-color);
  }

  body {
    font-family: 'Poppins', sans-serif;
    margin: 0;
    color: var(--text-color);
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  body::before {
    content: '';
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-image: url('https://i.postimg.cc/d7PLjvNv/image.png');
    background-repeat: no-repeat;
    background-position: center;
    background-size: contain;
    opacity: 0.3;
    z-index: -1;
  }

  #root {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
  }

  .container {
    width: 100%;
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 24px;
  }
  
  a:focus-visible, [role="button"]:focus-visible, button:focus-visible {
    outline: 2px solid var(--link-hover-color);
    outline-offset: 2px;
    border-radius: 4px;
  }

  /* Header */
  .site-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 24px 0;
    margin-bottom: 32px;
  }

  .logo-container {
    display: flex;
    align-items: center;
    gap: 16px;
    text-decoration: none;
    color: inherit;
    cursor: pointer;
  }

  .logo {
    height: 60px;
    width: auto;
  }

  .school-title {
    display: flex;
    flex-direction: column;
  }

  .school-name {
    font-size: clamp(1.8rem, 4vw, 2.2rem);
    font-weight: 700;
    margin: 0;
    color: var(--heading-color);
    line-height: 1.1;
    white-space: nowrap;
  }

  .school-details {
    font-size: clamp(1.1rem, 2.5vw, 1.3rem);
    margin: 4px 0 0 0;
    color: var(--text-color);
    font-weight: 400;
    line-height: 1.4;
  }

  .main-nav ul {
    margin: 0;
    padding: 0;
    list-style: none;
    display: flex;
    gap: 28px;
  }

  .main-nav a {
    text-decoration: none;
    color: var(--link-color);
    font-weight: 500;
    transition: color 0.3s ease;
    padding-bottom: 4px;
  }
  
  .main-nav a.active {
    font-weight: 700;
    color: var(--heading-color);
    border-bottom: 2px solid var(--heading-color);
  }

  .main-nav a:hover,
  .main-nav a:focus {
    color: var(--link-hover-color);
  }

  .search-icon {
    cursor: pointer;
    color: var(--text-color);
  }
  
  .search-icon svg {
    display: block;
  }

  /* Banner */
  .banner-container {
    border-radius: 8px;
    overflow: hidden;
    box-shadow: 0 4px 12px rgba(0,0,0,0.05);
    line-height: 0;
    aspect-ratio: 4 / 1;
    margin-top: 24px;
  }

  .banner-image {
    width: 100%;
    height: 100%;
    display: block;
    object-fit: cover;
    object-position: center;
  }

  /* Main Content */
  .site-main {
    padding: 0 0 48px;
    flex-grow: 1;
  }

  .page-title {
    font-size: clamp(2.5rem, 5vw, 3rem);
    margin: 0 0 32px 0;
    scroll-margin-top: 120px;
  }

  .card {
    background-color: var(--card-background);
    padding: 24px;
    border-radius: 8px;
  }

  .announcements {
    text-align: left;
    margin-bottom: 32px;
  }

  .announcements h3 {
    margin: 0 0 24px;
    font-size: 1.8rem;
  }
  
  .announcement-item h4 {
    margin: 0 0 8px;
    font-size: 1.2rem;
    color: var(--heading-color);
  }
  
  .announcement-meta {
    font-size: 0.9rem;
    color: var(--link-color);
    margin: 0 0 12px;
  }

  .announcement-item p {
    margin: 0 0 16px;
  }

  .read-more {
    font-weight: 700;
    color: var(--heading-color);
    text-decoration: none;
  }
  
  .read-more:hover {
    text-decoration: underline;
  }

  .quick-links {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 32px;
    margin-bottom: 32px;
    align-items: stretch;
    scroll-margin-top: 120px;
  }

  .quick-links .card {
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  .quick-link-card {
    text-align: center;
    font-size: 1.2rem;
    font-weight: 500;
    cursor: pointer;
    transition: transform 0.2s ease, box-shadow 0.2s ease;
    text-decoration: none;
    color: var(--text-color);
  }

  .quick-link-card:hover,
  .quick-link-card:focus-within {
    transform: translateY(-5px);
    box-shadow: 0 4px 12px rgba(0,0,0,0.1);
  }

  .quick-links .contact-card {
    text-align: left;
    font-size: 1rem;
    font-weight: 400;
    cursor: default;
    justify-content: flex-start;
  }
  
  .contact-card h3 {
    font-size: 1.2rem;
    font-weight: 700;
    margin: 0 0 16px 0;
    color: var(--heading-color);
  }
  
  .contact-card p {
    font-size: 1rem;
    line-height: 1.6;
    margin: 0 0 12px 0;
  }
  
  .contact-card a {
    color: var(--link-color);
    text-decoration: none;
    transition: color 0.3s ease;
  }
  
  .contact-card a:hover,
  .contact-card a:focus {
    color: var(--link-hover-color);
    text-decoration: underline;
  }
  
  .map-link {
    display: inline-block;
    background-color: var(--heading-color);
    color: var(--card-background);
    padding: 10px 16px;
    border-radius: 6px;
    text-decoration: none;
    font-weight: 500;
    transition: background-color 0.3s ease;
    margin: 4px 0 16px 0;
    text-align: center;
  }

  .map-link:hover,
  .map-link:focus {
      background-color: var(--link-hover-color);
      color: var(--card-background);
      text-decoration: none;
  }

  .social-links {
    display: flex;
    gap: 16px;
    margin-top: 0;
    padding-top: 0;
  }

  .social-links a {
    color: var(--text-color);
  }
  
  .social-links a svg {
    display: block;
    transition: transform 0.3s ease, color 0.3s ease;
  }
  
  .social-links a:hover svg,
  .social-links a:focus svg {
    transform: scale(1.1);
    color: var(--link-hover-color);
  }

  .info-cards {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 32px;
  }
  
  .info-cards article {
    scroll-margin-top: 120px;
  }

  .info-cards h3 {
    margin: 0 0 24px 0;
    font-size: 1.8rem;
  }

  .info-cards ul {
    margin: 0;
    padding: 0;
    list-style: none;
  }

  .info-cards li {
    font-size: 1rem;
    line-height: 1.6;
    margin-bottom: 16px;
  }

  .info-cards li:last-child {
    margin-bottom: 0;
  }
  
  .info-cards li a {
    color: var(--text-color);
    text-decoration: none;
    position: relative;
    padding-left: 24px;
    transition: color 0.3s ease;
  }
  
  .info-cards li a:hover,
  .info-cards li a:focus {
    color: var(--link-hover-color);
    text-decoration: underline;
  }

  .info-cards li a::before {
    content: '•';
    position: absolute;
    left: 0;
    color: var(--link-color);
    font-weight: bold;
    font-size: 1.2rem;
    line-height: 1;
    transition: color 0.3s ease;
  }
  
  .info-cards li a:hover::before,
  .info-cards li a:focus::before {
     color: var(--link-hover-color);
  }

  .milestones {
    margin-top: 24px;
    padding-top: 24px;
    border-top: 1px solid var(--border-color);
  }

  .milestones h4 {
    margin: 0 0 16px 0;
    font-size: 1.2rem;
    color: var(--heading-color);
  }

  .milestones p {
    font-size: 1rem;
    line-height: 1.6;
    margin-bottom: 16px;
  }

  .milestones p:last-child {
    margin-bottom: 0;
  }
  
  /* Sub Pages (Admissions, Faculty, etc.) */
  .admissions-page {
    padding-top: 0;
  }

  .page-nav-buttons {
    display: flex;
    gap: 16px;
    margin-bottom: 32px;
  }
  
  .back-button, .home-button {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    background-color: transparent;
    border: 1px solid var(--border-color);
    padding: 10px 16px;
    border-radius: 6px;
    font-family: inherit;
    font-size: 1rem;
    font-weight: 500;
    color: var(--link-color);
    cursor: pointer;
    text-decoration: none;
    transition: background-color 0.2s ease, color 0.2s ease;
  }

  .back-button:hover, .home-button:hover,
  .back-button:focus, .home-button:focus {
    background-color: var(--heading-color);
    color: var(--card-background);
    border-color: var(--heading-color);
  }
  
  .admissions-page .card h3 {
    margin-top: 0;
    margin-bottom: 16px;
    font-size: 1.8rem;
    color: var(--heading-color);
  }
  
  .admissions-page .card h3:not(:first-child) {
      margin-top: 32px;
  }

  .admissions-page .card ul {
    list-style: none;
    padding: 0;
    margin: 0;
  }

  .admissions-page .card li {
    font-size: 1.1rem;
    line-height: 1.7;
    margin-bottom: 18px;
  }

  .admissions-page .card p {
    margin: 0 0 16px;
    font-size: 1rem;
    line-height: 1.6;
  }

  .admissions-page .card li:last-child {
    margin-bottom: 0;
  }

  .admissions-page .card li a {
    color: var(--text-color);
    text-decoration: none;
    position: relative;
    padding-left: 28px;
    transition: color 0.3s ease;
    font-weight: 500;
  }

  .admissions-page .card li a:hover,
  .admissions-page .card li a:focus {
    color: var(--link-hover-color);
    text-decoration: underline;
  }

  .admissions-page .card li a::before {
    content: '→';
    position: absolute;
    left: 0;
    color: var(--link-color);
    font-weight: bold;
    font-size: 1.3rem;
    line-height: 1;
    transition: color 0.3s ease, transform 0.3s ease;
  }

  .admissions-page .card li a:hover::before,
  .admissions-page .card li a:focus::before {
    color: var(--link-hover-color);
    transform: translateX(4px);
  }

  .back-button-inline {
    display: inline-flex;
    background: transparent;
    border: none;
    padding: 0;
    margin-bottom: 24px;
    font-family: inherit;
    font-size: 1rem;
    font-weight: 500;
    color: var(--link-color);
    cursor: pointer;
    text-decoration: none;
    transition: color 0.2s ease;
  }

  .back-button-inline:hover,
  .back-button-inline:focus {
    color: var(--link-hover-color);
    text-decoration: underline;
  }

  .admission-details h4 {
    font-size: 1.2rem;
    color: var(--heading-color);
    margin: 24px 0 12px;
    padding-bottom: 4px;
    border-bottom: 1px solid var(--border-color);
  }
  
  .admission-header {
      text-align: center;
      margin-bottom: 24px;
      padding-bottom: 16px;
      border-bottom: 1px solid var(--border-color);
  }
  .admission-header h3 {
      font-size: 1.5rem;
      margin: 0;
  }
  .admission-header p {
      margin: 4px 0 0;
      font-size: 1rem;
  }

  .admission-details .guidelines-list {
    list-style: none;
    padding: 0;
    margin: 0 0 16px;
  }

  .admission-details .guidelines-list li {
    font-size: 1rem;
    position: relative;
    padding-left: 24px;
    margin-bottom: 12px;
    line-height: 1.6;
  }
  
  .admission-details .guidelines-list li::before {
    content: '•';
    position: absolute;
    left: 0;
    top: 6px;
    font-size: 1.2rem;
    color: var(--link-color);
  }

  .admission-details p {
    line-height: 1.6;
    margin: 0 0 16px;
  }

  .admission-details a {
      color: var(--heading-color);
      font-weight: 500;
      text-decoration: underline;
      transition: color 0.2s ease;
  }
  
  .admission-details a:hover,
  .admission-details a:focus {
      color: var(--link-hover-color);
  }

  .online-application-form, .payment-button {
      margin-top: 24px;
  }

  .form-grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: 16px 24px;
  }
  
  .form-group {
      margin-bottom: 0;
  }
  .form-group label {
      display: block;
      margin-bottom: 8px;
      font-weight: 500;
      font-size: 0.95rem;
  }
  .form-group input, .form-group select, .form-group textarea {
      width: 100%;
      padding: 10px;
      border: 1px solid var(--border-color);
      border-radius: 4px;
      font-family: inherit;
      font-size: 1rem;
      background-color: #fff;
      color: var(--text-color);
  }
  .form-group textarea {
      resize: vertical;
      min-height: 100px;
  }
  .online-application-form button, .payment-button {
      background-color: var(--heading-color);
      color: var(--card-background);
      padding: 12px 20px;
      border: none;
      border-radius: 6px;
      font-weight: 500;
      font-size: 1rem;
      cursor: pointer;
      margin-top: 24px;
      transition: background-color 0.2s ease;
  }
  .online-application-form button:hover, .online-application-form button:focus,
  .payment-button:hover, .payment-button:focus {
      background-color: var(--link-hover-color);
  }

  .submission-success {
    text-align: center;
    padding: 40px 20px;
    border: 1px solid #d4edda;
    background-color: #f2fff5;
    border-radius: 8px;
  }
  .submission-success h4 {
      margin: 0 0 16px;
      font-size: 1.5rem;
      color: #155724;
  }
  .submission-success p {
      margin: 8px 0;
      font-size: 1.1rem;
  }
  .admission-id {
      font-weight: 700;
      font-size: 1.3rem;
      color: #0c5460;
      background-color: #d1ecf1;
      padding: 8px 16px;
      border-radius: 4px;
      display: inline-block;
      margin-top: 16px;
  }

  /* Added for About Us Page */
  .principal-signature {
    margin-top: 24px;
    font-style: italic;
    text-align: right;
    line-height: 1.6;
    font-size: 1rem;
  }

  .quick-facts {
    margin-top: 32px;
    padding-top: 24px;
    border-top: 1px solid var(--border-color);
  }
  
  .admissions-page .card .mission-list {
    list-style: disc;
    margin: 16px 0;
    padding-left: 25px;
  }
  
  .admissions-page .card .mission-list li,
  .admissions-page .card .quick-facts-list li {
    font-size: 1rem;
    line-height: 1.6;
    margin-bottom: 12px;
    padding-left: 0;
  }

  .admissions-page .card .mission-list li::before,
  .admissions-page .card .quick-facts-list li::before {
    content: none;
  }

  .admissions-page .card .quick-facts-list {
    list-style: none;
    padding: 0;
  }
  
  .admissions-page .card .quick-facts-list li {
    padding-left: 28px;
    position: relative;
  }

  .admissions-page .card .quick-facts-list li::before {
    content: '✓';
    position: absolute;
    left: 0;
    top: 4px;
    font-size: 1.1rem;
    color: var(--heading-color);
  }

  /* Student Supplies Page */
  .supplies-table-container {
    overflow-x: auto;
    margin-top: 24px;
  }
  .supplies-table {
    width: 100%;
    border-collapse: collapse;
    font-size: 1rem;
    min-width: 500px;
  }
  .supplies-table th, .supplies-table td {
    padding: 16px;
    text-align: left;
    border-bottom: 1px solid var(--border-color);
    vertical-align: middle;
  }
  .supplies-table th {
    font-weight: 700;
    background-color: #f9f9f9;
  }
  .supply-item-cell {
    display: flex;
    align-items: center;
    gap: 16px;
    font-weight: 500;
  }
  .supply-item-image {
    width: 60px;
    height: 60px;
    object-fit: contain;
    border-radius: 4px;
    background-color: #f8f8f8;
    flex-shrink: 0;
  }
  .stock-status {
    padding: 6px 12px;
    border-radius: 16px;
    font-weight: 500;
    font-size: 0.9rem;
    white-space: nowrap;
    display: inline-block;
  }
  .stock-status.in-stock {
    background-color: #d4edda;
    color: #155724;
  }
  .stock-status.low-stock {
    background-color: #fff3cd;
    color: #856404;
  }
  .stock-status.out-of-stock {
    background-color: #f8d7da;
    color: #721c24;
  }

  /* Fee Structure Table */
  .fee-table-container {
    overflow-x: auto;
    margin-top: 24px;
  }
  .fee-structure-table {
    width: 100%;
    border-collapse: collapse;
    font-size: 1rem;
    min-width: 600px;
  }
  .fee-structure-table th, .fee-structure-table td {
    padding: 16px;
    text-align: left;
    border-bottom: 1px solid var(--border-color);
  }
  .fee-structure-table th {
    font-weight: 700;
    background-color: #f9f9f9;
  }


  /* Footer */
  .site-footer {
    margin-top: 64px;
    background-color: var(--card-background);
    padding: 48px 0 24px;
    border-top: 1px solid var(--border-color);
  }

  .footer-content {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 32px;
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 24px;
  }
  
  .footer-branding {
    display: flex;
    flex-direction: column;
    gap: 16px;
  }

  .footer-logo {
    height: 50px;
    width: 50px;
  }
  
  .footer-branding h4, .footer-links h5, .footer-contact h5 {
    margin: 0;
    font-size: 1.2rem;
    color: var(--heading-color);
  }

  .footer-links ul {
    list-style: none;
    padding: 0;
    margin: 16px 0 0;
  }

  .footer-links li {
    margin-bottom: 12px;
  }
  
  .footer-links a, .footer-contact a {
    text-decoration: none;
    color: var(--link-color);
  }

  .footer-links a:hover, .footer-contact a:hover {
    text-decoration: underline;
    color: var(--link-hover-color);
  }

  .footer-contact p {
    margin: 16px 0 0;
  }
  
  .footer-bottom {
    max-width: 1200px;
    margin: 48px auto 0;
    padding: 24px 24px 0;
    border-top: 1px solid var(--border-color);
    text-align: center;
    font-size: 0.9rem;
    color: var(--link-color);
  }
  
  /* Calendar Modal */
  .modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.6);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000;
  }

  .modal-content {
    background: var(--card-background);
    padding: 32px;
    border-radius: 8px;
    width: 90%;
    max-width: 800px;
    max-height: 90vh;
    display: flex;
    flex-direction: column;
    position: relative;
    box-shadow: 0 5px 15px rgba(0,0,0,0.3);
  }

  .modal-close {
    position: absolute;
    top: 16px;
    right: 16px;
    background: transparent;
    border: none;
    font-size: 2rem;
    line-height: 1;
    cursor: pointer;
    color: var(--link-color);
  }
  
  .modal-title {
    margin: 0 0 16px;
    font-size: 1.8rem;
  }
  
  .calendar-tabs {
    display: flex;
    border-bottom: 1px solid var(--border-color);
    margin-bottom: 16px;
  }

  .calendar-tabs button {
    padding: 12px 16px;
    cursor: pointer;
    border: none;
    background: transparent;
    font-size: 1rem;
    font-weight: 500;
    color: var(--link-color);
    border-bottom: 3px solid transparent;
    transition: all 0.2s ease-in-out;
  }
  
  .calendar-tabs button.active {
    color: var(--heading-color);
    border-bottom-color: var(--heading-color);
  }

  .calendar-table-container {
    overflow-y: auto;
  }
  
  .calendar-table {
    width: 100%;
    border-collapse: collapse;
    font-size: 0.95rem;
  }
  
  .calendar-table th, .calendar-table td {
    padding: 12px;
    text-align: left;
    border-bottom: 1px solid var(--border-color);
  }
  
  .calendar-table th {
    font-weight: 700;
    background-color: #f9f9f9;
  }

  .calendar-table tbody tr:nth-child(even) {
    background-color: #fcfcfc;
  }

  .calendar-table td:nth-child(1) {
    white-space: nowrap;
  }
  
  /* Responsive Design */
  @media (max-width: 1024px) {
    .site-header {
      flex-wrap: wrap;
      justify-content: space-between;
      row-gap: 24px;
    }
    .main-nav {
      order: 3;
      width: 100%;
    }
    .main-nav ul {
      justify-content: center;
      flex-wrap: wrap;
      gap: 16px 24px;
    }
  }

  @media (min-width: 768px) {
    .form-grid {
      grid-template-columns: 1fr 1fr;
    }
    .form-group.full-width {
      grid-column: 1 / -1;
    }
  }

  @media (max-width: 768px) {
    .container {
        padding: 0 16px;
    }
    .school-name {
        font-size: 1.5rem;
    }
    .logo {
      height: 40px;
    }
    .footer-content {
      grid-template-columns: 1fr;
      text-align: center;
      align-items: center;
    }
    .footer-branding {
      align-items: center;
    }
    .modal-content {
      padding: 24px 16px;
    }
    .calendar-tabs {
      flex-wrap: wrap;
    }
    .calendar-tabs button {
      font-size: 0.9rem;
      padding: 8px 10px;
    }
    .calendar-table th, .calendar-table td {
      padding: 8px;
    }
  }
`;

const styleSheet = document.createElement("style");
styleSheet.innerText = styles;
document.head.appendChild(styleSheet);

const container = document.getElementById('root');
if (container) {
  const root = createRoot(container);
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
} else {
  console.error('Failed to find the root element');
}
