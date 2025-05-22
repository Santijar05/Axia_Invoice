module.exports = {
  useTranslations: () => (key) => `mocked-${key}`,
  useFormatter: () => ({}),
  useLocale: () => 'en',
  NextIntlClientProvider: ({ children }) => children,
  Globe: () => <svg data-testid="globe-icon">Mocked Globe Icon</svg>,
  Menu: () => <svg data-testid="menu-icon">Mocked Menu Icon</svg>,
  X: () => <svg data-testid="x-icon">Mocked X Icon</svg>,
};