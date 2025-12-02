const fs = require('fs');

function extractStudents(filePath) {
    try {
        const content = fs.readFileSync(filePath, 'utf8');
        const match = content.match(/this\.studentsData\s*=\s*\[([\s\S]*?)\];/);
        if (!match) return [];
        let jsonStr = '[' + match[1] + ']';
        jsonStr = jsonStr.replace(/,(\s*[\}\]])/g, '$1');
        try { return eval(jsonStr); } catch (e) { return []; }
    } catch (e) {
        try {
            const content = fs.readFileSync(filePath, 'utf16le');
            const match = content.match(/this\.studentsData\s*=\s*\[([\s\S]*?)\];/);
            if (!match) return [];
            let jsonStr = '[' + match[1] + ']';
            jsonStr = jsonStr.replace(/,(\s*[\}\]])/g, '$1');
            return eval(jsonStr);
        } catch (e2) { return []; }
    }
}

const olderStudents = extractStudents('older_data_manager.js');
const currentStudents = extractStudents('js/data-manager.js');

console.log('Older Students Count:', olderStudents.length);
console.log('Current Students Count:', currentStudents.length);

const olderMap = new Map(olderStudents.map(s => [s.name, s.id]));

console.log('\n--- ID Mismatches (Name: Old ID -> New ID) ---');
currentStudents.forEach(s => {
    const oldId = olderMap.get(s.name);
    if (oldId && oldId !== s.id) {
        console.log(`${s.name}: ${oldId} -> ${s.id}`);
    }
});
