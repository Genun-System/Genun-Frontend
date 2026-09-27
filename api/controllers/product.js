const multer = require('multer');

const cloudinary = require('cloudinary').v2;

const Product = require('../models/productSchema');

const Authenticated = require('../models/authenticated');

const Category = require('../models/category');

const _ = require('lodash');

const geoip = require('geoip-lite');


const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + '-' + file.originalname);
  }
});

const upload = multer({ storage: storage }).single('imageUrl');



exports.createProduct = async (req, res, next) => {
  try {
    upload(req, res, async (err) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ message: 'Error uploading file' });
      }

      const result = await cloudinary.uploader.upload(req.file.path, {
        resource_type: 'image'
      });

      const timestamp = new Date().getTime();
      const randomNumber = Math.floor(Math.random() * 9000) + 1000;
      const numericId = parseInt(timestamp.toString() + randomNumber.toString());

      const product = new Product({
        productId: numericId, 
        name: req.body.name,
        description: req.body.description,
        nafdacId: req.body.nafdacId,
        quantity: req.body.quantity,
        expiryDate: req.body.expiryDate,
        barcode: req.body.barcode,
        category: req.body.category,
        manufacturer: req.user.userId,
        imageUrl: result.secure_url,
        batchId: req.body.batchId ? Number(req.body.batchId) : undefined,
      });

      await product.save();

      const { _id, category, ...productWithoutIdAndCategory } = product.toObject();

      await Category.findOneAndUpdate(
        { _id: category },
        { $push: { products: product.productId} },
        { new: true }
      );

      res.status(201).json({ message: 'Product created successfully', product: productWithoutIdAndCategory });
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};


exports.getProduct = async (req, res, next) => {
  try {
    const productId = req.params.productId;
    console.log("Req --> ", req.ip)
    const ip = req.ip;
    const geo = geoip.lookup(ip);
    const location = geo ? `${geo.city}, ${geo.region}, ${geo.country}` : 'Unknown Location';

    // Atomically find the product and increment its scan count
    const product = await Product.findOneAndUpdate(
      { productId: productId },
      { $inc: { scanCount: 1 } }, // Assuming 'scanCount' field exists in your Product schema
      { new: true }
    ).populate({
        path: 'manufacturer',
        select: 'name stellarAddress'
      });

    const conFig = require('../configure');

    if (!product) {
      try {
        const authenticatedProduct = new Authenticated({
          product: 'Unknown',
          productId: productId,
          requester: req.headers['user-agent'] || 'unknown',
          status: 'failed',
          manufacturer: undefined,
        });
        // Skip save when required fields missing — avoid 500 on failed scans
        await authenticatedProduct.save().catch(() => {});
      } catch (_) {}
      return res.status(404).json({ message: 'Product not found' });
    }

    const authenticatedProduct = new Authenticated({
      product: product.name,
      productId: productId,
      requester: req.headers['user-agent'],
      status: 'passed',
      manufacturer: product.manufacturer._id,
    });
    await authenticatedProduct.save();

    const productObj = product.toObject();
    res.status(200).json({
      message: 'Product found',
      product: productObj,
      contractId: conFig.genunContractId,
      stellarAddress: product.manufacturer?.stellarAddress || null,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};



exports.getCategories = async (req, res, next) => {
  try {
    const manufacturerId = req.user.userId; 

    const categories = await Category.find({ manufacturer:manufacturerId });

    res.status(200).json({ message: 'Categories retrieved', categories: categories });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

exports.getCategoriesFromProduct = async (req, res, next) => {
  try {
    const manufacturerId = req.user.userId;

    const products = await Product.find({ manufacturer: manufacturerId }).select('category');

    const categoryIds = [...new Set(products.map(product => product.category))];

    const categories = await Category.find({ _id: { $in: categoryIds } });

    for (let category of categories) {
      category.products = await Product.find({ category: category._id });
    }

    res.status(200).json({ message: 'Categories retrieved', categories: categories });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};



exports.createCategory = async (req, res, next) => {
  const manufacturerId = req.user.userId; 
  try {
    const categoryName = req.body.name;
    const category = await Category.findOne({ name: categoryName  });

    if (category) {
        const error = new Error('Category already exists.');
        error.statusCode = 422;
        throw error;
    }

    
    const newCategory = new Category({
      name:req.body?.name,
      description:req.body?.description,
      manufacturer:manufacturerId
    });
    const result = await newCategory.save();

    const pickedCategory = _.pick(result, ['_id', 'name', 'description']);
    res.status(201).json({ 
        message: "Category created successfully",
        user: pickedCategory
    });
} catch (err) {
    if (!err.statusCode) {
        console.log(err.message);
        err.statusCode = 500;
    }
    next(err);
}
}


exports.getAuthenticatedProducts = async (req, res, next) => {
  try {
    const manufacturerId = req.user.userId; 

    const authenticatedProducts = await Authenticated.find({ manufacturer: manufacturerId })
    
    res.status(200).json({ message: 'Authenticated products retrieved', products: authenticatedProducts });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};


exports.getManufacturerStats = async (req, res, next) => {
  try {
    const manufacturerId = req.user.userId;

    const productCount = await Product.countDocuments({ manufacturer: manufacturerId });
    const categoryCount = await Category.countDocuments({ manufacturer: manufacturerId });
    const authCount = await Authenticated.countDocuments({ manufacturer: manufacturerId });

    res.status(200).json({
      message: 'Manufacturer statistics retrieved',
      productCount: productCount,
      categoryCount: categoryCount,
      authCount: authCount,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};


exports.getManufacturerProducts = async (req, res, next) => {
  try {
    const manufacturerId = req.user.userId; 

    const products = await Product.find({ manufacturer: manufacturerId });

    res.status(200).json({ message: 'Manufacturer products retrieved', products: products });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
