import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"

import FileDropZone from "@/components/FileDropZone"

{
  /* <FileDropZone className='h-36 w-36' /> */
}
const StoriesPage = () => {
  return (
    <section>
      <div className='flex items-center'>
        <h1>Create a story</h1>
        <div>
          <Dialog>
            <Button asChild>
              <DialogTrigger>Add story</DialogTrigger>
            </Button>

            <DialogContent>
              <DialogHeader>
                <DialogTitle>Are you absolutely sure?</DialogTitle>
                <DialogDescription>
                  This action cannot be undone. This will permanently delete
                  your account and remove your data from our servers.
                </DialogDescription>
              </DialogHeader>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </section>
  )
}

export default StoriesPage
