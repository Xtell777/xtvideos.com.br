const auth = require('../middleware/auth');

// Exemplo de rota protegida
router.get('/profile', auth, async (req, res) => {
    const user = await User.findById(req.user.id).select('-password');
    res.json(user);
});
