import { Request, Response } from "express";
import { UserService } from "../service/userServices";
import { ProductService } from "../service/productService";
import { checkPassword } from "../hash";
import { lengthRange, checkRegPassword, checkDateOFBirth } from "../utils/regRestriction";
import { checkUsernameDuplicated } from "../utils/regRestriction02";
import { hashPassword } from "../guards";
import { Product } from "../model";

export class UserController {
  constructor(private userService: UserService, private ProductService: ProductService) {}

  login = async (req: Request, res: Response) => {
    const { username, password } = req.body;
    const foundUsers = await this.userService.getUser(username);
    const foundUser = foundUsers[0];

    if (!foundUser || !(await checkPassword(password, foundUser.password))) {
      res.status(401).json({ message: "Incorrect Username or Password" });
      return;
    }

    req.session["user"] = { id: foundUser.id, name: foundUser.name };

    res.status(200).json(req.session["user"]);
  };

  checkOnline = async (req: Request, res: Response) => {
    if (req.session["user"]) {
      res.status(200).json(req.session["user"]);
    }
    return;
  };

  logout = async (req: Request, res: Response) => {
    req.session?.destroy(() => {
      res.json("destroy");
    });
  };

  registration = async (req: Request, res: Response) => {
    const { name, password, date_of_birth, gender } = req.body;

    if (!name || !password || !date_of_birth || !gender) {
      res.status(400).json("未完成所有表格");
      return;
    }

    if (!lengthRange(name.length, 6, 15)) {
      res.status(401).json("帳號名稱不符規格");
      return;
    }

    if (!checkRegPassword(password)) {
      res.status(401).json("密碼不符規格");
      return;
    }

    if (!checkDateOFBirth(date_of_birth)) {
      res.status(406).json("年紀太少了");
      return;
    }

    if (!checkUsernameDuplicated(name)) {
      res.status(409).json("重覆帳號");
    }

    await this.userService.registration(
      req.body.name,
      await hashPassword(req.body.password),
      req.body.date_of_birth,
      req.body.gender,
      new Date()
    );

    res.status(200).json("成功了");
  };

  addedProductToCart = async (req: Request, res: Response) => {
    const productID = parseInt(req.params.aid);

    const selectedProducts: Product[] = await this.ProductService.getProductDetail(productID);

    for (let selectedProduct of selectedProducts) {
      await this.userService.addProductToCart(
        selectedProduct.product_name,
        selectedProduct.original_price_g,
        selectedProduct.description,
        selectedProduct.image,
        req.session["user"].id
      );
    }

    res.status(200).json("finish");
  };

  userHistory = async (req: Request, res: Response) => {
    let userId = req.session["user"].id;
    const cartProducts: Product[] = await this.userService.userPurchasingHistory(userId);
    if (cartProducts.length === 0) {
      res.json({ Message: "Your Cart is Empty " });
      return;
    }

    for (const products of cartProducts) {
      await this.ProductService.insertToHistory(
        products.product_name,
        products.original_price_g,
        products.description,
        products.image,
        req.session["user"].id
      );
    }

    //after payment , empty the cart with the user session

    const deleteCart = await this.ProductService.delProduct(userId);
    console.log(`${deleteCart} represents Successfully empty the cart_products `);
    res.json({ Message: "Payment is successful " });
  };

  purchaseProduct = async (req: Request, res: Response) => {
    let userId = req.session["user"].id;
    if (!userId) {
      res.status(400);
      return;
    }

    const purchasingProduct = await this.userService.userPurchasingHistory(userId);
    res.status(200).json(purchasingProduct);
  };

  cancelWishlistItem = async (req: Request, res: Response) => {
    let userId = req.session["user"].id;
    let getPid = parseInt(req.params.cid);
    const deleteItems = await this.userService.cancelWishlistItem(userId, getPid);
    res.status(200).json(deleteItems);
  };

  giveComment = async (req: Request, res: Response) => {
    const { content } = req.body;
    const productID = parseInt(req.params.cid);
    const insertedComment = await this.userService.giveCommentToProduct(
      content,
      new Date(),
      req.session["user"].id,
      productID,
      req.session["user"].name
    );
    res.json(insertedComment);
  };

  editComment = async (req: Request, res: Response) => {
    const { content, id } = req.body;
    const editedComment = await this.userService.editComment(content, id);

    res.json(editedComment);
  };

  likeProduct = async (req: Request, res: Response) => {
    let productId = parseInt(req.params.pid);

    const findMatch = await this.ProductService.getProductFromLike(productId);

    if (findMatch.length === 0 || findMatch == null) {
      const initLike = await this.userService.initLike(productId);
      res.status(200).json(initLike);
      return;
    }

    const createProductLike = await this.userService.givelike(productId);

    res.status(200).json(createProductLike);
  };

  cancelLike = async (req: Request, res: Response) => {
    let productId = parseInt(req.params.pid);
    const findMatch = await this.ProductService.getProductFromLike(productId);

    if (findMatch.length > 0) {
      const cancelLike = await this.userService.cancelLike(productId);
      res.status(200).json(cancelLike);

      return;
    }
  };
}
