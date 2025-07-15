import express from "express";
import multer from "multer";
import storage from "./helpers/SafeImage";
import { isNumberObject, isStringObject } from "util/types";
import addcategory from "./AddCategory";
import addsubcategory from "./AddSubcategory";
import createtablespec from "./CreateTableSpec";
import addnamespec from "./AddNameSpec";
import createtablevaluesspec from "./CreateTableValuesSpec";
import addvaluespec from "./AddValuesSpec";
import addcolumntablespec from "./AddColumnTableSpec";
import { pool } from "../ConfConst/DB";
import addinfoproduct from "./helpers/AddInfoProduct";
import addimgproduct from "./helpers/AddImgProduct";
import addspec from "./helpers/AddSpec";
import updatespec from "./helpers/UpdateSpec";
const addproductrouter = express.Router();

const upload = multer({storage});

interface IReqAddPrudact {
    name: string,
    price: number,
    description: string,
    count: number,
    category: number,
    newcategory: string,
    subcategory: number,
    newsubcategory: string
}


interface IReqNewSpec{
    name: string;
    value: string;
}

interface IReqSpec{
    name: string;
    value: number | string;
}

interface ISpecifications{
    name: string;
    value: number;
}

addproductrouter.post("/addproduct", upload.array("images", 10), async (req,res) => {
    const { name, price, description, count, category, newcategory, subcategory, newsubcategory }: IReqAddPrudact = req.body;
    const req_specs: Record<string, number | string> = JSON.parse(req.body.specs || "{}");
    const newSpecs: IReqNewSpec[] = JSON.parse(req.body.newSpecs || "[]");
    const images = req.files as Express.Multer.File[];

    const req_id_category = Number(category);
    const req_id_subcategory = Number(subcategory);
    const nameImages: string[] = images.map(img => img.filename)
    const specs: IReqSpec[] = Object.entries(req_specs).map(([key, val]) => ({
        name: key,
        value: val
    }));

    const specifications: ISpecifications[] = [];
    
    console.log("Новый продукт:", {
        name,
        price,
        description,
        count,
        category,
        newcategory,
        subcategory,
        newsubcategory,
        specs,
        newSpecs,
        images: images.map(img => img.filename),
    });



    if(req_id_category === 0){
        const id_category = await addcategory(newcategory);
        if (typeof id_category === "undefined"){ 
            res.status(500).json({ message: "Ошибка сервера при добавлении новой категории" });
            return;
        }
        const id_subcategory = await addsubcategory(newsubcategory, id_category, nameImages);
        if (typeof id_subcategory === "undefined"){ 
            res.status(500).json({ message: "Ошибка сервера при добавлении новой подкатегории" });
            return;
        }

        const id_product = await addinfoproduct(name, price, description, count, id_subcategory);

        if (typeof id_product === "undefined"){ 
            res.status(500).json({ message: "Ошибка сервера при добавлении нового продукта" });
            return;
        }

        for(const img of nameImages){
           await addimgproduct(id_product,img);
        }

        await createtablespec(id_subcategory);

        for (const newSpec of newSpecs) {
            const id_namespec = await addnamespec(newSpec.name, id_subcategory);

            if (typeof id_namespec === "undefined") {
                res.status(500).json({ message: "Ошибка сервера при добавлении новой характеристики" });
                return;
            }

            await createtablevaluesspec(id_namespec);
            await addcolumntablespec(id_subcategory,id_namespec);
            const id_valuespec = await addvaluespec(`spec_${id_namespec}`, newSpec.value);
            if (typeof id_valuespec === "undefined") {
                res.status(500).json({ message: "Ошибка сервера при добавлении нового значения характеристики" });
                return;
            }

            specifications.push({name: `spec_${id_namespec}`, value: id_valuespec});
        }

        const id_subcategoryspec = await addspec(id_subcategory, id_product);
        
        if (typeof id_subcategoryspec === "undefined") {
            res.status(500).json({ message: "Ошибка сервера при добавлении новых характеристик продукта" });
            return;
        }

        for( const specification of specifications){
            await updatespec(id_subcategory,specification,id_subcategoryspec);
        }
        

    }else{
        if(req_id_subcategory === 0){
            const id_category = req_id_category;

            const id_subcategory = await addsubcategory(newsubcategory, id_category, nameImages);
            if (typeof id_subcategory === "undefined"){ 
                res.status(500).json({ message: "Ошибка сервера при добавлении новой подкатегории" });
                return;
            }

            const id_product = await addinfoproduct(name, price, description, count, id_subcategory);

            if (typeof id_product === "undefined"){ 
                res.status(500).json({ message: "Ошибка сервера при добавлении нового продукта" });
                return;
            }

            for(const img of nameImages){
                await addimgproduct(id_product,img);
            }

            await createtablespec(id_subcategory);

            for (const newSpec of newSpecs) {
                const id_namespec = await addnamespec(newSpec.name, id_subcategory);

                if (typeof id_namespec === "undefined") {
                    res.status(500).json({ message: "Ошибка сервера при добавлении новой характеристики" });
                    return;
                }

                await createtablevaluesspec(id_namespec);
                await addcolumntablespec(id_subcategory,id_namespec);
                const id_valuespec = await addvaluespec(`spec_${id_namespec}`, newSpec.value);
                if (typeof id_valuespec === "undefined") {
                    res.status(500).json({ message: "Ошибка сервера при добавлении нового значения характеристики" });
                    return;
                }

                specifications.push({name: `spec_${id_namespec}`, value: id_valuespec});
            }

            const id_subcategoryspec = await addspec(id_subcategory, id_product);
            
            if (typeof id_subcategoryspec === "undefined") {
                res.status(500).json({ message: "Ошибка сервера при добавлении новых характеристик продукта" });
                return;
            }

            for( const specification of specifications){
                await updatespec(id_subcategory,specification,id_subcategoryspec);
            }


        } else {
            const id_category = req_id_category;
            const id_subcategory = req_id_subcategory;

            const id_product = await addinfoproduct(name, price, description, count, id_subcategory);

            if (typeof id_product === "undefined"){ 
                res.status(500).json({ message: "Ошибка сервера при добавлении нового продукта" });
                return;
            }

            for(const img of nameImages){
                await addimgproduct(id_product,img);
            }

            if(newSpecs.length > 0){
                for (const newSpec of newSpecs) {
                    const id_namespec = await addnamespec(newSpec.name, id_subcategory);

                    if (typeof id_namespec === "undefined") {
                        res.status(500).json({ message: "Ошибка сервера при добавлении новой характеристики" });
                        return;
                    }

                    await createtablevaluesspec(id_namespec);
                    await addcolumntablespec(id_subcategory,id_namespec);
                    const id_valuespec = await addvaluespec(`spec_${id_namespec}`, newSpec.value);
                    if (typeof id_valuespec === "undefined") {
                        res.status(500).json({ message: "Ошибка сервера при добавлении нового значения характеристики" });
                        return;
                    }

                    specifications.push({name: `spec_${id_namespec}`, value: id_valuespec});
                }
            }

            for( const spec of specs){
                if (isNumberObject(spec.value)){
                    specifications.push({name: spec.name, value: spec.value});
                } else {
                    const id_valuespec = await addvaluespec(spec.name, spec.value);
                    if (typeof id_valuespec === "undefined") {
                        res.status(500).json({ message: "Ошибка сервера при добавлении нового значения характеристики" });
                        return;
                    }

                    specifications.push({name: spec.name, value: id_valuespec});
                }
            }

            const id_subcategoryspec = await addspec(id_subcategory, id_product);
        
            if (typeof id_subcategoryspec === "undefined") {
                res.status(500).json({ message: "Ошибка сервера при добавлении новых характеристик продукта" });
                return;
            }

            for( const specification of specifications){
                await updatespec(id_subcategory,specification,id_subcategoryspec);
            }

        }
    }

    res.json({ message: "Продукт успешно добавлен" });
})

export default addproductrouter;