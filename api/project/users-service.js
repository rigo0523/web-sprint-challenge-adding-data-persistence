module.exports = {
  isValid,
};

function isValid(user) {
  return Boolean(
    user.project_completed && typeof user.project_completed === Number("0")
  );
}
