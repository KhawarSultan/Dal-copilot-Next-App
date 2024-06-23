import React, { useEffect, useState } from 'react';
import MarkdownToHtml from './markdownToHtml';
import '@/styles/markdown.css';
import { useAtom } from 'jotai';
import { SidebarLayoutAtom } from '@/context/jotaiContext/atom';

interface MarkdownConversionProps {
    markdownContent: string;
    speed?: number;
}

const MarkdownConversion: React.FC<MarkdownConversionProps> = ({ markdownContent, speed = 50 }) => {
    const [htmlContent, setHtmlContent] = useState<string>('');
    const [displayedContent, setDisplayedContent] = useState<string>(''); // This will be used to gradually display the content
    const [showCursor, setShowCursor] = useState<boolean>(true);
    const [SidebarLayout] = useAtom(SidebarLayoutAtom);
    const [textDirection, setTextDirection] = useState<string>('ltr'); // Default to left-to-right
    const [textClass, setTextClass] = useState<string>('english-text'); // Default to English class

    // Function to detect the language and set text direction and class
    const detectLanguage = (text: string): string => {
        const arabicRegex = /[\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF\uFB50-\uFDFF\uFE70-\uFEFF]/;
        return arabicRegex.test(text) ? 'rtl' : 'ltr';
    };

    const detectLanguageClass = (text: string): string => {
        const arabicRegex = /[\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF\uFB50-\uFDFF\uFE70-\uFEFF]/;
        return arabicRegex.test(text) ? 'arabic-font  text-sm' : 'english-font';
    };

    useEffect(() => {
        const convertMarkdown = async () => {
            const html = await MarkdownToHtml(markdownContent);
            setHtmlContent(html);
            setTextDirection(detectLanguage(html)); // Set text direction based on detected language
            setTextClass(detectLanguageClass(html)); // Set text class based on detected language
        };
        convertMarkdown();
    }, [markdownContent]);

    useEffect(() => {
        let interval: NodeJS.Timeout | null = null;

        // Function to simulate typing effect
        const typeText = () => {
            let currentCharIndex = 0;
            const totalChars = htmlContent.length;
            interval = setInterval(() => {
                if (currentCharIndex <= totalChars) {
                    setDisplayedContent(htmlContent.slice(0, currentCharIndex));
                    currentCharIndex++;
                } else {
                    clearInterval(interval!);
                    setShowCursor(false); // Hide cursor when typing animation completes
                }
            }, speed);
        };

        // Start typing effect when htmlContent changes
        if (htmlContent) {
            typeText();
        }

        // Clean up interval on component unmount or htmlContent change
        return () => {
            if (interval) {
                clearInterval(interval);
            }
        };

    }, [htmlContent, speed]);

    return (
        <div dir={textDirection} className={textClass}>
            <div className="markdown-body" dangerouslySetInnerHTML={{ __html: displayedContent }} />



            
            {/* {showCursor && <span className="flex-center  w-2 h-2 rounded-full ml-1 bg-black opacity-75 animate-blink"></span>} */}        




        </div>
    );
};

export default MarkdownConversion;
