import User from "../models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

class UserService {
  // REGISTRAR NOVO USUÁRIO
  static async register(dadosUser) {
    const { nome, email, password, role } = dadosUser;

    // 1. Verifica se o e-mail já existe no MongoDB
    const usuarioExiste = await User.findOne({ email });
    if (usuarioExiste) {
      const error = new Error("Este e-mail já está em uso.");
      error.statusCode = 409;
      throw error;
    }

    // 2. CRIPTOGRAFIA (Hashing): Transforma a senha em texto limpo em um hash seguro
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // 3. Salva no banco de dados na nuvem
    const novoUsuario = await User.create({
      nome,
      email,
      password: hashedPassword, // Salva a senha criptografada!
      role: role || "user" // Se não passar papel, vira "user" comum
    });

    // Remove a senha do objeto de retorno por segurança
    const userOutput = novoUsuario.toObject();
    delete userOutput.password;

    return userOutput;
  }

  // LOGAR USUÁRIO
  static async login(email, password) {
    // 1. Busca o usuário pelo e-mail
    const user = await User.findOne({ email });
    if (!user) {
      const error = new Error("Credenciais inválidas.");
      error.statusCode = 401;
      throw error;
    }

    // 2. COMPARAÇÃO COM BCRYPT: Compara o texto limpo com o hash do banco
    const senhaValida = await bcrypt.compare(password, user.password);
    if (!senhaValida) {
      const error = new Error("Credenciais inválidas.");
      error.statusCode = 401;
      throw error;
    }

    // 3. Gera o Token JWT incluindo o ID e a Role para o RBAC
    const payload = { id: user._id, nome: user.nome, role: user.role };
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "1h"
    });

    return token;
  }
}

export default UserService;