export const designPresets = {
  simple: {
    name: "Simple",
    data: {
      type: 'amazon',
      subtype: 'amazon-square',
      dimension: {
        width: 300,
        height: 300
      },
      prompt: 'Get Free POS Development with your landing page. Claim Now',
      assets: {
        images: [],
        logos: []
      },
      colors: [],
      fonts: [],
      language: 'english',
      numOfVariants: 3,
      outputFormat: ['jpg']
    }
  },
  
  ecommerceProduct: {
    name: "E-commerce Product",
    data: {
      type: 'amazon',
      subtype: 'amazon-fullscreen',
      dimension: {
        width: 727,
        height: 356
      },
      prompt: 'Promote Men’s Summer Graphic Tee – Sunrise & Waves Print. Specifications: - Color: White with multicolor print, Material: 100% Cotton, Neckline: Crew neck',
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
            logoStyles: ['direct']
          }
        ]
      },
      colors: ['#F9A737', '#5DB8D3', '#2970B8'],
      fonts: [],
      language: 'english',
      numOfVariants: 3,
      outputFormat: ['jpg']
    }
  },
  
  ecommerceCategory: {
    name: "E-commerce Category",
    data: {
      type: 'website',
      subtype: 'website-large-square',
      dimension: {
        width: 600,
        height: 600
      },
      prompt: 'Naturally Luxurious Skincare. Experience the Skirpro difference today. View Collection',
      assets: {
        images: [
          {
            url: 'https://media.hellosivi.com/system/generated-images/SDS-1/cluys6nvb036ws6016bd2o1l6.jpg',
            imagePreference: {
              crop: true,
              removeBg: false
            }
          },
          {
            url: 'https://media.hellosivi.com/system/generated-images/SDS-1/cltx4tx35095bs601fsiqc3b3.jpg',
            imagePreference: {
              crop: true,
              removeBg: false
            }
          }
        ],
        logos: []
      },
      colors: ['#668135', '#D6DEC1', '#0E1A01'],
      fonts: [],
      language: 'english',
      numOfVariants: 3,
      outputFormat: ['jpg']
    }
  },
  
  socialMedia: {
    name: "Social Media",
    data: {
      type: 'twitter',
      subtype: 'twitter-post',
      dimension: {
        width: 1024,
        height: 512
      },
      prompt: 'Title: Bask in the Sun, Subtext: Let natural light flood your space with our designs., Button: Get a Quote',
      assets: {
        images: [
          {
            url: 'https://media.hellosivi.com/system/generated-images/SDS-1/clu35q9el07its601ntv8ljji.jpg',
            imagePreference: {
              crop: true,
              removeBg: false
            }
          }
        ],
        logos: []
      },
      colors: ['#00B8A4', '#0F555F', '#FFFFFF'],
      fonts: [],
      language: 'english',
      numOfVariants: 3,
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
      prompt: 'Navigating Real Estate, Simplified. Your trusted partner for buying and selling property. Learn More',
      assets: {
        images: [
          {
            url: 'https://images.unsplash.com/photo-1649083048770-82e8ffd80431?ixid=M3wzMzc5NnwwfDF8c2VhcmNofDExfHxtb2Rlcm4lMjBkZXNpZ258ZW58MHx8fHwxNzUzOTg4OTQ5fDA',
            imagePreference: {
              crop: true,
              removeBg: false
            }
          }
        ],
        logos: [
          {
            url: 'https://media.hellosivi.com/logos/snH2sMMwKoN.png',
            logoStyles: ['direct', 'neutral']
          }
        ]
      },
      colors: ['#C31E2E', '#FFF3ED', '#000000'],
      fonts: [],
      language: 'english',
      numOfVariants: 4,
      outputFormat: ['jpg']
    }
  },
  
  videoThumbnail: {
    name: "Video Thumbnail",
    data: {
      type: 'youtube',
      subtype: 'youtube-thumbnail-small',
      dimension: {
        width: 640,
        height: 360
      },
      prompt: 'Thumbnails for money management videos',
      assets: {
        images: [
          {
            url: 'https://media.hellosivi.com/system/generated-images/sivi/28e41b71680414c04f6d562ffd041cd2.jpeg',
            imagePreference: {
              crop: true,
              removeBg: false
            }
          }
        ],
        logos: []
      },
      colors: [],
      fonts: [],
      language: 'english',
      numOfVariants: 4,
      outputFormat: ['jpg']
    }
  },
  
  profileCover: {
    name: "Profile Cover",
    data: {
      type: 'facebook',
      subtype: 'facebook-cover',
      dimension: {
        width: 851,
        height: 315
      },
      prompt: 'Best Movie Clips. Discover unforgettable moments in cinema history.',
      assets: {
        images: [
          {
            url: 'https://media.hellosivi.com/system/generated-images/sivi/d5a97d88c94a687320e4efaee0c4eccd.jpeg',
            imagePreference: {
              crop: true,
              removeBg: false
            }
          }
        ],
        logos: []
      },
      colors: [],
      fonts: [],
      language: 'english',
      numOfVariants: 3,
      outputFormat: ['jpg']
    }
  }
};
