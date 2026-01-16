import React from 'react'
import Image from 'next/image'

export const Support = () => {
  return (
    <section className="flex flex-wrap justify-center gap-10 p-[clamp(20px,5vw,40px)] py-[clamp(30px,3vw,80px)]">
      <div className="flex cursor-pointer flex-col gap-6 rounded-2xl p-[clamp(20px,4vw,40px)] shadow-2xl sm:flex-row">
        <div className="flex items-center justify-between">
          <Image src="/Group 83.png" alt="Поддержка" width={80} height={80} className="block" />
          <Image
            src="/Forma 1.png"
            alt="стрелка"
            width={22}
            height={16}
            className="block sm:hidden"
          />
        </div>
        <div className="flex flex-col gap-2">
          <h3 className="text-[clamp(18px,2vw,22px)] font-semibold">Do you need help support</h3>
          <p className="max-w-80">
            Get your website ads tests delivered at let collect sample from the victory of the
            update managments services.
          </p>
        </div>
        <div>
          <Image
            src="/Forma 1.png"
            alt="стрелка"
            width={22}
            height={16}
            className="hidden sm:block"
          />
        </div>
      </div>
      <div className="hidden cursor-pointer flex-col gap-6 rounded-2xl p-[clamp(20px,4vw,40px)] shadow-2xl sm:flex sm:flex-row">
        <div>
          <Image src="/Group 83.png" alt="Поддержка" width={80} height={80} className="block" />
        </div>
        <div className="flex flex-col gap-2">
          <h3 className="text-[clamp(18px,2vw,22px)] font-semibold">Do you need help support</h3>
          <p className="max-w-80">
            Get your website ads tests delivered at let collect sample from the victory of the
            update managments services.
          </p>
        </div>
        <div>
          <Image src="/Forma 1.png" alt="стрелка" width={22} height={16} className="block" />
        </div>
      </div>
    </section>
  )
}
