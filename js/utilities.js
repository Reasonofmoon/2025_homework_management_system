/**
 * 유틸리티 함수 모듈
 * 공통으로 사용되는 함수들과 외부 기능들
 */

class Utilities {
    constructor(dataManager, uiManager) {
        this.dataManager = dataManager;
        this.uiManager = uiManager;
    }

    // CSV 내보내기
    exportHomework() {
        const dateKey = this.dataManager.currentDate;
        const data = this.dataManager.homeworkData[dateKey] || {};

        let csvContent = 'data:text/csv;charset=utf-8,';
        csvContent += '반,학생명,학교,학년,어휘/어휘시험,소리,소리진도,독서/원서수업,퀴즐릿활성화,퀴즐릿URL,기타/문법,어휘평가,소리훈련평가,퀴즐릿평가,문법완료,피드백,어휘진도,최종완료\n';

        this.dataManager.studentsData.forEach(student => {
            const homework = data[student.id] || {};
            const progress = this.dataManager.getStudentProgress(student.id);
            const specialClasses = ['가니메데', '유로파 A', '유로파 B', '타이탄 A', '타이탄 B'];
            const isSpecialClass = specialClasses.includes(student.class);

            const row = [
                student.class,
                student.name,
                student.school,
                student.grade,
                isSpecialClass ? (homework.vocabularyTest || '') : (this.dataManager.formatVocabularyText(homework.vocabulary) || ''),
                this.dataManager.formatPhonicsText(homework.phonics) || '',
                homework.phonicsProgress || '',
                homework.reading || '',
                homework.quizletEnabled ? '활성화' : '비활성화',
                homework.quizletUrl || '',
                isSpecialClass ? (homework.grammar || '') : (homework.other || ''),
                homework.vocabularyPass ? '합격' : '불합격',
                homework.phonicsPass ? '합격' : '불합격',
                homework.quizletPass ? '합격' : '불합격',
                homework.grammarComplete ? '완료' : '미완료',
                homework.feedback || '',
                `Unit ${progress.vocabulary.currentUnit} - ${progress.vocabulary.currentStage}차`,
                homework.finalized ? '완료' : '미완료'
            ].map(field => `"${field}"`).join(',');

            csvContent += row + '\n';
        });

        const encodedUri = encodeURI(csvContent);
        const link = document.createElement('a');
        link.setAttribute('href', encodedUri);
        link.setAttribute('download', `homework_${this.dataManager.currentDate}.csv`);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        this.uiManager.showNotification('숙제 데이터가 내보내졌습니다!', 'success');
    }

    getFilteredClassNames(classData) {
        const classFilter = document.getElementById('class-filter');
        const selectedClass = classFilter ? classFilter.value : 'all';

        if (selectedClass === 'all') {
            return Object.keys(classData);
        }

        return classData[selectedClass] ? [selectedClass] : [];
    }

    isSpecialClass(className) {
        const specialClasses = ['가니메데', '유로파 A', '유로파 B', '타이탄 A', '타이탄 B'];
        return specialClasses.includes(className);
    }

