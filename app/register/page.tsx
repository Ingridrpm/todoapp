import React from "react";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import RegisterForm from "./form";

const RegisterPage = async () => {
  const session = await getServerSession(authOptions);

  if (session) {
    redirect("/");
  }
  return (
    <div>
      <RegisterForm />
    </div>
  );
};

export default RegisterPage;
