/**
 * 데이터 관리 모듈
 * 학생 데이터, 숙제 데이터, 진도 데이터를 관리
 */

class DataManager {
    constructor() {
        this.studentsData = [
    {
        "id": 1,
        "class": "NewMoon A",
        "name": "문모아",
        "school": "",
        "grade": ""
    },
    {
        "id": 2,
        "class": "NewMoon A",
        "name": "이하람",
        "school": "",
        "grade": ""
    },
    {
        "id": 3,
        "class": "NewMoon A",
        "name": "황지욱",
        "school": "",
        "grade": ""
    },
    {
        "id": 4,
        "class": "가나메데 A",
        "name": "김석준",
        "school": "",
        "grade": ""
    },
    {
        "id": 5,
        "class": "가나메데 A",
        "name": "김승준",
        "school": "",
        "grade": ""
    },
    {
        "id": 6,
        "class": "가나메데 A",
        "name": "신아민",
        "school": "",
        "grade": ""
    },
    {
        "id": 7,
        "class": "가나메데 A",
        "name": "오예원",
        "school": "",
        "grade": ""
    },
    {
        "id": 8,
        "class": "유로파 A",
        "name": "김예지",
        "school": "",
        "grade": ""
    },
    {
        "id": 9,
        "class": "유로파 A",
        "name": "김정우",
        "school": "",
        "grade": ""
    },
    {
        "id": 10,
        "class": "유로파 A",
        "name": "김한울",
        "school": "",
        "grade": ""
    },
    {
        "id": 11,
        "class": "유로파 A",
        "name": "신현호",
        "school": "",
        "grade": ""
    },
    {
        "id": 12,
        "class": "유로파 A",
        "name": "정희준",
        "school": "",
        "grade": ""
    },
    {
        "id": 13,
        "class": "유로파 A",
        "name": "조유주",
        "school": "",
        "grade": ""
    },
    {
        "id": 14,
        "class": "유로파 A",
        "name": "정지연",
        "school": "",
        "grade": ""
    },
    {
        "id": 15,
        "class": "칼리스토 A",
        "name": "김윤아",
        "school": "",
        "grade": ""
    },
    {
        "id": 16,
        "class": "칼리스토 A",
        "name": "신유주",
        "school": "",
        "grade": ""
    },
    {
        "id": 17,
        "class": "칼리스토 A",
        "name": "이도후",
        "school": "",
        "grade": ""
    },
    {
        "id": 18,
        "class": "칼리스토 A",
        "name": "전주형",
        "school": "",
        "grade": ""
    },
    {
        "id": 19,
        "class": "칼리스토 A",
        "name": "김시은",
        "school": "",
        "grade": ""
    },
    {
        "id": 20,
        "class": "칼리스토 A",
        "name": "김지우",
        "school": "",
        "grade": ""
    },
    {
        "id": 21,
        "class": "칼리스토 B",
        "name": "강현서",
        "school": "",
        "grade": ""
    },
    {
        "id": 22,
        "class": "칼리스토 B",
        "name": "서보민",
        "school": "",
        "grade": ""
    },
    {
        "id": 23,
        "class": "칼리스토 B",
        "name": "신백경",
        "school": "",
        "grade": ""
    },
    {
        "id": 24,
        "class": "칼리스토 B",
        "name": "정세진",
        "school": "",
        "grade": ""
    },
    {
        "id": 25,
        "class": "칼리스토 C",
        "name": "구도윤",
        "school": "",
        "grade": ""
    },
    {
        "id": 26,
        "class": "칼리스토 C",
        "name": "신시현",
        "school": "",
        "grade": ""
    },
    {
        "id": 27,
        "class": "칼리스토 C",
        "name": "최유",
        "school": "",
        "grade": ""
    },
    {
        "id": 28,
        "class": "칼리스토 C",
        "name": "조은서",
        "school": "",
        "grade": ""
    },
    {
        "id": 29,
        "class": "크레센트 A",
        "name": "구하나",
        "school": "",
        "grade": ""
    },
    {
        "id": 30,
        "class": "크레센트 A",
        "name": "김보겸",
        "school": "",
        "grade": ""
    },
    {
        "id": 31,
        "class": "크레센트 A",
        "name": "김시원",
        "school": "",
        "grade": ""
    },
    {
        "id": 32,
        "class": "크레센트 A",
        "name": "김은유",
        "school": "",
        "grade": ""
    },
    {
        "id": 33,
        "class": "크레센트 A",
        "name": "문아늘",
        "school": "",
        "grade": ""
    },
    {
        "id": 34,
        "class": "크레센트 A",
        "name": "백서준",
        "school": "",
        "grade": ""
    },
    {
        "id": 35,
        "class": "크레센트 A",
        "name": "전제이",
        "school": "",
        "grade": ""
    },
    {
        "id": 36,
        "class": "크레센트 A",
        "name": "최준명",
        "school": "",
        "grade": ""
    },
    {
        "id": 37,
        "class": "크레센트 B",
        "name": "김리안",
        "school": "",
        "grade": ""
    },
    {
        "id": 38,
        "class": "크레센트 B",
        "name": "양지후",
        "school": "",
        "grade": ""
    },
    {
        "id": 39,
        "class": "크레센트 B",
        "name": "이지한",
        "school": "",
        "grade": ""
    },
    {
        "id": 40,
        "class": "크레센트 B",
        "name": "이지훈",
        "school": "",
        "grade": ""
    },
    {
        "id": 41,
        "class": "크레센트 B",
        "name": "정채린",
        "school": "",
        "grade": ""
    },
    {
        "id": 42,
        "class": "크레센트 B",
        "name": "이시원",
        "school": "안양초",
        "grade": "초5"
    },
    {
        "id": 43,
        "class": "크레센트 C",
        "name": "문가온",
        "school": "",
        "grade": ""
    },
    {
        "id": 44,
        "class": "크레센트 C",
        "name": "박유주",
        "school": "",
        "grade": ""
    },
    {
        "id": 45,
        "class": "크레센트 C",
        "name": "서여율",
        "school": "",
        "grade": ""
    },
    {
        "id": 46,
        "class": "크레센트 C",
        "name": "양승유",
        "school": "",
        "grade": ""
    },
    {
        "id": 47,
        "class": "크레센트 C",
        "name": "이승준",
        "school": "",
        "grade": ""
    },
    {
        "id": 48,
        "class": "타이탄 A",
        "name": "정유민",
        "school": "",
        "grade": ""
    },
    {
        "id": 49,
        "class": "타이탄 A",
        "name": "김정민",
        "school": "",
        "grade": ""
    },
    {
        "id": 50,
        "class": "타이탄 A",
        "name": "신민경",
        "school": "",
        "grade": ""
    },
    {
        "id": 51,
        "class": "타이탄 A",
        "name": "전설우",
        "school": "",
        "grade": ""
    },
    {
        "id": 52,
        "class": "타이탄 B",
        "name": "강현우",
        "school": "",
        "grade": ""
    },
    {
        "id": 53,
        "class": "타이탄 B",
        "name": "경서현",
        "school": "",
        "grade": ""
    },
    {
        "id": 54,
        "class": "타이탄 B",
        "name": "박가온",
        "school": "",
        "grade": ""
    },
    {
        "id": 55,
        "class": "타이탄 B",
        "name": "오서한",
        "school": "",
        "grade": ""
    },
    {
        "id": 56,
        "class": "타이탄 B",
        "name": "정혜원",
        "school": "",
        "grade": ""
    },
    {
        "id": 57,
        "class": "타이탄 B",
        "name": "조하람",
        "school": "",
        "grade": ""
    },
    {
        "id": 58,
        "class": "타이탄 B",
        "name": "최서준",
        "school": "",
        "grade": ""
    }
];
        this.homeworkData = {};
        this.studentProgress = {};
        this.currentDate = '';
        this.initializeData();
    }

