"use client";
import { SignedIn } from "@clerk/clerk-react";
import { SignOutButton, UserButton } from "@clerk/nextjs";
import { MouseEventHandler } from "react";
import Image from "next/image";
import Link from "next/link";
import { Switch } from "../ui/switch";
import { Label } from "../ui/label";
import { useLanguage } from "@/context/languageContext";
import { determineDictionary } from "@/lib/determineDictionaries";
import { useAtom } from 'jotai'
import { SidebarLayoutAtom, SliderOpenAtom } from '@/context/jotaiContext/atom'
import { TbLogout } from "react-icons/tb";
import { LuArrowLeftFromLine } from "react-icons/lu";
const LeftSidebarCollaps = () => {
    const { language, setLanguage } = useLanguage();
    const data = determineDictionary(language);
    const [SidebarLayout, setIsSidebarLayout] = useAtom(SidebarLayoutAtom);
    const [IsSliderOpen, setIsSliderOpen] = useAtom(SliderOpenAtom);


    const handleClickSlider: MouseEventHandler<HTMLDivElement | HTMLButtonElement> = () => {
        setIsSliderOpen(!IsSliderOpen)
    };


    const toggleLanguageAndLayout = () => {
        console.log('Hello from langu');
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
        <div className={`${SidebarLayout && 'arabic-font '}   min-h-screen bg-[#F3F3EE] flex justify-between  flex-col xl:p-5 p-3    `}>
            <div className=" flex-center">
                <div onClick={handleClickSlider} className={`p-[9px] flex-center cursor-pointer bg-[#E8E8E3] rounded-full object-cover lg:block hidden`}>
                    <LuArrowLeftFromLine className={`${!SidebarLayout ? 'rotate-180' : ''}`} size={22} />
                </div>
            </div>
            <div className="flex flex-col gap-5  items-center    ">
                <div className=" flex   justify-between items-start  w-full  ">
                    <div className="flex xl:flex-row  flex-col-reverse   justify-center items-center gap-7">
                        <Image
                            src="/LogoMark&Type.svg"
                            className="mb-4"
                            alt="search"
                            width={88}
                            height={86}
                        />

                    </div>
                </div>
                <div className={`space-y-3  justify-between items-start  w-full overflow-y-auto  min-h-[53vh] max-h-screen`} >
                    <Link href="/" className={` bg-[#E8E8E3] flex-center p-3 rounded-md flex gap-2 w-full body-regular font-light`}>
                        <Image src="/icons/home.svg" alt="search" width={16} height={16} />
                    </Link>
                    <Link href="/" className={` bg-[#E8E8E3] flex-center p-3 rounded-md flex gap-2 w-full body-regular font-light`}>
                        <Image
                            src="/icons/discover.svg"
                            alt="search"
                            width={16}
                            height={16}
                        />
                    </Link>
                    <Link href="/" className={` bg-[#E8E8E3] flex-center p-3 rounded-md flex gap-2 w-full body-regular font-light`}>
                        <Image src="/icons/library.svg" alt="search" width={16} height={16} />

                    </Link>

                    <button onClick={handleClickSlider} className={`bg-[#E8E8E3]  flex-center p-3 rounded-md flex gap-2 w-full body-regular font-light`}>
                        <Image
                            src="/icons/knowledge-bases.svg"
                            alt="search"
                            width={18}
                            height={18}
                        />
                    </button>
                </div>
            </div>



            <SignedIn>

                <div className=" flex-center  space-top1 flex-col-reverse  ">
                    <Label onClick={toggleLanguageAndLayout} id="lang" htmlFor="lang" className={`${SidebarLayout ? 'english-font' :'arabic-font'} mt-3 cursor-pointer `}>
                        {data.arabic}

                    </Label>
                    <Switch
                        id="lang"
                        className="[&>span]:bg-primary-500 border-dark-200"
                        onClick={toggleLanguageAndLayout}
                    />
                </div>

                <div className=" block text-center english-font ">
                    <UserButton
                        showName={false}
                        appearance={{
                            elements: {
                                userButtonBox: {
                                    flexDirection: "row-reverse",
                                    padding: "0px 0px",
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
                    <button className={`bg-red-200 border-red-300 ${SidebarLayout ? 'rotate-180' : ''}  flex-center  rounded-md w-full   p-2    cursor-pointer  transition-all  ease-in-out`}>
                        <SignOutButton>
                            <TbLogout color="red" size={20} />
                        </SignOutButton>
                    </button>
                </div>
            </SignedIn>


        </div>
    );
};

export default LeftSidebarCollaps;
