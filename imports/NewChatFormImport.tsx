
// React
import React, { ChangeEvent } from "react";
// Form handling and validation
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

// UI Components
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/components/ui/use-toast";

// Next.js
import Image from "next/image";

// Context and state management
import { useLanguage } from "@/context/languageContext";
import { determineDictionary } from "@/lib/determineDictionaries";
import { useAtom } from 'jotai';
import {
    SidebarLayoutAtom,
    PDFuploadAtom,
    ShowPDFAtom,
    ChangeToggleAtom,
} from '@/context/jotaiContext/atom';
import { useSidebar } from '@/context/Sidebarcontext';

// Hooks
import { useAI } from '@/hooks/useAI';
import { useAskPDF } from '@/hooks/useaskPDF';
import { useFileUpload } from '@/hooks/useFileUpload';

// Icons
import { MdFilterList } from "react-icons/md";
import { AiTwotoneFilePdf } from "react-icons/ai";
import { RxCross2 } from "react-icons/rx";

// Other
import messege from "@/data/messege.json";
import { Tooltip, Button } from "@material-tailwind/react";

// Export all the imports
export {
    React,
    zodResolver,
    useForm,
    z,
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    Input,
    Switch,
    useToast,
    Image,
    useLanguage,
    determineDictionary,
    useAtom,
    SidebarLayoutAtom,
    PDFuploadAtom,
    ShowPDFAtom,
    ChangeToggleAtom,
    useSidebar,
    useAI,
    useAskPDF,
    useFileUpload,
    MdFilterList,
    AiTwotoneFilePdf,
    RxCross2,
    messege,
    Tooltip,
    Button,
};
