import { useAtom } from "jotai";
import { AIMessagesAtom, AILoadingAtom } from "@/context/jotaiContext/atom";

export const useAI = () => {
  const [AImessages, setAIMessages] = useAtom(AIMessagesAtom);
  const [AIloading, setAILoading] = useAtom(AILoadingAtom);

  const fetchAIResponse = async (prompt: string) => {
    setAILoading(true);
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_GEN_API}/ai`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query: prompt }),
      });

      const data = await response.json();
      const newMessage = { question: prompt, answer: data.answer };
      setAIMessages((prevMessages) => [...prevMessages, newMessage]);
    } catch (error) {
      console.error(error);
    } finally {
      setAILoading(false);
    }
  };

  return { fetchAIResponse, AIloading };
};
