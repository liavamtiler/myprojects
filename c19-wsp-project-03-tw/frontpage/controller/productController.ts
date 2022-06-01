import { ProductService } from "../service/productService";
import { Request, Response } from "express";


export class ProductController {
  constructor(private productService: ProductService ) {}

  searchingProduct = async (req: Request, res: Response) => {
    const searchThing:string|number = req.params.sid;

    console.log(searchThing);

    const serchedResult = await this.productService.searchProduct(searchThing)

    console.log(serchedResult);

    res.json(serchedResult);
  };

  getHitProduct = async(req: Request, res: Response) =>{
    const hitProduct = await this.productService.getHitProduct()

    res.json(hitProduct);
  }

  getProductDetail = async (req: Request, res: Response) =>{
    const product_id = parseInt(req.params.did)
    const productDetails =  await this.productService.getProductDetail(product_id)

    res.json(productDetails);
  }

  sortProduct =  async (req: Request, res: Response) => {

    const wholeSheet=await this.productService.sortProduct()
    console.log(wholeSheet)
    res.json(wholeSheet)
  }

  showCartLength = async(req: Request,res: Response)=>{
    let userId=req.session['user'].id

    const numberOFProductsInCart= await this.productService.showProductLength(userId)

    res.json(numberOFProductsInCart)

  }

  productsold = async(req: Request,res: Response)=>{
    let getPid=req.params.pid
    const updateProductSold = await this.productService.productSold(getPid)
    console.log(updateProductSold)
    res.json(updateProductSold)

  }

  showPurchasedProduct = async(req: Request,res: Response)=>{
    let userId=req.session['user'].id
    const getRecord= await this.productService.showHistory(userId)
    res.json(getRecord)

 }

 showComment =async(req: Request,res: Response)=>{

  let productID = parseInt(req.params.cid)
  const productComment =await this.productService.getComment(productID);
  res.status(200).json(productComment);

  }

  checkCommentUser = async(req: Request,res: Response)=>{
    let userId=req.session['user'].id
    const checkComment = await this.productService.checkCommentUser(userId);
    
    res.status(200).json(checkComment)

  }

  showLikeNumber = async(req: Request,res: Response)=>{

    let productID = parseInt(req.params.pid)
    const totalLike =  await this.productService.getAllike(productID)
    // console.log(totalLike)
    res.status(200).json(totalLike)

  }


  


}
