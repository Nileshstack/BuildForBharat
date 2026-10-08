import { RegisterButton } from "@/components/shared/register-button";

export function MobileRegisterBar() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-navy/10 bg-white/90 px-4 pb-[max(0.75rem,env(safe-area-inset-bottom))] pt-3 backdrop-blur-xl md:hidden">
      <RegisterButton className="w-full" />
    </div>
  );
}
