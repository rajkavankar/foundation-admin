import { useState, useEffect } from "react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { useGetStoriesQuery } from "@/features/api/storiesApi"
import { Card, CardHeader, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import StoriesForm from "./StoriesForm"
import StoriesSkeleton from "./StoriesSkeleton"

const StoriesPage = () => {
  const [stories, setStories] = useState([])
  const { data, isLoading, isSuccess } = useGetStoriesQuery()
  useEffect(() => {
    setStories(data?.stories)
    console.log("rendered")
  }, [data])
  return (
    <section>
      <div className='flex items-center justify-between mb-3'>
        <h1 className='text-3xl'>Stories of motion</h1>
        <div>
          <Dialog>
            <Button asChild>
              <DialogTrigger>Add story</DialogTrigger>
            </Button>

            <DialogContent>
              <DialogHeader>
                <DialogTitle>Create a story</DialogTitle>
              </DialogHeader>

              <StoriesForm />
            </DialogContent>
          </Dialog>
        </div>
      </div>
      <div>
        {isLoading ? (
          <>
            <StoriesSkeleton />
          </>
        ) : (
          <Card>
            <CardHeader>
              <div className='flex justify-start items-center gap-2'>
                <h1 className='text-3xl'>Stories count </h1>
                <Badge>
                  <p className='text-lg'>{stories?.length}</p>
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className='grid grid-cols-3 gap-3'>
                {stories?.map((story) => (
                  <div key={story._id}>
                    <StoryCard
                      img={story.image.secure_url}
                      videoLink={story.videoUrl}
                    />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </section>
  )
}

export default StoriesPage

const StoryCard = ({ img, videoLink, className }) => {
  return (
    <div className={cn("relative  rounded-xl", className)}>
      <img
        src={img}
        alt='Story card'
        className='z-0 h-full w-full rounded-xl object-cover'
      />
      <div className='absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent'></div>
      <div className='absolute bottom-4 left-4 text-left'>
        <button
          onClick={() => window.open(videoLink, "_blank")}
          className='mt-2 inline-flex cursor-pointer items-center text-sm font-semibold text-slate-100'>
          View video &rarr;
        </button>
      </div>
    </div>
  )
}
