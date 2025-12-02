/**
 * UI 관리 모듈
 * 사용자 인터페이스 렌더링과 상호작용 관리
 */

class UIManager {
    constructor(dataManager) {
        this.dataManager = dataManager;
        this.notifications = [];
        this.currentModal = null;
        this.initialize();
    }

    initialize() {
        this.setupEventListeners();
        this.renderInitialUI();
    }

    setupEventListeners() {
        // 날짜 변경 이벤트
        document.getElementById('homework-date').addEventListener('change', (e) => {
            this.dataManager.setCurrentDate(e.target.value);
            this.renderStudents();
            this.updateStatistics();
        });

        // 반 필터 변경 이벤트
        document.getElementById('class-filter').addEventListener('change', (e) => {
            this.renderStudents(e.target.value);
        });

        // 자동 저장 기능
        setInterval(() => {
            this.dataManager.saveToStorage();
        }, 30000); // 30초마다 자동 저장

        // 키보드 단축키
        document.addEventListener('keydown', (e) => {
            if (e.ctrlKey && e.key === 's') {
                e.preventDefault();
                this.dataManager.saveToStorage();
                this.dataManager.saveProgressToStorage();
                this.dataManager.saveStudentsToStorage();
                this.showNotification('모든 데이터가 저장되었습니다!', 'success');
            }
        });
    }

    renderInitialUI() {
        // 현재 날짜 설정
        document.getElementById('homework-date').value = this.dataManager.currentDate;

        // 반 필터 옵션 생성
        this.renderClassFilter();

        // 학생 목록 렌더링
        this.renderStudents();

        // 통계 업데이트
        this.updateStatistics();

        // 일괄 작업 옵션 생성
        this.renderBulkOptions();
    }

    renderClassFilter() {
        const classFilter = document.getElementById('class-filter');
        const bulkClassFilter = document.getElementById('bulk-class');

        // 기존 옵션 제거 (첫 번째 "전체 반" 옵션 제외)
        while (classFilter.children.length > 1) {
            classFilter.removeChild(classFilter.lastChild);
        }

        bulkClassFilter.innerHTML = '<option value="">반 선택</option>';

        const classes = this.dataManager.getClassList();

        classes.forEach(className => {
            // 반 필터에 옵션 추가
            const option1 = document.createElement('option');
            option1.value = className;
            option1.textContent = className;
            classFilter.appendChild(option1);

            // 일괄 작업 반 필터에 옵션 추가
            const option2 = document.createElement('option');
            option2.value = className;
            option2.textContent = className;
            bulkClassFilter.appendChild(option2);
        });
    }

    renderBulkOptions() {
        const bulkHomeworkSelect = document.getElementById('bulk-homework');

        // 카테고리 변경 시 숙제 옵션 업데이트
        document.getElementById('bulk-category').addEventListener('change', (e) => {
            const category = e.target.value;
            bulkHomeworkSelect.innerHTML = '<option value="">숙제 선택</option>';

            if (category === 'vocabulary') {
                const vocabOptions = this.dataManager.getVocabularyOptions();
                vocabOptions.forEach(option => {
                    const optionElement = document.createElement('option');
                    optionElement.value = option.value;
                    optionElement.textContent = option.text;
                    bulkHomeworkSelect.appendChild(optionElement);
                });
            } else if (category === 'phonics') {
                const phonicsOptions = this.dataManager.getPhonicsOptions();
                phonicsOptions.forEach(option => {
                    const optionElement = document.createElement('option');
                    optionElement.value = option.value;
                    optionElement.textContent = option.text;
                    bulkHomeworkSelect.appendChild(optionElement);
                });
            } else if (category === 'quizletEnabled') {
                const enableOption = document.createElement('option');
                enableOption.value = 'true';
                enableOption.textContent = '활성화';
                bulkHomeworkSelect.appendChild(enableOption);
                
                const disableOption = document.createElement('option');
                disableOption.value = 'false';
                disableOption.textContent = '비활성화';
                bulkHomeworkSelect.appendChild(disableOption);
            }
        });
    }

    renderStudents(classFilter = 'all') {
        const container = document.getElementById('classes-container');
        container.innerHTML = '';

        const classData = this.dataManager.getClassData();

        Object.keys(classData).forEach(className => {
            if (classFilter !== 'all' && className !== classFilter) return;

            const students = classData[className];
            const classSection = this.createClassSection(className, students);
            container.appendChild(classSection);
        });

        // 통계 표시
        document.querySelector('.stats-bar').style.display = 'flex';
    }

