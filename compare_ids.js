const fs = require('fs');

function extractStudents(filePath) {
    try {
        const content = fs.readFileSync(filePath, 'utf8'); // Try utf8 first
        // Simple regex to find the studentsData array
        const match = content.match(/this\.studentsData\s*=\s*\[([\s\S]*?)\];/);
        if (!match) return [];
        
        // Clean up the string to make it valid JSON
        let jsonStr = '[' + match[1] + ']';
        // Remove trailing commas if any (simple approach)
        jsonStr = jsonStr.replace(/,(\s*[\}\]])/g, '$1');
        
        try {
            return eval(jsonStr); // Using eval because the file might have JS comments or loose syntax
        } catch (e) {
            console.error(`Error parsing JSON in ${filePath}:`, e);
            return [];
        }
    } catch (e) {
        // If utf8 fails, try reading as utf16le (common for PowerShell output)
        try {
            const content = fs.readFileSync(filePath, 'utf16le');
            const match = content.match(/this\.studentsData\s*=\s*\[([\s\S]*?)\];/);
            if (!match) return [];
            let jsonStr = '[' + match[1] + ']';
            jsonStr = jsonStr.replace(/,(\s*[\}\]])/g, '$1');
            return eval(jsonStr);
        } catch (e2) {
            console.error(`Error reading ${filePath}:`, e2);
            return [];
        }
    }
}

const oldStudents = extractStudents('old_data_manager.js');
const currentStudents = extractStudents('js/data-manager.js');

console.log('Old Students Count:', oldStudents.length);
console.log('Current Students Count:', currentStudents.length);

const oldMap = new Map(oldStudents.map(s => [s.name, s.id]));
const currentMap = new Map(currentStudents.map(s => [s.name, s.id]));

console.log('\n--- ID Mismatches ---');
currentStudents.forEach(s => {
    const oldId = oldMap.get(s.name);
    if (oldId && oldId !== s.id) {
        console.log(`Mismatch for ${s.name}: Old ID ${oldId} -> New ID ${s.id}`);
    }
});

console.log('\n--- Missing in Old (New Students) ---');
currentStudents.forEach(s => {
    if (!oldMap.has(s.name)) {
        console.log(`New student: ${s.name} (ID: ${s.id})`);
    }
});

console.log('\n--- Missing in Current (Deleted Students) ---');
oldStudents.forEach(s => {
    if (!currentMap.has(s.name)) {
        console.log(`Deleted student: ${s.name} (ID: ${s.id})`);
    }
});
