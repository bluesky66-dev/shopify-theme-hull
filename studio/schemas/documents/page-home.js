import {
  FiHome,
  FiHelpCircle,
  FiAlertTriangle,
  FiActivity
} from 'react-icons/fi'

export default {
  title: 'Home',
  name: 'homePage',
  type: 'document',
  icon: FiHome,
  __experimental_actions: ['update', 'publish'], // disable for initial publish
  fields: [
    {
      title: 'Overlay header with transparency?',
      name: 'hasTransparentHeader',
      type: 'boolean',
      description:
        'When toggled on, the header will appear with a transparent background over the first content module and text/logos will be white until scrolling is engaged.'
    },
    {
      title: 'Content',
      name: 'modules',
      type: 'array',
      of: [{ type: 'grid' }, { type: 'marquee' }]
    },
    {
      title: 'SEO / Share Settings',
      name: 'seo',
      type: 'seo'
    }
  ],
  preview: {
    prepare() {
      return {
        title: 'Home Page'
      }
    }
  }
}
