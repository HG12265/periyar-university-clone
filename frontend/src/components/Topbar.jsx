export default function Topbar() {
  return (
    <div className="w-full bg-[#000064]">
      {/* Container simulating row with flex, h-40px, and vertical center */}
      <div className="flex items-center h-[40px] text-[#ffffff] text-[12px] font-sans px-[15px] max-w-[1920px] mx-auto">

        {/* Left Side: Slogan/Text */}
        <div className="flex-1 text-left font-tamil">
          அறிவால் விளையும் உலகு
        </div>

        {/* Center: Official Info (GST/CSR) */}
        <div className="flex-1 text-center">
          GSTIN:33AAAJP0951B1ZP &nbsp; CSR Reg.No: CSR00061509
        </div>

        {/* Right Side: Controls (A+ A A-) & Social Icons */}
        <div className="flex-1 text-right flex justify-end items-center">

          {/* Font Controls */}
          <div className="flex items-center">
            <span className="bg-[#dc3545] text-white px-[10px] py-[3px] font-bold text-[13px] rounded cursor-pointer ml-[10px]">A+</span>
            <span className="bg-[#dc3545] text-white px-[10px] py-[3px] font-bold text-[13px] rounded cursor-pointer ml-[5px]">A</span>
            <span className="bg-[#dc3545] text-white px-[10px] py-[3px] font-bold text-[13px] rounded cursor-pointer ml-[5px]">A-</span>
          </div>

          {/* Social Icons */}
          <div className="flex items-center ml-[115px]">
            <a href="https://www.facebook.com/profile.php?id=100085246909314" target="_blank" rel="noreferrer" className="ml-[2px] py-[6px]" >
              <img src="/fb.jpg" height="30" width="40" title="Facebook" />
            </a>
            <a href="https://www.instagram.com/periyar_univesity_official/" target="_blank" rel="noreferrer" className="ml-[2px] py-[6px]">
              <img src="/insta.jpeg" height="30" width="40" title="Instagram" />
            </a>
            <a href="https://twitter.com/PeriyarVarsity" target="_blank" rel="noreferrer" className="ml-[2px]">
              <img src="/twitter.png" height="25" width="35" title="Twitter" />
            </a>
            <a href="https://www.youtube.com/channel/UCJqVMMa81Cnmu3LdLpsKXYw" target="_blank" rel="noreferrer" className="ml-[2px]">
              <img src="/youtube.png" height="40" width="45" title="Youtube" />
            </a>
          </div>

        </div>

      </div>
    </div>
  );
}