    createClassSection(className, students) {
        const section = document.createElement('div');
        section.className = 'class-section';

        const header = this.createClassHeader(className, students.length);
        const studentsGrid = this.createStudentsGrid(students);

        section.appendChild(header);
        section.appendChild(studentsGrid);

        return section;
    }

    createClassHeader(className, studentCount) {
        const header = document.createElement('div');
        header.className = 'class-header';
        header.onclick = () => this.toggleClassSection(header.nextElementSibling, header.querySelector('.toggle-btn'));

        header.innerHTML = `
            <div class="class-info">
                <h2>${className}</h2>
                <span class="student-count">${studentCount}명</span>
            </div>
            <button class="toggle-btn">▼</button>
        `;

        return header;
    }

    createStudentsGrid(students) {
        const grid = document.createElement('div');
        grid.className = 'students-grid expanded';

        students.forEach(student => {
            const studentCard = this.createStudentCard(student);
            grid.appendChild(studentCard);
        });

        return grid;
    }

    createStudentCard(student) {
        const homework = this.dataManager.getHomeworkForStudent(student.id);
        const progress = this.dataManager.getStudentProgress(student.id);
        const specialClasses = ['가니메데', '유로파 A', '유로파 B', '타이탄 A', '타이탄 B'];
        const isSpecialClass = specialClasses.includes(student.class);

        const card = document.createElement('div');
        card.className = 'student-card';

        if (isSpecialClass) {
            card.innerHTML = this.createSpecialClassCardContent(student, homework, progress);
        } else {
            card.innerHTML = this.createRegularClassCardContent(student, homework, progress);
        }

        return card;
    }

    createSpecialClassCardContent(student, homework, progress) {
        const phonicsSection = student.class !== '타이탄 B' ? 
            this.createHomeworkItem('소리', 'phonics', student.id, homework.phonics, 'select', this.dataManager.getPhonicsOptions()) : '';

        return `
            <div class="student-info">
                <div>
                    <div class="student-name">${student.name}</div>
                    <div class="student-details">${student.school} ${student.grade}</div>
                    <div class="student-date">📅 ${this.dataManager.currentDate}</div>
                </div>
            </div>

            <div class="homework-section">
                ${this.createHomeworkItem('어휘시험', 'vocabularyTest', student.id, homework.vocabularyTest, 'input')}
                ${phonicsSection}
                ${this.createHomeworkItem('원서수업', 'reading', student.id, homework.reading, 'input')}
                ${this.createHomeworkItem('문법', 'grammar', student.id, homework.grammar, 'input')}
                ${this.createQuizletSection(student.id, homework)}
            </div>

            ${this.createEvaluationSection(student.id, homework)}
            ${this.createFeedbackSection(student.id, homework)}
            ${this.createActionButtons(student.id, homework)}
        `;
    }

    createRegularClassCardContent(student, homework, progress) {
        return `
            <div class="student-info">
                <div>
                    <div class="student-name">${student.name}</div>
                    <div class="student-details">${student.school} ${student.grade}</div>
                    <div class="student-date">📅 ${this.dataManager.currentDate}</div>
                </div>
                <div class="progress-indicator">
                    <div class="progress-text">Unit ${progress.vocabulary?.currentUnit || 1}-${progress.vocabulary?.currentStage || 1}차</div>
                </div>
            </div>

            <div class="homework-section">
                ${this.createHomeworkItem('어휘 (입체어휘 4000)', 'vocabulary', student.id, homework.vocabulary, 'select', this.dataManager.getVocabularyOptions())}
                ${this.createHomeworkItem('소리훈련', 'phonics', student.id, homework.phonics, 'select', this.dataManager.getPhonicsOptions())}
                ${this.createHomeworkItem('독서/원서', 'reading', student.id, homework.reading, 'input')}
                ${this.createHomeworkItem('기타', 'other', student.id, homework.other, 'input')}
                ${this.createHomeworkItem('문법', 'grammar', student.id, homework.grammar, 'input')}
                ${this.createQuizletSection(student.id, homework)}
            </div>

            ${this.createEvaluationSection(student.id, homework)}
            ${this.createFeedbackSection(student.id, homework)}
            ${this.createActionButtons(student.id, homework)}
        `;
    }

