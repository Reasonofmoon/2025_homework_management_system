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
        // 학생 데이터 초기화
        this.studentsData = [
    {
        "id": 5,
        "class": "NewMoon A",
        "name": "문모아",
        "school": "",
        "grade": "초1"
    },
    {
        "id": 6,
        "class": "NewMoon A",
        "name": "이하람",
        "school": "",
        "grade": "초3"
    },
    {
        "id": 7,
        "class": "NewMoon A",
        "name": "황지욱",
        "school": "",
        "grade": "초2"
    },
    {
        "id": 25,
        "class": "가나메데 A",
        "name": "김석준",
        "school": "안양동초",
        "grade": "초6"
    },
    {
        "id": 26,
        "class": "가나메데 A",
        "name": "김승준",
        "school": "안양동초",
        "grade": "초6"
    },
    {
        "id": 28,
        "class": "가나메데 A",
        "name": "신아민",
        "school": "안양동초",
        "grade": "초6"
    },
    {
        "id": 29,
        "class": "가나메데 A",
        "name": "오예원",
        "school": "중앙초",
        "grade": "초6"
    },
    {
        "id": 19,
        "class": "유로파 A",
        "name": "김예지",
        "school": "안양외고",
        "grade": "고1"
    },
    {
        "id": 15,
        "class": "유로파 A",
        "name": "김정우",
        "school": "임곱중",
        "grade": "중3"
    },
    {
        "id": 20,
        "class": "유로파 A",
        "name": "김한울",
        "school": "임곱중",
        "grade": "중3"
    },
    {
        "id": 21,
        "class": "유로파 A",
        "name": "신현호",
        "school": "평촌고",
        "grade": "고1"
    },
    {
        "id": 17,
        "class": "유로파 A",
        "name": "정희준",
        "school": "평촌고",
        "grade": "고1"
    },
    {
        "id": 18,
        "class": "유로파 A",
        "name": "조유주",
        "school": "임곱중",
        "grade": "중1"
    },
    {
        "id": 22,
        "class": "유로파 A",
        "name": "정지연",
        "school": "임곱중",
        "grade": "중3"
    },
    {
        "id": 51,
        "class": "칼리스토 A",
        "name": "김윤아",
        "school": "안양동초",
        "grade": "초4"
    },
    {
        "id": 54,
        "class": "칼리스토 A",
        "name": "신유주",
        "school": "",
        "grade": "초4"
    },
    {
        "id": 4,
        "class": "칼리스토 A",
        "name": "이도후",
        "school": "샘모루초",
        "grade": "초4"
    },
    {
        "id": 1,
        "class": "칼리스토 A",
        "name": "전주형",
        "school": "안일초",
        "grade": "초4"
    },
    {
        "id": 2,
        "class": "칼리스토 A",
        "name": "김시은",
        "school": "샘모루초",
        "grade": "초4"
    },
    {
        "id": 3,
        "class": "칼리스토 A",
        "name": "김지우",
        "school": "안양동초",
        "grade": "초3"
    },
    {
        "id": 31,
        "class": "칼리스토 B",
        "name": "강현서",
        "school": "샘모루초",
        "grade": "초5"
    },
    {
        "id": 34,
        "class": "칼리스토 B",
        "name": "서보민",
        "school": "샘모루초",
        "grade": "초5"
    },
    {
        "id": 35,
        "class": "칼리스토 B",
        "name": "신백경",
        "school": "덕천초",
        "grade": "초3"
    },
    {
        "id": 37,
        "class": "칼리스토 B",
        "name": "정세진",
        "school": "샘모루초",
        "grade": "초5"
    },
    {
        "id": 38,
        "class": "칼리스토 C",
        "name": "구도윤",
        "school": "샘모루초",
        "grade": "초5"
    },
    {
        "id": 39,
        "class": "칼리스토 C",
        "name": "신시현",
        "school": "안양동초",
        "grade": "초5"
    },
    {
        "id": 70,
        "class": "칼리스토 C",
        "name": "최유",
        "school": "",
        "grade": ""
    },
    {
        "id": 40,
        "class": "칼리스토 C",
        "name": "조은서",
        "school": "샘모루초",
        "grade": "초4"
    },
    {
        "id": 42,
        "class": "크레센트 A",
        "name": "구하나",
        "school": "",
        "grade": ""
    },
    {
        "id": 48,
        "class": "크레센트 A",
        "name": "김보겸",
        "school": "중앙초",
        "grade": "초3"
    },
    {
        "id": 43,
        "class": "크레센트 A",
        "name": "김시원",
        "school": "비산초",
        "grade": "초1"
    },
    {
        "id": 44,
        "class": "크레센트 A",
        "name": "김은유",
        "school": "",
        "grade": "초3"
    },
    {
        "id": 50,
        "class": "크레센트 A",
        "name": "문아늘",
        "school": "안양초",
        "grade": "초2"
    },
    {
        "id": 45,
        "class": "크레센트 A",
        "name": "백서준",
        "school": "샘모루초",
        "grade": "초4"
    },
    {
        "id": 47,
        "class": "크레센트 A",
        "name": "전제이",
        "school": "안양동초",
        "grade": "초3"
    },
    {
        "id": 57,
        "class": "크레센트 A",
        "name": "최준명",
        "school": "안양동초",
        "grade": "초4"
    },
    {
        "id": 8,
        "class": "크레센트 B",
        "name": "김리안",
        "school": "중앙초",
        "grade": "초2"
    },
    {
        "id": 10,
        "class": "크레센트 B",
        "name": "양지후",
        "school": "중앙초",
        "grade": "초2"
    },
    {
        "id": 11,
        "class": "크레센트 B",
        "name": "이지한",
        "school": "샘모루초",
        "grade": "초3"
    },
    {
        "id": 12,
        "class": "크레센트 B",
        "name": "이지훈",
        "school": "샘모루초",
        "grade": "초3"
    },
    {
        "id": 13,
        "class": "크레센트 B",
        "name": "정채린",
        "school": "중앙초",
        "grade": "초2"
    },
    {
        "id": 71,
        "class": "크레센트 B",
        "name": "이시원",
        "school": "안양초",
        "grade": "초5"
    },
    {
        "id": 72,
        "class": "크레센트 C",
        "name": "문가온",
        "school": "",
        "grade": ""
    },
    {
        "id": 52,
        "class": "크레센트 C",
        "name": "박유주",
        "school": "중앙초",
        "grade": "초2"
    },
    {
        "id": 53,
        "class": "크레센트 C",
        "name": "서여율",
        "school": "",
        "grade": "초3"
    },
    {
        "id": 55,
        "class": "크레센트 C",
        "name": "양승유",
        "school": "샘모루초",
        "grade": "초1"
    },
    {
        "id": 56,
        "class": "크레센트 C",
        "name": "이승준",
        "school": "샘모루초",
        "grade": "초2"
    },
    {
        "id": 73,
        "class": "타이탄 A",
        "name": "정유민",
        "school": "",
        "grade": ""
    },
    {
        "id": 59,
        "class": "타이탄 A",
        "name": "김정민",
        "school": "임곱중",
        "grade": "중1"
    },
    {
        "id": 16,
        "class": "타이탄 A",
        "name": "신민경",
        "school": "덕천초",
        "grade": "초6"
    },
    {
        "id": 60,
        "class": "타이탄 A",
        "name": "전설우",
        "school": "임곱중",
        "grade": "중1"
    },
    {
        "id": 61,
        "class": "타이탄 B",
        "name": "강현우",
        "school": "비산중",
        "grade": "중1"
    },
    {
        "id": 62,
        "class": "타이탄 B",
        "name": "경서현",
        "school": "임곡중",
        "grade": "중1"
    },
    {
        "id": 63,
        "class": "타이탄 B",
        "name": "박가온",
        "school": "부흥중",
        "grade": "중1"
    },
    {
        "id": 64,
        "class": "타이탄 B",
        "name": "오서한",
        "school": "부흥중",
        "grade": "중1"
    },
    {
        "id": 66,
        "class": "타이탄 B",
        "name": "정혜원",
        "school": "임곡중",
        "grade": "중1"
    },
    {
        "id": 67,
        "class": "타이탄 B",
        "name": "조하람",
        "school": "임곡중",
        "grade": "중1"
    },
    {
        "id": 69,
        "class": "타이탄 B",
        "name": "최서준",
        "school": "",
        "grade": ""
    }
]
;

        // 현재 날짜 설정
        this.currentDate = this.getCurrentDate();

        // 로컬 저장소에서 데이터 로드
        this.loadFromStorage();

        // 학생별 기본 진도 초기화
        this.initializeStudentProgress();
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
        const specialClasses = ['가나메데 A', '유로파 A', '타이탄 A', '타이탄 B'];

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