"use client";

import { useState } from "react";
import Image from "next/image";
import { ProdutoType } from "@/app/types/Produto.type";

type ProdutoImagemProps = {
  produto: ProdutoType;
  fill?: boolean;
};

export default function ProdutoImagem({ produto, fill }: ProdutoImagemProps) {
  const [loading, setLoading] = useState(true);
  return fill ? (
    <Image
      src={produto.image}
      fill
      alt={produto.title}
      className={`object-cover ${
        loading
          ? "scale-110 blur-3xl grayscale"
          : "scale-100 blur-0 grayscale-0"
      }`}
      onLoad={() => setLoading(false)}
    />
  ) : (
    <Image
      src={produto.image}
      width={400}
      height={700}
      alt={produto.title}
      className={`object-cover ${
        loading
          ? "scale-110 blur-3xl grayscale"
          : "scale-100 blur-0 grayscale-0"
      }`}
      onLoad={() => setLoading(false)}
    />
  );
}
