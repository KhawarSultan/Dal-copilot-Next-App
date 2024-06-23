import { useAtom } from "jotai";
import {
  Ask_PDFMessagesAtom,
  Ask_PDFLoadingAtom,
} from "@/context/jotaiContext/atom";

export const useAskPDF = () => {
  const [ask_pdfmessages, setAsk_pdfMessages] = useAtom(Ask_PDFMessagesAtom);
  const [ask_pdfloading, setAsk_pdfLoading] = useAtom(Ask_PDFLoadingAtom);

  const fetchAskPDFResponse = async (prompt: string) => {
    setAsk_pdfLoading(true);
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_GEN_API}/ask_pdf`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ query: prompt }),
        }
      );

      const data = await response.json();
      const newMessage = { question: prompt, answer: data };
      console.log("🚀 ~ fetchAskPDFResponse ~ data:", data)
      setAsk_pdfMessages((prevMessages) => [...prevMessages, newMessage]);
    } catch (error) {
      console.error(error);
    } finally {
      setAsk_pdfLoading(false);
    }
  };

  return { fetchAskPDFResponse, ask_pdfloading };
};
