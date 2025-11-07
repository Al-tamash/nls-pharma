# 🧪 Noble Life Sciences - Pharmaceutical Website

A comprehensive, responsive pharmaceutical website for M/s Noble Life Sciences, built with Next.js 15 and modern web technologies.

## 🏢 About the Company

**M/s Noble Life Sciences**
- **Established:** 2015
- **Owner:** Mr. P. Vinod Kumar
- **Industry:** Manufacturer of Intermediates for APIs and Trader of Chemicals & Solvents
- **Location:** Hyderabad, India

## 🚀 Technology Stack

### Core Framework
- **⚡ Next.js 15** - React framework with App Router
- **📘 TypeScript 5** - Type-safe development
- **🎨 Tailwind CSS 4** - Utility-first styling with custom brand colors

### UI Components & Features
- **🧩 shadcn/ui** - High-quality, accessible components
- **🎯 Lucide React** - Beautiful icon library
- **📊 Responsive Tables** - Product catalog with search and filtering
- **📱 Mobile-First Design** - Optimized for all screen sizes

### CMS Integration
- **🔄 WordPress REST API** - Headless CMS integration
- **📝 Dynamic Content** - Editable via WordPress dashboard
- **🔄 Incremental Static Regeneration** - Optimized performance

## 🎨 Brand Colors

The website uses custom color variables defined in `globals.css`:

```css
--color-primary: #0B6FB3;      /* Blue */
--color-secondary: #6B8795;    /* Gray */
--color-accent: #1A9D8F;       /* Optional accent */
--color-bg: #F5F7FA;           /* Light background */
--color-text: #222222;         /* Main text */
```

## 📄 Website Pages

### 1️⃣ Home Page (`/`)
- Hero banner with company information
- Product categories overview
- Why Choose Us section
- Call-to-action sections

### 2️⃣ Products Page (`/products`)
- **Tabular product layout** similar to krvpharma.com/intermediates
- Search and filtering functionality
- Category-based organization (Solvents, Intermediates, APIs)
- CSV export capability
- Responsive table design

### 3️⃣ About Page (`/about`)
- Company story and history
- Mission and vision statements
- Core values and milestones
- Leadership information

### 4️⃣ Contact Page (`/contact`)
- Contact form with validation
- Company information
- Business hours
- Location map integration

## 🗂️ Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── page.tsx           # Home page
│   ├── products/page.tsx  # Products page
│   ├── about/page.tsx     # About page
│   ├── contact/page.tsx   # Contact page
│   ├── layout.tsx         # Root layout with Navbar/Footer
│   └── globals.css        # Global styles with brand colors
├── components/            # Reusable React components
│   ├── ui/               # shadcn/ui components
│   ├── Navbar.tsx        # Navigation component
│   └── Footer.tsx        # Footer component
├── lib/                  # Utility functions
│   └── wordpress.ts      # WordPress API integration
└── types/                # TypeScript type definitions
    └── product.d.ts      # Product and company types
```

## 🔧 WordPress CMS Setup

### Required WordPress Plugins
1. **Custom Post Type UI** - Create "Products" post type
2. **Advanced Custom Fields (ACF)** - Add product metadata fields
3. **WP REST API** - Enable API endpoints

### Product Post Type Fields
- `product_name` - Product name
- `end_product` - End product/application
- `cas_number` - CAS number
- `category` - Product category (Solvent/Intermediate/API)

### API Endpoint
```
/wp-json/wp/v2/products
```

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- WordPress installation (for CMS)

### Installation

1. **Clone the repository**
```bash
git clone <repository-url>
cd noble-life-sciences
```

2. **Install dependencies**
```bash
npm install
```

3. **Environment Setup**
```bash
cp .env.local.example .env.local
```

Edit `.env.local`:
```env
NEXT_PUBLIC_WP_URL=https://cms.noblels.com
```

4. **Start development server**
```bash
npm run dev
```

5. **Open your browser**
Navigate to [http://localhost:3000](http://localhost:3000)

## 📱 Features

### ✨ Key Features
- **Fully Responsive Design** - Works perfectly on mobile, tablet, and desktop
- **SEO Optimized** - Meta tags, structured data, and semantic HTML
- **High Performance** - Optimized images, lazy loading, and caching
- **Accessible** - WCAG compliant with proper ARIA labels
- **Editable Content** - WordPress CMS integration for easy updates
- **Product Search** - Advanced filtering and search functionality
- **Contact Forms** - User-friendly contact and inquiry forms

### 🎯 Product Table Features
- **Search Functionality** - Search by product name, CAS number, or end product
- **Category Filtering** - Filter by Solvent, Intermediate, or API categories
- **Responsive Design** - Mobile-friendly table with horizontal scrolling
- **Export Capability** - Download product list as CSV
- **Sort & Pagination** - Organize large product catalogs efficiently

## 🌐 Deployment

### Frontend (Next.js)
```bash
# Build for production
npm run build

# Start production server
npm start
```

**Recommended Platforms:**
- **Vercel** (Recommended for Next.js)
- **Netlify**
- **AWS Amplify**

### Backend (WordPress)
- **Domain:** cms.noblels.com
- **Hosting:** Any WordPress-compatible hosting
- **SSL Certificate:** Required for API security

## 🔧 Configuration

### WordPress REST API Configuration

1. Enable REST API in WordPress settings
2. Configure custom post type for products
3. Add ACF fields for product metadata
4. Test API endpoint: `/wp-json/wp/v2/products`

### Expected API Response Format
```json
{
  "id": 1,
  "title": {
    "rendered": "3-Acetyl Pyridine"
  },
  "meta": {
    "product_name": "3-Acetyl Pyridine",
    "end_product": "Imatinib & Nilotinib",
    "cas_number": "350-03-8",
    "category": "Intermediate"
  }
}
```

## 🎨 Customization

### Adding New Products
Products are managed through WordPress dashboard:
1. Login to WordPress admin
2. Navigate to "Products" post type
3. Add new product with required fields
4. Publish to update website automatically

### Modifying Colors
Edit `src/app/globals.css`:
```css
:root {
  --color-primary: #your-color;
  --color-secondary: #your-color;
  --color-accent: #your-color;
  /* ... */
}
```

### Adding New Pages
1. Create new page in `src/app/`
2. Add navigation link in `src/components/Navbar.tsx`
3. Update footer if needed

## 📊 Performance Optimization

- **Image Optimization** - Next.js automatic image optimization
- **Code Splitting** - Automatic route-based code splitting
- **Caching** - Incremental Static Regeneration (ISR)
- **Bundle Analysis** - Optimized dependencies and imports

## 🔒 Security Considerations

- **API Security** - WordPress REST API with proper authentication
- **Form Validation** - Client and server-side validation
- **HTTPS** - SSL certificates for both frontend and CMS
- **CORS** - Proper cross-origin resource sharing configuration

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📞 Support

For technical support or questions:
- **Email:** info@noblels.com
- **Phone:** +91 98765 43210
- **Location:** Jeedimetla, Hyderabad, India

## 📄 License

This project is proprietary to M/s Noble Life Sciences.

---

**Built with ❤️ for Noble Life Sciences**  
🚀 Powered by Next.js 15 & Modern Web Technologies