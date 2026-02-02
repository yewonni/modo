export const dynamic = "force-dynamic";

import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client";
import { getUserIdFromRequest } from "@/app/lib/getUser";

interface CheckoutItem {
  quantity: number;
  product: {
    id: number;
    price: number;
  };
}

export async function POST(req: NextRequest) {
  try {
    const userId = getUserIdFromRequest(req);

    if (!userId) {
      return NextResponse.json(
        { message: "로그인이 필요합니다." },
        { status: 401 },
      );
    }

    const body = await req.json();
    const items: CheckoutItem[] = body.items;
    const shipping = body.shipping;
    const fromCart: boolean = body.fromCart === true;

    if (!items?.length) {
      return NextResponse.json(
        { message: "주문 상품이 없습니다." },
        { status: 400 },
      );
    }

    if (
      !shipping?.receiver ||
      !shipping?.phone ||
      !shipping?.zipCode ||
      !shipping?.address1 ||
      !shipping?.address2
    ) {
      return NextResponse.json(
        { message: "배송 정보를 모두 입력해주세요." },
        { status: 400 },
      );
    }

    if (!body.paymentMethod) {
      return NextResponse.json(
        { message: "결제 수단을 선택해주세요." },
        { status: 400 },
      );
    }

    const order = await prisma.order.create({
      data: {
        userId,
        totalPrice: body.totalPrice,
        paymentMethod: body.paymentMethod,
        receiver: shipping.receiver,
        phone: shipping.phone,
        zipCode: shipping.zipCode,
        address: `${shipping.address1} ${shipping.address2}`,
        message: shipping.message || "",

        items: {
          create: items.map((item) => ({
            productId: item.product.id,
            price: item.product.price,
            quantity: item.quantity,
          })),
        },
      },
    });

    if (fromCart) {
      await prisma.cartItem.deleteMany({
        where: { userId },
      });
    }

    return NextResponse.json({
      success: true,
      orderId: order.id,
    });
  } catch (error: any) {
    console.error("Checkout error:", error);
    return NextResponse.json(
      { message: error.message ?? "주문 처리 중 오류가 발생했습니다." },
      { status: 500 },
    );
  }
}
