'use client';

export default function BackgroundSoul() {
  return (
    <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none flex justify-center">
      {/* 
          Vibrant Color Glows removed from here to ensure they only appear on the Hero page.
          Keeping this as a base layer for potential global subtle effects like noise if needed.
      */}
      <div className="relative w-full max-w-[1600px] h-full overflow-hidden bg-transparent" />
    </div>
  );
}
