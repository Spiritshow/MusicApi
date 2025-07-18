import express from "express";
import infoProduct from "./helpers/InfoProduct";
import infoSpec from "./helpers/InfoSpec";
import translatorSpec from "./helpers/TranslatorSpec";
import getNameSpec from "./helpers/getNameSpec";
import getValuesSpec from "./helpers/getValueSpec";

const productInfo = express.Router();

productInfo.get("/product/:id", async (req, res) => {
    const id = req.params.id;
    try {
        const product = await infoProduct(id);
        if (!product) throw new Error('not found');

        const rawSpec = await infoSpec(product.subcategorytable, id);
        const rawSpecifications = await Object.entries(rawSpec)
        .filter(([key]) => key.startsWith("spec_"))
        .map(([key, value]) => ({
            name: key,
            value: value as number
        }));

        const specifications = await Promise.all(rawSpecifications.map(async (raw) => {
            const name = await getNameSpec(raw.name);
            const value = await getValuesSpec(raw.name, raw.value);

            return({name, value})
        }))
        
        res.json({...product, specifications: specifications})
    } catch (error) {
        console.log("Ошибка при выдаче информации по продукту:", error);
        res.status(500).json({ message: "Ошибка сервера при при выдаче информации по продукту:" });
    }
})

export default productInfo;