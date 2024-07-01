"use client";
import React, { ChangeEvent } from "react";
import {
  zodResolver, useForm, z, Form, FormControl, FormField, FormItem, FormLabel,
  Input, Switch, useToast, Image, useLanguage, determineDictionary, useAtom,
  SidebarLayoutAtom, PDFuploadAtom, ShowPDFAtom, ChangeToggleAtom, useAI, useAskPDF, useFileUpload,
  MdFilterList, useSidebar, AiTwotoneFilePdf, RxCross2, messege, Tooltip, Button
} from '@/imports/NewChatFormImport';


const formSchema = z.object({
  prompt: z.string().min(2),
  pro: z.boolean(),
});
interface FileProps {
  name: string;
  lastModified: number;
  size: number;
}
const NewChatForm = () => {
  const { toast } = useToast();
  const { language } = useLanguage();
  const data = determineDictionary(language);
  const [checkPDFUpload, setcheckPDFUpload] = useAtom(PDFuploadAtom);
  const [Showpdf, setShowpdf] = useAtom(ShowPDFAtom);
  const [ChangeToggle, setChangeToggle] = useAtom(ChangeToggleAtom);
  const [SidebarLayout] = useAtom(SidebarLayoutAtom);
  const { fetchAIResponse, AIloading } = useAI();
  const { fetchAskPDFResponse, ask_pdfloading } = useAskPDF();
  const { fileArray, handleFileUpload, isFileUploading } = useFileUpload();



  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      prompt: "",
      pro: false,
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    const { prompt, pro } = values;
    form.reset();
    if (AIloading === true || ask_pdfloading === true) {
      toast({
        title: "Waiting...",
        description: 'Please Wait for the Response ...',
        variant: "destructive",
      });
    } else {
      if (ChangeToggle === false) {
        fetchAskPDFResponse(prompt);
      } else {
        fetchAIResponse(prompt);
      }
    }
  }


  const handleDocumentUpload = async (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target && e.target.files) {
      const file = e.target.files[0];
      console.log("🚀 ~ handleDocumentUpload ~ file:", file)

      if (file?.type === 'application/pdf') { // Corrected PDF type check
        try {
          const { success, message } = await handleFileUpload(file);

          if (success) {
            console.log(message)
            toast({
              title: 'Success',
              description: message,
              variant: "primary",
            });
          } else {
            console.error(message);
            toast({
              title: "File Upload Failed",
              description: message,
              variant: "destructive",
            });
          }
        } catch (error) {
          console.error("Error uploading file:", error);
          toast({
            title: "File Upload Error",
            description: "An error occurred while uploading the file.",
            variant: "destructive",
          });
        }
      } else {
        // Handle incorrect file type
        setcheckPDFUpload(false);
        toast({
          title: "File Error",
          description: "Only PDF files are allowed.",
          variant: "destructive",
        });
      }
    }
  };


  const handleDelete = (fileName: string) => {
    // setFileArray(fileArray.filter(file => file.name !== fileName));
    setShowpdf(false)
    // setIsFileUploading(false);
    setChangeToggle(true)
    setcheckPDFUpload(false)
  };


 
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className={`${SidebarLayout ? 'arabic-font' : 'english-font'} flex lg:gap-4 gap-3 w-full flex-col border rounded-lg  border-dark-200 p-3  border-solid`}
      >
        <FormField
          control={form.control}
          name="prompt"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormControl>
                <Input
                  {...field}
                  placeholder={data.ask_anything}
                  className={`border-0  ${language == "ar"
                    ? " px-1 "
                    : " px-5 "
                    }`}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <div className="flex justify-between">
          <div className="flex-center">
            <input
              type="file"
              onChange={(e) => handleDocumentUpload(e)}
              className="file-input__input"
              id="file-input"
            />
            <div className="flex-center gap-2  ">

              {/* <Tooltip content="Set a focus for your source">
                </Tooltip> */}
              <label
                className="file-input__label   px-2 py-1  flex-center gap-2 !text-dark-400   font-light  rounded-full hover:gray transition-all ease-in-out hover:bg-[#E8E8E3]"
              >
                <MdFilterList size={16} />
                {data.focus}
              </label>
              {/* <Tooltip content="Upload PDF">
                </Tooltip> */}
              <label
                className="file-input__label flex gap-2 px-2 py-1 !text-dark-400 font-light  rounded-full transition-all ease-in-out hover:bg-[#E8E8E3] "
                htmlFor="file-input"
              >
                <Image
                  src="/icons/attach.svg"
                  alt="search"
                  width={14}
                  height={14}
                />
                {data.attach}
              </label>


            </div>
          </div>
          <div className=" flex-center  ">
            {/* <section>
              {
                fileObject?.name && <div className=" flex-center select-none text-xs gap-2 bg-green-100 border border-green-300 px-2 py-1  rounded-lg">
                  <AiTwotoneFilePdf size={24} />
                  <div className=" leading-4">
                    <p className=" font-extrabold">{fileObject?.name}</p>
                    <div className="flex-center gap-1">
                      <p>{fileObject?.sizeInMb}</p> -
                      <p className=" text-gray-500">{fileObject?.lastModifiedFormatted}</p>
                    </div>
                  </div>

                </div>
              }
            </section> */}

            <FormField
              control={form.control}
              name="pro"
              render={({ field }) => (
                <FormItem className="flex-center space-y-0 gap-2">
                  <FormControl>
                    <Switch
                      className="[&>span]:bg-primary-500 border-dark-200"
                      checked={field.value}
                      onCheckedChange={field.onChange}
                      aria-readonly
                    />
                  </FormControl>
                  <FormLabel className="text-base">{data.pro}</FormLabel>
                </FormItem>
              )}
            />
          </div>

        </div>
        
      </form>
    </Form>
  );
};

export default NewChatForm;
