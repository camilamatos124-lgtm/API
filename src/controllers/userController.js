import UserService from "../services/userService.js";

class UserController {
  static async register(req, res, next) {
    try {
      const usuario = await UserService.register(req.body);
      res.status(201).json(usuario);
    } catch (error) {
      next(error); // Encaminha para o seu tratamento de erros global
    }
  }

  static async login(req, res, next) {
    try {
      const { email, password } = req.body;
      const token = await UserService.login(email, password);
      res.status(200).json({ message: "Login bem-sucedido!", token });
    } catch (error) {
      next(error);
    }
  }
}

export default UserController;