export interface SignupPayload {
  email: string;
  phone: string;
  password: string;
  name: string;
}

export interface LoginPayload {
  email: string;
  password: string;
}

export async function signup(payload: SignupPayload) {
  const res = await fetch("/api/auth/signup", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message || "회원가입 실패");
  }

  return res.json();
}

export async function login(payload: LoginPayload) {
  const res = await fetch("/api/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message || "로그인 실패");
  }

  return res.json() as Promise<{ accessToken: string }>;
}

export async function refreshAccessToken(): Promise<string> {
  const response = await fetch("/api/auth/refresh", {
    method: "POST",
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("토큰 갱신 실패");
  }

  const data = await response.json();
  return data.accessToken;
}

export async function logout(): Promise<void> {
  await fetch("/api/auth/logout", {
    method: "POST",
    credentials: "include",
  });
}

export interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  store?: string;
  categoryId: number;
  category?: { id: number; name: string; slug: string };
}
