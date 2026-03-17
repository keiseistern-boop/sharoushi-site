export default function Footer() {
  return (
    <footer className="border-t border-gold/20 mt-auto">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
        <div className="flex flex-col items-center gap-4">
          <div className="w-10 h-10 border border-gold/40 flex items-center justify-center">
            <span className="text-gold/60 font-serif text-xs font-bold">SR</span>
          </div>
          <p className="text-ivory/30 text-xs tracking-wider">
            &copy; {new Date().getFullYear()} 社労士合格ナビ All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
