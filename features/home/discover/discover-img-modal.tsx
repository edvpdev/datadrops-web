'use client';

import { ClientOnlyCldImage } from '@/lib/components';
import { ImageCarousel } from './disocver-img-carousel';

interface ImageModalProps {
  id: string;
  images: { alt: string; src: string }[];
}

export function ImageModal({ images, id }: ImageModalProps) {
  return (
    <div className="flex h-full w-full items-center justify-center">
      {/* <ClientOnly> */}
      <div onClick={() => (document.getElementById(id) as any).showModal()}>
        <ClientOnlyCldImage
          className="relative h-auto"
          src={images[0].src}
          alt={images[0].alt}
          width={350}
          height={190}
          mobileHeight={50}
          mobileWidth={50}
        />
      </div>
      {/* </ClientOnly> */}

      <dialog id={id} className="modal">
        <div className="modal-box flex w-11/12 max-w-5xl items-center justify-center">
          <ImageCarousel images={images} />
        </div>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    </div>
  );
}
