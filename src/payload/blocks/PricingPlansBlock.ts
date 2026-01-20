import { Block } from 'payload'

export const PricingPlansBlock: Block = {
  slug: 'pricingPlansBlock',
  labels: { singular: 'Тарифные планы', plural: 'Тарифные планы' },
  fields: [
    {
      name: 'title',
      type: 'text',
      label: 'Выберите название',
      defaultValue: 'Выберите свой тариф',
      required: true,
    },
    {
      name: 'plans',
      type: 'array',
      label: 'Тарифные планы',
      minRows: 2,
      maxRows: 2,
      fields: [
        {
          name: 'title',
          type: 'text',
          label: 'название тарифа',
          required: true,
        },
        {
          name: 'price',
          type: 'text',
          label: 'цена тарифа',
          required: true,
        },
        {
          name: 'description',
          type: 'textarea',
          label: 'описание тарифа',
        },
        {
          name: 'items',
          type: 'array',
          label: 'пункты тарифа',
          fields: [{ name: 'item', type: 'text' }],
        },
        {
          name: 'button',
          type: 'group',
          required: true,
          fields: [
            { name: 'label', type: 'text', defaultValue: 'Купить' },
            { name: 'link', type: 'text' },
          ],
        },
      ],
    },
  ],
}
