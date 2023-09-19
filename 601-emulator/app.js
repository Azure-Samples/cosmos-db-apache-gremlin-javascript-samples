// <imports>
import gremlin from 'gremlin'
// </imports>

// <client>
const credentials = new gremlin.driver.auth.PlainTextSaslAuthenticator(
  '/dbs/db1/colls/coll1',
  'C2y6yDjf5/R+ob0N8A7Cgv30VRDJIWEHLM+4QDU5DE2nQ9nDuVTqobD4b8mGGyPMbIZnqyMsEcaGQy67XIw/Jw=='
)

const client = new gremlin.driver.Client(
  'ws://localhost:8901/',
  {
    credentials,
    traversalsource: 'g',
    rejectUnauthorized: false,
    mimeType: 'application/vnd.gremlin-v2.0+json'
  }
)

client.open()
// </client>

// <graph>
await client.submit('g.V().drop()')
// </graph>

// <insert>
await client.submit(
  'g.addV(\'product\').property(\'id\', prop_id).property(\'name\', prop_name)', {
    prop_id: '68719518371',
    prop_name: 'Kiama classic surfboard'
  }
)
// </insert>

process.exit()