    initializeData() {
        // initializeData is now redundant for studentsData as it is set in constructor,
        // but we keep it if there's other initialization logic needed.
        // For now, we just ensure studentsData is set if it wasn't already (which it is).
        if (!this.studentsData || this.studentsData.length === 0) {
             // Fallback or re-initialization if needed
        }
        
        // 현재 날짜 설정
        this.initializeOptions();
        this.currentDate = this.getCurrentDate();

        // 로컬 저장소에서 데이터 로드
        this.loadFromStorage();

        // 학생별 기본 진도 초기화
        this.initializeStudentProgress();
    }

    initializeOptions() {
        // 입체어휘 4000 단어 시스템
        this.vocabularyOptions = [];
        for (let unit = 1; unit <= 40; unit++) {
            const baseNumber = (unit - 1) * 100;
            
            // 1차 - 플래시카드 (1-50, 51-100)
            this.vocabularyOptions.push({
                value: `unit${unit}_stage1_flashcard1`,
                text: `Unit ${unit} - 1차 플래시카드 (${baseNumber + 1}-${baseNumber + 50})`,
                unit: unit,
                stage: 1,
                type: 'flashcard',
                part: 1
            });
            this.vocabularyOptions.push({
                value: `unit${unit}_stage1_flashcard2`,
                text: `Unit ${unit} - 1차 플래시카드 (${baseNumber + 51}-${baseNumber + 100})`,
                unit: unit,
                stage: 1,
                type: 'flashcard',
                part: 2
            });
            
            // 2차 - 의미시험 (1-50, 51-100)
            this.vocabularyOptions.push({
                value: `unit${unit}_stage2_meaning1`,
                text: `Unit ${unit} - 2차 의미시험 (${baseNumber + 1}-${baseNumber + 50})`,
                unit: unit,
                stage: 2,
                type: 'meaning',
                part: 1
            });
            this.vocabularyOptions.push({
                value: `unit${unit}_stage2_meaning2`,
                text: `Unit ${unit} - 2차 의미시험 (${baseNumber + 51}-${baseNumber + 100})`,
                unit: unit,
                stage: 2,
                type: 'meaning',
                part: 2
            });
            
            // 3차 - 스펠링시험 (1-25, 26-50, 51-75, 76-100)
            for (let part = 1; part <= 4; part++) {
                const startNum = baseNumber + (part - 1) * 25 + 1;
                const endNum = baseNumber + part * 25;
                this.vocabularyOptions.push({
                    value: `unit${unit}_stage3_spelling${part}`,
                    text: `Unit ${unit} - 3차 스펠링시험 (${startNum}-${endNum})`,
                    unit: unit,
                    stage: 3,
                    type: 'spelling',
                    part: part
                });
            }
        }

        // 소리훈련 시스템
        this.phonicsOptions = [
            { value: 'cory_best_friend', text: '[Cory Carson] Chrissey\'s Best Friend' },
            { value: 'charlie_pancake', text: '[Charlie\'s Colorforms City] Charlie\'s Pancake Chef' },
            { value: 'chip_morning', text: '[Chip and Potato] Morning Potato' },
            { value: 'spirit_thunder', text: '[Spirit Rangers] Thunder Mountain' },
            { value: 'cory_first_day', text: '[Cory Carson] Cory\'s First Day' },
            { value: 'clifford_get_well', text: '[Clifford] Get Well' },
            { value: 'clifford_mimi', text: '[Clifford] Mimi\'s Back In Town' },
            { value: 'clifford_dog_day', text: '[Clifford] Dog for a Day' },
            { value: 'clifford_mess', text: '[Clifford] Another Fine Mess' },
            { value: 'arthur_mr_rogers', text: '[Arthur] Arthur Meets Mr. Rogers' },
            { value: 'arthur_water_brain', text: '[Arthur] Water and the Brain' },
            { value: 'arthur_draw', text: '[Arthur] Draw' },
            { value: 'arthur_binky', text: '[Arthur] Binky Art Expert' },
            { value: 'charlie_brown_dog', text: '[Charlie Brown] He\'s Your Dog' },
            { value: 'charlie_brown_lucy', text: '[Charlie Brown] Lucy Must Be Traded' },
            { value: 'charlie_brown_happiness', text: '[Charlie Brown] Happiness Is a ...' },
            { value: 'hollow_season1', text: '[The Hollow] Season 1' },
            { value: 'talking_tom_audition', text: '[Talking Tom] The Audition' },
            { value: 'untalking_tom', text: '[UnTalking Tom] UnTalking Tom' },
            { value: 'bare_bears_stuff', text: '[We Bare Bears] Our Stuff' },
            { value: 'news_basic1', text: '[News] Basic 1' },
            { value: 'news_advanced', text: '[News] Advanced' }
        ];
    }

