import TournamentModel from './../models/Tournament.js';

export const getAll = async (req, res) => {
  try {
    const page = req.query.page || 1;
    const limit = req.query.limit || 10;

    let query = {};

    if (req.query.city) {
      query.city = req.query.city;
    }

    if (req.query.format) {
      query.format = req.query.format;
    }

    if (req.query.status) {
      query.status = req.query.status;
    }

    if (req.query.entryFee) {
      const entryFeeValue = parseInt(req.query.entryFee);
      if (entryFeeValue > 0) {
        query.entryFee = { $gt: 0 };
      } else {
        query.entryFee = 0;
      }
    }

    const tournaments = await TournamentModel.find(query)
      .skip((page - 1) * limit)
      .limit(limit)
      .exec();

    res.json(tournaments);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Failed to get tournaments with pagination' });
  }
};

export const getCountTournaments = async (req, res) => {
  try {
    let query = {};

    if (req.query.city) {
      query.city = req.query.city;
    }

    if (req.query.format) {
      query.format = req.query.format;
    }

    if (req.query.status) {
      query.status = req.query.status;
    }

    if (req.query.entryFee) {
      const entryFeeValue = parseInt(req.query.entryFee);
      if (entryFeeValue > 0) {
        query.entryFee = { $gt: 0 };
      } else {
        query.entryFee = 0;
      }
    }

    const totalTournaments = await TournamentModel.countDocuments(query);

    res.json({ count: totalTournaments });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Failed to get total count of tournaments' });
  }
};

export const getOne = async (req, res) => {
  try {
    const tournamentId = req.params.id;

    const tournament = await TournamentModel.findById(tournamentId).exec();

    if (!tournament) {
      return res.status(404).json({
        message: 'Tournament not found',
      });
    }

    res.json(tournament);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Failed to get tournament' });
  }
};

export const remove = async (req, res) => {
  try {
    const tournamentId = req.params.id;

    const tournament = await TournamentModel.findByIdAndDelete(tournamentId).exec();

    if (!tournament) {
      return res.status(404).json({
        message: 'Tournament not found',
      });
    }

    res.json({
      success: true,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Failed to delete tournament' });
  }
};

export const create = async (req, res) => {
  try {
    const doc = new TournamentModel({
      createdBy: req.body.createdBy,
      title: req.body.title,
      previewPhoto: req.body.previewPhoto,
      text: req.body.text,
      date: req.body.date,
      location: req.body.location,
      format: req.body.format,
      teamLimit: req.body.teamLimit,
      entryFee: req.body.entryFee,
      prizePool: req.body.prizePool,
      status: req.body.status,
      city: req.body.city,
    });

    const tournament = await doc.save();

    res.json(tournament);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Error creating tournament' });
  }
};

export const update = async (req, res) => {
  try {
    const tournamentId = req.params.id;

    const updatedTournament = await TournamentModel.findOneAndUpdate(
      { _id: tournamentId },
      {
        createdBy: req.body.createdBy,
        title: req.body.title,
        previewPhoto: req.body.previewPhoto,
        text: req.body.text,
        date: req.body.date,
        location: req.body.location,
        format: req.body.format,
        teamLimit: req.body.teamLimit,
        entryFee: req.body.entryFee,
        prizePool: req.body.prizePool,
        status: req.body.status,
        city: req.body.city,
      },
      { new: true }, // Returns the updated document
    );

    res.status(200).json(updatedTournament);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const getAllByCreator = async (req, res) => {
  try {
    const createdBy = req.query.id;

    const tournaments = await TournamentModel.find({ createdBy: createdBy }).exec();

    res.json(tournaments);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Failed to get tournaments by creator' });
  }
};

export const updateStatus = async (req, res) => {
  try {
    const tournamentId = req.body.id;

    const updatedTournament = await TournamentModel.findOneAndUpdate(
      { _id: tournamentId },
      {
        status: req.body.status,
      },
      { new: true }, // Returns the updated document
    );

    res.status(200).json(updatedTournament);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
