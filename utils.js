function isAdmin(participants, sender) {
  const user = participants.find(p => p.id === sender)
  return user?.admin === 'admin' || user?.admin === 'superadmin'
}

module.exports = {
  isAdmin,
}