    createHomeworkItem(label, field, studentId, value, type, options = []) {
        if (type === 'select') {
            const optionsHtml = options.map(option => {
                const optValue = typeof option === 'object' ? option.value : option;
                const optText = typeof option === 'object' ? option.text : option;
                return `<option value="${optValue}" ${value === optValue ? 'selected' : ''}>${optText}</option>`;
            }).join('');

            return `
                <div class="homework-item">
                    <div class="homework-label">${label}</div>
                    <select class="homework-select" onchange="dataManager.updateHomework(${studentId}, '${field}', this.value)">
                        <option value="">선택하세요</option>
                        ${optionsHtml}
                    </select>
                </div>
            `;
        } else {
            return `
                <div class="homework-item">
                    <div class="homework-label">${label}</div>
                    <input type="text" class="homework-input" value="${value || ''}"
                           onchange="dataManager.updateHomework(${studentId}, '${field}', this.value)"
                           placeholder="${label} 내용을 입력하세요">
                </div>
            `;
        }
    }

    createQuizletSection(studentId, homework) {
        return `
            <div class="homework-item">
                <div class="homework-label">🎯 퀴즐릿</div>
                <div class="quizlet-section">
                    <div class="custom-checkbox">
                        <input type="checkbox" id="quizlet-enabled-${studentId}"
                               ${homework.quizletEnabled ? 'checked' : ''}
                               onchange="dataManager.updateHomework(${studentId}, 'quizletEnabled', this.checked)">
                        <label for="quizlet-enabled-${studentId}">퀴즐릿 활성화</label>
                    </div>
                    <input type="text" class="homework-input" value="${homework.quizletUrl || ''}"
                           onchange="dataManager.updateHomework(${studentId}, 'quizletUrl', this.value)"
                           placeholder="퀴즐릿 URL을 입력하세요">
                </div>
            </div>
        `;
    }

    createEvaluationSection(studentId, homework) {
        return `
            <div class="homework-section">
                <div class="homework-label">📊 평가</div>
                <div style="display: flex; gap: 15px; flex-wrap: wrap; margin-top: 10px;">
                    <div class="custom-checkbox">
                        <input type="checkbox" id="vocab-pass-${studentId}"
                               ${homework.vocabularyPass ? 'checked' : ''}
                               onchange="dataManager.updateHomework(${studentId}, 'vocabularyPass', this.checked)">
                        <label for="vocab-pass-${studentId}">📝 어휘합격</label>
                    </div>
                    <div class="custom-checkbox">
                        <input type="checkbox" id="phonics-pass-${studentId}"
                               ${homework.phonicsPass ? 'checked' : ''}
                               onchange="dataManager.updateHomework(${studentId}, 'phonicsPass', this.checked)">
                        <label for="phonics-pass-${studentId}">🔤 소리훈련 합격</label>
                    </div>
                    <div class="custom-checkbox">
                        <input type="checkbox" id="quizlet-pass-${studentId}"
                               ${homework.quizletPass ? 'checked' : ''}
                               onchange="dataManager.updateHomework(${studentId}, 'quizletPass', this.checked)">
                        <label for="quizlet-pass-${studentId}">🎯 퀴즐릿 합격</label>
                    </div>
                    <div class="custom-checkbox">
                        <input type="checkbox" id="grammar-complete-${studentId}"
                               ${homework.grammarComplete ? 'checked' : ''}
                               onchange="dataManager.updateHomework(${studentId}, 'grammarComplete', this.checked)">
                        <label for="grammar-complete-${studentId}">📖 문법숙제 완료</label>
                    </div>
                </div>
            </div>
        `;
    }

    createFeedbackSection(studentId, homework) {
        return `
            <div class="feedback-section">
                <div class="homework-label">💬 피드백</div>
                <textarea class="feedback-textarea"
                          placeholder="학생에게 전달할 피드백을 입력하세요..."
                          onchange="dataManager.updateHomework(${studentId}, 'feedback', this.value)">${homework.feedback || ''}</textarea>
            </div>
        `;
    }

