import { atom } from "jotai";

type FileObject = {
    filename: string;
    sizeInMb: string;
    lastModifiedFormatted: string;
};
type Message = {
    question: string;
    answer: string;
};

export const LeftSidebarAtom = atom(false);
export const RightSidebarAtom = atom(false);
export const SidebarLayoutAtom = atom(false);
export const PDFuploadAtom = atom(false);
export const ShowPDFAtom = atom(true);

export const ChangeToggleAtom = atom(true);
export const SliderOpenAtom = atom(true);
export const AILoadingAtom = atom(false);
export const fileArrayAtom = atom<FileObject[]>([]);
export const AIMessagesAtom = atom<Message[]>([]);
export const Ask_PDFMessagesAtom = atom<Message[]>([]);
export const Ask_PDFLoadingAtom = atom(false);