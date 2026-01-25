"use client";

import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signup, SignupPayload } from "@/lib/api";
import { joinSchema, JoinFormValues } from "@/schemas/signupSchema";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import Button from "@/components/common/Button";
import InputField from "./InputField";
import TermsCheckbox from "./TermsCheckbox";

export default function JoinForm() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    control,
    watch,
    setValue,
    formState: { errors, isValid },
  } = useForm<JoinFormValues>({
    resolver: zodResolver(joinSchema),
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

  const onSubmit = async (data: JoinFormValues) => {
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

      <InputField
        label="Email"
        id="email"
        type="email"
        placeholder="example@email.com"
        register={register}
        error={errors.email?.message}
      />

      <InputField
        label="Password"
        id="password"
        type="password"
        placeholder="영문, 숫자 포함 8자 이상"
        register={register}
        error={errors.password?.message}
      />

      <InputField
        label="Confirm Password"
        id="confirmPassword"
        type="password"
        placeholder="비밀번호 재입력"
        register={register}
        error={errors.confirmPassword?.message}
      />

      <InputField
        label="Name"
        id="name"
        type="text"
        placeholder="이름을 입력해주세요"
        register={register}
        error={errors.name?.message}
      />

      <InputField
        label="Phone Number"
        id="phone"
        type="tel"
        placeholder="01012345678"
        register={register}
        error={errors.phone?.message}
      />

      <Controller
        name="termsAgreed"
        control={control}
        render={({ field }) => (
          <TermsCheckbox
            checked={field.value}
            onChange={field.onChange}
            error={errors.termsAgreed?.message}
          />
        )}
      />

      <Button
        type="submit"
        className="w-full py-3 mt-2 mb-4"
        disabled={!canSubmit || loading}
      >
        {loading ? "가입 중..." : "회원가입"}
      </Button>

      <p className="text-[#767676] text-sm text-center mt-4">
        이미 계정이 있으신가요?{" "}
        <Link href="/login" className="hover:underline cursor-pointer">
          로그인
        </Link>
      </p>
    </form>
  );
}