    createActionButtons(studentId, homework) {
        return `
            <div style="display: flex; gap: 8px; margin-top: 10px;">
                <button class="save-btn" onclick="uiManager.saveStudentHomework(${studentId})" style="flex: 1;">
                    💾 저장
                </button>
                <button class="save-btn" onclick="uiManager.showProgressModal(${studentId})" style="flex: 1; background: #fa8c16;">
                    📊 진도관리
                </button>
            </div>
            <div style="display: flex; gap: 8px; margin-top: 8px;">
                <button class="save-btn" onclick="uiManager.copyStudentHomework(${studentId})" style="flex: 1; background: #1890ff;">
                    📋 복사
                </button>
                <button class="save-btn" onclick="uiManager.printStudentHomework(${studentId})" style="flex: 1; background: #722ed1;">
                    🖨️ 인쇄
                </button>
                <button class="save-btn" onclick="uiManager.showHomeworkSummary(${studentId})" style="flex: 1; background: #52c41a;">
                    📄 요약
                </button>
            </div>
            <div style="display: flex; gap: 8px; margin-top: 8px;">
                <button class="save-btn" onclick="feedbackManager.showParentFeedback(${studentId})" style="flex: 1; background: #fa541c;">
                    📨 부모님 피드백
                </button>
                ${homework.finalized ?
                    `<button class="save-btn" style="flex: 1; background: #52c41a; opacity: 0.6;" disabled>
                        ✅ 완료됨
                    </button>` :
                    `<button class="save-btn" onclick="feedbackManager.finalizeStudent(${studentId})" style="flex: 1; background: #13c2c2;">
                        🎯 최종완료
                    </button>`
                }
            </div>
        `;
    }

    toggleClassSection(studentsGrid, toggleBtn) {
        const isExpanded = studentsGrid.classList.contains('expanded');

        if (isExpanded) {
            studentsGrid.classList.remove('expanded');
            toggleBtn.classList.add('collapsed');
        } else {
            studentsGrid.classList.add('expanded');
            toggleBtn.classList.remove('collapsed');
        }
    }

    updateStatistics() {
        const stats = this.dataManager.getStatistics();

        document.getElementById('total-students').textContent = stats.totalStudents;
        document.getElementById('completed-homework').textContent = stats.completedHomework;
        document.getElementById('completion-rate').textContent = `${stats.completionRate}%`;
    }

    // 알림 시스템
    showNotification(message, type = 'success') {
        const notification = document.getElementById('notification');
        notification.textContent = message;
        notification.className = `notification ${type}`;
        notification.classList.add('show');

        setTimeout(() => {
            notification.classList.remove('show');
        }, 3000);
    }

    // 학생별 액션 메서드들
    saveStudentHomework(studentId) {
        this.dataManager.saveToStorage();
        this.showNotification('학생 숙제가 저장되었습니다!', 'success');
    }

    copyStudentHomework(studentId) {
        const student = this.dataManager.studentsData.find(s => s.id === studentId);
        const homework = this.dataManager.getHomeworkForStudent(studentId);
        const progress = this.dataManager.getStudentProgress(studentId);

        const homeworkText = this.formatHomeworkText(student, homework, progress);

        navigator.clipboard.writeText(homeworkText).then(() => {
            this.showNotification(`${student.name} 학생의 숙제가 클립보드에 복사되었습니다!`, 'success');
        }).catch(err => {
            console.error('복사 실패:', err);
            this.showNotification('복사에 실패했습니다.', 'error');
        });
    }

    formatHomeworkText(student, homework, progress) {
        const specialClasses = ['가니메데', '유로파 A', '유로파 B', '타이탄 A', '타이탄 B'];
        const isSpecialClass = specialClasses.includes(student.class);

        let text = `📚 ${student.name} (${student.school} ${student.grade}) - ${this.dataManager.currentDate}\n\n`;

        if (isSpecialClass) {
            if (homework.vocabularyTest) text += `📝 어휘시험: ${homework.vocabularyTest}\n`;
            if (homework.phonics) text += `🔤 소리: ${homework.phonics}\n`;
            if (homework.reading) text += `📚 원서수업: ${homework.reading}\n`;
            if (homework.grammar) text += `📖 문법: ${homework.grammar}\n`;
            if (homework.quizletEnabled && homework.quizletUrl) text += `🎯 퀴즐릿: ${homework.quizletUrl}\n`;
        } else {
            if (homework.vocabulary) text += `📝 어휘: ${this.dataManager.formatVocabularyText(homework.vocabulary)}\n`;
            if (homework.phonics) text += `🔤 소리: ${this.dataManager.formatPhonicsText(homework.phonics)}\n`;
            if (homework.reading) text += `📚 독서: ${homework.reading}\n`;
            if (homework.other) text += `📋 기타: ${homework.other}\n`;
            if (homework.grammar) text += `📖 문법: ${homework.grammar}\n`;
        }

        if (homework.feedback) text += `\n💬 피드백: ${homework.feedback}`;

        return text;
    }

