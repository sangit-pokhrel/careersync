
import type {Metadata} from "next";

export const metadata: Metadata = {
  title: "Verify Your Otp",
  description: "Verify your OTP",
};

export default function OTPLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>
  
  {children}
  
  </>;
}