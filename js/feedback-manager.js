/**
 * 피드백 관리 모듈
 * 부모님 피드백 생성 및 관리
 */

class FeedbackManager {
    constructor(dataManager) {
        this.dataManager = dataManager;
        this.currentModal = null;
    }

    // 부모님 피드백 생성
    generateParentFeedback(studentId) {
        const student = this.dataManager.studentsData.find(s => s.id === studentId);
        const homework = this.dataManager.getHomeworkForStudent(studentId);
        const progress = this.dataManager.getStudentProgress(studentId);
        const specialClasses = ['가니메데', '유로파 A', '유로파 B', '타이탄 A', '타이탄 B'];
        const isSpecialClass = specialClasses.includes(student.class);

        // 현재 날짜 포맷팅
        const today = new Date();
        const dateStr = today.toLocaleDateString('ko-KR', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            weekday: 'long'
        });

        let feedback = `📚 ${student.name} 학생 오늘의 학습 결과 (${dateStr})\n\n`;
        feedback += `안녕하세요, ${student.name} 학생의 학부모님! 오늘 ${student.name} 학생의 수업 참여와 과제 수행 결과를 말씀드립니다.\n\n`;

        // 기본 정보
        feedback += `👤 학생 정보\n`;
        feedback += `• 이름: ${student.name}\n`;
        feedback += `• 학교: ${student.school}\n`;
        feedback += `• 학년: ${student.grade}\n`;
        feedback += `• 반: ${student.class}\n\n`;

        // 학습 활동별 피드백
        feedback += `📝 오늘의 학습 활동\n`;

        if (isSpecialClass) {
            feedback += this.generateSpecialClassFeedback(homework);
        } else {
            feedback += this.generateRegularClassFeedback(homework);
        }

        // 진도 정보
        if (progress && progress.vocabulary) {
            feedback += `\n📊 현재 진도\n`;
            feedback += `• 어휘 진도: Unit ${progress.vocabulary.currentUnit} - Stage ${progress.vocabulary.currentStage}\n`;
        }

        // 종합 평가 및 권장사항
        feedback += this.generateEvaluationAndRecommendations(homework, isSpecialClass);

        // 개인별 피드백이 있으면 추가
        if (homework.feedback && homework.feedback.trim()) {
            feedback += `\n💬 선생님 개별 피드백\n`;
            feedback += `${homework.feedback}\n`;
        }

        feedback += `\n📞 문의사항이 있으시면 언제든지 연락주세요.\n`;
        feedback += `감사합니다. 😊\n`;

