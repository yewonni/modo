"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import Checkbox from "@/components/CheckBox";
import Button from "@/components/Button";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signup, SignupPayload } from "@/lib/api";
import { signupSchema, SignupFormValues } from "@/schemas/signupSchema";
import { useRouter } from "next/navigation";

export default function SignupPage() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    control,
    watch,
    setValue,
    formState: { errors, isValid },
  } = useForm<SignupFormValues>({
    resolver: zodResolver(signupSchema),
    mode: "onChange",
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
      name: "",
      phone: "",
      termsAgreed: false,
    },
  });

  const values = watch();

  const canSubmit =
    isValid &&
    values.email?.trim() &&
    values.password?.trim() &&
    values.confirmPassword?.trim() &&
    values.name?.trim() &&
    values.phone?.trim() &&
    values.termsAgreed === true;

  const onSubmit = async (data: SignupFormValues) => {
    try {
      setLoading(true);
      const payload: SignupPayload = {
        email: data.email,
        password: data.password,
        name: data.name,
        phone: data.phone,
      };
      await signup(payload);
      router.push("/join-success");
    } catch (err: any) {
      alert(err.message || "회원가입 실패");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-[#f9f9f9] min-h-screen flex justify-center items-center px-4">
      <div className="w-full max-w-100 flex flex-col items-center">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="bg-white p-8 sm:p-10 w-full flex flex-col gap-4 rounded-lg shadow-md"
        >
          <Link href={"/"}>
            <Image
              src="/icons/modo-logo-black.svg"
              alt="logo"
              width={80}
              height={33}
              className="mb-6 self-center"
            />
          </Link>

          <div className="w-full flex flex-col gap-1">
            <label
              htmlFor="email"
              className="text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              {...register("email")}
              type="email"
              id="email"
              placeholder="example@email.com"
              className="w-full border border-border p-3 rounded-sm focus:outline-none focus:ring-2 focus:ring-primary"
            />
            {errors.email && (
              <span className="text-xs text-red-500">
                {errors.email.message}
              </span>
            )}
          </div>

          <div className="w-full flex flex-col gap-1">
            <label
              htmlFor="password"
              className="text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              {...register("password")}
              type="password"
              id="password"
              placeholder="영문, 숫자 포함 8자 이상"
              className="w-full border border-border p-3 rounded-sm focus:outline-none focus:ring-2 focus:ring-primary"
            />
            {errors.password && (
              <span className="text-xs text-red-500">
                {errors.password.message}
              </span>
            )}
          </div>

          <div className="w-full flex flex-col gap-1">
            <label
              htmlFor="confirmPassword"
              className="text-sm font-medium text-gray-700"
            >
              Confirm Password
            </label>
            <input
              {...register("confirmPassword")}
              type="password"
              id="confirmPassword"
              placeholder="비밀번호 재입력"
              className="w-full border border-border p-3 rounded-sm focus:outline-none focus:ring-2 focus:ring-primary"
            />
            {errors.confirmPassword && (
              <span className="text-xs text-red-500">
                {errors.confirmPassword.message}
              </span>
            )}
          </div>

          <div className="w-full flex flex-col gap-1">
            <label htmlFor="name" className="text-sm font-medium text-gray-700">
              Name
            </label>
            <input
              {...register("name")}
              type="text"
              id="name"
              placeholder="이름을 입력해주세요"
              className="w-full border border-border p-3 rounded-sm focus:outline-none focus:ring-2 focus:ring-primary"
            />
            {errors.name && (
              <span className="text-xs text-red-500">
                {errors.name.message}
              </span>
            )}
          </div>

          <div className="w-full flex flex-col gap-1">
            <label
              htmlFor="phone"
              className="text-sm font-medium text-gray-700"
            >
              Phone Number
            </label>
            <input
              {...register("phone")}
              type="tel"
              id="phone"
              placeholder="01012345678"
              className="w-full border border-border p-3 rounded-sm focus:outline-none focus:ring-2 focus:ring-primary"
            />
            {errors.phone && (
              <span className="text-xs text-red-500">
                {errors.phone.message}
              </span>
            )}
          </div>

          <Controller
            name="termsAgreed"
            control={control}
            render={({ field }) => (
              <div className="flex items-center gap-2 mt-1 mb-4">
                <Checkbox
                  checkboxType="square"
                  checked={field.value}
                  onChange={field.onChange}
                />
                <span className="text-sm text-gray-600">약관에 동의합니다</span>
              </div>
            )}
          />
          {errors.termsAgreed && (
            <span className="text-xs text-red-500">
              {errors.termsAgreed.message}
            </span>
          )}

          <Button
            type="submit"
            className="w-full py-3 mt-2 mb-4"
            disabled={!canSubmit || loading}
          >
            {loading ? "가입 중..." : "회원가입"}
          </Button>
        </form>

        <p className="text-[#767676] text-sm text-center mt-4">
          이미 계정이 있으신가요?{" "}
          <Link href="/login" className="hover:underline cursor-pointer">
            로그인
          </Link>
        </p>
      </div>
    </div>
  );
}
