module.exports = {
  development: {
      client: 'sqlite3',
      connection: {
          filename: './data/projects.db3',
      },
      useNullAsDefault: true,
      debug: true,
      migrations: {
          directory: './data/migrations'
      },
      seeds: {
          directory: './data/seeds'
      }
  },
}
