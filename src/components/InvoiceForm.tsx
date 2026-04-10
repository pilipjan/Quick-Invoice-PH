"use client";

import { useInvoiceStore } from '@/store/useInvoiceStore';
import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { createClient } from '@/lib/supabase/client';
import { useEffect } from 'react';
import { toast } from 'sonner';
import { Trash2, Plus, RefreshCw, ChevronDown, ChevronUp, Save, CheckCircle2 } from 'lucide-react';
import { Separator } from '@/components/ui/separator';

function CollapsibleSection({ title, subtitle, defaultOpen = false, children }: any) {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  return (
    <Card className="overflow-hidden border-surface-700/50 bg-surface-950/50">
      <div 
        className="flex items-center justify-between p-4 cursor-pointer hover:bg-surface-900/50 transition-colors"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div>
          <h3 className="text-lg font-semibold">{title}</h3>
          {subtitle && <p className="text-sm text-surface-400">{subtitle}</p>}
        </div>
        <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full pointer-events-none">
          {isOpen ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
        </Button>
      </div>
      {isOpen && (
        <div className="p-4 pt-0 border-t border-surface-800/50 mt-2 bg-surface-900/10">
          <div className="space-y-4 pt-4">
            {children}
          </div>
        </div>
      )}
    </Card>
  );
}

export default function InvoiceForm() {
  const store = useInvoiceStore();
  const supabase = createClient();

  // 1. Fetch profile on mount/login
  useEffect(() => {
    const fetchProfile = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();

      if (error) {
        console.error('Error fetching profile:', error);
        return;
      }

      if (data) {
        // Sync database profile to local store
        const fields: (keyof typeof data)[] = [
          'business_name', 'tin', 'address', 'ptu_number', 
          'is_vat_registered', 'logo_url', 'signature_url',
          'currency', 'payment_details', 'notes', 'is_registered_bir'
        ];
        
        fields.forEach(field => {
          if (data[field] !== undefined && data[field] !== null) {
            // Map snake_case db to camelCase store
            const storeField = (field as string).replace(/_([a-z])/g, (g) => g[1].toUpperCase());
            store.updateField(storeField as any, data[field]);
          }
        });
        toast.success("Business profile synced!");
      }
    };

    fetchProfile();
  }, [supabase]);

  // 2. Save profile handler
  const handleSaveProfile = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      toast.error("Please sign in to save your profile permanently.");
      return;
    }

    const profileData = {
      id: user.id,
      business_name: store.businessName,
      tin: store.tin,
      address: store.address,
      ptu_number: store.ptuNumber,
      is_vat_registered: store.isVatRegistered,
      logo_url: store.logoUrl,
      signature_url: store.signatureUrl,
      currency: store.currency,
      payment_details: store.paymentDetails || "",
      notes: store.notes || "",
      is_registered_bir: store.isRegisteredBir,
      updated_at: new Date().toISOString(),
    };

    const { error } = await supabase
      .from('profiles')
      .upsert(profileData);

    if (error) {
      toast.error("Failed to save profile: " + error.message);
    } else {
      toast.success("Business profile saved successfully!");
    }
  };

  if (!store) return null;

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>, field: 'logoUrl' | 'signatureUrl') => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const MAX_WIDTH = field === 'logoUrl' ? 300 : 400; // Signatures can be slightly wider
        const scaleSize = Math.min(1, MAX_WIDTH / img.width);
        canvas.width = img.width * scaleSize;
        canvas.height = img.height * scaleSize;
        const ctx = canvas.getContext('2d');
        ctx?.drawImage(img, 0, 0, canvas.width, canvas.height);
        store.updateField(field, canvas.toDataURL('image/png', 0.8));
      };
      if (typeof event.target?.result === 'string') {
        img.src = event.target.result;
      }
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="space-y-4">
      <CollapsibleSection 
        title="Business Details" 
        subtitle="Your registered business footprint"
      >
        <div className="flex justify-end mb-6">
           <Button variant="outline" size="sm" onClick={handleSaveProfile} className="text-emerald-400 border-emerald-500/30 hover:bg-emerald-500/10 shadow-sm transition-all h-9">
              <Save className="w-4 h-4 mr-2" />
              Save Default Business Info
           </Button>
        </div>

        <div className="flex items-center justify-between py-2 border-b border-surface-700/50">
          <div className="space-y-0.5">
            <Label className="text-base font-semibold">VAT Registered</Label>
            <p className="text-sm text-surface-400">Is your business VAT registered?</p>
          </div>
          <Switch checked={store.isVatRegistered} onCheckedChange={(val) => store.updateField('isVatRegistered', val)} />
        </div>

        <div className="flex items-center justify-between py-4 px-4 bg-primary-600/10 border border-primary-500/20 rounded-xl my-4 group">
          <div className="space-y-0.5">
            <div className="flex items-center gap-2">
              <Label className="text-base font-bold text-primary-400 font-sans">Official Receipt Mode</Label>
              <CheckCircle2 className="w-4 h-4 text-primary-400" />
            </div>
            <p className="text-xs text-surface-400 max-w-xs">
              Enable this only if you are **BIR-registered** with a valid ATP/CAS. This removes the "Pro-forma" watermark.
            </p>
          </div>
          <Switch 
            checked={store.isRegisteredBir} 
            onCheckedChange={(val) => store.updateField('isRegisteredBir', val)}
            className="data-[state=checked]:bg-primary-500"
          />
        </div>
        <div className="space-y-2">
          <Label>Business / Trade Name</Label>
          <Input placeholder="e.g. Juan's Tech Services" value={store.businessName} onChange={(e) => store.updateField('businessName', e.target.value)} />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>TIN</Label>
            <Input placeholder="000-000-000-000" value={store.tin} onChange={(e) => store.updateField('tin', e.target.value)} />
          </div>
          <div className="space-y-2">
            <Label>PTU / ATP No. (Optional)</Label>
            <Input placeholder="Permit to Print" value={store.ptuNumber} onChange={(e) => store.updateField('ptuNumber', e.target.value)} />
          </div>
        </div>
        <div className="space-y-2">
          <Label>Registered Address</Label>
          <Input placeholder="Makati City, Metro Manila" value={store.address} onChange={(e) => store.updateField('address', e.target.value)} />
        </div>
      </CollapsibleSection>

      {/* 2. CLIENT & INVOICE DETAILS */}
      <CollapsibleSection title="Client & Invoice" subtitle="Who are you billing?">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2 relative">
            <Label>Sales Invoice Number</Label>
            <div className="flex gap-2">
              <Input value={store.invoiceNumber} onChange={(e) => store.updateField('invoiceNumber', e.target.value)} />
              <Button variant="outline" size="icon" onClick={store.generateRandomInvoiceNumber} title="Generat Random">
                <RefreshCw className="h-4 w-4" />
              </Button>
            </div>
          </div>
          <div className="space-y-2">
            <Label>Issue Date</Label>
            <Input type="date" value={store.invoiceDate} onChange={(e) => store.updateField('invoiceDate', e.target.value)} />
          </div>
        </div>
        <div className="space-y-2">
          <Label>Billed To (Client Name)</Label>
          <Input placeholder="Customer Name" value={store.clientName} onChange={(e) => store.updateField('clientName', e.target.value)} />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>Client Address (Optional)</Label>
            <Input placeholder="Address" value={store.clientAddress} onChange={(e) => store.updateField('clientAddress', e.target.value)} />
          </div>
          <div className="space-y-2">
            <Label>Client TIN (Optional)</Label>
            <Input placeholder="TIN" value={store.clientTin} onChange={(e) => store.updateField('clientTin', e.target.value)} />
          </div>
        </div>
      </CollapsibleSection>

      {/* 3. LINE ITEMS (DEFAULT OPEN) */}
      <CollapsibleSection title="Line Items" defaultOpen={true}>
        <div className="space-y-4">
          {store.items.map((item) => (
            <div key={item.id} className="flex gap-4 items-start bg-surface-900 border border-surface-700/50 p-3 rounded-xl">
              <div className="flex-1 space-y-2">
                <Label>Description</Label>
                <Input value={item.description} placeholder="Item or Service" onChange={(e) => store.updateItem(item.id, 'description', e.target.value)} />
              </div>
              <div className="w-20 space-y-2">
                <Label>Qty</Label>
                <Input type="number" min="1" value={item.quantity} onChange={(e) => store.updateItem(item.id, 'quantity', parseInt(e.target.value) || 0)} />
              </div>
              <div className="w-32 space-y-2">
                <Label>Unit Price</Label>
                <Input type="number" min="0" step="0.01" value={item.unitPrice} onChange={(e) => store.updateItem(item.id, 'unitPrice', parseFloat(e.target.value) || 0)} />
              </div>
              <div className="pt-8">
                <Button variant="ghost" size="icon" onClick={() => store.removeItem(item.id)} disabled={store.items.length === 1}>
                  <Trash2 className="h-4 w-4 text-red-500" />
                </Button>
              </div>
            </div>
          ))}
          <Button variant="outline" className="w-full border-dashed" onClick={store.addItem}>
            <Plus className="h-4 w-4 mr-2" /> Add Another Item
          </Button>
        </div>
      </CollapsibleSection>

      {/* 4. SETTINGS & ADVANCED OPTIONS */}
      <CollapsibleSection title="Advanced Settings & Features" subtitle="Theme, Payments, Multi-Currency, Signatures">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>Sales Invoice Theme</Label>
            <Select value={store.theme || "standard"} onValueChange={(val) => { if (val) store.updateField('theme', val) }}>
              <SelectTrigger>
                <SelectValue placeholder="Select template theme" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="standard">Standard A4 (Classic)</SelectItem>
                <SelectItem value="modern">Modern A4 (Premium)</SelectItem>
                <SelectItem value="receipt">POS Thermal Receipt</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label>Currency</Label>
            <Select value={store.currency || "PHP"} onValueChange={(val) => { if (val) store.updateField('currency', val) }}>
              <SelectTrigger>
                <SelectValue placeholder="Select currency" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="PHP">PHP (₱)</SelectItem>
                <SelectItem value="USD">USD ($)</SelectItem>
                <SelectItem value="EUR">EUR (€)</SelectItem>
                <SelectItem value="GBP">GBP (£)</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="space-y-2 pt-2">
          <Label>Apply Special Discount</Label>
          <Select value={store.discountType} onValueChange={(val) => { if (val) store.updateField('discountType', val) }}>
            <SelectTrigger>
              <SelectValue placeholder="Select discount type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="none">No Discount</SelectItem>
              <SelectItem value="senior">Senior Citizen (20% + VAT Exemption)</SelectItem>
              <SelectItem value="pwd">PWD (20% + VAT Exemption)</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Separator className="my-4" />

        {/* Uploads */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label className="text-sm font-semibold">Business Logo</Label>
              <p className="text-xs text-surface-400">Add a custom logo header</p>
            </div>
            <div className="flex items-center gap-2">
               {store.logoUrl && <Button variant="ghost" size="sm" onClick={() => store.updateField('logoUrl', null)} className="text-red-500">Remove</Button>}
               <Button variant="secondary" size="sm" className="relative overflow-hidden">
                 {store.logoUrl ? 'Change Logo' : 'Upload PNG/JPG'}
                 <input type="file" accept="image/*" className="absolute inset-0 opacity-0 cursor-pointer" onChange={(e) => handleImageUpload(e, 'logoUrl')} />
               </Button>
            </div>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label className="text-sm font-semibold">E-Signature</Label>
              <p className="text-xs text-surface-400">Append an authorized signature</p>
            </div>
            <div className="flex items-center gap-2">
               {store.signatureUrl && <Button variant="ghost" size="sm" onClick={() => store.updateField('signatureUrl', null)} className="text-red-500">Remove</Button>}
               <Button variant="secondary" size="sm" className="relative overflow-hidden">
                 {store.signatureUrl ? 'Change Signature' : 'Upload Signature'}
                 <input type="file" accept="image/*" className="absolute inset-0 opacity-0 cursor-pointer" onChange={(e) => handleImageUpload(e, 'signatureUrl')} />
               </Button>
            </div>
          </div>
        </div>

        <Separator className="my-4" />

        <div className="space-y-2">
          <Label>Payment Details</Label>
          <Textarea 
            placeholder="e.g. Bank Details: BPI 1234-5678, GCash: 0917-000-0000" 
            value={store.paymentDetails || ""} 
            onChange={(e) => store.updateField('paymentDetails', e.target.value)} 
            className="min-h-[80px]" 
          />
        </div>

        <div className="space-y-2">
          <Label>Terms & Notes</Label>
          <Textarea 
            placeholder="e.g. Please settle invoice within 15 days of issue." 
            value={store.notes || ""} 
            onChange={(e) => store.updateField('notes', e.target.value)} 
            className="min-h-[80px]" 
          />
        </div>

      </CollapsibleSection>

      <div className="flex justify-end gap-4 py-6">
         <Button variant="destructive" className="w-full md:w-auto" onClick={store.resetInvoice}>Reset Entire Form</Button>
      </div>
    </div>
  );
}
