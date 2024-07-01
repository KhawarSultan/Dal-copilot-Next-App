"use client";
import { SignedIn } from "@clerk/clerk-react";
import { SignOutButton, UserButton } from "@clerk/nextjs";
import { MouseEventHandler } from "react";
import Image from "next/image";
import { Switch } from "../ui/switch";
import { Label } from "../ui/label";
import { useLanguage } from "@/context/languageContext";
import { determineDictionary } from "@/lib/determineDictionaries";
import { useAtom } from 'jotai'
import { SidebarLayoutAtom, LeftSidebarAtom, SliderOpenAtom } from '@/context/jotaiContext/atom'
import { RxCross2 } from "react-icons/rx";
import { TbLogout } from "react-icons/tb";
import Leftsidebarlinks from "@/components/ui/left-sidebar-links";
import LeftSidebarCollaps from "./LeftSidebarCollaps";
import { LuArrowLeftFromLine } from "react-icons/lu";



const LeftSidebar = () => {
  const { language, setLanguage } = useLanguage();
  const data = determineDictionary(language);
  const [LeftSidebarMobileOpen, setIsLeftSidebarMobileOpen] = useAtom(LeftSidebarAtom);
  const [SidebarLayout, setIsSidebarLayout] = useAtom(SidebarLayoutAtom);
  const [IsSliderOpen, setIsSliderOpen] = useAtom(SliderOpenAtom);

  const handleClickleftSidebar: MouseEventHandler<HTMLDivElement> = () => {
    setIsLeftSidebarMobileOpen(!LeftSidebarMobileOpen)
  };
  const handleClickSlider: MouseEventHandler<HTMLDivElement | HTMLButtonElement> = () => {
    setIsSliderOpen(!IsSliderOpen)
  };



  const toggleLanguageAndLayout = () => {
    const html = document.documentElement;
    if (language === "en") {
      setLanguage("ar");
      html.setAttribute('dir', 'rtl');
    } else {
      setLanguage("en");
      html.setAttribute('dir', 'ltr');
    }
    setIsSidebarLayout(!SidebarLayout);
  };

  return (

    IsSliderOpen ?
      <div className={`${SidebarLayout && 'arabic-font '}   min-h-screen bg-[#F3F3EE] flex justify-between  flex-col lg:p-6 p-4    `}>
        <div className="flex flex-col gap-5  items-center    ">
          <div className=" flex   justify-between items-start  w-full  ">
            <div className="lg:hidden   border rounded-full p-2" onClick={handleClickleftSidebar}>
              <RxCross2 size={20} stroke-width={0.2} />
            </div>
            <div className="flex xl:flex-row  flex-col-reverse   justify-center items-center gap-7">

              <Image
                src="/LogoMark&Type.svg"
                className="mb-4"
                alt="search"
                width={128}
                height={56}
              />
              <div onClick={handleClickSlider} className={`p-[9px] flex-center cursor-pointer bg-[#E8E8E3] rounded-full object-cover lg:block hidden`}>
                <LuArrowLeftFromLine className={`${SidebarLayout ? 'rotate-180' : ''}`} size={22} />
              </div>
             
            </div>
          </div>

          <Leftsidebarlinks data={data} />

        </div>
        <SignedIn>

          <div className="flex  flex-col gap-4 pt-6 ">
            <div className="flex items-center gap-2 w-full ">
              <Label onClick={toggleLanguageAndLayout} id="lang" htmlFor="lang" className={`${SidebarLayout ? 'english-font' :'arabic-font'} cursor-pointer `}>
                {data.arabic}
              </Label>
              <Switch
                id="lang"
                className="[&>span]:bg-primary-500 border-dark-200"
                onClick={toggleLanguageAndLayout}
              />


            </div>
            <div className=" xl:flex-between english-font">
              <UserButton
                showName={true}
                appearance={{
                  elements: {
                    userButtonBox: {
                      flexDirection: "row-reverse",
                      padding: "8px 0px",
                    },
                    userButtonTrigger: {
                      width: "100%",
                    },
                    rootBox: {
                      // backgroundColor: "#E8E9E9",
                      borderRadius: "4px",
                    },
                  },
                }}
              />
              <button className={`  rounded-md border xl:w-10 w-full xl:mt-0 mt-2  flex-center bg-red-200 border-red-300 p-2   cursor-pointer  transition-all  ease-in-out`}>
                <span className={`text-red-600 font-bold lg:hidden mx-2 text-sm ${SidebarLayout && 'arabic-font  '} `}>{data.logout}</span>
                <SignOutButton>
                  <TbLogout className={`${SidebarLayout ? 'rotate-180' : ''} text-red-600`} size={20} />
                </SignOutButton>
              </button>
            </div>
          </div>
        </SignedIn>


      </div >
      : <LeftSidebarCollaps />




  );
};

export default LeftSidebar;
