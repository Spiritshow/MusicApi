import express from "express";
import infoProduct from "./helpers/InfoProduct";
import infoSpec from "./helpers/InfoSpec";
import translatorSpec from "./helpers/TranslatorSpec";

const productInfo = express.Router();

productInfo.get("/product/:id", async (req, res) => {
    const id = req.params.id;
    try {
        const product = await infoProduct(id);
        if (!product) throw new Error('not found');

        const rawSpec = await infoSpec(product.subcategorytable, id);
        const spec = await translatorSpec(rawSpec);

        res.json({...product, spec: spec})
    } catch (error) {
        console.log("Ошибка при выдаче информации по продукту:", error);
        res.status(500).json({ message: "Ошибка сервера при при выдаче информации по продукту:" });
    }
})

export default productInfo;