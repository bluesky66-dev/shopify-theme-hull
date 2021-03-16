import React from 'react'
import { AnimatePresence, motion } from 'framer-motion'

import { hasObject } from '@lib/helpers'

import Carousel from '@components/carousel'
import Photo from '@components/photo'

import { swipeAnim } from '@lib/animate'

const ProductGallery = ({
  photosets,
  activeVariant,
  hasArrows,
  hasThumbs,
  hasDots,
  hasDrag,
  hasCounter,
}) => {
  if (!photosets) return null

  // 1. extract the active variant's options
  const { options } = activeVariant

  // 2. find the default photoset from the "forOption" field (default is blank)
  const defaultPhotoset = photosets.find((set) => !set.forOption)

  // 3. find the first photoset that matches one of the variants options
  const variantPhotoset = photosets.find((set) => {
    const option = set.forOption
      ? {
          name: set.forOption.split(':')[0],
          value: set.forOption.split(':')[1],
        }
      : {}
    return option.value && hasObject(options, option)
  })

  // 4. finally, pick our set of photos
  const photos = variantPhotoset
    ? variantPhotoset?.photos
    : defaultPhotoset?.photos

  // generate a unique ID for this set of images (for framer animation)
  const id = photos && photos.map((p) => p.id).join('')

  return (
    <>
      {photos && (
        <AnimatePresence exitBeforeEnter>
          <motion.div
            key={id}
            initial="hide"
            animate="show"
            exit="hide"
            variants={swipeAnim}
            className="what"
          >
            <Carousel
              id={id}
              hasArrows={hasArrows}
              hasDots={hasDots}
              hasCounter={hasCounter}
              thumbs={hasThumbs}
              hasDrag={hasDrag}
            >
              {photos.map((photo, key) => (
                <Photo key={key} photo={photo} className="carousel--photo" />
              ))}
            </Carousel>
          </motion.div>
        </AnimatePresence>
      )}
    </>
  )
}

export default ProductGallery
