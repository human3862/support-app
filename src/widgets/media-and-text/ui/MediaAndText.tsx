import Image from 'next/image'
import type { Page, Media } from '@/shared/types/payload-types'
import { Button } from '@/shared/UI/Button'
import { Input } from '@/shared/UI/Input'

type MediaAndTextData = Extract<NonNullable<Page['layout']>[number], { blockType: 'mediaAndText' }>

export const MediaAndText: React.FC<MediaAndTextData> = ({
  layout,
  title,
  description,
  image,
  extraContent,
}) => {
  const isRight = layout === 'imageRight'
  const imageData = typeof image === 'object' ? (image as Media) : null

  return (
    <section className="mb-[clamp(20px,3vw,80px)] p-[clamp(30px,3vw,70px)] px-[clamp(10px,8vw,250px)]">
      <div className={`grid grid-cols-1 lg:grid-cols-2`}>
        <div
          className={`order-last flex flex-col items-start justify-center gap-[clamp(10px,4vw,32px)] ${isRight ? 'lg:order-first' : 'lg:order-last'}`}
        >
          <h2 className="text-[clamp(28px,4vw,61px)] leading-tight font-bold">{title}</h2>
          <p className="text-[clamp(12px,4vw,18px)] leading-relaxed">{description}</p>

          <div className="flex gap-8">
            {extraContent?.map((block, index) => {
              if (block.blockType === 'list') {
                return (
                  <ul key={index}>
                    {block.items?.map((li, index) => (
                      <li key={index} className="flex items-center gap-3 p-2 font-semibold">
                        <Image src="/Combined shape 16074.png" alt="Галка" height={20} width={20} />
                        {li.item}
                      </li>
                    ))}
                  </ul>
                )
              }
              return null
            })}
          </div>

          <div>
            {extraContent?.map((block, index) => {
              if (block.blockType === 'card') {
                return (
                  <div
                    key={index}
                    className="bg-white-blue flex flex-col gap-3 rounded-2xl p-[clamp(1rem,3vw,2rem)]"
                  >
                    <h3 className="font-semibold">{block.title}</h3>
                    <p className="max-w-[80%] leading-normal sm:leading-loose">{block.paragrahe}</p>
                  </div>
                )
              }
            })}
          </div>

          <div className="flex flex-wrap gap-[clamp(12px,3vw,30px)]">
            {extraContent?.map((block, index) => {
              if (block.blockType === 'inputEmail') {
                return (
                  <div key={index}>
                    <Input placeholder="Enter Email address" />
                  </div>
                )
              }
            })}

            {extraContent?.map((block, index) => {
              if (block.blockType === 'button') {
                return (
                  <div key={index}>
                    <Button
                      label={block?.label ?? undefined}
                      link={block?.link ?? undefined}
                      variant={block?.variant ?? undefined}
                    />
                  </div>
                )
              }
            })}
          </div>
        </div>

        <div
          className={`max-w-[80%] lg:max-w-full ${isRight ? 'lg:order-last' : 'lg:order-first'}`}
        >
          {imageData?.url && (
            <Image
              src={imageData.url}
              alt={imageData.alt || title}
              width={800}
              height={600}
              className="h-auto w-full object-cover"
            />
          )}
        </div>
      </div>
    </section>
  )
}