        return feedback;
    }

    generateSpecialClassFeedback(homework) {
        let feedback = '';

        if (homework.vocabularyTest) {
            const passStatus = homework.vocabularyPass ? '✅ 합격' : '❌ 미달';
            feedback += `• 어휘시험: ${homework.vocabularyTest} (${passStatus})\n`;
            if (!homework.vocabularyPass) {
                feedback += `  → 추가 학습이 필요합니다. 복습을 통해 실력을 키워보세요.\n`;
            }
        }

        if (homework.phonics) {
            const passStatus = homework.phonicsPass ? '✅ 합격' : '❌ 미달';
            const phonicsText = this.dataManager.formatPhonicsText(homework.phonics) || homework.phonics;
            feedback += `• 소리 훈련: ${phonicsText} (${passStatus})\n`;
            if (homework.phonicsProgress) {
                feedback += `  → 다음 진도: ${homework.phonicsProgress}\n`;
            }
            if (!homework.phonicsPass) {
                feedback += `  → 발음 연습을 더 하시길 권합니다.\n`;
            }
        }

        if (homework.reading) {
            feedback += `• 원서 수업: ${homework.reading}\n`;
            feedback += `  → 독서를 통해 어휘력과 독해력이 향상되고 있습니다.\n`;
        }

        if (homework.grammar) {
            const completeStatus = homework.grammarComplete ? '✅ 완료' : '❌ 미완료';
            feedback += `• 문법 학습: ${homework.grammar} (${completeStatus})\n`;
            if (!homework.grammarComplete) {
                feedback += `  → 문법 숙제를 완료해주시기 바랍니다.\n`;
            }
        }

        // 퀴즐릿 관련
        if (homework.quizletEnabled && homework.quizletUrl) {
            const quizletStatus = homework.quizletPass ? '✅ 합격' : '❌ 미달';
            feedback += `• 퀴즐릿 학습: 활성화됨 (${quizletStatus})\n`;
            feedback += `  → 링크: ${homework.quizletUrl}\n`;
            if (!homework.quizletPass) {
                feedback += `  → 퀴즐릿을 통한 추가 복습이 필요합니다.\n`;
            }
        }

        return feedback;
    }

    generateRegularClassFeedback(homework) {
        let feedback = '';

        if (homework.vocabulary) {
            const vocabText = this.dataManager.formatVocabularyText(homework.vocabulary) || homework.vocabulary;
            feedback += `• 어휘 학습: ${vocabText}\n`;
        }

        if (homework.phonics) {
            const phonicsText = this.dataManager.formatPhonicsText(homework.phonics) || homework.phonics;
            feedback += `• 소리 훈련: ${phonicsText}\n`;
        }

        if (homework.reading) {
            feedback += `• 독서/원서: ${homework.reading}\n`;
        }

        if (homework.other) {
            feedback += `• 기타 활동: ${homework.other}\n`;
        }

        return feedback;
    }

    generateEvaluationAndRecommendations(homework, isSpecialClass) {
        let feedback = `\n🎯 종합 평가 및 권장사항\n`;

        let completedTasks = 0;
        let totalTasks = 0;

        if (isSpecialClass) {
            if (homework.vocabularyTest) {
                totalTasks++;
                if (homework.vocabularyPass) completedTasks++;
            }
            if (homework.phonics) {
                totalTasks++;
                if (homework.phonicsPass) completedTasks++;
            }
            if (homework.reading) {
                totalTasks++;
                completedTasks++;
            }
            if (homework.grammar) {
                totalTasks++;
                if (homework.grammarComplete) completedTasks++;
            }
            if (homework.quizletEnabled) {
                totalTasks++;
                if (homework.quizletPass) completedTasks++;
            }
        } else {
            if (homework.vocabulary) { totalTasks++; completedTasks++; }
            if (homework.phonics) { totalTasks++; completedTasks++; }
            if (homework.reading) { totalTasks++; completedTasks++; }
            if (homework.other) { totalTasks++; completedTasks++; }
        }

        const completionRate = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 100;

        if (completionRate >= 90) {
            feedback += `• 🌟 우수: 오늘 모든 학습 활동을 훌륭하게 수행했습니다! (${completionRate}%)\n`;
            feedback += `• 이 조조로 꾸준히 학습하면 실력이 크게 향상될 것입니다.\n`;
        } else if (completionRate >= 70) {
            feedback += `• 👍 양호: 대부분의 학습 활동을 잘 수행했습니다. (${completionRate}%)\n`;
            feedback += `• 조금 더 집중하여 완성도를 높여보세요.\n`;
        } else {
            feedback += `• 📢 관심필요: 학습 참여도가 아쉽습니다. (${completionRate}%)\n`;
            feedback += `• 선생님과 상담을 통해 학습 방법을 점검해보시기 바랍니다.\n`;
        }

        return feedback;
    }

    // 부모님 피드백 표시 모달
    showParentFeedback(studentId) {
        const student = this.dataManager.studentsData.find(s => s.id === studentId);
        const feedback = this.generateParentFeedback(studentId);

        const modal = document.createElement('div');
        modal.style.cssText = `
            position: fixed; top: 0; left: 0; width: 100%; height: 100%;
            background: rgba(0,0,0,0.5); z-index: 1000; display: flex;
            align-items: center; justify-content: center; padding: 20px;
        `;

        modal.innerHTML = `
            <div style="background: white; border-radius: 8px; padding: 20px; max-width: 600px;
                       width: 100%; max-height: 80vh; overflow-y: auto; box-shadow: 0 4px 12px rgba(0,0,0,0.15);">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px;">
                    <h3 style="margin: 0; color: #1890ff;">📨 ${student.name} 학생 부모님 피드백</h3>
                    <button onclick="feedbackManager.closeParentFeedbackModal()" style="background: none; border: none; font-size: 20px; cursor: pointer;">✖️</button>
                </div>
                <div style="background: #f5f5f5; padding: 15px; border-radius: 6px; margin-bottom: 20px; white-space: pre-line; font-family: monospace; font-size: 13px; line-height: 1.6;">${feedback}</div>
                <div style="display: flex; gap: 10px; justify-content: flex-end;">
                    <button onclick="feedbackManager.copyParentFeedback(${studentId})" style="padding: 8px 16px; background: #1890ff; color: white; border: none; border-radius: 4px; cursor: pointer;">
                        📋 클립보드 복사
                    </button>
                    <button onclick="feedbackManager.finalizeStudent(${studentId})" style="padding: 8px 16px; background: #52c41a; color: white; border: none; border-radius: 4px; cursor: pointer;">
                        ✅ 최종 완료
                    </button>
                    <button onclick="feedbackManager.closeParentFeedbackModal()" style="padding: 8px 16px; background: #d9d9d9; color: #666; border: none; border-radius: 4px; cursor: pointer;">
                        닫기
                    </button>
                </div>
            </div>
        `;

        document.body.appendChild(modal);
        this.currentModal = modal;
    }

    // 부모님 피드백 클립보드 복사
    copyParentFeedback(studentId) {
        const feedback = this.generateParentFeedback(studentId);
        const student = this.dataManager.studentsData.find(s => s.id === studentId);

        navigator.clipboard.writeText(feedback).then(() => {
            window.uiManager.showNotification(`${student.name} 학생의 부모님 피드백이 클립보드에 복사되었습니다!`, 'success');
        }).catch(err => {
            console.error('복사 실패:', err);
            window.uiManager.showNotification('복사에 실패했습니다.', 'error');
        });
    }

    // 부모님 피드백 모달 닫기
    closeParentFeedbackModal() {
        if (this.currentModal) {
            document.body.removeChild(this.currentModal);
            this.currentModal = null;
        }
    }

    // 학생 최종 완료 처리
    finalizeStudent(studentId) {
        const student = this.dataManager.studentsData.find(s => s.id === studentId);

        // 최종 완료 표시 추가
        this.dataManager.updateHomework(studentId, 'finalized', true);
        this.dataManager.updateHomework(studentId, 'finalizedAt', new Date().toISOString());

        // UI 업데이트
        window.uiManager.renderStudents();

        window.uiManager.showNotification(`${student.name} 학생이 최종 완료되었습니다! 부모님께 피드백을 전달해주세요.`, 'success');
        this.closeParentFeedbackModal();
    }
}

// 전역 인스턴스 생성
document.addEventListener('DOMContentLoaded', () => {
    window.feedbackManager = new FeedbackManager(window.dataManager);
});