    buildStudentHomeworkText(student, homework, className, index) {
        const isSpecialClass = this.isSpecialClass(className);
        const hasPhonicsField = !(className === '타이탄 B');
        const lines = [];
        const schoolGrade = [student.school, student.grade].filter(Boolean).join(' ').trim();
        const studentLabel = schoolGrade ? `${student.name} (${schoolGrade})` : student.name;
        lines.push(`${index + 1}. ${studentLabel}`);

        if (!isSpecialClass) {
            const progress = this.dataManager.getStudentProgress(student.id);
            if (progress?.vocabulary) {
                lines.push(`   📈 진도: Unit ${progress.vocabulary.currentUnit} - ${progress.vocabulary.currentStage}차`);
            }
        }

        if (isSpecialClass) {
            lines.push(`   📝 어휘시험: ${homework.vocabularyTest || '없음'}`);
            if (hasPhonicsField) {
                lines.push(`   🔤 소리: ${this.dataManager.formatPhonicsText(homework.phonics) || '없음'}`);
            }
            lines.push(`   📚 원서수업: ${homework.reading || '없음'}`);
            lines.push(`   📖 문법: ${homework.grammar || '없음'}`);
        } else {
            lines.push(`   📝 어휘: ${this.dataManager.formatVocabularyText(homework.vocabulary) || '없음'}`);
            lines.push(`   🔤 소리: ${this.dataManager.formatPhonicsText(homework.phonics) || '없음'}`);
            lines.push(`   📚 독서: ${homework.reading || '없음'}`);
            lines.push(`   📖 문법: ${homework.grammar || '없음'}`);
            lines.push(`   📋 기타: ${homework.other || '없음'}`);
        }

        if (homework.phonicsProgress) {
            lines.push(`   🔤 다음진도: ${homework.phonicsProgress}`);
        }

        const quizletStatus = homework.quizletEnabled ? '활성화' : '비활성화';
        const quizletLine = homework.quizletUrl ? `${quizletStatus} - ${homework.quizletUrl}` : quizletStatus;
        lines.push(`   🎯 퀴즐릿: ${quizletLine}`);

        const evaluationParts = [
            `📝 어휘합격 ${homework.vocabularyPass ? '✅' : '❌'}`,
            `🔤 소리훈련 ${homework.phonicsPass ? '✅' : '❌'}`,
            `🎯 퀴즐릿 ${homework.quizletPass ? '✅' : '❌'}`,
            `📖 문법숙제 ${homework.grammarComplete ? '✅' : '❌'}`
        ];
        lines.push(`   📊 평가: ${evaluationParts.join(' / ')}`);

        if (homework.feedback) {
            lines.push(`   💬 피드백: ${homework.feedback}`);
        }

        return lines.join('\n');
    }

    buildClassHomeworkText(className, students) {
        let classHomeworkText = `=== ${className} (${students.length}명) ===\n`;

        students.forEach((student, index) => {
            const homework = this.dataManager.getHomeworkForStudent(student.id);
            classHomeworkText += this.buildStudentHomeworkText(student, homework, className, index);
            classHomeworkText += '\n\n';
        });

        return classHomeworkText;
    }

    // 반별 숙제 복사
    exportClassHomework() {
        const classData = this.dataManager.getClassData();
        const targetClasses = this.getFilteredClassNames(classData);

        if (targetClasses.length === 0) {
            this.uiManager.showNotification('복사할 반을 찾을 수 없습니다.', 'error');
            return;
        }

        const isAllSelected = targetClasses.length === Object.keys(classData).length;
        const headerLabel = isAllSelected ? '전체 반' : targetClasses.join(', ');
        let allHomeworkText = `📚 ${headerLabel} 숙제 내역 - ${this.dataManager.currentDate}\n\n`;

        targetClasses.forEach(className => {
            const students = classData[className];
            if (!students) return;
            allHomeworkText += this.buildClassHomeworkText(className, students);
        });

        navigator.clipboard.writeText(allHomeworkText).then(() => {
            const message = targetClasses.length === 1
                ? `${targetClasses[0]}반 숙제가 클립보드에 복사되었습니다!`
                : '숙제가 클립보드에 복사되었습니다!';
            this.uiManager.showNotification(message, 'success');
        }).catch(err => {
            console.error('복사 실패:', err);
            this.uiManager.showNotification('복사에 실패했습니다.', 'error');
        });
    }

    // 일괄 숙제 적용
    applyBulkHomework() {
        const selectedClass = document.getElementById('bulk-class').value;
        const selectedCategory = document.getElementById('bulk-category').value;
        const selectedHomework = document.getElementById('bulk-homework').value;

        if (!selectedClass || !selectedCategory || !selectedHomework) {
            this.uiManager.showNotification('반, 카테고리, 숙제를 모두 선택해주세요.', 'error');
            return;
        }

        const studentsInClass = this.dataManager.studentsData.filter(student => student.class === selectedClass);

        if (studentsInClass.length === 0) {
            this.uiManager.showNotification('해당 반에 학생이 없습니다.', 'error');
            return;
        }

        studentsInClass.forEach(student => {
            this.dataManager.updateHomework(student.id, selectedCategory, selectedHomework);
        });

        this.uiManager.renderStudents();
        this.uiManager.showNotification(`${selectedClass}반 ${studentsInClass.length}명에게 ${selectedCategory} 숙제가 적용되었습니다!`, 'success');
    }

