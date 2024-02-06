import { Card, CardHeader, CardContent } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

const StoriesSkeleton = () => {
  return (
    <Card>
      <CardHeader>
        <div className='flex justify-start items-center gap-2'>
          <div>
            <Skeleton className='w-[300px] h-[50px] rounded-md bg-gray-200' />
          </div>
          <div>
            <Skeleton className='w-[50px] h-[50px] rounded-full bg-gray-200' />
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className='grid grid-cols-3 gap-3'>
          {[...new Array(6)].map((_, i) => (
            <Skeleton
              key={i}
              className='w-full h-[200px] rounded-md bg-gray-200'
            />
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

export default StoriesSkeleton
