// Shared JSON-LD builders. The sitewide Organization and WebSite blocks live in BaseLayout.
import { BRAND, SITE_ORG_ID, APP_LOGIN_URL, PRICING } from './site.js';

// Used on the home page and /pricing/ only. No aggregateRating: we have no reviews.
export const softwareApplicationSchema = () => {
  const navigator = PRICING.navigatorMonthly.replace('$', '');
  return {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: BRAND,
    applicationCategory: 'EducationalApplication',
    operatingSystem: 'Web',
    url: APP_LOGIN_URL,
    publisher: { '@id': SITE_ORG_ID },
    offers: [
      { '@type': 'Offer', name: 'Explorer', price: '0', priceCurrency: 'USD' },
      {
        '@type': 'Offer',
        name: 'Navigator',
        price: navigator,
        priceCurrency: 'USD',
        priceSpecification: {
          '@type': 'UnitPriceSpecification',
          price: navigator,
          priceCurrency: 'USD',
          billingDuration: 'P1M',
        },
      },
    ],
  };
};
