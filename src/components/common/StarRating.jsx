import React from 'react'
import { Button } from '../ui/button'
import { StarIcon } from 'lucide-react'

const StarRating = () => {
  return (
    [1,2,3,4,5].map((star)=><Button variant="outline" size="icon">
      <StarIcon/>
    </Button>)
  )
}

export default StarRating