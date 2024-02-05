import { useCallback } from "react"
import { useDropzone } from "react-dropzone"
import { cn } from "@/lib/utils"

const FileDropZone = ({ className, props }) => {
  const onDrop = useCallback((acceptedFiles) => {
    acceptedFiles.forEach((file) => {
      const reader = new FileReader()

      reader.onabort = () => console.log("file reading was aborted")
      reader.onerror = () => console.log("file reading has failed")
      reader.onload = () => {
        const binaryStr = reader.result
        console.log(binaryStr)
        console.log(file)
      }
      reader.readAsDataURL(file)
    })
  }, [])
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop })

  return (
    <div
      {...getRootProps()}
      className={cn("h-24 w-24 cursor-pointer", className)}>
      <input {...getInputProps()} {...props} />
      {isDragActive ? (
        <div>
          <img src='/file-upload-active.png' alt='icon' />
        </div>
      ) : (
        <div>
          <img src='/file-upload.png' alt='icon' />
        </div>
      )}
    </div>
  )
}

export default FileDropZone
