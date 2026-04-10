import InvoiceBuilder from "@/components/InvoiceBuilder";
import { createClient } from "@/lib/supabase/server";

export default async function BuilderPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  return (
    <div className="min-h-screen bg-surface-950 flex flex-col font-sans">
      <main className="flex-1">
        <InvoiceBuilder initialUser={user} />
      </main>
    </div>
  );
}
