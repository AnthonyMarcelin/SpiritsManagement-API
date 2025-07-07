export default function requireAdmin(req, res, next) {
  if (!req.user?.isAdmin) {
    return res.status(403).json({ error: "Restricted to admin" });
  }
  next();
}
