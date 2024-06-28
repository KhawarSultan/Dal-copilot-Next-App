import { useState } from 'react';
// import ask_pdfdata from '@/data/ask_pdf'
interface PdfMessage {
    question: string;
    answer: string;
    sources: { page_content: string; source: string; }[];
}

const Ask_pdf = () => {
    

    return (
        <div>
            <div>
                ask_pdf
            </div>
        </div>
    );
};

export default Ask_pdf;
