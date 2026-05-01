'use client';

import React from 'react';

export default function MainHeader() {
  return (
    <div className="bg-white w-full py-4">
      <div className="container mx-auto max-w-[1140px] px-[15px]">
        <div className="flex flex-wrap -mx-[15px] items-start">
          
          {/* Logo and Title Section (col-md-8) */}
          <div className="w-full md:w-2/3 px-[15px]">
            <div className="flex flex-col md:flex-row items-start">
              <a href="https://www.periyaruniversity.ac.in/" className="mb-4 md:mb-0 md:mr-6">
                <img src="/logo.JPG" height="180" width="150" alt="Logo" className="max-w-[150px] h-auto" />
              </a>
              <div className="flex-1">
                <h3 className="text-[#990033] text-[30px] font-bold font-tamil mt-[5px] mb-0 leading-tight">பெரியார் பல்கலைக்கழகம்</h3>
                <h5 className="text-[#003399] text-[18px] font-bold font-tamil mt-[-10px] mb-0">அரசு பல்கலைக்கழகம், சேலம்.</h5>
                <h2 className="text-[#004080] text-[38px] font-bold uppercase mt-[-8px] mb-0 tracking-tight leading-tight font-sans">PERIYAR UNIVERSITY</h2>
                <div className="mt-[-5px]">
                  <h5 className="text-black text-[16px] font-semibold m-0 leading-tight">State University - NAAC 'A++' Grade - NIRF Rank 94</h5>
                  <h5 className="text-black text-[16px] font-semibold m-0 leading-tight">State Public University Rank 40 - SDG Institutions Rank Band: 11-50</h5>
                  <h5 className="text-black text-[16px] font-semibold m-0 leading-tight font-sans">Salem - 636 011, Tamil Nadu, India.</h5>
                </div>
              </div>
            </div>
          </div>

          {/* Payment Portal (col-md-2) */}
          <div className="w-1/2 md:w-1/6 px-[15px] mt-4 md:mt-0">
            <div className="flex flex-col items-center justify-end h-full pt-12">
              <a href="https://www.periyaruniversity.ac.in/onlinepayment/" className="block hover:scale-105 transition-transform">
                <img src="/PAYMENT.jpg" alt="PAYMENT" width="150" height="75" className="h-auto" />
              </a>
            </div>
          </div>

          {/* Portrait (col-md-2) */}
          <div className="w-1/2 md:w-1/6 px-[15px] mt-4 md:md:mt-0 text-right">
            <img src="/periyar.jpg" height="200" width="180" className="inline-block h-auto rounded shadow-sm border border-gray-100" alt="Thanthai Periyar" />
          </div>

        </div>
      </div>
    </div>
  );
}
