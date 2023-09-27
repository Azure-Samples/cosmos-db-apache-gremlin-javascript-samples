// <imports>
import gremlin from 'gremlin'
// </imports>

// <environment_variables>
const accountName = process.env.COSMOS_GREMLIN_ENDPOINT
const accountKey = process.env.COSMOS_GREMLIN_KEY
// </environment_variables>

// <authenticate_client>
const credentials = new gremlin.driver.auth.PlainTextSaslAuthenticator(
  '/dbs/cosmicworks/colls/products',
  `${accountKey}`
)
// </authenticate_client>

// <connect_client>
const client = new gremlin.driver.Client(
  `wss://${accountName}.gremlin.cosmos.azure.com:443/`,
  {
    credentials,
    traversalsource: 'g',
    rejectUnauthorized: true,
    mimeType: 'application/vnd.gremlin-v2.0+json'
  }
)

client.open()
// </connect_client>

// <drop_graph>
await client.submit('g.V().drop()')
// </drop_graph>

// <create_vertices_1>
await client.submit(
  'g.addV(\'product\').property(\'id\', prop_id).property(\'name\', prop_name).property(\'price\', prop_price).property(\'category\', prop_partition_key)', {
    prop_id: '68719518371',
    prop_name: 'Kiama classic surfboard',
    prop_price: 285.55,
    prop_partition_key: 'surfboards'
  }
)
// </create_vertices_1>

// <create_vertices_2>
await client.submit(
  'g.addV(\'product\').property(\'id\', prop_id).property(\'name\', prop_name).property(\'price\', prop_price).property(\'category\', prop_partition_key)', {
    prop_id: '68719518403',
    prop_name: 'Montau Turtle Surfboard',
    prop_price: 600.00,
    prop_partition_key: 'surfboards'
  }
)
// </create_vertices_2>

// <create_vertices_3>
await client.submit(
  'g.addV(\'product\').property(\'id\', prop_id).property(\'name\', prop_name).property(\'price\', prop_price).property(\'category\', prop_partition_key)', {
    prop_id: '68719518409',
    prop_name: 'Bondi Twin Surfboard',
    prop_price: 585.50,
    prop_partition_key: 'surfboards'
  }
)
// </create_vertices_3>

// <create_edges_1>
await client.submit(
  'g.V([prop_partition_key, prop_source_id]).addE(\'replaces\').to(g.V([prop_partition_key, prop_target_id]))', {
    prop_partition_key: 'surfboards',
    prop_source_id: '68719518403',
    prop_target_id: '68719518371'
  }
)
// </create_edges_1>

// <create_edges_2>
await client.submit(
  'g.V([prop_partition_key, prop_source_id]).addE(\'replaces\').to(g.V([prop_partition_key, prop_target_id]))', {
    prop_partition_key: 'surfboards',
    prop_source_id: '68719518403',
    prop_target_id: '68719518409'
  }
)
// </create_edges_2>

// <query_vertices_edges>
const result = await client.submit(
  'g.V().hasLabel(\'product\').has(\'category\', prop_partition_key).has(\'name\', prop_name).outE(\'replaces\').inV()', {
    prop_partition_key: 'surfboards',
    prop_name: 'Montau Turtle Surfboard'
  }
)
// </query_vertices_edges>

// <output_vertices_edges>
console.dir(result)
// </output_vertices_edges>
