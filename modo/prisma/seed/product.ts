import { PrismaClient } from "@prisma/client";

function getPriceByCategory(slug: string) {
  if (["candle-diffuser", "cushion", "object", "vase-planter"].includes(slug)) {
    return Math.floor(Math.random() * 35000 + 15000); // 15,000 ~ 49,999
  }

  // 조명류
  if (
    ["table-lamp", "floor-lamp", "wall-light", "ceiling-light"].includes(slug)
  ) {
    return Math.floor(Math.random() * 90000 + 39000); // 39,000 ~ 128,999
  }

  // 가구 / 대형
  if (["sofa", "table", "rug", "storage", "chair"].includes(slug)) {
    return Math.floor(Math.random() * 700000 + 199000); // 199,000 ~ 898,999
  }

  // 기본값
  return Math.floor(Math.random() * 80000 + 20000);
}

export async function seedProducts(prisma: PrismaClient) {
  const categories = await prisma.category.findMany();

  const productsData: Record<
    string,
    { images: string[]; names: string[]; stores: string[] }
  > = {
    blanket: {
      images: [
        "blanket1.png",
        "blanket2.png",
        "blanket3.png",
        "blanket4.png",
        "blanket5.png",
        "blanket6.png",
      ],
      names: [
        "울 블랭킷",
        "뜨개 블랭킷",
        "플리스 블랭킷",
        "니트 블랭킷",
        "체크 블랭킷",
        "퀼트 블랭킷",
      ],
      stores: [
        "Home Cozy",
        "Warm & Soft",
        "Comfort Living",
        "Dream Blanket",
        "Snug Studio",
        "Blanket House",
      ],
    },
    "candle-diffuser": {
      images: [
        "candle-diffuser1.png",
        "candle-diffuser2.png",
        "candle-diffuser3.png",
        "candle-diffuser4.png",
        "candle-diffuser5.png",
      ],
      names: [
        "라벤더 캔들",
        "자스민 디퓨저",
        "로즈 캔들",
        "오렌지 블라썸 디퓨저",
        "유칼립투스 캔들",
      ],
      stores: [
        "Scentful",
        "Aroma House",
        "Fragrance Studio",
        "Mood & Aroma",
        "Candle Corner",
      ],
    },
    "ceiling-light": {
      images: [
        "ceiling-light1.png",
        "ceiling-light2.png",
        "ceiling-light3.png",
        "ceiling-light4.png",
        "ceiling-light5.png",
        "ceiling-light6.png",
      ],
      names: [
        "LED 천장등",
        "모던 천장등",
        "블랙 천장등",
        "클래식 천장등",
        "스튜디오 천장등",
        "플랫 천장등",
      ],
      stores: [
        "BrightLight",
        "Home Lighting",
        "Glow Studio",
        "Light & Mood",
        "Ceiling Co",
        "Lumina",
      ],
    },
    chair: {
      images: [
        "chair1.png",
        "chair2.png",
        "chair3.png",
        "chair4.png",
        "chair5.png",
        "chair6.png",
        "chair7.png",
      ],
      names: [
        "아카시아 체어",
        "코튼 체어",
        "린넨 체어",
        "블루 체어",
        "모던 체어",
        "디자이너 체어",
        "접이식 체어",
      ],
      stores: [
        "Oak & Pine",
        "Comfort Chair",
        "Cozy Seat",
        "Wood Studio",
        "Design Seat",
        "Chair Works",
        "Urban Chair",
      ],
    },
    curtain: {
      images: [
        "curtain1.png",
        "curtain2.png",
        "curtain3.png",
        "curtain4.png",
        "curtain5.png",
        "curtain6.png",
      ],
      names: [
        "린넨 커튼",
        "쉬폰 커튼",
        "블랙아웃 커튼",
        "모던 커튼",
        "플라워 커튼",
        "패턴 커튼",
      ],
      stores: [
        "Curtain Co",
        "Home Drapes",
        "Window Studio",
        "Urban Curtains",
        "Cozy Home",
        "Drape House",
      ],
    },
    cushion: {
      images: [
        "cushion1.png",
        "cushion2.png",
        "cushion3.png",
        "cushion4.png",
        "cushion5.png",
      ],
      names: [
        "코튼 쿠션",
        "린넨 쿠션",
        "플리스 쿠션",
        "패턴 쿠션",
        "라이프 쿠션",
      ],
      stores: [
        "Cozy Cushion",
        "Soft Living",
        "Dream Pillow",
        "Pattern Studio",
        "Urban Cushion",
      ],
    },
    "floor-lamp": {
      images: [
        "floor-lamp1.png",
        "floor-lamp2.png",
        "floor-lamp3.png",
        "floor-lamp4.png",
        "floor-lamp5.png",
        "floor-lamp6.png",
      ],
      names: [
        "모던 플로어램프",
        "LED 플로어램프",
        "우드 플로어램프",
        "스탠딩 램프",
        "디자이너 플로어램프",
        "코지 플로어램프",
      ],
      stores: [
        "Lamp Studio",
        "Bright Home",
        "Floor Light Co",
        "Design Lamp",
        "Urban Light",
        "Cozy Lamp",
      ],
    },
    object: {
      images: [
        "object1.png",
        "object2.png",
        "object3.png",
        "object4.png",
        "object5.png",
        "object6.png",
      ],
      names: [
        "데코 오브젝트",
        "미니어처 장식",
        "스톤 오브젝트",
        "모던 오브젝트",
        "아트 오브젝트",
        "오브제",
      ],
      stores: [
        "Decor Works",
        "Art Studio",
        "Object Co",
        "Urban Decor",
        "Home Accent",
        "Design Studio",
      ],
    },
    rug: {
      images: [
        "rug1.png",
        "rug2.png",
        "rug3.png",
        "rug4.png",
        "rug5.png",
        "rug6.png",
      ],
      names: [
        "코튼 러그",
        "울 러그",
        "체크 러그",
        "니트 코끼리 러그",
        "모던 러그",
        "패턴 러그",
      ],
      stores: [
        "Rug Studio",
        "Soft Floor",
        "Home Carpet",
        "Urban Rugs",
        "Cozy Floor",
        "Design Rugs",
      ],
    },
    sofa: {
      images: [
        "sofa1.png",
        "sofa2.png",
        "sofa3.png",
        "sofa4.png",
        "sofa5.png",
        "sofa6.png",
        "sofa7.png",
        "sofa8.png",
        "sofa9.png",
        "sofa10.png",
        "sofa11.png",
      ],
      names: [
        "3인용 소파",
        "2인용 소파",
        "코너 소파",
        "패브릭 소파",
        "레더 소파",
        "모던 소파",
        "스툴 소파",
        "디자이너 소파",
        "체크 소파",
        "린넨 소파",
        "코지 소파",
      ],
      stores: [
        "Sofa House",
        "Comfort Living",
        "Urban Sofa",
        "Dream Sofa",
        "Design Sofa",
        "Modern Sofa",
        "Cozy Sofa",
        "Studio Sofa",
        "Home Sofa",
        "Luxury Sofa",
        "Soft Studio",
      ],
    },
    storage: {
      images: [
        "storage1.png",
        "storage2.png",
        "storage3.png",
        "storage4.png",
        "storage5.png",
      ],
      names: [
        "우드 수납장",
        "모던 수납장",
        "스틸 수납장",
        "디자인 수납장",
        "코지 수납장",
      ],
      stores: [
        "Storage Works",
        "Home Storage",
        "Urban Storage",
        "Design Cabinet",
        "Cozy Cabinet",
      ],
    },
    "table-lamp": {
      images: [
        "table-lamp1.png",
        "table-lamp2.png",
        "table-lamp3.png",
        "table-lamp4.png",
        "table-lamp5.png",
        "table-lamp6.png",
        "table-lamp7.png",
      ],
      names: [
        "LED 테이블램프",
        "모던 테이블램프",
        "스탠드 테이블램프",
        "디자이너 테이블램프",
        "코지 테이블램프",
        "패브릭 테이블램프",
        "클래식 테이블램프",
      ],
      stores: [
        "Lamp Studio",
        "Home Bright",
        "Desk Light",
        "Design Lamp",
        "Urban Light",
        "Cozy Lamp",
        "Studio Lamp",
      ],
    },
    table: {
      images: [
        "table1.png",
        "table2.png",
        "table3.png",
        "table4.png",
        "table5.png",
        "table6.png",
      ],
      names: [
        "원목 테이블",
        "모던 테이블",
        "유리 테이블",
        "라운드 테이블",
        "원형 테이블",
        "디자이너 테이블",
      ],
      stores: [
        "Table Works",
        "Home Table",
        "Urban Table",
        "Design Table",
        "Cozy Table",
        "Studio Table",
      ],
    },
    "vase-planter": {
      images: [
        "vase-planter1.png",
        "vase-planter2.png",
        "vase-planter3.png",
        "vase-planter4.png",
        "vase-planter5.png",
        "vase-planter6.png",
      ],
      names: [
        "세라믹 화병",
        "글라스 플랜터",
        "글라스 화분",
        "모던 화병",
        "패턴 플랜터",
        "디자이너 화병",
      ],
      stores: [
        "Plant Studio",
        "Home Planter",
        "Urban Vase",
        "Design Planter",
        "Cozy Plant",
        "Studio Vase",
      ],
    },
    "wall-decor": {
      images: [
        "wall-decor1.png",
        "wall-decor2.png",
        "wall-decor3.png",
        "wall-decor4.png",
        "wall-decor5.png",
        "wall-decor6.png",
      ],
      names: [
        "프레임 아트",
        "모던 월데코",
        "캔버스 아트",
        "디자인 액자",
        "체크 월데코",
        "패턴 월데코",
      ],
      stores: [
        "Decor Studio",
        "Wall Works",
        "Art & Frame",
        "Design Wall",
        "Urban Decor",
        "Home Wall",
      ],
    },
    "wall-light": {
      images: [
        "wall-light1.png",
        "wall-light2.png",
        "wall-light3.png",
        "wall-light4.png",
        "wall-light5.png",
        "wall-light6.png",
      ],
      names: [
        "LED 벽등",
        "모던 벽등",
        "우드 벽등",
        "디자이너 벽등",
        "스튜디오 벽등",
        "코지 벽등",
      ],
      stores: [
        "Light Studio",
        "Wall Light Co",
        "Urban Light",
        "Design Wall",
        "Home Glow",
        "Studio Light",
      ],
    },
  };

  for (const [slug, { images, names, stores }] of Object.entries(
    productsData,
  )) {
    const category = categories.find(
      (c) => c.slug === slug || c.slug === slug.replace("-", ""),
    );
    if (!category) continue;

    for (let i = 0; i < images.length; i++) {
      await prisma.product.upsert({
        where: {
          name: names[i],
        },
        update: {
          price: getPriceByCategory(slug),
          image: `/images/${images[i]}`,
          store: stores[i],
          categoryId: category.id,
        },
        create: {
          name: names[i],
          price: getPriceByCategory(slug),
          image: `/images/${images[i]}`,
          store: stores[i],
          categoryId: category.id,
        },
      });
    }
  }

  console.log("Product seed completed");
}
