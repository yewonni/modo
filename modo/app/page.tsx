import Footer from "./components/common/Footer";
import BannerSlider from "./components/common/BannerSlider";
import ProductSection from "./components/common/ProductSection";
import BannerSection from "./components/common/BannerSection";
import HomeCategorySection from "./components/common/HomeCategorySection";
import { getProductsByType } from "./lib/products";
import LoginModal from "./components/common/LoginModal";
import BottomNav from "./components/common/BottomNav";

const BANNERS = [
  {
    image: "/images/lighting-bg.png",
    subtitle: "부드러운 빛, 공간의 분위기",
    title: ["MODO 조명 시리즈로", "일상의 리듬을 바꾸는 시간"],
    cta: "조명 보러가기",
    ctaLink: "/category?slug=lighting",
  },
  {
    image: "/images/textile-bg.png",
    subtitle: "손끝에 닿는 촉감",
    title: ["러그와 쿠션으로", "편안함을 더하는 집"],
    cta: "패브릭 보러가기",
    ctaLink: "/category?slug=textile",
  },
  {
    image: "/images/furniture-bg.png",
    subtitle: "",
    title: ["공간의 중심 속", "오래 머물고 싶은 분위기"],
    cta: "가구 보러가기",
    ctaLink: "/category?slug=furniture",
  },
];

const CATEGORIES = [
  {
    key: "furniture",
    label: "Furniture",
    slug: "furniture",
    icon: "/icons/furniture.png",
    alt: "가구",
  },
  {
    key: "lighting",
    label: "Lighting",
    slug: "lighting",
    icon: "/icons/lighting.png",
    alt: "조명",
  },
  {
    key: "textile",
    label: "Textile",
    slug: "textile",
    icon: "/icons/textile.png",
    alt: "패브릭",
  },
  {
    key: "decor",
    label: "Decor",
    slug: "decor",
    icon: "/icons/decor.png",
    alt: "데코",
  },
];

export default async function HomePage() {
  const [newProducts, trendProducts] = await Promise.all([
    getProductsByType("new", 4),
    getProductsByType("trend", 8),
  ]);

  return (
    <>
      <BannerSlider />

      <main className="px-4 sm:px-40">
        <HomeCategorySection categories={CATEGORIES} />
        <ProductSection
          title="NEW ARRIVALS"
          href="/products/new"
          products={newProducts}
        />
        <ProductSection
          title="TREND"
          href="/products/trend"
          products={trendProducts}
        />
        <BannerSection banners={BANNERS} />
      </main>

      <Footer />
      <BottomNav />
      <LoginModal />
    </>
  );
}
