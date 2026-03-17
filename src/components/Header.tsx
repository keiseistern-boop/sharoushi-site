"use client";

import Link from "next/link";
import { useState } from "react";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="border-b border-gold/20 bg-background/95 backdrop-blur-sm sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-3">
            <div className="w-8 h-8 border border-gold flex items-center justify-center">
              <span className="text-gold font-serif text-sm font-bold">SR</span>
            </div>
            <span className="font-serif text-gold text-lg tracking-wider hidden sm:block">
              社労士合格ナビ
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-8">
            <Link
              href="/"
              className="text-ivory/70 hover:text-gold text-sm tracking-wide transition-colors"
            >
              ホーム
            </Link>
            <Link
              href="/subjects"
              className="text-ivory/70 hover:text-gold text-sm tracking-wide transition-colors"
            >
              科目一覧
            </Link>
          </nav>

          {/* Mobile menu button */}
          <button
            className="md:hidden text-ivory/70 hover:text-gold"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="メニュー"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {isMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile nav */}
        {isMenuOpen && (
          <nav className="md:hidden pb-4 border-t border-gold/10 pt-4">
            <Link
              href="/"
              className="block py-2 text-ivory/70 hover:text-gold text-sm tracking-wide transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              ホーム
            </Link>
            <Link
              href="/subjects"
              className="block py-2 text-ivory/70 hover:text-gold text-sm tracking-wide transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              科目一覧
            </Link>
          </nav>
        )}
      </div>
    </header>
  );
}
