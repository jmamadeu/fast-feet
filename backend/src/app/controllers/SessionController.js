module.exports = {
  async store(req, res) {
    const { email, password } = req.body;

    return res.status().json({
      ok: true
    });
  }
};
