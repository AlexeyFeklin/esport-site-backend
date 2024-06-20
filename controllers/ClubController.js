import ClubModel from './../models/Club.js';

export const getAll = async (req, res) => {
  try {
    const page = req.query.page;
    const limit = req.query.limit;
    const city = req.query.city;

    let query = {};
    if (city) {
      query = { city: city };
    }

    const clubs = await ClubModel.find(query)
      .skip((page - 1) * limit)
      .limit(limit)
      .exec();

    res.json(clubs);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Failed to get clubs with pagination' });
  }
};

export const getCountClubs = async (req, res) => {
  try {
    const city = req.query.city;

    let query = {};
    if (city) {
      query = { city: city };
    }

    const totalClubs = await ClubModel.countDocuments(query);

    res.json({ count: totalClubs });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: 'Failed to get total count of clubs',
    });
  }
};

export const getOne = async (req, res) => {
  try {
    const clubId = req.params.id;

    const club = await ClubModel.findById(clubId).exec();

    if (!club) {
      return res.status(404).json({
        message: 'Club not found',
      });
    }

    res.json(club);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: 'Failed to get club',
    });
  }
};

export const remove = async (req, res) => {
  try {
    const clubId = req.params.id;

    const club = await ClubModel.findByIdAndDelete(clubId).exec();

    if (!club) {
      return res.status(404).json({
        message: 'Club not found',
      });
    }

    res.json({
      success: true,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: 'Failed to delete club',
    });
  }
};

export const create = async (req, res) => {
  try {
    const doc = new ClubModel({
      title: req.body.title,
      address: req.body.address,
      city: req.body.city,
      previewPhoto: req.body.previewPhoto,
      text: req.body.text,
      usefulLinks: req.body.usefulLinks,
    });

    const club = await doc.save();

    res.json(club);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Error creating club' });
  }
};

export const update = async (req, res) => {
  try {
    const clubId = req.params.id;

    const updatedClub = await ClubModel.findOneAndUpdate(
      { _id: clubId },
      {
        title: req.body.title,
        address: req.body.address,
        city: req.body.city,
        previewPhoto: req.body.previewPhoto,
        text: req.body.text,
        usefulLinks: req.body.usefulLinks,
      },
      { new: true },
    );

    res.status(200).json(updatedClub);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const getAllClubsByCity = async (req, res) => {
  try {
    const city = req.query.city;

    const clubs = await ClubModel.find({ city: city }).exec();

    res.json(clubs);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Failed to get clubs by city' });
  }
};
