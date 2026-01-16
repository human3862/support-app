'use client'

import React, { useState } from 'react'
import type { Page } from '@/payload-types'
import { Button } from '../UI/Button'
import Image from 'next/image'

type PricingPlansData = Extract<
  NonNullable<Page['layout']>[number],
  { blockType: 'pricingPlansBlock' }
>
export const PricingPlans: React.FC<PricingPlansData> = ({ title, plans }) => {
  const [isActive, setIsActive] = useState<number>(0)
  return (
    <section className="p-7">
      <div>
        <h2 className="mb-22 text-center text-[clamp(22px,3vw,30px)] font-bold">{title}</h2>
        {/* тарифы */}
        <div className="mb-12 flex items-start justify-center gap-4">
          {plans?.map((plan, index) => {
            const isSelected = isActive === index
            return (
              <div
                onClick={() => setIsActive(index)}
                key={index}
                className={`flex flex-col items-start gap-[clamp(10px,4vw,30px)] rounded-2xl p-[clamp(24px,3vw,48px)] py-[clamp(36px,3vw,72px)] shadow-2xl transition-all duration-500 ${
                  isSelected
                    ? 'z-10 scale-105 bg-white'
                    : 'hidden scale-95 cursor-pointer border-transparent bg-gray-100 opacity-80 brightness-99 lg:flex'
                } `}
              >
                <div className="flex flex-col gap-6">
                  <div className="flex flex-col gap-2">
                    <h3 className="text-[clamp(18px,3vw,24px)] font-bold">{plan.title}</h3>
                    <h3 className="text-yellow-light text-[clamp(18px,3vw,24px)] font-bold">
                      {plan.price}/mo
                    </h3>
                  </div>
                  <p className="max-w-[70%] text-[clamp(16px,3vw,18px)] text-gray-500">
                    {plan.description}
                  </p>
                </div>

                <div className="my-[clamp(3px,1vw,12px)] h-px w-full bg-gray-200" />

                <ul className="flex flex-col gap-6">
                  {plan.items?.map((li, i) => (
                    <li key={i} className="flex items-center gap-4">
                      <Image src="/Combined shape 16074.png" alt="галка" width={20} height={20} />
                      {li.item}
                    </li>
                  ))}
                </ul>

                <div className="my-3 h-px w-full bg-gray-200" />

                <Button
                  label={plan.button?.label ?? undefined}
                  link={plan.button?.link ?? undefined}
                  variant={isSelected ? 'primary' : 'ternary'}
                />
              </div>
            )
          })}
        </div>
        {/* тумблер */}
        <div className="flex justify-center">
          <div className="relative flex h-12 w-64 cursor-pointer items-center rounded-full border border-gray-200 bg-gray-100 p-1 shadow-inner">
            <div
              className={`absolute top-1 bottom-1 w-[calc(50%-4px)] rounded-full bg-white shadow-md transition-all duration-300 ease-in-out ${
                isActive === 0 ? 'left-1' : 'left-[calc(50%+2px)]'
              }`}
            />

            <button
              onClick={() => setIsActive(0)}
              className={`relative z-10 w-1/2 text-sm font-bold transition-colors duration-300 ${isActive === 0 ? 'text-black' : 'text-gray-400'}`}
            >
              {plans?.[0]?.title}
            </button>
            <button
              onClick={() => setIsActive(1)}
              className={`relative z-10 w-1/2 text-sm font-bold transition-colors duration-300 ${isActive === 1 ? 'text-black' : 'text-gray-400'}`}
            >
              {plans?.[1]?.title}
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
