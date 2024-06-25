import NewsModel from './../models/News.js';

export const getAllNews = async (req, res) => {
  try {
    const category = req.query.category;
    const page = req.query.page || 1;
    const limit = req.query.limit || 10;

    let query = {};

    if (category && category !== '0') {
      query = { category: category };
    }

    const news = await NewsModel.find(query)
      .sort({ date: -1 })
      .skip((page - 1) * limit)
      .limit(limit)
      .exec();

    res.json(news);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Failed to get news with pagination and category' });
  }
};

export const getTotalNewsCount = async (req, res) => {
  try {
    const category = req.query.category;

    let query = {};

    if (category && category !== '0') {
      query = { category: category };
    }

    const totalNewsCount = await NewsModel.countDocuments(query);
    res.json({ totalNewsCount });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Failed to get total news count' });
  }
};

export const getOne = async (req, res) => {
  try {
    const newsId = req.params.id;

    const news = await NewsModel.findById(newsId).exec();

    if (!news) {
      return res.status(404).json({
        message: 'Новость не найден',
      });
    }

    res.json(news);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: 'Не удалось получить новость',
    });
  }
};

export const remove = async (req, res) => {
  try {
    const newsId = req.params.id;

    const news = await NewsModel.findByIdAndDelete(newsId).exec();

    if (!news) {
      return res.status(404).json({
        message: 'Новость не найдена',
      });
    }

    res.json({
      success: true,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: 'Не удалось удалить новость',
    });
  }
};

export const create = async (req, res) => {
  try {
    const doc = new NewsModel({
      userId: req.body.userId,
      title: req.body.title,
      previewPhoto: req.body.previewPhoto,
      text: req.body.text,
      category: req.body.category,
    });

    const news = await doc.save();

    res.json(news);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Ошибка при создании новости' });
  }
};

export const getAllWithPagination = async (req, res) => {
  try {
    const page = req.query.page || 1;
    const limit = req.query.limit || 10;

    const news = await NewsModel.find()
      .skip((page - 1) * limit)
      .limit(limit)
      .exec();

    res.json(news);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: 'Не удалось получить новости с пагинацией',
    });
  }
};

export const update = async (req, res) => {
  try {
    const newsId = req.params.id;

    const updatedNews = await NewsModel.findOneAndUpdate(
      { _id: newsId },
      {
        userId: req.body.userId,
        title: req.body.title,
        previewPhoto: req.body.previewPhoto,
        text: req.body.text,
        category: req.body.category,
      },
      { new: true }, // Возвращает обновленный документ
    );

    res.status(200).json(updatedNews);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// export const search = async (req, res) => {
//   try {
//     const searchValue = req.params.title;

//     const regex = new RegExp(searchValue, 'i'); // 'i' означает, что поиск нечувствителен к регистру

//     let products = await ProductModel.find({ title: { $regex: regex } });

//     res.json(products);
//   } catch (err) {
//     console.log(err);
//     res.status(500).json({
//       message: 'Не удалось найти продукт',
//     });
//   }
// };

export const category = async (req, res) => {
  try {
    const categoryValue = req.params.category;

    let news = await NewsModel.find({ category: categoryValue });

    res.json(news);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: 'Не удалось найти новость по категории',
    });
  }
};
