import Role from '../models/Role.js';

export const createRoles = async (req, res) => {
  try {
    // Создаем роли
    const rolesToCreate = ['Пользователь', 'Игрок', 'Комментатор', 'Организатор', 'Модератор'];

    for (const roleName of rolesToCreate) {
      const existingRole = await Role.findOne({ role: roleName });
      if (!existingRole) {
        const newRole = new Role({ role: roleName });
        await newRole.save();
      }
    }

    res.status(200).json({
      message: 'Роли успешно созданы',
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: 'Не удалось создать роли',
    });
  }
};
