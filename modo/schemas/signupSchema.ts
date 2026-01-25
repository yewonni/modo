import * as z from "zod";

export const joinSchema = z
  .object({
    email: z.string().email("유효한 이메일을 입력해주세요"),
    password: z
      .string()
      .min(8, "비밀번호는 8자 이상이어야 합니다")
      .regex(
        /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]+$/,
        "영문과 숫자를 포함해야 합니다",
      ),
    confirmPassword: z.string(),
    name: z.string().min(1, "이름을 입력해주세요"),
    phone: z.string().regex(/^01\d{8,9}$/, "유효한 휴대폰 번호를 입력해주세요"),
    termsAgreed: z.boolean(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "비밀번호가 일치하지 않습니다",
    path: ["confirmPassword"],
  })
  .refine((data) => data.termsAgreed === true, {
    message: "약관에 동의해야 합니다",
    path: ["termsAgreed"],
  });

export type JoinFormValues = z.infer<typeof joinSchema>;
