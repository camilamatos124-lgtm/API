export const checkRole = (rolesPermitidas) => {
  return (req, res, next) => {
    // 1. Garante que o authMiddleware rodou antes e colocou o usuário na requisição
    if (!req.user) {
      return res.status(401).json({ message: "Não autorizado. Usuário não identificado." });
    }

    // 2. Verifica se a role do usuário (vinda do JWT) está na lista de permissões
    if (!rolesPermitidas.includes(req.user.role)) {
      return res.status(403).json({ 
        message: "Acesso proibido. Você não tem permissão para acessar este recurso." 
      });
    }

    // Se estiver tudo OK, deixa ir para o Controller
    next();
  };
};