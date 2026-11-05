module.exports = {
  up: async ({ context: queryInterface }) => {
    // Remove duplicate pairs first, in case earlier tests created them.
    await queryInterface.sequelize.query(`
      DELETE FROM readinglists AS first
      USING readinglists AS duplicate
      WHERE first.id > duplicate.id
        AND first.user_id = duplicate.user_id
        AND first.blog_id = duplicate.blog_id
    `)

    await queryInterface.addIndex(
      'readinglists',
      ['user_id', 'blog_id'],
      {
        unique: true,
        name: 'readinglists_user_id_blog_id_unique',
      }
    )
  },

  down: async ({ context: queryInterface }) => {
    await queryInterface.removeIndex(
      'readinglists',
      'readinglists_user_id_blog_id_unique'
    )
  },
}