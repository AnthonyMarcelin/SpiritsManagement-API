export default function requireAdmin(req, res, next) {
  console.log('[ADMIN] requireAdmin - req.user:', req.user);
  if (!req.user?.isAdmin) {
    return res.status(403).json({ error: "Restricted to admin" });
  }
  next();
}
