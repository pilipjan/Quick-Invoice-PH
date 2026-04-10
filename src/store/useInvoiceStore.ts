import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { v4 as uuidv4 } from 'uuid';
import { format } from 'date-fns';

export interface InvoiceItem {
  id: string;
  description: string;
  quantity: number;
  unitPrice: number;
}

export interface InvoiceState {
  // Business Profile Info
  businessName: string;
  tin: string;
  address: string;
  ptuNumber: string;
  isVatRegistered: boolean;
  logoUrl: string | null;
  
  // Client & Invoice Info
  clientName: string;
  clientAddress: string;
  clientTin: string;
  invoiceNumber: string;
  invoiceDate: string;
  paymentDetails: string;
  notes: string;
  signatureUrl: string | null;
  
  // Settings
  currency: string;
  discountType: "none" | "senior" | "pwd";
  theme: "standard" | "receipt" | "modern";
  
  // Line Items
  items: InvoiceItem[];
  
  // Actions
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  updateField: (field: keyof InvoiceState, value: any) => void;
  addItem: () => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  updateItem: (id: string, field: keyof InvoiceItem, value: any) => void;
  removeItem: (id: string) => void;
  resetInvoice: () => void;
  generateRandomInvoiceNumber: () => void;
}

const generateRandomNumber = () => `INV-${Math.floor(100000 + Math.random() * 900000)}`;

const initialState = {
  businessName: '',
  tin: '',
  address: '',
  ptuNumber: '',
  isVatRegistered: true,
  logoUrl: null,
  signatureUrl: null,
  
  clientName: '',
  clientAddress: '',
  clientTin: '',
  invoiceNumber: generateRandomNumber(),
  invoiceDate: format(new Date(), 'yyyy-MM-dd'),
  paymentDetails: '',
  notes: '',
  
  currency: 'PHP',
  discountType: "none" as const,
  theme: "standard" as const,
  items: [{ id: uuidv4(), description: '', quantity: 1, unitPrice: 0 }],
};

export const useInvoiceStore = create<InvoiceState>()(
  persist(
    (set) => ({
      ...initialState,
      
      updateField: (field, value) => set((state) => ({ ...state, [field]: value })),
      
      addItem: () => set((state) => ({
        items: [...state.items, { id: uuidv4(), description: '', quantity: 1, unitPrice: 0 }]
      })),
      
      updateItem: (id, field, value) => set((state) => ({
        items: state.items.map(item => item.id === id ? { ...item, [field]: value } : item)
      })),
      
      removeItem: (id) => set((state) => ({
        items: state.items.filter(item => item.id !== id)
      })),
      
      resetInvoice: () => set((state) => ({
        ...state,
        clientName: '',
        clientAddress: '',
        clientTin: '',
        logoUrl: null,
        signatureUrl: null,
        invoiceNumber: generateRandomNumber(),
        invoiceDate: format(new Date(), 'yyyy-MM-dd'),
        paymentDetails: '',
        notes: '',
        currency: 'PHP',
        discountType: "none",
        theme: "standard",
        items: [{ id: uuidv4(), description: '', quantity: 1, unitPrice: 0 }],
      })),
      
      generateRandomInvoiceNumber: () => set({ invoiceNumber: generateRandomNumber() })
    }),
    {
      name: 'quick-invoice-storage',
      // We could optionally omit things like clientName or items if we don't want to persist an unfinished invoice
      // For now, caching everything helps prevent data loss on accidental refresh
    }
  )
);
