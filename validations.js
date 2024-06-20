import { body } from 'express-validator';

export const registerValidation = [
  body('email', 'Неверный формат почты').isEmail(),
  body('password', 'Пароль должен быть минимум 8 символов').isLength({ min: 8 }), // Изменили минимальную длину на 8 символов
];

export const loginValidation = [
  body('email', 'Неверный формат почты').isEmail(),
  body('password', 'Пароль должен быть минимум 8 символов').isLength({ min: 8 }),
];

export const newsCreateValidation = [
  body('title', 'Укажите название новости').isLength({ min: 3, max: 52 }),
  body('text', 'Укажите текст новости').isLength({ min: 250, max: 10000 }),
  body('category', 'Укажите категорию новости').isNumeric(),
  body('previewPhoto', 'Укажите ссылку на превью новости').isURL(),
];

export const clubCreateValidation = [
  body('title', 'Укажите название клуб (от 3 до 30').isLength({ min: 3, max: 30 }),
  body('text', 'Укажите опсиание клуба (от 50 до 10000').isLength({ min: 50, max: 10000 }),
  body('address', 'Укажите адресс (от 3 до 40)').isLength({ min: 3, max: 40 }),
  body('city', 'Укажите категорию новости').isNumeric(),
  body('previewPhoto', 'Укажите ссылку на превью новости').isURL(),
];

export const tournamentCreateValidation = [
  body('title', 'Укажите название турнира (от 3 до 30').isLength({ min: 3, max: 30 }),
  body('text', 'Укажите опсиание турнира (от 50 до 10000').isLength({ min: 50, max: 10000 }),
  body('Date', 'Укажите дату турнира').isDate(),
  body('format', 'Укажите формат турнира').isNumeric(),
  body('teamLimit', 'Укажите ограничение по командам турнира').isNumeric(),
  body('entryFee', 'Укажите взнос турнира').isNumeric(),
  body('prizePool', 'Укажите призовой фонд турнира').isNumeric(),
  body('status', 'Укажите статус турнира').isNumeric(),
  body('previewPhoto', 'Укажите ссылку на превью новости').isURL(),
];

export const roleApplicationCreateValidation = [
  body('reason', 'Укажите причину получения желаемой роли (от 5 до 500').isLength({
    min: 5,
    max: 500,
  }),
  body('experience', 'Укажите ваш опыт для получения желаемой рли (от 5 до 1000').isLength({
    min: 5,
    max: 1000,
  }),
  body('achievements', 'Укажите дату турнира').isLength({ max: 1000 }),
];

export const commentCreateValidation = [
  body('text', 'Текст комментария обязателен').isLength({ min: 1 }),
];

export const commentReplyValidation = [
  body('text', 'Текст ответа на комментарий обязателен').isLength({ min: 1 }),
];

export const commentLikeValidation = [
  body('likeType', 'Тип лайка должен быть указан').isIn(['like', 'dislike']),
];

export const commentUpdateValidation = [
  body('text', 'Текст комментария обязателен').isLength({ min: 1 }),
];

export const commentDeleteValidation = [
  body('commentId', 'Идентификатор комментария обязателен').isMongoId(),
];
