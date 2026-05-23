import Product from "../models/Product.js";


// CREATE PRODUCT
export const createProduct =
  async (req, res) => {

    try {

      const {
        userId,
        image,
        name,
        description,
        price,
      } = req.body;

      const product =
        await Product.create({

          userId,

          image,

          name,

          description,

          price,
        });

      res.status(201).json(
        product
      );

    } catch (error) {

      res.status(500).json({

        message:
          error.message,
      });
    }
  };


// GET USER PRODUCTS
export const getUserProducts =
  async (req, res) => {

    try {

      const products =
        await Product.find({

          userId:
            req.params.userId,

          isActive: true,
        }).sort({
          createdAt: -1,
        });

      res.status(200).json(
        products
      );

    } catch (error) {

      res.status(500).json({

        message:
          error.message,
      });
    }
  };


// GET SINGLE PRODUCT
export const getSingleProduct =
  async (req, res) => {

    try {

      const product =
        await Product.findById(
          req.params.id
        );

      if (!product) {

        return res.status(404).json({
          message:
            "Product not found",
        });
      }

      res.status(200).json(
        product
      );

    } catch (error) {

      res.status(500).json({

        message:
          error.message,
      });
    }
  };


// UPDATE PRODUCT
export const updateProduct =
  async (req, res) => {

    try {

      const updatedProduct =
        await Product.findByIdAndUpdate(

          req.params.id,

          req.body,

          {
            new: true,
          }
        );

      if (!updatedProduct) {

        return res.status(404).json({
          message:
            "Product not found",
        });
      }

      res.status(200).json(
        updatedProduct
      );

    } catch (error) {

      res.status(500).json({

        message:
          error.message,
      });
    }
  };


// DELETE PRODUCT
export const deleteProduct =
  async (req, res) => {

    try {

      const deletedProduct =
        await Product.findByIdAndDelete(
          req.params.id
        );

      if (!deletedProduct) {

        return res.status(404).json({
          message:
            "Product not found",
        });
      }

      res.status(200).json({
        message:
          "Product deleted successfully",
      });

    } catch (error) {

      res.status(500).json({

        message:
          error.message,
      });
    }
  };