    // 반별 숙제 복사 (일괄 작업)
    copyBulkHomework() {
        const selectedClass = document.getElementById('bulk-class').value;

        if (!selectedClass) {
            this.uiManager.showNotification('복사할 반을 선택해주세요.', 'error');
            return;
        }

        const studentsInClass = this.dataManager.studentsData.filter(student => student.class === selectedClass);
        let classHomeworkText = `📚 ${selectedClass} 숙제 내역 - ${this.dataManager.currentDate}\n\n`;
        classHomeworkText += this.buildClassHomeworkText(selectedClass, studentsInClass);

        navigator.clipboard.writeText(classHomeworkText).then(() => {
            this.uiManager.showNotification(`${selectedClass}반 숙제가 클립보드에 복사되었습니다!`, 'success');
        }).catch(err => {
            console.error('복사 실패:', err);
            this.uiManager.showNotification('복사에 실패했습니다.', 'error');
        });
    }

    // 시스템 가이드 표시
    showSystemGuide() {
        const modal = document.createElement('div');
        modal.style.cssText = `
            position: fixed; top: 0; left: 0; width: 100%; height: 100%;
            background: rgba(0,0,0,0.5); z-index: 1000; display: flex;
            align-items: center; justify-content: center; padding: 20px;
        `;

        modal.innerHTML = `
            <div style="background: white; border-radius: 8px; padding: 30px; max-width: 600px; width: 100%; max-height: 80vh; overflow-y: auto;">
                <h3 style="color: #1890ff; margin-bottom: 20px;">📚 학생 숙제 관리 시스템 사용 가이드</h3>

                <div style="margin-bottom: 20px;">
                    <h4 style="color: #52c41a;">🎯 주요 기능</h4>
                    <ul style="line-height: 1.8;">
                        <li><strong>학생별 숙제 관리:</strong> 각 학생의 어휘, 소리, 독서, 문법 등 개별 관리</li>
                        <li><strong>반별 분류:</strong> 반별로 학생을 그룹화하여 효율적 관리</li>
                        <li><strong>진도 추적:</strong> 학생별 현재 진도 및 단계 관리</li>
                        <li><strong>평가 시스템:</strong> 어휘합격, 소리훈련 합격, 문법숙제 완료 체크</li>
                        <li><strong>데이터 백업:</strong> 로컬 저장 및 백업/복구 기능</li>
                        <li><strong>부모님 피드백:</strong> 자동 피드백 생성 및 최종 완료 기능</li>
                    </ul>
                </div>

                <div style="margin-bottom: 20px;">
                    <h4 style="color: #fa8c16;">⚡ 단축키</h4>
                    <ul style="line-height: 1.8;">
                        <li><strong>Ctrl + S:</strong> 전체 데이터 저장</li>
                    </ul>
                    <ul style="line-height: 1.8;">
                        <li>30초마다 자동으로 데이터가 저장됩니다</li>
                        <li>브라우저를 닫아도 데이터가 유지됩니다</li>
                    </ul>
                </div>

                <div style="text-align: center; margin-top: 30px;">
                    <button onclick="this.closest('[style*=\"position: fixed\"]').remove()"
                            style="padding: 12px 24px; background: #1890ff; color: white; border: none; border-radius: 6px; font-size: 1rem; cursor: pointer;">
                        확인
                    </button>
                </div>
            </div>
        `;

        document.body.appendChild(modal);
    }

    // 데이터 백업
    backupData() {
        const backupData = this.dataManager.exportBackupData();
        const dataStr = JSON.stringify(backupData, null, 2);
        const dataBlob = new Blob([dataStr], { type: 'application/json' });

        const link = document.createElement('a');
        link.href = URL.createObjectURL(dataBlob);
        link.download = `homework_backup_${new Date().toISOString().slice(0, 10)}.json`;
        link.click();

        this.uiManager.showNotification('데이터 백업이 완료되었습니다!', 'success');
    }

