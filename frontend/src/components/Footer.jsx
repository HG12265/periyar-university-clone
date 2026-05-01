'use client';

import React, { useState, useEffect } from 'react';

const defaultAcademicLinks = [
  { name: 'Affiliated Colleges', url: 'https://www.periyaruniversity.ac.in/Affiliated_Colleges.php' },
  { name: 'Centres & Cells', url: 'https://www.periyaruniversity.ac.in/Centres.php' },
  { name: 'Community Colleges', url: 'https://www.periyaruniversity.ac.in/Community_Colleges.php' },
  { name: 'Departments', url: 'https://www.periyaruniversity.ac.in/Dept.php' },
  { name: 'PG Research Studies', url: 'https://www.periyaruniversity.ac.in/Dept/pgex.php' },
  { name: 'Programmes Offered', url: 'https://www.periyaruniversity.ac.in/Programmes_offered.php' },
  { name: 'PU-CRI', url: 'https://www.periyaruniversity.ac.in/centre/CRI/' },
];

const defaultQuickLinksLeft = [
  { name: 'Achievements', url: 'https://www.periyaruniversity.ac.in/Major_Achievements.php' },
  { name: 'Anti Ragging', url: 'https://www.periyaruniversity.ac.in/antirag.php' },
  { name: 'Downloads', url: 'https://www.periyaruniversity.ac.in/Download.php' },
  { name: 'e - Sanad Services', url: 'https://www.periyaruniversity.ac.in/esanad.php' },
  { name: 'Facilities', url: 'https://www.periyaruniversity.ac.in/Facilities.php' },
  { name: 'Login', url: 'https://www.periyaruniversity.ac.in/login.php' },
  { name: 'Newsletter', url: 'https://www.periyaruniversity.ac.in/newsletter.php' },
];

const defaultQuickLinksRight = [
  { name: 'Physical Education', url: '#' },
  { name: 'Placement', url: 'https://www.periyaruniversity.ac.in/Placement.php' },
  { name: 'Publication', url: '#' },
  { name: 'Results - April 2025', url: 'https://www.periyaruniversity.ac.in/Result.php' },
  { name: 'Students Portal', url: '#' },
  { name: 'Syllabus', url: '#' },
  { name: 'UICP Institute List', url: '#' },
];

