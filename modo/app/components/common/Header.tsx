"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/app/store/authStore";
import { useSearchHistoryStore } from "@/app/store/searchHistoryStore";
import { useConfirmStore } from "@/app/store/confirmStore";
import { logout } from "@/app/lib/api";

const TOP_HEIGHT = 125;

interface Category {
  id: number;
  name: string;
  slug: string;
  children?: { id: number; name: string; slug: string }[];
}

interface HeaderProps {
  categories: Category[];
}

export default function Header({ categories }: HeaderProps) {
  const router = useRouter();
  const [openSearch, setOpenSearch] = useState(false);
  const [keyword, setKeyword] = useState("");
  const [openUserMenu, setOpenUserMenu] = useState(false);

  const accessToken = useAuthStore((state) => state.accessToken);
  const clearAccessToken = useAuthStore((state) => state.clearAccessToken);

  const history = useSearchHistoryStore((state) => state.history);
  const addKeyword = useSearchHistoryStore((state) => state.addKeyword);
  const removeKeyword = useSearchHistoryStore((state) => state.removeKeyword);
  const clearHistory = useSearchHistoryStore((state) => state.clearHistory);

  const openConfirm = useConfirmStore((state) => state.openConfirm);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = keyword.trim();
    if (!trimmed) return;

    addKeyword(trimmed);
    router.push(`/search?q=${encodeURIComponent(trimmed)}`);
    setKeyword("");
    setOpenSearch(false);
  };

  useEffect(() => {
    const closeMenu = () => setOpenUserMenu(false);
    window.addEventListener("click", closeMenu);
    return () => window.removeEventListener("click", closeMenu);
  }, []);

  const executeLogout = async () => {
    try {
      await logout();
    } finally {
      clearAccessToken();
      setOpenUserMenu(false);
      router.push("/login");
    }
  };

  const handleLogoutClick = () => {
    openConfirm({
      title: "로그아웃",
      message: "정말 로그아웃 하시겠습니까?",
      onConfirm: executeLogout,
    });
  };

  return (
    <>
      <header className="fixed top-0 left-0 z-50 w-full bg-primary">
        <div className="flex h-22.5 items-center justify-between px-4 sm:px-40">
          <Link href="/">
            <Image
              src="/icons/modo-logo-white.svg"
              alt="modo logo"
              width={80}
              height={28}
              className="hover:cursor-pointer"
            />
          </Link>

          <ul className="flex gap-8 relative">
            <li>
              <button onClick={() => setOpenSearch((v) => !v)}>
                <Image
                  src="/icons/search-white.svg"
                  alt="검색"
                  width={18}
                  height={18}
                  className="hover:cursor-pointer"
                />
              </button>
            </li>

            {accessToken && (
              <>
                <li className="hidden md:flex">
                  <Link href="/my-like">
                    <Image
                      src="/icons/like-white.svg"
                      alt="좋아요"
                      width={18}
                      height={18}
                      className="hover:cursor-pointer"
                    />
                  </Link>
                </li>
                <li className="hidden md:flex">
                  <Link href="/my-cart">
                    <Image
                      src="/icons/cart-white.svg"
                      alt="장바구니"
                      width={18}
                      height={18}
                      className="hover:cursor-pointer"
                    />
                  </Link>
                </li>
              </>
            )}

            <li className="relative">
              {!accessToken ? (
                <Link href="/login">
                  <Image
                    src="/icons/user-white.svg"
                    alt="로그인"
                    width={14}
                    height={18}
                    className="hover:cursor-pointer"
                  />
                </Link>
              ) : (
                <>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setOpenUserMenu((v) => !v);
                    }}
                  >
                    <Image
                      src="/icons/user-white.svg"
                      alt="유저 메뉴"
                      width={14}
                      height={18}
                      className="hover:cursor-pointer"
                    />
                  </button>

                  {openUserMenu && (
                    <div
                      className="absolute right-0 top-8 w-28 rounded-md bg-white shadow-md overflow-hidden text-center"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <Link
                        href="/my-page/orders"
                        className="block p-4 text-sm hover:bg-gray-100"
                        onClick={() => setOpenUserMenu(false)}
                      >
                        마이페이지
                      </Link>
                      <button
                        onClick={handleLogoutClick}
                        className="w-full p-4 text-sm hover:bg-gray-100 text-center"
                      >
                        로그아웃
                      </button>
                    </div>
                  )}
                </>
              )}
            </li>
          </ul>
        </div>

        <nav className="bg-secondary">
          <ul className="mx-auto flex max-w-[320px] justify-between items-center h-9 text-sm text-white md:max-w-none md:justify-center md:gap-25">
            {categories.map((cat) => (
              <li key={cat.id}>
                <Link
                  href={`/category?slug=${cat.slug}`}
                  className="transition-colors hover:text-gray-400"
                >
                  {cat.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </header>

      {openSearch && (
        <div
          className="fixed inset-0 z-50"
          style={{ top: TOP_HEIGHT }}
          onClick={() => setOpenSearch(false)}
        >
          <div className="absolute inset-0 bg-[#c2c2c2]/90" />

          <div
            className="relative mx-auto px-4 pt-6"
            style={{ maxWidth: 720 }}
            onClick={(e) => e.stopPropagation()}
          >
            <form onSubmit={handleSubmit}>
              <input
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                placeholder="검색어를 입력하세요"
                className="w-full rounded-md bg-white px-4 py-3 text-sm outline-none"
              />
            </form>

            {history.length > 0 && (
              <div className="mt-6">
                <div className="mb-3 flex justify-between items-center">
                  <p className="text-sm text-secondary">최근 검색어</p>
                  <button
                    onClick={clearHistory}
                    className="text-xs text-gray-700 hover:text-black"
                  >
                    전체 삭제
                  </button>
                </div>

                <ul className="flex flex-wrap gap-2">
                  {history.map((item) => (
                    <li
                      key={item}
                      className="flex items-center gap-2 rounded-full bg-white/50 px-3 py-1 text-sm"
                    >
                      <button
                        onClick={() => {
                          addKeyword(item);
                          router.push(`/search?q=${encodeURIComponent(item)}`);
                          setOpenSearch(false);
                        }}
                      >
                        {item}
                      </button>
                      <button
                        onClick={() => removeKeyword(item)}
                        className="text-gray-400 hover:text-black"
                      >
                        ×
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
