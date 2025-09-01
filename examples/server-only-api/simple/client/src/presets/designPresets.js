export const designPresets = {
  simple: {
    name: "Simple",
    data: {
      type: 'displayAds',
      subtype: 'displayAds-half-page-ad',
      dimension: {
        width: 300,
        height: 600
      },
      prompt: 'Create a clean and simple advertisement',
      assets: {
        images: [],
        logos: []
      },
      colors: ['#5662EC'],
      fonts: [],
      language: 'english',
      numOfVariants: 2,
      outputFormat: ['jpg']
    }
  },
  
  contentOnly: {
    name: "Content Only",
    data: {
      type: 'displayAds',
      subtype: 'displayAds-banner',
      dimension: {
        width: 728,
        height: 90
      },
      prompt: 'Create a text-focused banner with compelling copy and minimal visual elements',
      assets: {
        images: [],
        logos: []
      },
      colors: ['#2563EB', '#F59E0B'],
      fonts: [],
      language: 'english',
      numOfVariants: 3,
      outputFormat: ['jpg']
    }
  },
  
  ecommerceProduct: {
    name: "E-commerce Product",
    data: {
      type: 'displayAds',
      subtype: 'displayAds-square',
      dimension: {
        width: 500,
        height: 500
      },
      prompt: 'Create a product showcase ad highlighting features and benefits with a clear call-to-action',
      assets: {
        images: [
          {
            url: 'https://images.hellosivi.com/fit-in/800x800/photos/sKN0gtrFJn4.jpg',
            imagePreference: {
              crop: true,
              removeBg: false
            }
          }
        ],
        logos: [
          {
            url: 'https://images.hellosivi.com/fit-in/200x200/logos/sLkA1TkxN67.png',
            logoStyles: ['direct']
          }
        ]
      },
      colors: ['#DC2626', '#FFFFFF', '#1F2937'],
      fonts: [],
      language: 'english',
      numOfVariants: 4,
      outputFormat: ['jpg']
    }
  },
  
  ecommerceCategory: {
    name: "E-commerce Category",
    data: {
      type: 'displayAds',
      subtype: 'displayAds-banner',
      dimension: {
        width: 1200,
        height: 300
      },
      prompt: 'Create a category banner showcasing multiple products with seasonal theme and promotional messaging',
      assets: {
        images: [
          {
            url: 'https://images.hellosivi.com/fit-in/800x800/photos/sKN0gtrFJn4.jpg',
            imagePreference: {
              crop: true,
              removeBg: true
            }
          }
        ],
        logos: [
          {
            url: 'https://images.hellosivi.com/fit-in/200x200/logos/sLkA1TkxN67.png',
            logoStyles: ['outline']
          }
        ]
      },
      colors: ['#059669', '#F3F4F6', '#111827'],
      fonts: [],
      language: 'english',
      numOfVariants: 3,
      outputFormat: ['jpg']
    }
  },
  
  socialMedia: {
    name: "Social Media",
    data: {
      type: 'socialMedia',
      subtype: 'instagram-post',
      dimension: {
        width: 1080,
        height: 1080
      },
      prompt: 'Create an engaging social media post with trendy design elements and hashtag-friendly content',
      assets: {
        images: [
          {
            url: 'https://images.hellosivi.com/fit-in/800x800/photos/sKN0gtrFJn4.jpg',
            imagePreference: {
              crop: true,
              removeBg: false
            }
          }
        ],
        logos: []
      },
      colors: ['#E11D48', '#F59E0B', '#FFFFFF'],
      fonts: [],
      language: 'english',
      numOfVariants: 5,
      outputFormat: ['jpg']
    }
  },
  
  brandAwareness: {
    name: "Brand Awareness",
    data: {
      type: 'displayAds',
      subtype: 'displayAds-half-page-ad',
      dimension: {
        width: 300,
        height: 600
      },
      prompt: 'Create a brand awareness campaign focusing on company values and brand personality with emotional appeal',
      assets: {
        images: [],
        logos: [
          {
            url: 'https://images.hellosivi.com/fit-in/200x200/logos/sLkA1TkxN67.png',
            logoStyles: ['direct', 'outline']
          }
        ]
      },
      colors: ['#7C3AED', '#EC4899', '#F59E0B'],
      fonts: [],
      language: 'english',
      numOfVariants: 4,
      outputFormat: ['jpg']
    }
  }
};
