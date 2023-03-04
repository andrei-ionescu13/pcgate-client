const path = require('path')

module.exports = {
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'fr', 'es', 'ja', 'ru'],
    localePath: path.resolve('./public/locales')
  },
}