export default function Footer() {
  const [academicLinks, setAcademicLinks] = useState(defaultAcademicLinks);
  const [quickLinksLeft, setQuickLinksLeft] = useState(defaultQuickLinksLeft);
  const [quickLinksRight, setQuickLinksRight] = useState(defaultQuickLinksRight);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/settings`)
      .then(res => res.json())
      .then(data => {
        if (data.footerAcademic) setAcademicLinks(data.footerAcademic);
        if (data.footerQuickLeft) setQuickLinksLeft(data.footerQuickLeft);
        if (data.footerQuickRight) setQuickLinksRight(data.footerQuickRight);
      })
      .catch(err => console.error('Failed to fetch footer settings, using defaults', err));
  }, []);

  return (
    <div className="w-full py-4">
      <div className="container mx-auto max-w-[1140px] px-0">

        {/* Main Footer Block */}
        <div className="shadow-lg rounded-sm overflow-hidden">

          {/* Dark Blue Section */}
          <div className="bg-[#000064] p-6 pb-10">
            <div className="flex flex-wrap -mx-[15px]">

              {/* Academic */}
              <div className="w-full lg:w-3/12 px-[15px] mb-6">
                <h5 className="text-[#ffc107] text-center font-bold mb-6 text-[18px]">Academic</h5>
                <ul className="list-none p-0 m-0 pl-10">
                  {academicLinks.map((link, idx) => (
                    <li key={idx} className="mb-2">
                      <a href={link.url} className="text-white text-[16px] hover:underline hover:text-[#ffc107] transition-colors">
                        {link.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Quick Links Left */}
              <div className="w-full lg:w-3/12 px-[15px] mb-6">
                <h5 className="text-[#ffc107] text-center font-bold mb-6 text-[18px]">Quick Links</h5>
                <ul className="list-none p-0 m-0 pl-10">
                  {quickLinksLeft.map((link, idx) => (
                    <li key={idx} className="mb-2">
                      <a href={link.url} className="text-white text-[16px] hover:underline hover:text-[#ffc107] transition-colors">
                        {link.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Quick Links Right */}
              <div className="w-full lg:w-3/12 px-[15px] mb-6">
                <h5 className="text-[#ffc107] text-center font-bold mb-6 text-[18px]">Quick Links</h5>
                <ul className="list-none p-0 m-0 pl-10">
                  {quickLinksRight.map((link, idx) => (
                    <li key={idx} className="mb-2">
                      <a href={link.url} className="text-white text-[16px] hover:underline hover:text-[#ffc107] transition-colors">
                        {link.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Employee Portal */}
              <div className="w-full lg:w-3/12 px-[15px] mb-6 text-center">
                <h5 className="text-[#ffc107] text-center font-bold mb-6 text-[18px]">Employee Portal</h5>
                <div className="bg-white p-1 shadow-md inline-block rounded-sm mb-4">
                  <div className="p-2">
                    <img src="/logo.JPG" height="150" width="130" alt="Logo" className="h-[150px] w-[130px] object-contain" />
                  </div>
                </div>
                <div className="mt-2">
                  <a
                    href="https://periyaruniversity.irins.org/"
                    target="_blank"
                    rel="noreferrer"
                    className="bg-[#007bff] text-white px-8 py-2.5 rounded shadow-sm hover:bg-[#0069d9] transition-colors font-bold text-[14px] inline-block w-[160px]"
                  >
                    IRINS-PU
                  </a>
                </div>
              </div>

            </div>
          </div>

          {/* Info Light Blue Bar - Now inside the same block */}
          <div className="bg-[#007bff]">
            <div className="flex flex-wrap items-center py-2 px-[10px]">
              <div className="w-full lg:w-10/12 flex flex-wrap gap-x-1">
                {[
                  { name: 'Faculty Portal', url: 'https://www.periyaruniversity.ac.in/Dean.php' },
                  { name: 'Awards', url: 'https://www.periyaruniversity.ac.in/Awards.php' },
                  { name: 'Best Practices', url: 'https://www.periyaruniversity.ac.in/bestpractices.php' },
                  { name: 'Gallery', url: 'https://www.periyaruniversity.ac.in/gallery.php' },
                  { name: 'Policies', url: 'https://www.periyaruniversity.ac.in/Policies.php' },
                  { name: 'RTI', url: 'https://www.periyaruniversity.ac.in/rti.php' },
                  { name: 'Services', url: 'https://www.periyaruniversity.ac.in/services.php' },
                  { name: 'Student Corner', url: 'https://www.periyaruniversity.ac.in/StudentCorner.php' }
                ].map((link, idx) => (
                  <a key={idx} href={link.url} className="text-white text-[16px] px-3 py-2 hover:underline font-medium">
                    {link.name}
                  </a>
                ))}
                <a href="https://www.periyaruniversity.ac.in/mail.php" className="text-white text-[16px] px-3 py-2 hover:underline flex items-center font-medium">
                  <i className="fa fa-envelope mr-2" /> WebMail
                </a>
              </div>
              <div className="w-full lg:w-2/12 text-right px-2">
                <a
                  href="https://www.periyaruniversity.ac.in/Contact.php"
                  className="bg-[#dc3545] text-white px-5 py-2 font-bold text-[14px] hover:bg-[#c82333] transition-colors inline-block"
                >
                  Help Desk
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Copyright Area */}
        <div className="text-center py-6 border-t border-gray-300 mt-4 relative">
          <h6 className="m-0 font-bold text-[15px] text-[#333]">
            &copy; Periyar University - 2026. All Rights Reserved.
          </h6>
          <div className="text-[13px] mt-1 text-[#666]">
            Developed & Maintaining by <a href="https://www.periyaruniversity.ac.in/cc.php" className="text-[#007bff] hover:underline font-semibold">Computer Centre</a>
          </div>

          {/* Admin Portal Link */}
          <div className="mt-4 md:absolute md:right-4 md:bottom-6 md:mt-0">
            <a href="/admin" className="text-gray-400 hover:text-[#000064] text-[12px] font-semibold transition-colors flex items-center justify-center gap-1">
              <i className="fa fa-lock"></i> Admin Login
            </a>
          </div>

        </div>

      </div>

      {/* Font Awesome Import */}
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css" />
    </div>
  );
}
