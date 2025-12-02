const fs = require('fs');

function extractStudents(filePath) {
    try {
        let content = fs.readFileSync(filePath, 'utf8');
        // Find all assignments to studentsData
        const matches = content.match(/this\.studentsData\s*=\s*\[([\s\S]*?)\];/g);
        if (!matches) return [];
        
        // Pick the longest one (likely the populated one)
        let bestMatch = matches.reduce((a, b) => a.length > b.length ? a : b);
        
        // Extract the array content
        const innerMatch = bestMatch.match(/this\.studentsData\s*=\s*\[([\s\S]*?)\];/);
        if (!innerMatch) return [];

        let jsonStr = '[' + innerMatch[1] + ']';
        jsonStr = jsonStr.replace(/,(\s*[\}\]])/g, '$1');
        try { return eval(jsonStr); } catch (e) { return []; }
    } catch (e) {
        // Try utf16le
        try {
            let content = fs.readFileSync(filePath, 'utf16le');
            const matches = content.match(/this\.studentsData\s*=\s*\[([\s\S]*?)\];/g);
            if (!matches) return [];
            let bestMatch = matches.reduce((a, b) => a.length > b.length ? a : b);
            const innerMatch = bestMatch.match(/this\.studentsData\s*=\s*\[([\s\S]*?)\];/);
            if (!innerMatch) return [];
            let jsonStr = '[' + innerMatch[1] + ']';
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
