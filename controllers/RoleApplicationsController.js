import RoleApplicationModel from './../models/RoleApplication.js';

export const getAll = async (req, res) => {
  try {
    const roleApplications = await RoleApplicationModel.find().exec();
    res.json(roleApplications);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Не удалось получить заявки на роль' });
  }
};

export const getOne = async (req, res) => {
  try {
    const roleApplicationId = req.params.id;

    const roleApplication = await RoleApplicationModel.findById(roleApplicationId).exec();

    if (!roleApplication) {
      return res.status(404).json({
        message: 'Заявка на роль не найдена',
      });
    }

    res.json(roleApplication);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Не удалось получить заявку на роль' });
  }
};

export const remove = async (req, res) => {
  try {
    const roleApplicationId = req.params.id;

    const roleApplication = await RoleApplicationModel.findByIdAndDelete(roleApplicationId).exec();

    if (!roleApplication) {
      return res.status(404).json({
        message: 'Заявка на роль не найдена',
      });
    }

    res.json({
      success: true,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Не удалось удалить заявку на роль' });
  }
};

export const create = async (req, res) => {
  try {
    const doc = new RoleApplicationModel({
      userId: req.body.userId,
      desiredRole: req.body.desiredRole,
      reason: req.body.reason,
      experience: req.body.experience,
      achievements: req.body.achievements,
    });

    // Устанавливаем статус "Pending" при создании заявки
    doc.status = 'Pending';

    const roleApplication = await doc.save();

    res.json(roleApplication);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Ошибка при создании заявки на роль' });
  }
};

export const update = async (req, res) => {
  try {
    const roleApplicationId = req.params.id;

    const updatedRoleApplication = await RoleApplicationModel.findOneAndUpdate(
      { _id: roleApplicationId },
      {
        userId: req.body.userId,
        desiredRole: req.body.desiredRole,
        reason: req.body.reason,
        experience: req.body.experience,
        achievements: req.body.achievements,
      },
      { new: true }, // Возвращает обновленный документ
    );

    res.status(200).json(updatedRoleApplication);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const updateStatus = async (req, res) => {
  try {
    const roleApplicationId = req.params.id;
    const newStatus = req.body.status;

    const roleApplication = await RoleApplicationModel.findByIdAndUpdate(
      roleApplicationId,
      { status: newStatus },
      { new: true },
    ).exec();

    if (!roleApplication) {
      return res.status(404).json({
        message: 'Заявка на роль не найдена',
      });
    }

    res.status(200).json(roleApplication);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Ошибка при обновлении статуса заявки на роль' });
  }
};
