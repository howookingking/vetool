'use client'

import { DotLottiePlayer } from '@dotlottie/react-player'

type Props = {
  path: string
  className: string
}

export default function DotLottie({ path, ...rest }: Props) {
  return (
    <div {...rest}>
      <DotLottiePlayer src={path} loop autoplay />
    </div>
  )
}
