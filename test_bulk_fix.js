
const { storage } = require('./src/lib/storage.js');

async function testBulk() {
    console.log("Starting bulk test...");
    
    // Create dummy updates
    const updates = [];
    for(let i=0; i<100; i++) {
        updates.push({
            title: `Update ${i}`,
            link: `http://example.com/${i}`,
            description: `Desc ${i}`,
            published_date: new Date(),
            category: 'test'
        });
    }

    console.log("Saving 100 updates in bulk...");
    const start = Date.now();
    await storage.saveWindowsUpdatesBulk(updates);
    const end = Date.now();
    
    console.log(`Bulk save took ${end - start}ms`);
    
    const stats = await storage.getUpdateStats();
    console.log("Stats:", stats);
}

// Need to handle ES modules in this environment or compile. 
// Since the project is using ES modules (import/export), running this with 'node' might fail if package.json doesn't say "type": "module".
// Let's check package.json first.
