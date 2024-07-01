"use client";
import React, { useState, MouseEventHandler } from "react";
import NewChatForm from "../form/NewChatForm";
import { useLanguage } from "@/context/languageContext";
import { determineDictionary } from "@/lib/determineDictionaries";
import { ScrollArea } from "../ui/scroll-area";
import { Skeleton } from "../ui/skeleton";
import { RiFileHistoryLine } from "react-icons/ri";
import { useToast } from "../ui/use-toast";
import { useAtom } from 'jotai'
import {
  AIMessagesAtom, AILoadingAtom,
  Ask_PDFMessagesAtom, Ask_PDFLoadingAtom,
  ChangeToggleAtom, LeftSidebarAtom,
  RightSidebarAtom, SidebarLayoutAtom,
  PDFuploadAtom, ShowPDFAtom
} from '@/context/jotaiContext/atom'
import messege from "@/data/messege.json";
import { HiMenuAlt4 } from "react-icons/hi";
import MarkdownConversion from "../ui/markdown-conversion";
import { useEffect, useRef } from 'react';
import { useAI } from '@/hooks/useAI';
import Ask_pdf from "../ui/ask_pdf";
const NewChat = () => {

  const { toast } = useToast();
  const { language } = useLanguage();
  const data = determineDictionary(language);
  const [checkPDFUpload, setcheckPDFUpload] = useAtom(PDFuploadAtom);
  const [LeftSidebarMobileOpen, setIsLeftSidebarMobileOpen] = useAtom(LeftSidebarAtom);
  const [RightSidebarMobileOpen, setIsRightSidebarMobileOpen] = useAtom(RightSidebarAtom);
  const [ChangeToggle, setChangeToggle] = useAtom(ChangeToggleAtom);
  const [Showpdf, setShowpdf] = useAtom(ShowPDFAtom);
  const [SidebarLayout] = useAtom(SidebarLayoutAtom);
  const [ask_pdfmessages, setAsk_pdfMessages] = useAtom(Ask_PDFMessagesAtom);
  const [ask_pdfloading, setAsk_pdfLoading] = useAtom(Ask_PDFLoadingAtom);
  const [AImessages, setAIMessages] = useAtom(AIMessagesAtom);
  const [AIloading, setAILoading] = useAtom(AILoadingAtom);
  const { fetchAIResponse } = useAI();

  const suggestions = [
    data["how_many_stars_are_in_the_milky_Way?"],
    data["who_has_won_the_most_oscars_ever?"],
    data["how_to_purify_water_in_the_wild"],
    data["whats_the_meaning_of_al_dente?"],
  ];

  const handleLeftToggle = () => {
    setChangeToggle(true)
    

  };
  const handleRightToggle = () => {
    setChangeToggle(false)
  };

  const handleClickleftSidebar: MouseEventHandler<HTMLDivElement> = () => {
    setIsLeftSidebarMobileOpen(!LeftSidebarMobileOpen)
  };
  const handleClickSuggestions = (suggestion: string) => {
    fetchAIResponse(suggestion);
  };

  const handleClickRightSidebar: MouseEventHandler<HTMLDivElement> = () => {
    setIsRightSidebarMobileOpen(!RightSidebarMobileOpen)
  };



  const detectLanguageClass = (text: string): string => {
    const arabicRegex = /[\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF\uFB50-\uFDFF\uFE70-\uFEFF]/;
    return arabicRegex.test(text) ? 'arabic-font text-sm  ' : 'english-font';
  };
  console.log(detectLanguageClass('مرحبا، كيف حالك'));
  // console.log(detectLanguageClass('مرحبا، كيف حالك'));
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const lastMessageRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (lastMessageRef.current) {
      lastMessageRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [AImessages, AIloading]);

  return (
    <>

      {/* <MarkdownConversion markdownContent={markdownContent} speed={12}  /> */}
      {/* <Ask_pdf /> */}
      <main className={``} >
        <div className="pt-5 px-6 pb-3  lg:flex-center flex-between ">
          <div className="lg:hidden text-white shadow-xl bg-dark-500 border    rounded-full p-2" onClick={handleClickleftSidebar}>
            <HiMenuAlt4 size={20} stroke-width={0.1} />
          </div>

          <div className="english-font" >
            <p className="text-center  text-gray-500 lg:mt-3 text-sm   select-none ">
              <span className={`font-extrabold  flex-center  gap-3    border px-[5px] pt-1 pb-[5px]  rounded-full `}>
                {/* <BsStars />
              <AiOutlineFilePdf /> */}
                <span
                  className={` cursor-pointer  rounded-full  flex-center gap-1 px-2 py-[8px] ${ChangeToggle ? "text-white shadow-xl border bg-dark-500 md:border px-2 py-[8px] " : "text-gray-500"}`}
                  onClick={handleLeftToggle}
                >
                  Chat With AI
                </span>
                <span
                  className={`cursor-pointer  flex-center gap-1 px-2 py-[8px] ${ChangeToggle ? "text-gray-500 " : "text-white shadow-xl border bg-dark-500 md:border rounded-full px-2 py-[8px]"}`}
                  onClick={handleRightToggle}
                >
                  Ask PDF

                </span>
              </span>
            </p>
          </div>
          <div className="lg:hidden text-white shadow-xl bg-dark-500 border rounded-full p-2" onClick={handleClickRightSidebar}>
            <RiFileHistoryLine size={20} />
          </div>
        </div>


        <div className="md:px-10 px-5 flex items-center gap-8 order-2 flex-col  md:w-3/4 m-auto justify-center  ">
          {!ChangeToggle &&
            (ask_pdfmessages?.length === 0 && !ask_pdfloading) && (
              <h1 className={`${SidebarLayout ? 'arabic-font' : 'english-font'} text-center font-extrabold h1-bold lg:mt-[7.6rem] mt-[2.2rem]`}>
                {data.where_knowledge_begins}
              </h1>
            )}
          {ChangeToggle &&
            (AImessages?.length === 0 && !AIloading) && (
              <h1 className={`${SidebarLayout ? 'arabic-font' : 'english-font'} text-center font-extrabold h1-bold lg:mt-[7.6rem] mt-[2.2rem]`}>
                {data.where_knowledge_begins}
              </h1>
            )}

          <div className={`w-full  flex flex-col    ${(ask_pdfmessages?.length || AImessages?.length > 0) ? "justify-between h-full " : ""} `}>

            {ChangeToggle ?
              (AImessages?.length > 0 || AIloading) &&
              <ScrollArea  className={` flex flex-col w-full  my-2    xl:h-[67vh] lg:h-[60vh] h-[64vh] rounded-3xl`} >
                {AImessages?.map((message: any,index:number) => {
                  return (
                    <div  key={message.question} className={` w-full flex flex-col  space-y-2 `}  >
                      <p className={`${detectLanguageClass(message.question) } bg-dark-500  self-end  text-white w-fit max-w-full  px-4 py-2 rounded-tr-3xl rounded-tl-3xl rounded-bl-3xl text-wrap my-4`}>
                        {message.question}
                      </p>
                      <p  className={`bg-dark-100 w-fit   rounded-tr-3xl rounded-bl-3xl rounded-br-3xl max-w-full px-6 py-2  text-wrap`} >
                        <MarkdownConversion markdownContent={message.answer} speed={14} />
                      </p>

                    </div>
                  );
                })}
                {
                  AIloading && (
                    <div className="w-full flex flex-col">
                      <Skeleton className="bg-dark-300 w-[200px] h-9 rounded-tr-3xl rounded-tl-3xl rounded-bl-3xl my-3 self-end" />
                      <Skeleton className={` rounded-tr-3xl rounded-bl-3xl rounded-br-3xl bg-dark-100 w-[300px] h-9  my-2 `} />
                    </div>
                  )
                }
              </ScrollArea>
              :
              (ask_pdfmessages?.length > 0 || ask_pdfloading) &&
              <ScrollArea className="flex flex-col w-full  my-2    lg:h-[62vh] h-[58vh] rounded-3xl " >
                {ask_pdfmessages?.map((message: any) => {
                  return (
                    <div key={message.question} className={`w-full flex flex-col  space-y-2 `} >
                      <p className={`${detectLanguageClass(message.question) }  bg-dark-500    self-end text-white w-fit max-w-full  px-4 py-2 rounded-tr-3xl rounded-tl-3xl rounded-bl-3xl text-wrap my-3`}>
                        {message.question}
                      </p>
                      <p className="bg-dark-100 w-fit  max-w-full px-4 py-2 rounded-tr-3xl rounded-bl-3xl rounded-br-3xl text-wrap ">
                        <MarkdownConversion markdownContent={message.answer.answer} speed={18} />
                      </p>

                    </div>
                  );
                })}
                {
                  ask_pdfloading && (
                    <div className="w-full flex flex-col">
                      <Skeleton className="bg-dark-300 w-[200px] h-9 rounded-tr-3xl rounded-tl-3xl rounded-bl-3xl my-3 self-end" />
                      <Skeleton className="bg-dark-100 w-[300px] h-9 rounded-tr-3xl rounded-bl-3xl rounded-br-3xl my-2 " />
                    </div>
                  )
                }
              </ScrollArea>
            }
            <NewChatForm />
          </div>

          {ChangeToggle && !AIloading && AImessages?.length === 0 && (
            <div className={`flex gap-2 ${SidebarLayout && 'text-xs arabic-font'} md:w-11/12 m-auto flex-wrap items-center font-light body-regular`}>
              <span>{data.try_pro}</span>
              {suggestions.map((suggestion) => (
                <button
                  className="py-2 px-4 border border-dark-100 rounded-3xl"
                  key={suggestion}
                  onClick={() => handleClickSuggestions(suggestion)}
                >
                  {suggestion}
                </button>
              ))}
            </div>
          )}
        </div>
      </main>
    </>
  );
};

export default NewChat;
