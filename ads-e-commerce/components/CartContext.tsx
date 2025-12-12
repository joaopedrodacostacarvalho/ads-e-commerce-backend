import axios from "axios";
import { useState } from "react";

export default async function CarrinhoContext() {
    const {carrinhoItens, carrinhoQtd, precoTotal, removeDoCarrinho} = useCarrinho();
    const [checandoCarrinho, setChecandoCarrinho] = useState(false);

    const handlePorProduto = async () => {
        try {
            setChecandoCarrinho(true);

            const response = await axios
                .get('http://localhost:3000/api/cart/mycarts');
        }
    }
}