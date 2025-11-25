export const COMPANY_INFO = {
  name: 'M/s Noble Life Sciences',
  established: '2015',
  owner: 'Mr. P. Vinod Kumar',
  ownerQualification: 'M.Tech',
  experience: '13 years in supply chain management',
  description:
    'Leading manufacturer of Intermediates for APIs and trader of Chemicals & Solvents',
  fullDescription:
    'Founded in 2015 by Mr. Vinod Kumar Reddy Pavuluri (M.Tech), Noble Life Sciences has established itself as a trusted name in the pharmaceutical chemical industry. Leveraging his 13 years of experience in supply chain management, we specialize in manufacturing high-quality intermediates for APIs and trading premium chemicals and solvents.',
  facilityDescription:
    'Our state-of-the-art facility in Hyderabad, India, is equipped with modern technology and staffed by experienced professionals dedicated to maintaining the highest standards of quality and safety.',
  address:
    'Plot No.260, S.V Cooperative Society, IDA-Jeedimetla, Hyderabad-500055, Telangana-India',
  phone: '+91 99129 24272',
  email: 'info@noblels.com',
  location: {
    lat: 17.5449,
    lng: 78.4889,
    city: 'Hyderabad',
    country: 'India',
  },
  stats: {
    established: '2015',
    productsCount: '50+',
  },
} as const

export const CONTACT_INFO = {
  phone: COMPANY_INFO.phone,
  email: COMPANY_INFO.email,
  address: COMPANY_INFO.address,
  location: COMPANY_INFO.location,
} as const
