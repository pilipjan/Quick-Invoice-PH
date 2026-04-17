<div align="center">

<img src="public/icon-192.png" alt="QuickInvoice PH Logo" width="80" height="80" />

# QuickInvoice PH

### Free, EOPT-Compliant Sales Invoice Generator for Filipino Businesses

[![Live Demo](https://img.shields.io/badge/Live%20Demo-invoice.philipjohnn8nautomation.online-blue?style=for-the-badge&logo=vercel)](https://invoice.philipjohnn8nautomation.online)
[![GitHub Stars](https://img.shields.io/github/stars/pilipjan/Quick-Invoice-PH?style=for-the-badge&logo=github&color=yellow)](https://github.com/pilipjan/Quick-Invoice-PH/stargazers)
[![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)](LICENSE)
[![Next.js](https://img.shields.io/badge/Next.js-16-black?style=for-the-badge&logo=next.js)](https://nextjs.org)

</div>

---

> **Helping Filipino freelancers, SMEs, and sellers on Shopee/Lazada create professional, BIR-compliant pro-forma invoices — completely free, with no sign-up required.**

---

## ✨ What It Does

QuickInvoice PH is a web application that lets anyone in the Philippines generate a professional sales invoice in under 60 seconds. No subscriptions, no watermarks on pro-forma documents, no complicated setup.

| Feature | Description |
|---|---|
| 🧾 **Instant Invoice Generation** | Fill in your details and see a live pixel-perfect preview update in real time |
| 📊 **Automatic VAT Calculations** | Handles 12% VAT, Vatable Sales isolation, VAT-Exempt, and Zero-Rated Sales per BIR RR 7-2024 |
| ♿ **SC/PWD Discount Support** | Automatic 20% Senior Citizen / PWD discount with VAT exemption per RA 9994 |
| 🖨️ **3 Professional Themes** | Standard A4, Modern A4, and POS Thermal Receipt (80mm) formats |
| 📄 **Free PDF Export** | One-click, print-ready PDF download via native browser rendering |
| ☁️ **Optional Cloud Sync** | Sign in with Google to save invoice history and sync your business profile |
| 🔏 **Official Receipt Mode** | BIR-registered businesses can remove the pro-forma watermark |
| 📱 **Mobile-First Design** | Fully responsive for smartphones, tablets, and desktops |

---

## 🇵🇭 Built for the Philippine Market

This tool is designed specifically for:
- **Freelancers** (developers, designers, writers, creatives)
- **Online Sellers** on Shopee, Lazada, TikTok Shop
- **SMEs** needing quick invoices for B2B transactions
- **Consultants** issuing service invoices

All calculations follow **BIR Revenue Regulations No. 7-2024 (EOPT Act)**.

---

## 🚀 Live Demo

**[https://invoice.philipjohnn8nautomation.online](https://invoice.philipjohnn8nautomation.online)**

No sign-up needed. Just open and start creating.

---

## 🛠️ Tech Stack

| Technology | Purpose |
|---|---|
| [Next.js 16](https://nextjs.org) (App Router) | Full-stack React framework |
| [React 19](https://react.dev) | UI component model |
| [Supabase](https://supabase.com) | Auth (Google OAuth) + PostgreSQL database |
| [Zustand](https://zustand-demo.pmnd.rs/) | Client-side invoice state management |
| [Tailwind CSS v4](https://tailwindcss.com) | Utility-first styling |
| [Framer Motion](https://www.framer.com/motion/) | Animations and transitions |
| [jsPDF](https://github.com/parallax/jsPDF) + [html-to-image](https://github.com/bubkoo/html-to-image) | PDF generation engine |
| [Shadcn/UI](https://ui.shadcn.com/) | Accessible component primitives |
| [Cloudflare Tunnel](https://www.cloudflare.com/products/tunnel/) | Secure, zero-config deployment |
| [PM2](https://pm2.keymetrics.io/) | Node.js process management on VPS |

---

## 🏗️ Architecture

```
src/
├── app/
│   ├── page.tsx            # Landing page
│   ├── builder/page.tsx    # Invoice builder (Server Component + client hydration)
│   ├── login/page.tsx      # Auth page (Google OAuth + Email)
│   ├── history/page.tsx    # Saved invoices (authenticated users)
│   └── auth/callback/      # Supabase OAuth redirect handler
├── components/
│   ├── InvoiceBuilder.tsx  # Main builder shell with auth state
│   ├── InvoiceForm.tsx     # Left panel — all input controls
│   └── InvoicePreview.tsx  # Right panel — live preview + PDF export
├── lib/
│   ├── supabase/
│   │   ├── client.ts       # Browser singleton client
│   │   ├── server.ts       # Server Component client
│   │   └── proxy.ts        # Session refresh middleware
│   └── tax-calculator.ts   # VAT, SC/PWD discount logic
└── store/
    └── useInvoiceStore.ts  # Zustand persistent store
```

---

## ⚡ Getting Started (Local Development)

### Prerequisites
- Node.js 18+
- A [Supabase](https://supabase.com) project (free tier works)

### 1. Clone the repository

```bash
git clone https://github.com/pilipjan/Quick-Invoice-PH.git
cd Quick-Invoice-PH
```

### 2. Install dependencies

```bash
npm install
```

### 3. Set up environment variables

Create a `.env.local` file in the project root:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### 4. Set up the Supabase database

Run the schema from `supabase_schema.sql` in your Supabase SQL editor to create the `profiles` and `invoices` tables.

### 5. Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🗄️ Database Schema

```sql
-- User business profiles (synced on login)
profiles (id, business_name, tin, address, ptu_number, is_vat_registered,
          logo_url, signature_url, currency, payment_details, notes,
          is_registered_bir, updated_at)

-- Saved invoice history (optional, authenticated users only)
invoices (id, user_id, invoice_number, invoice_date, client_name,
          client_address, client_tin, items, subtotal, vat_amount,
          discount_type, discount_amount, total_amount, currency,
          theme, created_at)
```

---

## 📦 Deployment

The project is deployed on an Oracle Cloud VPS (ARM64) using Cloudflare Tunnel for zero-config HTTPS.

```bash
# One-command deploy (requires Cloudflare Mesh access)
.\vibe-deploy.ps1
```

The script syncs source files, rebuilds on the server, and restarts PM2.

---

## ⚠️ Legal Disclaimer

QuickInvoice PH generates **pro-forma documents for bookkeeping and quotation purposes only**. It is **not** a BIR-accredited Computerized Accounting System (CAS).

Generated documents are not valid official tax receipts unless issued by a business holding a valid:
- **Authority to Print (ATP)** issued by the BIR, or
- **CAS Permit** (Computerized Accounting System Permit)

Users assume full legal and tax liability under the **National Internal Revenue Code (RA 8424)**.

---

## 🤝 Contributing

Pull requests are welcome! If you find a bug or want to request a feature relevant to Philippine business invoicing, please [open an issue](https://github.com/pilipjan/Quick-Invoice-PH/issues).

If this project helped you, consider giving it a ⭐ on GitHub — it helps other Filipino freelancers discover it!

---

## 📝 License

MIT License — free to use, modify, and distribute.

---

<div align="center">

**Built with ❤️ by [Philip John Santiano](https://github.com/pilipjan)**

*Para sa mga Pilipinong negosyante — libre, mabilis, at kumpleto.*

</div>
