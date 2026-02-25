import { Helmet } from "react-helmet-async";

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  url?: string;
  type?: string;
  locale?: string;
}

const SEO = ({
  title = "FORMA Pilates Rabat | Studio de Pilates Reformer de Luxe au Maroc",
  description = "Découvrez FORMA Pilates, le premier studio de Pilates Reformer haut de gamme à Rabat. Cours privés et collectifs, instructeurs certifiés, équipements premium. Réservez votre séance découverte.",
  keywords = "Pilates Rabat, Pilates Reformer Maroc, studio Pilates luxe Rabat, cours Pilates privé Rabat, Pilates femmes Rabat, bien-être Rabat, fitness Rabat, FORMA Pilates, exercices posture, mal de dos Rabat, relaxation Maroc",
  image = "https://lovable.dev/opengraph-image-p98pqg.png",
  url = "https://forma-pilates.ma",
  type = "website",
  locale = "fr_MA",
}: SEOProps) => {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "SportsActivityLocation",
    "name": "FORMA Pilates",
    "description": description,
    "url": url,
    "image": image,
    "telephone": "+212 661-234567",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "123 Avenue Mohammed V",
      "addressLocality": "Rabat",
      "addressRegion": "Rabat-Salé-Kénitra",
      "postalCode": "10000",
      "addressCountry": "MA"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "34.0209",
      "longitude": "-6.8416"
    },
    "openingHoursSpecification": [
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        "opens": "07:00",
        "closes": "21:00"
      },
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": "Saturday",
        "opens": "08:00",
        "closes": "18:00"
      }
    ],
    "priceRange": "$$",
    "sameAs": [
      "https://www.instagram.com/formapilates",
      "https://www.facebook.com/formapilates"
    ],
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.9",
      "reviewCount": "127"
    }
  };

  const localBusinessData = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "FORMA Pilates Rabat",
    "image": image,
    "@id": url,
    "url": url,
    "telephone": "+212 661-234567",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "123 Avenue Mohammed V",
      "addressLocality": "Rabat",
      "postalCode": "10000",
      "addressCountry": "MA"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 34.0209,
      "longitude": -6.8416
    },
    "openingHoursSpecification": [
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        "opens": "07:00",
        "closes": "21:00"
      },
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": "Saturday",
        "opens": "08:00",
        "closes": "18:00"
      }
    ],
    "areaServed": {
      "@type": "City",
      "name": "Rabat"
    },
    "serviceType": ["Pilates Reformer", "Cours de Pilates", "Fitness", "Bien-être"]
  };

  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <html lang="fr" />
      <title>{title}</title>
      <meta name="title" content={title} />
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="author" content="FORMA Pilates" />
      <meta name="robots" content="index, follow" />
      <meta name="language" content="French" />
      <meta name="revisit-after" content="7 days" />
      <meta name="geo.region" content="MA-RAB" />
      <meta name="geo.placename" content="Rabat" />
      <meta name="geo.position" content="34.0209;-6.8416" />
      <meta name="ICBM" content="34.0209, -6.8416" />
      
      {/* Canonical URL */}
      <link rel="canonical" href={url} />
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:locale" content={locale} />
      <meta property="og:locale:alternate" content="en_US" />
      <meta property="og:site_name" content="FORMA Pilates" />
      
      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={url} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
      <meta name="twitter:site" content="@FORMAPilates" />
      <meta name="twitter:creator" content="@FORMAPilates" />
      
      {/* Additional SEO */}
      <meta name="format-detection" content="telephone=yes" />
      <meta name="theme-color" content="#1a1a2e" />
      <meta name="mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
      <meta name="apple-mobile-web-app-title" content="FORMA Pilates" />
      
      {/* Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify(structuredData)}
      </script>
      <script type="application/ld+json">
        {JSON.stringify(localBusinessData)}
      </script>
    </Helmet>
  );
};

export default SEO;
