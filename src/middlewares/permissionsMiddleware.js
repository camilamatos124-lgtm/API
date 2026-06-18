export const checkRole = (rolesPermitidas) => {
  return (req, res, next) => {
    // Pega a role enviada no Header da requisição (ex: role: admin)
    const userRole = req.headers['role']; 

    if (!userRole) {
      return res.status(401).json({ message: "Não autorizado. Role não informada no Header." });
    }

    if (!rolesPermitidas.includes(userRole)) {
      return res.status(403).json({ 
        message: "Acesso proibido. Você não tem a role necessária." 
      });
    }

    next();
  };
};