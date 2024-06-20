import mongoose from 'mongoose';
import express from 'express';
import cors from 'cors';
import {
  clubCreateValidation,
  commentCreateValidation,
  commentLikeValidation,
  loginValidation,
  newsCreateValidation,
  registerValidation,
  roleApplicationCreateValidation,
  tournamentCreateValidation,
} from './validations.js';
import {
  ClubController,
  CommentController,
  NewsController,
  RoleApplicationController,
  TeamController,
  TournamentController,
  UserController,
  defaultSetteingsController,
} from './controllers/index.js';
import checkAuth from './utils/checkAuth.js';
import multer from 'multer';
import Tournament from './models/Tournament.js';
mongoose
  .connect(
    process.env.MONGODB_URI,
  )
  .then(() => {
    console.log('DataBase connected!');
  })
  .catch((err) => {
    console.log('ERROR: ', err);
  });

const app = express();

app.use(express.json());
app.use(cors());

const storageNews = multer.diskStorage({
  destination: (_, __, cb) => {
    cb(null, 'uploads/news');
  },
  filename: (_, file, cb) => {
    cb(null, file.originalname);
  },
});

const uploadNews = multer({ storage: storageNews });

app.post('/upload/news', checkAuth, uploadNews.single('image'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No file uploaded' });
  }

  res.json({
    url: `/uploads/news/${req.file.originalname}`,
  });
});

const storageClub = multer.diskStorage({
  destination: (_, __, cb) => {
    cb(null, 'uploads/clubs');
  },
  filename: (_, file, cb) => {
    cb(null, file.originalname);
  },
});

const uploadClubs = multer({ storage: storageClub });

app.post('/upload/clubs', checkAuth, uploadClubs.single('image'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No file uploaded' });
  }

  res.json({
    url: `/uploads/clubs/${req.file.originalname}`,
  });
});

const storageTournaments = multer.diskStorage({
  destination: (_, __, cb) => {
    cb(null, 'uploads/tournaments');
  },
  filename: (_, file, cb) => {
    cb(null, file.originalname);
  },
});

const uploadTournaments = multer({ storage: storageTournaments });

app.post('/upload/tournaments', checkAuth, uploadTournaments.single('image'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No file uploaded' });
  }

  res.json({
    url: `/uploads/tournaments/${req.file.originalname}`,
  });
});

const storageUsers = multer.diskStorage({
  destination: (_, __, cb) => {
    cb(null, 'uploads/users');
  },
  filename: (_, file, cb) => {
    cb(null, file.originalname);
  },
});

const uploadUsers = multer({ storage: storageUsers });

app.post('/upload/users', checkAuth, uploadUsers.single('image'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No file uploaded' });
  }

  res.json({
    url: `/uploads/users/${req.file.originalname}`,
  });
});

app.post('/createdefualtsRole', defaultSetteingsController.createRoles);

app.use('/uploads/news', express.static('uploads/news'));
app.use('/uploads/tournaments', express.static('uploads/tournaments'));
app.use('/uploads/clubs', express.static('uploads/clubs'));
app.use('/uploads/users', express.static('uploads/users'));

app.post('/auth/login', loginValidation, UserController.login);
app.post('/auth/register', registerValidation, UserController.register);
app.patch('/auth/change', checkAuth, UserController.update);
app.get('/auth/me', checkAuth, UserController.getMe);
app.get('/auth/search', UserController.searchUsers);
app.get('/auth/:id', UserController.getUserById);
app.patch('/auth/changeRole/:id', UserController.changeUserRole);

app.get('/news', NewsController.getAllNews);
app.get('/news/totalcount', NewsController.getTotalNewsCount);
// app.get('/news/search/:title', ProductController.search);
// app.get('/news', NewsController.getAllWithPagination);
// app.get('/news/category/:category', NewsController.category);
app.get('/news/:id', NewsController.getOne);
app.post('/news', checkAuth, newsCreateValidation, NewsController.create);
app.delete('/news/:id', checkAuth, NewsController.remove);
app.patch('/news/:id', checkAuth, newsCreateValidation, NewsController.update);

app.get('/clubs', ClubController.getAll);
app.get('/clubsByCity', ClubController.getAllClubsByCity);
app.get('/clubs/totalCount', ClubController.getCountClubs);
// app.get('/news/search/:title', ProductController.search);
app.get('/clubs/:id', ClubController.getOne);
app.post('/clubs', checkAuth, clubCreateValidation, ClubController.create);
app.delete('/clubs/:id', checkAuth, ClubController.remove);
app.patch('/clubs/:id', checkAuth, clubCreateValidation, ClubController.update);

app.get('/tournaments', TournamentController.getAll);
app.get('/tournaments/totalCount', TournamentController.getCountTournaments);
app.post('/tournaments/updateStatus', TournamentController.updateStatus);
// app.get('/news/search/:title', ProductController.search);
app.get('/tournaments/:id', TournamentController.getOne);
app.post('/tournaments', checkAuth, tournamentCreateValidation, TournamentController.create);
app.delete('/tournaments/:id', checkAuth, TournamentController.remove);
app.patch('/tournaments/:id', checkAuth, tournamentCreateValidation, TournamentController.update);
app.get('/tournamentsBy/', TournamentController.getAllByCreator);

app.get('/roleApplications', RoleApplicationController.getAll);
// app.get('/news/search/:title', ProductController.search);
app.get('/roleApplications/:id', RoleApplicationController.getOne);
app.delete('/roleApplications/:id', checkAuth, RoleApplicationController.remove);
app.post(
  '/roleApplications',
  checkAuth,
  roleApplicationCreateValidation,
  RoleApplicationController.create,
);
app.post(
  '/roleApplications/:id',
  checkAuth,
  roleApplicationCreateValidation,
  RoleApplicationController.updateStatus,
);
app.patch(
  '/roleApplications/:id',
  checkAuth,
  clubCreateValidation,
  RoleApplicationController.update,
);

app.get('/commentsAll', CommentController.getAllComments);
app.delete('/commentRemove', CommentController.deleteComment);
app.get('/commentsSearch', CommentController.searchComments);
app.post('/comments', checkAuth, commentCreateValidation, CommentController.createComment);
app.get('/comments/:target/:targetId', CommentController.getCommentsByTarget);
app.get('/comments/:commentId', CommentController.getCommentById);
app.patch(
  '/comments/likes/:commentId',
  checkAuth,
  commentLikeValidation,
  CommentController.updateLikes,
);

app.post('/teams', checkAuth, TeamController.createTeam);
app.get('/teams/tournament/:tournamentId', TeamController.getTeamsByTournament);
app.post('/teams/addMember', checkAuth, TeamController.addMemberToTeam);
app.post('/teams/removeMember', checkAuth, TeamController.removeMemberFromTeam);

app.listen(process.env.PORT || 4444, (err) => {
  if (err) {
    console.log(err);
  }
  console.log('LocalServer OK');
});

async function checkTournamentStatus() {
  const currentDate = new Date();

  try {
    const tournaments = await Tournament.find({ status: 0, date: { $lte: currentDate } }).exec();

    tournaments.forEach(async (tournament) => {
      tournament.status = 1;
      await tournament.save();
    });
  } catch (error) {
    console.log(error);
  }
}

// Call the function immediately to check for any tournaments that need status update
checkTournamentStatus();

// Call the function every 10 seconds to continuously check for tournaments
setInterval(checkTournamentStatus, 10000);
