/**
 * VAT & Discount Computation Utilities
 * Based on Philippine Tax Law (NIRC, RA 9994, RA 10754) and TindahanPOS reference
 */

export const VAT_RATE = 0.12;
export const SC_PWD_DISCOUNT_RATE = 0.20;

export function roundToTwo(value: number): number {
  return Math.round(value * 100) / 100;
}

/**
 * Compute VAT breakdown from a VAT-inclusive total.
 * Philippine VAT is inclusive — prices shown already contain VAT.
 */
export function computeVAT(vatInclusiveTotal: number) {
  const vatableSales = roundToTwo(vatInclusiveTotal / (1 + VAT_RATE));
  const vatAmount = roundToTwo(vatInclusiveTotal - vatableSales);

  return {
    vatableSales,
    vatAmount,
    vatExemptSales: 0,
    zeroRatedSales: 0,
    totalAmount: vatInclusiveTotal,
  };
}

/**
 * Compute SC / PWD discount.
 * 1. Remove the embedded 12% VAT to get the VAT-exempt base price
 * 2. Apply 20% discount on that base price
 * 3. Final amount due = base - 20% discount (VAT is fully exempted)
 */
export function computeSCPWDDiscount(vatInclusiveTotal: number) {
  // Step 1 — Remove VAT
  const vatExemptSales = roundToTwo(vatInclusiveTotal / (1 + VAT_RATE));

  // Step 2 — 20% discount on VAT-exempt price
  const discountAmount = roundToTwo(vatExemptSales * SC_PWD_DISCOUNT_RATE);

  // Step 3 — Final amount
  const amountDue = roundToTwo(vatExemptSales - discountAmount);

  return {
    originalTotal: vatInclusiveTotal,
    vatExemptSales,
    discountAmount,
    amountDue,
    vatAmount: 0,
    vatableSales: 0,
  };
}

export type DiscountType = "none" | "senior" | "pwd";

/**
 * Compute cart totals based on VAT registration and discount type
 */
export function computeCartTotals(
  items: Array<{ unitPrice: number; quantity: number }>,
  isVatRegistered: boolean,
  discountType: DiscountType = "none"
) {
  const rawTotal = items.reduce(
    (sum, item) => sum + roundToTwo(item.unitPrice * item.quantity),
    0
  );

  // If Non-VAT Registered, everything is considered Non-VAT/Exempted, and discounts might be applied differently
  // Standard practice for Non-VAT: No VAT is backed out. Discount is applied directly on the amount.
  if (!isVatRegistered) {
    if (discountType === "none") {
      return {
        subtotal: rawTotal,
        vatableSales: 0,
        vatAmount: 0,
        vatExemptSales: rawTotal,
        zeroRatedSales: 0,
        discountAmount: 0,
        totalAmount: rawTotal,
      };
    } else {
      // 20% discount directly on the total (No VAT to back out)
      const discountAmount = roundToTwo(rawTotal * SC_PWD_DISCOUNT_RATE);
      return {
        subtotal: rawTotal,
        vatableSales: 0,
        vatAmount: 0,
        vatExemptSales: roundToTwo(rawTotal - discountAmount),
        zeroRatedSales: 0,
        discountAmount,
        totalAmount: roundToTwo(rawTotal - discountAmount),
      };
    }
  }

  // VAT Registered Flow
  if (discountType === "none") {
    const vat = computeVAT(rawTotal);
    return {
      subtotal: rawTotal,
      ...vat,
      discountAmount: 0,
      totalAmount: rawTotal,
    };
  }

  // SC / PWD path for VAT Registered
  const discount = computeSCPWDDiscount(rawTotal);
  return {
    subtotal: rawTotal,
    vatableSales: 0,
    vatAmount: 0,
    vatExemptSales: discount.vatExemptSales,
    zeroRatedSales: 0,
    discountAmount: discount.discountAmount,
    totalAmount: discount.amountDue,
  };
}

export const formatCurrency = (amount: number, currency: string = "PHP"): string => {
  return new Intl.NumberFormat('en-PH', {
    style: 'currency',
    currency: currency,
  }).format(amount);
};

export function formatPeso(amount: number): string {
  return formatCurrency(amount, "PHP");
}
