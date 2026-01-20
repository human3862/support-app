import { Block } from 'payload'

export const MediaAndTextBlock: Block = {
  slug: 'mediaAndText',
  labels: { singular: 'Медиа и Текст', plural: 'Медиа и Тексты' },
  fields: [
    {
      name: 'layout',
      type: 'select',
      options: [
        { label: 'Картинка справа', value: 'imageRight' },
        { label: 'Картинка слева', value: 'imageLeft' },
      ],
      defaultValue: 'imageRight',
    },
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'description',
      type: 'textarea',
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
    {
      name: 'extraContent',
      type: 'blocks',
      blocks: [
        {
          slug: 'list',
          fields: [{ name: 'items', type: 'array', fields: [{ name: 'item', type: 'text' }] }],
        },
        {
          slug: 'card',
          fields: [
            { name: 'title', type: 'text' },
            { name: 'paragrahe', type: 'text' },
          ],
        },
        {
          slug: 'button',
          fields: [
            { name: 'label', type: 'text' },
            { name: 'link', type: 'text' },
            {
              name: 'variant',
              type: 'select',
              options: [
                { label: 'Первый вариант', value: 'primary' },
                { label: 'Второй вариант', value: 'secondary' },
                { label: 'Третий вариант', value: 'ternary' },
              ],
              defaultValue: 'primary',
            },
          ],
        },
        {
          slug: 'inputEmail',
          fields: [],
        },
      ],
      validate: (value) => {
        if (!Array.isArray(value)) return true

        const listCount = value.filter((block) => block.blockType === 'inputEmail').length

        if (listCount > 1) {
          return 'Вы не можете добавить больше одного "inputEmail" в этот блок '
        }

        return true
      },
    },
  ],
}
