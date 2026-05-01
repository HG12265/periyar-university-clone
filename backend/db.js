const Database = require('better-sqlite3');
const path = require('path');

const dbPath = path.join(__dirname, 'periyar.db');
const db = new Database(dbPath, { verbose: console.log });

// Initialize database tables
const initDb = () => {
  db.exec(`
    CREATE TABLE IF NOT EXISTS slides (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      type TEXT NOT NULL CHECK(type IN ('image', 'video')),
      src TEXT NOT NULL,
      alt TEXT NOT NULL,
      orderIndex INTEGER NOT NULL
    );

    CREATE TABLE IF NOT EXISTS news (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      date TEXT NOT NULL,
      title TEXT NOT NULL,
      url TEXT NOT NULL,
      createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS settings (
      key TEXT PRIMARY KEY,
      value TEXT NOT NULL
    );
  `);

  // Check if slides is empty, if so, insert defaults
  const slidesCount = db.prepare('SELECT COUNT(*) as count FROM slides').get();
  if (slidesCount.count === 0) {
    const insertSlide = db.prepare('INSERT INTO slides (type, src, alt, orderIndex) VALUES (?, ?, ?, ?)');
    
    const initialSlides = [
      { type: 'image', src: '/periyar_birth.jpg', alt: 'Periyar' },
      { type: 'image', src: '/teachers.jpg', alt: 'Teachers Day' },
      { type: 'video', src: '/Antiragging.mp4', alt: 'Anti Ragging' },
      { type: 'image', src: '/krc1.jpg', alt: 'KRC' },
      { type: 'image', src: '/pasumai.jpg', alt: 'Pasumai' },
      { type: 'image', src: '/sip.jpg', alt: 'SIP' }
    ];

    const insertManySlides = db.transaction((slides) => {
      slides.forEach((slide, idx) => {
        insertSlide.run(slide.type, slide.src, slide.alt, idx);
      });
    });

    insertManySlides(initialSlides);
    console.log('Inserted initial slides data');
  }

  // Check if news is empty, if so, insert defaults
  const newsCount = db.prepare('SELECT COUNT(*) as count FROM news').get();
  if (newsCount.count === 0) {
    const insertNews = db.prepare('INSERT INTO news (date, title, url) VALUES (?, ?, ?)');
    
    const initialNews = [
      { date: '24 APR 2026', title: 'CDOE (PUCODE) - Feb 2026 Examinations – Hall Ticket', url: 'http://pridecoe.periyaruniversity.ac.in/CDOE_feb26_hall_ticket/' },
      { date: '24 APR 2026', title: 'CDOE (PUCODE) - Feb 2026 Examinations – Time Table', url: 'http://pridecoe.periyaruniversity.ac.in/schme-CDOE_feb2026.pdf' },
      { date: '21 APR 2026', title: 'Admission Notification - Advertisement', url: 'https://www.periyaruniversity.ac.in/Documents/2026/Advt/ad14.pdf' },
      { date: '21 APR 2026', title: 'University Department Admission 2026-27 Online Application link', url: 'http://43.204.58.223/pu_uam_online/index.php/admission/OnlineApplicationForm/homePage/home/2' },
      { date: '21 APR 2026', title: 'PG Extension Centre admission 2026-27 Online Application link', url: 'http://43.204.58.223/pu_uam_pgext/index.php/admission/OnlineApplicationForm/homePage/home/2' },
      { date: '13 APR 2026', title: 'Advertisement for the post of Project Assistant under CMRG Project & ANRF Project Applications', url: 'https://www.periyaruniversity.ac.in/advt.php' },
      { date: '08 APR 2026', title: 'Ten Days Advanced Research Methodology Course for Social Science Research Scholars', url: '#' },
    ];

    const insertManyNews = db.transaction((newsItems) => {
      newsItems.forEach((news) => {
        insertNews.run(news.date, news.title, news.url);
      });
    });

    insertManyNews(initialNews);
    console.log('Inserted initial news data');
  }

  // Check if settings are empty, if so, insert default menus
  const settingsCount = db.prepare('SELECT COUNT(*) as count FROM settings').get();
  if (settingsCount.count === 0) {
    const insertSetting = db.prepare('INSERT INTO settings (key, value) VALUES (?, ?)');
    
    const initialNavbar = [
      {
        label: 'University',
        links: [
          { name: 'About University', url: 'https://www.periyaruniversity.ac.in/AboutUs.php' },
          { name: 'VC Desk', url: 'https://www.periyaruniversity.ac.in' },
          { name: 'Services', url: 'https://www.periyaruniversity.ac.in/services.php' },
          { name: 'Facilities', url: 'https://www.periyaruniversity.ac.in/Facilities.php' },
          {
            name: '2(f) - 12 (B)',
            links: [
              { name: '2(f)', url: 'https://www.periyaruniversity.ac.in/Documents/2025/Ranking/2f.jpg' },
              { name: '12(B)', url: 'https://www.periyaruniversity.ac.in/Documents/2025/Ranking/12b.jpg' },
            ]
          },
          { name: 'Approval', url: 'https://www.periyaruniversity.ac.in/Documents/2025/Ranking/tnapproval.pdf' },
          { name: 'Act and Statutes', url: 'https://www.periyaruniversity.ac.in/Documents/2016/01/ACT-STATUTES-Book-2016.pdf' },
          { name: 'Roll Call', url: 'https://www.periyaruniversity.ac.in/rollcall.php' },
          { name: 'Funding Agency', url: 'https://www.periyaruniversity.ac.in/Images/Fund_Agency.pdf' },
          { name: 'Organogram', url: 'https://www.periyaruniversity.ac.in/Documents/2021/organogram.pdf' },
          { name: 'Campus Map', url: 'https://www.periyaruniversity.ac.in/campusmap.php' },
        ]
      },
      {
        label: 'Authorities',
        links: [
          { name: 'Chancellor', url: 'https://www.periyaruniversity.ac.in/chancellor.php' },
          { name: 'Pro Chancellor', url: 'https://www.periyaruniversity.ac.in/prochancellor.php' },
          { name: 'Vice Chancellor', url: 'https://www.periyaruniversity.ac.in/vicechancellor.php' },
          { name: 'Members of Syndicate', url: 'https://www.periyaruniversity.ac.in/Syndicate.php' },
          { name: 'Members of Senate', url: 'https://www.periyaruniversity.ac.in/Senate.php' },
          { name: 'Members of Standing Committee', url: 'https://www.periyaruniversity.ac.in/scaa.php' },
          { name: 'Planning Board', url: 'https://www.periyaruniversity.ac.in/PlanningBoard.php' },
        ]
      },
      {
        label: 'Administration',
        links: [
          { name: 'Registrar', url: 'https://www.periyaruniversity.ac.in/registrar.php' },
          { name: 'Controller of Examinations', url: 'https://www.periyaruniversity.ac.in/coe.php' },
          { name: 'Deans and Coordinators', url: 'https://www.periyaruniversity.ac.in/Dean.php' },
          { name: 'Finance Officer', url: 'https://www.periyaruniversity.ac.in/Finance.php' },
        ]
      },
      {
        label: 'Academic',
        links: [
          { name: 'Schools and Departments', url: 'https://www.periyaruniversity.ac.in/Dept.php' },
          { name: 'CBCS Regulations', url: 'https://www.periyaruniversity.ac.in/Documents/2021/CBCS_Regulations.pdf' },
          { name: 'Centres and Cells', url: 'https://www.periyaruniversity.ac.in/Centres.php' },
          { name: 'Awards and Honors', url: 'https://www.periyaruniversity.ac.in/Awards.php' },
          { name: 'Centre for PG and Research Studies', url: 'https://www.periyaruniversity.ac.in/Dept/pgex.php' },
          { name: 'Community Colleges', url: 'https://www.periyaruniversity.ac.in/Community_Colleges.php' },
          { name: 'Affiliated Colleges', url: 'https://www.periyaruniversity.ac.in/Affiliated_Colleges.php' },
          {
            name: 'BOS Members',
            links: [
              { name: 'University Departments', url: 'https://www.periyaruniversity.ac.in/Documents/2025/CDC/ud_bos_members1.pdf' },
              { name: 'Affiliated Colleges for UG Programmes', url: 'https://www.periyaruniversity.ac.in/Documents/2025/CDC/UG_BOS_Members.pdf' },
              { name: 'Affiliated Colleges for PG Programmes', url: 'https://www.periyaruniversity.ac.in/Documents/2025/CDC/PG_BOS_Members.pdf' },
            ]
          },
          { name: 'Memorandum of Understanding', url: 'https://www.periyaruniversity.ac.in/Images/MOU.pdf' },
        ]
      },
      {
        label: 'Admission',
        links: [
          { name: 'Admission Details', url: 'https://www.periyaruniversity.ac.in/Admission_Details.php' },
          {
            name: 'Programmes offered',
            links: [
              { name: 'University Departments', url: 'https://www.periyaruniversity.ac.in/Programmes_offered.php' },
              { name: 'Affiliated Colleges', url: 'https://www.periyaruniversity.ac.in/Programmes_offered_college23-24.php' },
            ]
          },
          { name: 'Eligibility Details', url: 'https://www.periyaruniversity.ac.in/Eligi.php' },
          { name: 'Fees Structure', url: 'https://www.periyaruniversity.ac.in/fees.php' },
          { name: 'Admission Process', url: 'https://www.periyaruniversity.ac.in/Prospectus.php' },
          { name: 'Scholarships', url: 'https://www.periyaruniversity.ac.in/StudentCorner.php' },
          { name: 'Fellowship', url: 'https://www.periyaruniversity.ac.in/Fellowship.php' },
        ]
      },
      { label: 'Research', url: 'https://www.periyaruniversity.ac.in/Research/' },
      {
        label: 'Examination',
        links: [
          { name: 'Revised Fees & PRIDE Fees Structure', url: 'https://www.periyaruniversity.ac.in/examfee.php' },
          { name: 'Unclaimed Certificates', url: 'https://www.periyaruniversity.ac.in/unclime.php' },
          { name: 'E-Sanad Services', url: 'https://www.periyaruniversity.ac.in/esanad.php' },
          { name: 'Examination Schedule', url: 'https://www.periyaruniversity.ac.in/COEExamSche.php' },
          { name: 'Results', url: 'https://www.periyaruniversity.ac.in/Result.php' },
          { name: 'Downloads', url: 'https://www.periyaruniversity.ac.in/Download.php' },
          { name: 'Procedure for Certification', url: 'https://www.periyaruniversity.ac.in/Cert_Procedure.php' },
        ]
      },
      {
        label: 'IQAC',
        links: [
          { name: 'About IQAC', url: 'https://www.periyaruniversity.ac.in/aboutiqac.php' },
          { name: 'Members', url: 'https://www.periyaruniversity.ac.in/iqac.php' },
          { name: 'NAAC Accreditation', url: 'https://www.periyaruniversity.ac.in/nacc.php' },
          {
            name: 'Call for CAS (Application)',
            links: [
              { name: '2025 - UD', url: 'https://www.periyaruniversity.ac.in/Documents/2025/CDC/cas_ud_app_2025.pdf' },
              { name: '2025 - PG', url: 'https://www.periyaruniversity.ac.in/Documents/2025/CDC/cas_pg_app_2025.pdf' },
              { name: '2024', url: 'https://www.periyaruniversity.ac.in/Documents/2024/CDC/cas_app_2024.pdf' },
              { name: '2018', url: 'https://www.periyaruniversity.ac.in/Documents/2023/CAS/CAS-Application-2018.pdf' },
              { name: '2016', url: 'https://www.periyaruniversity.ac.in/Documents/2023/CAS/CAS-Application-2016.pdf' },
            ]
          },
          { name: 'Policies', url: 'https://www.periyaruniversity.ac.in/Policies.php' },
          { name: 'Strategic Plan', url: 'https://www.periyaruniversity.ac.in/Strategic_Plan.php' },
          {
            name: 'IQAC Meetings',
            links: [
              { name: 'Meetings Minutes', url: 'https://www.periyaruniversity.ac.in/iqcmeet.php' },
              { name: 'Action Taken Report', url: 'https://www.periyaruniversity.ac.in/iqcatr.php' },
            ]
          },
          { name: 'AQAR', url: 'https://www.periyaruniversity.ac.in/aqar.php' },
          { name: 'Feedback System', url: 'https://www.periyaruniversity.ac.in/feedbacksystem.php' },
          { name: 'Best Practices', url: 'https://www.periyaruniversity.ac.in/bestpractices.php' },
          { name: 'Annual Report', url: 'https://www.periyaruniversity.ac.in/annualreport.php' },
          { name: 'Programme Brochure', url: 'https://www.periyaruniversity.ac.in/program_brochure.php' },
          {
            name: 'IIC',
            links: [
              { name: 'NISP', url: 'https://www.periyaruniversity.ac.in/iic/' },
            ]
          },
        ]
      },
      {
        label: 'Ranking',
        links: [
          { name: 'ARIIA', url: 'https://www.periyaruniversity.ac.in/ariia.php' },
          { name: 'NIRF', url: 'https://www.periyaruniversity.ac.in/nirf.php' },
          {
            name: 'IIC',
            links: [
              { name: '2023-24', url: 'https://www.periyaruniversity.ac.in/Need/images/iic_23.jpg' },
              { name: '2022-23', url: 'https://www.periyaruniversity.ac.in/Need/images/iic22_23.jpg' },
              { name: '2021-22', url: 'https://www.periyaruniversity.ac.in/Need/images/iic.jpg' },
            ]
          },
        ]
      },
      { label: 'DistanceEdu.', url: 'http://pride.periyaruniversity.ac.in/' },
      { label: 'Contact', url: 'https://www.periyaruniversity.ac.in/Contact.php' },
    ];

    const initialFooterAcademic = [
      { name: 'Affiliated Colleges', url: 'https://www.periyaruniversity.ac.in/Affiliated_Colleges.php' },
      { name: 'Centres & Cells', url: 'https://www.periyaruniversity.ac.in/Centres.php' },
      { name: 'Community Colleges', url: 'https://www.periyaruniversity.ac.in/Community_Colleges.php' },
      { name: 'Departments', url: 'https://www.periyaruniversity.ac.in/Dept.php' },
      { name: 'PG Research Studies', url: 'https://www.periyaruniversity.ac.in/Dept/pgex.php' },
      { name: 'Programmes Offered', url: 'https://www.periyaruniversity.ac.in/Programmes_offered.php' },
      { name: 'PU-CRI', url: 'https://www.periyaruniversity.ac.in/centre/CRI/' },
    ];

    const initialFooterQuickLeft = [
      { name: 'Achievements', url: 'https://www.periyaruniversity.ac.in/Major_Achievements.php' },
      { name: 'Anti Ragging', url: 'https://www.periyaruniversity.ac.in/antirag.php' },
      { name: 'Downloads', url: 'https://www.periyaruniversity.ac.in/Download.php' },
      { name: 'e - Sanad Services', url: 'https://www.periyaruniversity.ac.in/esanad.php' },
      { name: 'Facilities', url: 'https://www.periyaruniversity.ac.in/Facilities.php' },
      { name: 'Login', url: 'https://www.periyaruniversity.ac.in/login.php' },
      { name: 'Newsletter', url: 'https://www.periyaruniversity.ac.in/newsletter.php' },
    ];

    const initialFooterQuickRight = [
      { name: 'Physical Education', url: '#' },
      { name: 'Placement', url: 'https://www.periyaruniversity.ac.in/Placement.php' },
      { name: 'Publication', url: '#' },
      { name: 'Results - April 2025', url: 'https://www.periyaruniversity.ac.in/Result.php' },
      { name: 'Students Portal', url: '#' },
      { name: 'Syllabus', url: '#' },
      { name: 'UICP Institute List', url: '#' },
    ];

    db.transaction(() => {
      insertSetting.run('navbarMenu', JSON.stringify(initialNavbar));
      insertSetting.run('footerAcademic', JSON.stringify(initialFooterAcademic));
      insertSetting.run('footerQuickLeft', JSON.stringify(initialFooterQuickLeft));
      insertSetting.run('footerQuickRight', JSON.stringify(initialFooterQuickRight));
    })();
    
    console.log('Inserted initial settings data');
  }
};

initDb();

module.exports = db;