    // 진도 관리 모달
    showProgressModal(studentId) {
        const student = this.dataManager.studentsData.find(s => s.id === studentId);
        const progress = this.dataManager.getStudentProgress(studentId);

        const modal = document.createElement('div');
        modal.style.cssText = `
            position: fixed; top: 0; left: 0; width: 100%; height: 100%;
            background: rgba(0,0,0,0.5); z-index: 1000; display: flex;
            align-items: center; justify-content: center;
        `;

        modal.innerHTML = `
            <div style="background: white; border-radius: 8px; padding: 20px; max-width: 400px; width: 90%;">
                <h3 style="margin-bottom: 20px;">${student.name} 학생 진도 관리</h3>
                <div style="margin-bottom: 15px;">
                    <label>현재 Unit:</label>
                    <input type="number" id="vocab-unit" value="${progress.vocabulary.currentUnit}" min="1" max="20">
                </div>
                <div style="margin-bottom: 20px;">
                    <label>현재 Stage:</label>
                    <input type="number" id="vocab-stage" value="${progress.vocabulary.currentStage}" min="1" max="3">
                </div>
                <div style="display: flex; gap: 10px;">
                    <button onclick="uiManager.saveProgress(${studentId})" style="flex: 1; padding: 10px; background: #52c41a; color: white; border: none; border-radius: 4px;">저장</button>
                    <button onclick="uiManager.closeProgressModal()" style="flex: 1; padding: 10px; background: #d9d9d9; color: #666; border: none; border-radius: 4px;">취소</button>
                </div>
            </div>
        `;

        document.body.appendChild(modal);
        this.currentModal = modal;
    }

    saveProgress(studentId) {
        const vocabUnit = parseInt(document.getElementById('vocab-unit').value);
        const vocabStage = parseInt(document.getElementById('vocab-stage').value);

        const progressData = {
            vocabulary: { currentUnit: vocabUnit, currentStage: vocabStage, currentPart: 1 }
        };

        this.dataManager.updateStudentProgress(studentId, progressData);
        this.closeProgressModal();
        this.renderStudents();
        this.showNotification('진도가 업데이트되었습니다!', 'success');
    }

    closeProgressModal() {
        if (this.currentModal) {
            document.body.removeChild(this.currentModal);
            this.currentModal = null;
        }
    }

    showHomeworkSummary(studentId) {
        const student = this.dataManager.studentsData.find(s => s.id === studentId);
        const homework = this.dataManager.getHomeworkForStudent(studentId);
        const progress = this.dataManager.getStudentProgress(studentId);

        const summaryText = this.formatHomeworkText(student, homework, progress);

        const modal = document.createElement('div');
        modal.style.cssText = `
            position: fixed; top: 0; left: 0; width: 100%; height: 100%;
            background: rgba(0,0,0,0.5); z-index: 1000; display: flex;
            align-items: center; justify-content: center; padding: 20px;
        `;

        modal.innerHTML = `
            <div style="background: white; border-radius: 8px; padding: 20px; max-width: 500px; width: 100%;">
                <h3 style="margin-bottom: 15px;">${student.name} 학생 숙제 요약</h3>
                <pre style="background: #f5f5f5; padding: 15px; border-radius: 6px; white-space: pre-wrap; font-family: inherit; max-height: 400px; overflow-y: auto;">${summaryText}</pre>
                <div style="margin-top: 15px; text-align: right;">
                    <button onclick="uiManager.closeModal()" style="padding: 8px 16px; background: #d9d9d9; color: #666; border: none; border-radius: 4px;">닫기</button>
                </div>
            </div>
        `;

        document.body.appendChild(modal);
        this.currentModal = modal;
    }

    printStudentHomework(studentId) {
        const student = this.dataManager.studentsData.find(s => s.id === studentId);
        const homework = this.dataManager.getHomeworkForStudent(studentId);
        const progress = this.dataManager.getStudentProgress(studentId);

        const printContent = this.formatHomeworkText(student, homework, progress);

        const printWindow = window.open('', '_blank');
        printWindow.document.write(`
            <!DOCTYPE html>
            <html>
            <head>
                <title>${student.name} 학생 숙제</title>
                <style>
                    body { font-family: Arial, sans-serif; line-height: 1.6; padding: 20px; }
                    pre { white-space: pre-wrap; }
                </style>
            </head>
            <body>
                <pre>${printContent}</pre>
                <script>window.print(); window.close();</script>
            </body>
            </html>
        `);
        printWindow.document.close();
    }

    closeModal() {
        if (this.currentModal) {
            document.body.removeChild(this.currentModal);
            this.currentModal = null;
        }
    }
}

// 전역 인스턴스 생성 (데이터 매니저가 로드된 후)
document.addEventListener('DOMContentLoaded', () => {
    window.uiManager = new UIManager(window.dataManager);
});