    // 데이터 복구
    restoreData(event) {
        const file = event.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (e) => {
            try {
                const backupData = JSON.parse(e.target.result);

                // 백업 데이터 유효성 검사
                if (!backupData.homeworkData || !backupData.studentProgress) {
                    this.uiManager.showNotification('잘못된 백업 파일입니다.', 'error');
                    return;
                }

                // 확인 대화상자
                if (confirm('기존 데이터를 백업 데이터로 덮어쓰시겠습니까?\n\n백업 날짜: ' + new Date(backupData.exportDate).toLocaleString('ko-KR'))) {
                    this.dataManager.importBackupData(backupData);

                    // UI 새로고침
                    this.uiManager.renderInitialUI();

                    this.uiManager.showNotification('데이터 복구가 완료되었습니다!', 'success');
                }
            } catch (error) {
                console.error('백업 파일 처리 오류:', error);
                this.uiManager.showNotification('백업 파일을 읽는데 실패했습니다.', 'error');
            }
        };

        reader.readAsText(file);
        // 파일 선택 초기화
        event.target.value = '';
    }

    // 학생 관리 모달
    showStudentManagement() {
        const modal = document.createElement('div');
        modal.style.cssText = `
            position: fixed; top: 0; left: 0; width: 100%; height: 100%;
            background: rgba(0,0,0,0.5); z-index: 1000; display: flex;
            align-items: center; justify-content: center; padding: 20px;
        `;

        modal.innerHTML = `
            <div style="background: white; border-radius: 8px; padding: 20px; max-width: 800px; width: 100%; max-height: 80vh; overflow-y: auto;">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px;">
                    <h3 style="margin: 0; color: #1890ff;">👥 학생 관리</h3>
                    <button onclick="this.closest('[style*=\"position: fixed\"]').remove()" style="background: none; border: none; font-size: 20px; cursor: pointer;">✖️</button>
                </div>

                <div style="margin-bottom: 20px;">
                    <button onclick="utilities.showAddStudentForm()" style="padding: 10px 20px; background: #52c41a; color: white; border: none; border-radius: 4px; cursor: pointer;">
                        ➕ 학생 추가
                    </button>
                </div>

                <div id="students-list" style="max-height: 400px; overflow-y: auto;">
                    ${this.generateStudentsList()}
                </div>
            </div>
        `;

        document.body.appendChild(modal);
    }

    generateStudentsList() {
        let html = '';
        const classData = this.dataManager.getClassData();

        Object.keys(classData).forEach(className => {
            html += `<h4 style="color: #1890ff; margin: 20px 0 10px 0;">${className} (${classData[className].length}명)</h4>`;

            classData[className].forEach(student => {
                html += `
                    <div style="display: flex; justify-content: space-between; align-items: center; padding: 10px; border: 1px solid #e8e8e8; border-radius: 4px; margin-bottom: 5px;">
                        <div>
                            <strong>${student.name}</strong> - ${student.school} ${student.grade}
                        </div>
                        <div>
                            <button onclick="utilities.editStudent(${student.id})" style="padding: 5px 10px; background: #1890ff; color: white; border: none; border-radius: 4px; cursor: pointer; margin-right: 5px;">
                                ✏️ 수정
                            </button>
                            <button onclick="utilities.deleteStudent(${student.id})" style="padding: 5px 10px; background: #f5222d; color: white; border: none; border-radius: 4px; cursor: pointer;">
                                🗑️ 삭제
                            </button>
                        </div>
                    </div>
                `;
            });
        });

        return html;
    }
}

// 전역 인스턴스 생성
document.addEventListener('DOMContentLoaded', () => {
    window.utilities = new Utilities(window.dataManager, window.uiManager);
});

// 전역 함수들 (HTML에서 onclick으로 호출되는 함수들)
function exportHomework() {
    window.utilities.exportHomework();
}

function exportClassHomework() {
    window.utilities.exportClassHomework();
}

function applyBulkHomework() {
    window.utilities.applyBulkHomework();
}

function copyBulkHomework() {
    window.utilities.copyBulkHomework();
}

function showSystemGuide() {
    window.utilities.showSystemGuide();
}

function backupData() {
    window.utilities.backupData();
}

function restoreData(event) {
    window.utilities.restoreData(event);
}

function showStudentManagement() {
    window.utilities.showStudentManagement();
}
