const addressController = require( './index' );
const redis = require( '../../singletons/redis' );
const assert = require( 'assert' );

describe( 'address controller', () => {
  it( 'lets us add an address', async () => {
    const addrId = await addressController.add({ line1: '185 Berry St', city: 'San Francisco', state: 'CA', zip: '94107' });

    const addr = await addressController.get( addrId );
    assert( addr.id.match( 'addr_' ), 'address should have had an ID' );
  });

  it( 'lets us update an address', async () => {
    const address = { line1: '185 Berry St', city: 'San Francisco', state: 'CA', zip: '94107' };
    const NEW_CITY = 'South San Francisco';
    const addrId = await addressController.add( address );

    await addressController.update( addrId, {
      ...address,
      id: addrId,
      city: NEW_CITY,
    });

    const addr = await addressController.get( addrId );
    assert.strictEqual( addr.city, NEW_CITY );
  });

  it( 'lets us delete an address', async () => {
    const addrId = await addressController.add({ line1: '185 Berry St', city: 'San Francisco', state: 'CA', zip: '94107' });
    await addressController.delete( addrId );

    const addr = await addressController.get( addrId );
    assert( !addr );
  });

  it( 'lets us search through addresses', async () => {
    const addr1 = { line1: '185 Berry St', city: 'San Francisco', state: 'CA', zip: '94107' };
    const addr2 = { line1: '210 King St', line2: '#3', city: 'San Francisco', state: 'CA', zip: '94107' };

    addr1.id = await addressController.add( addr1 );
    addr2.id = await addressController.add( addr2 );

    assert.deepStrictEqual( await addressController.search( '185' ), [ addr1 ]);
    assert.deepStrictEqual( await addressController.search( '#3' ), [ addr2 ]);
    assert.deepStrictEqual( await addressController.search( addr1.id ), [ addr1 ]);
    assert.strictEqual( ( await addressController.search( 'CA' ) ).length, 2 );
    assert.strictEqual( ( await addressController.search() ).length, 2 );
  });

  afterEach( async () => {
    await redis.flushall();
  });
});