    getVocabularyOptions() {
        return this.vocabularyOptions;
    }

    getPhonicsOptions() {
        return this.phonicsOptions;
    }

    formatVocabularyText(value) {
        if (!value) return '';
        const option = this.vocabularyOptions.find(opt => opt.value === value);
        return option ? option.text : value;
    }

    formatPhonicsText(value) {
        if (!value) return '';
        const option = this.phonicsOptions.find(opt => opt.value === value);
        return option ? option.text : value;
    }

    getCurrentDate() {
        const today = new Date();
        const year = today.getFullYear();
        const month = String(today.getMonth() + 1).padStart(2, '0');
        const day = String(today.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    }

    setCurrentDate(date) {
        this.currentDate = date;
    }

    // 숙제 데이터 관련 메서드
    getHomeworkForStudent(studentId) {
        const dateKey = this.currentDate;
        if (!this.homeworkData[dateKey]) {
            this.homeworkData[dateKey] = {};
        }
        if (!this.homeworkData[dateKey][studentId]) {
            this.homeworkData[dateKey][studentId] = {
                vocabulary: '',
                vocabularyTest: '',
                phonics: '',
                phonicsProgress: '',
                reading: '',
                other: '',
                grammar: '',
                quizletEnabled: true,
                quizletUrl: '',
                vocabularyPass: true,
                phonicsPass: true,
                quizletPass: true,
                prepareQuizlet: true,
                grammarComplete: false,
                feedback: '',
                finalized: false,
                finalizedAt: null
            };
        }
        return this.homeworkData[dateKey][studentId];
    }

    updateHomework(studentId, category, value) {
        const dateKey = this.currentDate;
        if (!this.homeworkData[dateKey]) {
            this.homeworkData[dateKey] = {};
        }
        if (!this.homeworkData[dateKey][studentId]) {
            this.homeworkData[dateKey][studentId] = this.getHomeworkForStudent(studentId);
        }

        this.homeworkData[dateKey][studentId][category] = value;
        this.saveToStorage();
    }

    // 학생 진도 관련 메서드
    getStudentProgress(studentId) {
        if (!this.studentProgress[studentId]) {
            this.studentProgress[studentId] = {
                vocabulary: {
                    currentUnit: 1,
                    currentStage: 1,
                    currentPart: 1
                }
            };
        }
        return this.studentProgress[studentId];
    }

    updateStudentProgress(studentId, progressData) {
        this.studentProgress[studentId] = progressData;
        this.saveProgressToStorage();
    }

    initializeStudentProgress() {
        this.studentsData.forEach(student => {
            if (!this.studentProgress[student.id]) {
                this.studentProgress[student.id] = {
                    vocabulary: {
                        currentUnit: 1,
                        currentStage: 1,
                        currentPart: 1
                    }
                };
            }
        });
    }

    // 학생 관리 메서드
    addStudent(studentData) {
        const newId = Math.max(...this.studentsData.map(s => s.id)) + 1;
        const newStudent = { ...studentData, id: newId };
        this.studentsData.push(newStudent);
        this.saveStudentsToStorage();
        return newStudent;
    }

    updateStudent(studentId, studentData) {
        const index = this.studentsData.findIndex(s => s.id === studentId);
        if (index !== -1) {
            this.studentsData[index] = { ...this.studentsData[index], ...studentData };
            this.saveStudentsToStorage();
            return true;
        }
        return false;
    }

    deleteStudent(studentId) {
        const index = this.studentsData.findIndex(s => s.id === studentId);
        if (index !== -1) {
            this.studentsData.splice(index, 1);
            delete this.studentProgress[studentId];

            // 모든 날짜의 숙제 데이터에서 해당 학생 삭제
            Object.keys(this.homeworkData).forEach(date => {
                if (this.homeworkData[date][studentId]) {
                    delete this.homeworkData[date][studentId];
                }
            });

            this.saveStudentsToStorage();
            this.saveToStorage();
            this.saveProgressToStorage();
            return true;
        }
        return false;
    }

    // 로컬 저장소 관련 메서드
    saveToStorage() {
        try {
            localStorage.setItem('homeworkData', JSON.stringify(this.homeworkData));
        } catch (error) {
            console.error('숙제 데이터 저장 실패:', error);
        }
    }

    saveProgressToStorage() {
        try {
            localStorage.setItem('studentProgress', JSON.stringify(this.studentProgress));
        } catch (error) {
            console.error('진도 저장 실패:', error);
        }
    }

    saveStudentsToStorage() {
        try {
            localStorage.setItem('studentsData', JSON.stringify(this.studentsData));
        } catch (error) {
            console.error('학생 데이터 저장 실패:', error);
        }
    }

    loadFromStorage() {
        try {
            const savedHomeworkData = localStorage.getItem('homeworkData');
            if (savedHomeworkData) {
                this.homeworkData = JSON.parse(savedHomeworkData);
            }

            const savedProgressData = localStorage.getItem('studentProgress');
            if (savedProgressData) {
                this.studentProgress = JSON.parse(savedProgressData);
            }

            // FORCE RESET: Explicitly remove old student data from storage to enforce the new strict list
            localStorage.removeItem('studentsData');

        } catch (error) {
            console.error('데이터 로드 실패:', error);
        }
    }

    exportBackupData() {
        return {
            studentsData: this.studentsData,
            homeworkData: this.homeworkData,
            studentProgress: this.studentProgress,
            exportDate: new Date().toISOString()
        };
    }

    importBackupData(backupData) {
        if (!backupData.studentsData || !backupData.homeworkData || !backupData.studentProgress) {
            throw new Error('잘못된 백업 데이터입니다.');
        }

        this.studentsData = backupData.studentsData;
        this.homeworkData = backupData.homeworkData;
        this.studentProgress = backupData.studentProgress;

        this.saveToStorage();
        this.saveProgressToStorage();
        this.saveStudentsToStorage();
    }

    // 통계 데이터 계산
    getStatistics() {
        const totalStudents = this.studentsData.length;
        let completedHomework = 0;
        const specialClasses = ['가니메데', '유로파 A', '유로파 B', '타이탄 A', '타이탄 B'];

        this.studentsData.forEach(student => {
            const homework = this.getHomeworkForStudent(student.id);
            const isSpecialClass = specialClasses.includes(student.class);

            if (isSpecialClass) {
                if (homework.vocabularyTest || homework.phonics || homework.reading || homework.grammar) {
                    completedHomework++;
                }
            } else {
                if (homework.vocabulary || homework.phonics || homework.reading || homework.other) {
                    completedHomework++;
                }
            }
        });

        const completionRate = totalStudents > 0 ? Math.round((completedHomework / totalStudents) * 100) : 0;

        return {
            totalStudents,
            completedHomework,
            completionRate
        };
    }

    // 반별 데이터 가져오기
    getClassData() {
        const classData = {};

        this.studentsData.forEach(student => {
            if (!classData[student.class]) {
                classData[student.class] = [];
            }
            classData[student.class].push(student);
        });

        return classData;
    }

    // 모든 반 목록 가져오기
    getClassList() {
        return [...new Set(this.studentsData.map(student => student.class))].sort();
    }
}

// 전역 인스턴스 생성
window.dataManager = new DataManager();