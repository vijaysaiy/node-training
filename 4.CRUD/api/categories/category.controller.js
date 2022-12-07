import * as categoryService from "./category.service.js"


export const createCategory = async (req,res) => {
    const newCategory = await categoryService.createCategory(req.body)
    res.json({status:"success",data:newCategory})
}

export const findByName = async (req,res) => {
    const category = await categoryService.findByName(req.param.name)
    res.json({status:"success",data:category})
}