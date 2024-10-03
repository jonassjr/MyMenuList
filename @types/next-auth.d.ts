import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      name: string;
      email: string;
      image?: string;
      pageName?: string; // Adicione pageName aqui
    };
  }

  interface User {
    id: string;
    name: string;
    email: string;
    image?: string;
    pageName?: string; // Adicione pageName também no User
  }
}