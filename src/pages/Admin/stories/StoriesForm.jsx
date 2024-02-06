import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import toast from "react-hot-toast"
import { X } from "lucide-react"
import { z } from "zod"
import { useCallback, useState } from "react"
import { useDropzone } from "react-dropzone"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useCreateStoryMutation } from "@/features/api/storiesApi"

const formSchema = z.object({
  videoUrl: z
    .string()
    .min(2, {
      message: "add a video link",
    })
    .url({ message: "Enter a valid url" }),
})

const StoriesForm = () => {
  const [userFile, setUserFile] = useState({})
  const [imgPreview, setImgPreview] = useState("")
  const [createStory, { isLoading }] = useCreateStoryMutation()

  const onDrop = useCallback((acceptedFiles) => {
    acceptedFiles.forEach((file) => {
      const reader = new FileReader()

      reader.onabort = () => console.log("file reading was aborted")
      reader.onerror = () => console.log("file reading has failed")
      reader.onload = () => {
        const binaryStr = reader.result
        console.log("binary", binaryStr)
        // console.log(file)
        setImgPreview(binaryStr)
        setUserFile(file)
      }
      reader.readAsDataURL(file)
    })
  }, [])
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
  })
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      videoUrl: "",
    },
  })

  //   const handleClick = () => {
  //     console.log(form.getValues("videoUrl"))
  //     console.log(form.getValues("cover"))
  //   }

  const clearPreview = () => {
    if (window.confirm("Are you sure")) {
      setImgPreview("")
    }
  }
  const onSubmit = async (values) => {
    try {
      const formData = new FormData()
      if (!userFile || !imgPreview) {
        toast.error("Please add image")
      }
      formData.append("cover", userFile)
      formData.append("videoUrl", values.videoUrl)

      const response = await createStory(formData).unwrap()
      if (response) {
        setImgPreview("")
        setUserFile({})
        form.setValue("videoUrl", "")
        toast.success(response.message)
      }
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
          {imgPreview ? (
            <div className='h-24 w-24 relative'>
              <span
                onClick={clearPreview}
                className='inline-block absolute bg-[#FF4848] rounded-full p-1 top-[-0.5rem] right-[-0.5rem] cursor-pointer'>
                <X className='h-4 w-4 text-stone-100' />
              </span>
              <img className='h-24 w-24' src={imgPreview} alt='preview' />
            </div>
          ) : (
            <div {...getRootProps()} className='h-24 w-24 cursor-pointer'>
              <input {...getInputProps()} />
              {isDragActive ? (
                <div>
                  <img src='/file-upload-active.png' alt='icon' />
                </div>
              ) : (
                <div>
                  <p className='text-xs font-semibold'>
                    Add image <span className='text-red-500'>*</span>
                  </p>
                  <img src='/file-upload.png' alt='icon' />
                </div>
              )}
            </div>
          )}
          <FormField
            control={form.control}
            name='videoUrl'
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Vidoo url <span className='text-red-500'>*</span>
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder='paste video url'
                    className='bg-zinc-100'
                    {...field}
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          {/* <Button onClick={handleClick}>check</Button> */}
          <Button disabled={isLoading} type='submit'>
            {isLoading ? "Submitting..." : "Submit"}
          </Button>
        </form>
      </Form>
    </div>
  )
}

export default StoriesForm
