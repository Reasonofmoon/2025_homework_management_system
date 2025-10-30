# React 마이그레이션 가이드

## 📋 React 아키텍처 설계

### 1. 프로젝트 구조

```
homework-system-react/
├── public/
│   ├── index.html
│   └── favicon.ico
├── src/
│   ├── components/
│   │   ├── common/
│   │   │   ├── Button.jsx
│   │   │   ├── Input.jsx
│   │   │   ├── Select.jsx
│   │   │   ├── Modal.jsx
│   │   │   ├── Notification.jsx
│   │   │   └── Loading.jsx
│   │   ├── layout/
│   │   │   ├── Header.jsx
│   │   │   ├── Sidebar.jsx
│   │   │   └── Footer.jsx
│   │   ├── student/
│   │   │   ├── StudentCard.jsx
│   │   │   ├── StudentList.jsx
│   │   │   ├── StudentForm.jsx
│   │   │   └── StudentModal.jsx
│   │   ├── homework/
│   │   │   ├── HomeworkForm.jsx
│   │   │   ├── HomeworkItem.jsx
│   │   │   ├── VocabularySelector.jsx
│   │   │   ├── PhonicsSelector.jsx
│   │   │   └── QuizletSection.jsx
│   │   ├── progress/
│   │   │   ├── ProgressTracker.jsx
│   │   │   ├── ProgressChart.jsx
│   │   │   └── ProgressModal.jsx
│   │   ├── feedback/
│   │   │   ├── FeedbackGenerator.jsx
│   │   │   ├── FeedbackPreview.jsx
│   │   │   └── ParentFeedback.jsx
│   │   ├── statistics/
│   │   │   ├── StatsBar.jsx
│   │   │   ├── ClassStats.jsx
│   │   │   └── StudentStats.jsx
│   │   └── export/
│   │       ├── ExportButton.jsx
│   │       ├── CSVExporter.jsx
│   │       └── PrintPreview.jsx
│   ├── hooks/
│   │   ├── useStudents.js
│   │   ├── useHomework.js
│   │   ├── useProgress.js
│   │   ├── useFeedback.js
│   │   ├── useLocalStorage.js
│   │   ├── useAutoSave.js
│   │   └── useNotification.js
│   ├── context/
│   │   ├── AppContext.jsx
│   │   ├── StudentContext.jsx
│   │   ├── HomeworkContext.jsx
│   │   └── ThemeContext.jsx
│   ├── services/
│   │   ├── dataService.js
│   │   ├── storageService.js
│   │   ├── exportService.js
│   │   ├── feedbackService.js
│   │   └── syncService.js
│   ├── utils/
│   │   ├── constants.js
│   │   ├── validators.js
│   │   ├── formatters.js
│   │   ├── calculators.js
│   │   └── helpers.js
│   ├── styles/
│   │   ├── global.css
│   │   ├── variables.css
│   │   └── components/
│   ├── App.jsx
│   ├── index.jsx
│   └── setupTests.js
├── package.json
├── .gitignore
├── README.md
└── .env
```

### 2. 핵심 컴포넌트 설계

#### App.jsx - 메인 애플리케이션
```jsx
import React from 'react';
import { AppProvider } from './context/AppContext';
import { StudentProvider } from './context/StudentContext';
import { HomeworkProvider } from './context/HomeworkContext';
import Header from './components/layout/Header';
import Controls from './components/Controls';
import StatsBar from './components/statistics/StatsBar';
import StudentList from './components/student/StudentList';
import Notification from './components/common/Notification';

function App() {
  return (
    <AppProvider>
      <StudentProvider>
        <HomeworkProvider>
          <div className="app-container">
            <Header />
            <main className="main-content">
              <Controls />
              <StatsBar />
              <StudentList />
            </main>
            <Notification />
          </div>
        </HomeworkProvider>
      </StudentProvider>
    </AppProvider>
  );
}

export default App;
```

#### StudentCard.jsx - 학생 카드 컴포넌트
```jsx
import React, { useState, useCallback } from 'react';
import { useHomework } from '../../hooks/useHomework';
import { useProgress } from '../../hooks/useProgress';
import HomeworkForm from '../homework/HomeworkForm';
import ProgressTracker from '../progress/ProgressTracker';
import FeedbackSection from '../feedback/FeedbackSection';
import ActionButtons from './ActionButtons';
import './StudentCard.css';

const StudentCard = ({ student }) => {
  const { homework, updateHomework } = useHomework(student.id);
  const { progress, updateProgress } = useProgress(student.id);
  const [isExpanded, setIsExpanded] = useState(false);

  const isSpecialClass = ['가니메데', '유로파 A', '유로파 B', '타이탄 A', '타이탄 B']
    .includes(student.class);

  const handleHomeworkChange = useCallback((field, value) => {
    updateHomework(student.id, field, value);
  }, [student.id, updateHomework]);

  return (
    <div className={`student-card ${isExpanded ? 'expanded' : ''}`}>
      <div className="student-header">
        <div className="student-info">
          <h3 className="student-name">{student.name}</h3>
          <p className="student-details">
            {student.school} {student.grade}
          </p>
        </div>
        <ProgressTracker progress={progress} compact />
      </div>

      <HomeworkForm
        student={student}
        homework={homework}
        isSpecialClass={isSpecialClass}
        onChange={handleHomeworkChange}
      />

      <FeedbackSection
        studentId={student.id}
        feedback={homework.feedback}
        onChange={(value) => handleHomeworkChange('feedback', value)}
      />

      <ActionButtons
        student={student}
        homework={homework}
        progress={progress}
        onExpand={() => setIsExpanded(!isExpanded)}
      />
    </div>
  );
};

export default React.memo(StudentCard);
```

#### useHomework.js - 숙제 관리 Hook
```jsx
import { useState, useEffect, useCallback } from 'react';
import { useAutoSave } from './useAutoSave';
import { storageService } from '../services/storageService';

export const useHomework = (studentId, date = null) => {
  const [homework, setHomework] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // 자동 저장 Hook
  const { scheduleSave } = useAutoSave();

  // 숙제 데이터 로드
  useEffect(() => {
    const loadHomework = async () => {
      try {
        setLoading(true);
        const data = await storageService.getHomework(studentId, date);
        setHomework(data || getDefaultHomework());
      } catch (err) {
        setError(err.message);
        setHomework(getDefaultHomework());
      } finally {
        setLoading(false);
      }
    };

    loadHomework();
  }, [studentId, date]);

  // 숙제 업데이트
  const updateHomework = useCallback((studentId, field, value) => {
    setHomework(prev => {
      const updated = { ...prev, [field]: value };
      
      // 자동 저장 스케줄링
      scheduleSave(() => {
        storageService.saveHomework(studentId, date, updated);
      });

      return updated;
    });
  }, [date, scheduleSave]);

  // 숙제 초기화
  const resetHomework = useCallback(() => {
    setHomework(getDefaultHomework());
  }, []);

  // 숙제 완료 처리
  const finalizeHomework = useCallback(async () => {
    const finalized = {
      ...homework,
      finalized: true,
      finalizedAt: new Date().toISOString()
    };
    
    await storageService.saveHomework(studentId, date, finalized);
    setHomework(finalized);
  }, [homework, studentId, date]);

  return {
    homework,
    loading,
    error,
    updateHomework,
    resetHomework,
    finalizeHomework
  };
};

// 기본 숙제 데이터
const getDefaultHomework = () => ({
  vocabulary: '',
  vocabularyTest: '',
  phonics: '',
  phonicsProgress: '',
  reading: '',
  grammar: '',
  other: '',
  quizletEnabled: true,
  quizletUrl: '',
  vocabularyPass: true,
  phonicsPass: true,
  quizletPass: true,
  grammarComplete: false,
  prepareQuizlet: true,
  feedback: '',
  finalized: false,
  finalizedAt: null
});
```

#### AppContext.jsx - 전역 상태 관리
```jsx
import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { storageService } from '../services/storageService';

const AppContext = createContext();

// 초기 상태
const initialState = {
  currentDate: new Date().toISOString().split('T')[0],
  selectedClass: 'all',
  theme: 'light',
  notifications: [],
  loading: false,
  error: null
};

// 리듀서
const appReducer = (state, action) => {
  switch (action.type) {
    case 'SET_DATE':
      return { ...state, currentDate: action.payload };
    
    case 'SET_CLASS_FILTER':
      return { ...state, selectedClass: action.payload };
    
    case 'SET_THEME':
      return { ...state, theme: action.payload };
    
    case 'ADD_NOTIFICATION':
      return {
        ...state,
        notifications: [...state.notifications, action.payload]
      };
    
    case 'REMOVE_NOTIFICATION':
      return {
        ...state,
        notifications: state.notifications.filter(n => n.id !== action.payload)
      };
    
    case 'SET_LOADING':
      return { ...state, loading: action.payload };
    
    case 'SET_ERROR':
      return { ...state, error: action.payload };
    
    default:
      return state;
  }
};

// Provider 컴포넌트
export const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, initialState);

  // 테마 적용
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', state.theme);
  }, [state.theme]);

  // 날짜 변경 시 저장
  useEffect(() => {
    storageService.setItem('currentDate', state.currentDate);
  }, [state.currentDate]);

  const value = {
    state,
    dispatch,
    // 헬퍼 함수들
    setDate: (date) => dispatch({ type: 'SET_DATE', payload: date }),
    setClassFilter: (classFilter) => dispatch({ type: 'SET_CLASS_FILTER', payload: classFilter }),
    setTheme: (theme) => dispatch({ type: 'SET_THEME', payload: theme }),
    addNotification: (notification) => {
      const id = Date.now();
      dispatch({ 
        type: 'ADD_NOTIFICATION', 
        payload: { ...notification, id } 
      });
      
      // 3초 후 자동 제거
      setTimeout(() => {
        dispatch({ type: 'REMOVE_NOTIFICATION', payload: id });
      }, 3000);
    },
    setLoading: (loading) => dispatch({ type: 'SET_LOADING', payload: loading }),
    setError: (error) => dispatch({ type: 'SET_ERROR', payload: error })
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

// Custom Hook
export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within AppProvider');
  }
  return context;
};
```

### 3. 서비스 레이어

#### storageService.js - 데이터 저장 서비스
```javascript
class StorageService {
  constructor() {
    this.prefix = 'homework_system_';
    this.version = '1.0';
  }

  // 키 생성
  getKey(key) {
    return `${this.prefix}${key}`;
  }

  // 데이터 저장
  setItem(key, value) {
    try {
      const data = {
        value,
        timestamp: Date.now(),
        version: this.version
      };
      localStorage.setItem(this.getKey(key), JSON.stringify(data));
      return true;
    } catch (error) {
      console.error('Storage save error:', error);
      return false;
    }
  }

  // 데이터 로드
  getItem(key, defaultValue = null) {
    try {
      const item = localStorage.getItem(this.getKey(key));
      if (!item) return defaultValue;

      const data = JSON.parse(item);
      
      // 버전 체크
      if (data.version !== this.version) {
        console.warn('Version mismatch, using default value');
        return defaultValue;
      }

      return data.value;
    } catch (error) {
      console.error('Storage load error:', error);
      return defaultValue;
    }
  }

  // 데이터 삭제
  removeItem(key) {
    try {
      localStorage.removeItem(this.getKey(key));
      return true;
    } catch (error) {
      console.error('Storage remove error:', error);
      return false;
    }
  }

  // 모든 데이터 삭제
  clear() {
    try {
      const keys = Object.keys(localStorage);
      keys.forEach(key => {
        if (key.startsWith(this.prefix)) {
          localStorage.removeItem(key);
        }
      });
      return true;
    } catch (error) {
      console.error('Storage clear error:', error);
      return false;
    }
  }

  // 학생 데이터 관련
  getStudents() {
    return this.getItem('students', []);
  }

  saveStudents(students) {
    return this.setItem('students', students);
  }

  // 숙제 데이터 관련
  getHomework(studentId, date) {
    const allHomework = this.getItem('homework', {});
    return allHomework[date]?.[studentId] || null;
  }

  saveHomework(studentId, date, homework) {
    const allHomework = this.getItem('homework', {});
    
    if (!allHomework[date]) {
      allHomework[date] = {};
    }
    
    allHomework[date][studentId] = homework;
    return this.setItem('homework', allHomework);
  }

  // 진도 데이터 관련
  getProgress(studentId) {
    const allProgress = this.getItem('progress', {});
    return allProgress[studentId] || null;
  }

  saveProgress(studentId, progress) {
    const allProgress = this.getItem('progress', {});
    allProgress[studentId] = progress;
    return this.setItem('progress', allProgress);
  }

  // 백업 및 복구
  exportBackup() {
    const backup = {
      students: this.getStudents(),
      homework: this.getItem('homework', {}),
      progress: this.getItem('progress', {}),
      exportDate: new Date().toISOString(),
      version: this.version
    };

    return backup;
  }

  importBackup(backup) {
    try {
      if (backup.version !== this.version) {
        throw new Error('Version mismatch');
      }

      this.saveStudents(backup.students);
      this.setItem('homework', backup.homework);
      this.setItem('progress', backup.progress);

      return true;
    } catch (error) {
      console.error('Backup import error:', error);
      return false;
    }
  }

  // 용량 체크
  getStorageSize() {
    let total = 0;
    for (let key in localStorage) {
      if (localStorage.hasOwnProperty(key) && key.startsWith(this.prefix)) {
        total += localStorage[key].length + key.length;
      }
    }
    return total;
  }

  // 용량 제한 체크 (5MB)
  isStorageFull() {
    return this.getStorageSize() > 5 * 1024 * 1024;
  }
}

export const storageService = new StorageService();
```

#### feedbackService.js - 피드백 생성 서비스
```javascript
import { vocabularyProgressTracker } from '../utils/calculators';

class FeedbackService {
  constructor() {
    this.templates = {
      greeting: {
        morning: '좋은 아침입니다',
        afternoon: '안녕하세요',
        evening: '안녕하세요'
      },
      performance: {
        excellent: [
          '훌륭합니다! {name} 학생은 모든 과제를 완벽하게 수행했습니다.',
          '대단해요! {name} 학생의 성실한 학습 태도가 돋보입니다.'
        ],
        good: [
          '잘했어요! {name} 학생은 대부분의 과제를 잘 수행했습니다.',
          '좋습니다! {name} 학생의 꾸준한 노력이 보입니다.'
        ],
        needsImprovement: [
          '{name} 학생, 조금 더 집중이 필요합니다.',
          '{name} 학생, 다음 주에는 더 열심히 해봐요!'
        ]
      }
    };
  }

  /**
   * 학생용 피드백 생성
   */
  generateStudentFeedback(student, homework, progress) {
    const sections = [];

    // 인사말
    sections.push(this.getGreeting(student));

    // 오늘의 학습 내용
    sections.push(this.getSummary(homework));

    // 진도 정보
    if (progress) {
      sections.push(this.getProgressInfo(progress));
    }

    // 평가 결과
    sections.push(this.getEvaluation(homework));

    // 피드백
    if (homework.feedback) {
      sections.push(`\n💬 선생님 피드백\n${homework.feedback}`);
    }

    return sections.join('\n\n');
  }

  /**
   * 부모님용 피드백 생성
   */
  generateParentFeedback(student, homework, progress, history = []) {
    const sections = [];

    // 인사말
    sections.push(`${this.getTimeGreeting()}, ${student.name} 학생의 학부모님!`);

    // 학생 정보
    sections.push(this.getStudentInfo(student));

    // 오늘의 학습 활동
    sections.push(this.getDetailedSummary(homework));

    // 진도 정보
    if (progress) {
      sections.push(this.getDetailedProgress(progress));
    }

    // 평가 결과
    sections.push(this.getDetailedEvaluation(homework));

    // 학습 권장사항
    sections.push(this.getRecommendations(student, homework, progress, history));

    // 종합 평가
    sections.push(this.getOverallAssessment(homework, history));

    // 마무리
    sections.push('궁금하신 점이 있으시면 언제든지 연락주세요. 감사합니다. 😊');

    return sections.join('\n\n');
  }

  getTimeGreeting() {
    const hour = new Date().getHours();
    if (hour < 12) return '좋은 아침입니다';
    if (hour < 18) return '안녕하세요';
    return '안녕하세요';
  }

  getGreeting(student) {
    return `안녕하세요, ${student.name} 학생!`;
  }

  getStudentInfo(student) {
    return `👤 학생 정보
• 이름: ${student.name}
• 학교: ${student.school}
• 학년: ${student.grade}
• 반: ${student.class}`;
  }

  getSummary(homework) {
    const tasks = [];
    
    if (homework.vocabulary || homework.vocabularyTest) {
      tasks.push('어휘 학습');
    }
    if (homework.phonics) {
      tasks.push('소리 훈련');
    }
    if (homework.reading) {
      tasks.push('독서/원서 수업');
    }
    if (homework.grammar) {
      tasks.push('문법 학습');
    }

    return `📚 오늘의 학습\n${tasks.join(', ')}을 진행했습니다.`;
  }

  getDetailedSummary(homework) {
    const details = [];

    if (homework.vocabulary || homework.vocabularyTest) {
      details.push(`📝 어휘: ${homework.vocabulary || homework.vocabularyTest}`);
    }
    if (homework.phonics) {
      details.push(`🔤 소리: ${homework.phonics}`);
      if (homework.phonicsProgress) {
        details.push(`   다음 진도: ${homework.phonicsProgress}`);
      }
    }
    if (homework.reading) {
      details.push(`📚 독서/원서: ${homework.reading}`);
    }
    if (homework.grammar) {
      details.push(`📖 문법: ${homework.grammar}`);
    }
    if (homework.other) {
      details.push(`📋 기타: ${homework.other}`);
    }

    return `📝 오늘의 학습 활동\n${details.join('\n')}`;
  }

  getProgressInfo(progress) {
    const stats = vocabularyProgressTracker.getStatistics(progress);
    
    return `📊 현재 진도
Unit ${progress.vocabulary.currentUnit} - Stage ${progress.vocabulary.currentStage}
진도율: ${stats.progressRate}%`;
  }

  getDetailedProgress(progress) {
    const stats = vocabularyProgressTracker.getStatistics(progress);
    
    return `📊 학습 진도
• 현재 위치: Unit ${progress.vocabulary.currentUnit} - Stage ${progress.vocabulary.currentStage}
• 학습한 단어: ${stats.learnedWords}개 / ${stats.totalWords}개
• 진도율: ${stats.progressRate}%
• 예상 완료: 약 ${stats.estimatedCompletionDays}일 후`;
  }

  getEvaluation(homework) {
    const results = [];

    if (homework.vocabularyPass !== undefined) {
      results.push(`📝 어휘: ${homework.vocabularyPass ? '✅ 합격' : '❌ 재도전'}`);
    }
    if (homework.phonicsPass !== undefined) {
      results.push(`🔤 소리: ${homework.phonicsPass ? '✅ 합격' : '❌ 재도전'}`);
    }
    if (homework.grammarComplete !== undefined) {
      results.push(`📖 문법: ${homework.grammarComplete ? '✅ 완료' : '⏳ 미완료'}`);
    }
    if (homework.quizletPass !== undefined) {
      results.push(`🎯 퀴즐릿: ${homework.quizletPass ? '✅ 합격' : '❌ 재도전'}`);
    }

    return `📊 평가 결과\n${results.join('\n')}`;
  }

  getDetailedEvaluation(homework) {
    const results = [];

    if (homework.vocabularyPass !== undefined) {
      const status = homework.vocabularyPass ? '✅ 합격' : '❌ 미달';
      const comment = homework.vocabularyPass 
        ? '훌륭합니다!' 
        : '추가 학습이 필요합니다.';
      results.push(`• 어휘 시험: ${status} - ${comment}`);
    }

    if (homework.phonicsPass !== undefined) {
      const status = homework.phonicsPass ? '✅ 합격' : '❌ 미달';
      const comment = homework.phonicsPass 
        ? '발음이 정확합니다!' 
        : '발음 연습을 더 하세요.';
      results.push(`• 소리 훈련: ${status} - ${comment}`);
    }

    if (homework.grammarComplete !== undefined) {
      const status = homework.grammarComplete ? '✅ 완료' : '❌ 미완료';
      const comment = homework.grammarComplete 
        ? '성실하게 완료했습니다!' 
        : '숙제를 완료해주세요.';
      results.push(`• 문법 숙제: ${status} - ${comment}`);
    }

    if (homework.quizletPass !== undefined) {
      const status = homework.quizletPass ? '✅ 합격' : '❌ 미달';
      const comment = homework.quizletPass 
        ? '퀴즐릿 학습을 잘 했습니다!' 
        : '퀴즐릿 복습이 필요합니다.';
      results.push(`• 퀴즐릿: ${status} - ${comment}`);
    }

    return `📊 평가 결과\n${results.join('\n')}`;
  }

  getRecommendations(student, homework, progress, history) {
    const recommendations = [];

    // 진도 기반 추천
    if (progress) {
      const nextStep = vocabularyProgressTracker.getNextStep(
        progress, 
        homework.vocabularyPass
      );
      recommendations.push(`📚 다음 학습: ${nextStep.message}`);
    }

    // 약점 분석
    if (!homework.vocabularyPass) {
      recommendations.push('💡 어휘 복습: 틀린 단어를 집중적으로 복습하세요');
    }

    if (!homework.phonicsPass) {
      recommendations.push('🔊 발음 연습: 소리 훈련 영상을 반복해서 시청하세요');
    }

    if (!homework.grammarComplete) {
      recommendations.push('📖 문법 숙제: 문법 숙제를 완료해주세요');
    }

    // 학습 패턴 분석
    if (history.length >= 3) {
      const recentPasses = history.slice(-3).filter(h => h.vocabularyPass).length;
      
      if (recentPasses === 3) {
        recommendations.push('🌟 연속 합격! 이 페이스를 유지하세요!');
      } else if (recentPasses === 0) {
        recommendations.push('⚠️ 학습 방법 점검이 필요합니다. 선생님과 상담하세요.');
      }
    }

    return `💡 학습 권장사항\n${recommendations.join('\n')}`;
  }

  getOverallAssessment(homework, history) {
    const completionRate = this.calculateCompletionRate(homework);
    
    let assessment = '';
    
    if (completionRate >= 90) {
      assessment = '🌟 우수: 오늘 모든 학습 활동을 훌륭하게 수행했습니다!';
      assessment += '\n이 조조로 꾸준히 학습하면 실력이 크게 향상될 것입니다.';
    } else if (completionRate >= 70) {
      assessment = '👍 양호: 대부분의 학습 활동을 잘 수행했습니다.';
      assessment += '\n조금 더 집중하여 완성도를 높여보세요.';
    } else {
      assessment = '📢 관심필요: 학습 참여도가 아쉽습니다.';
      assessment += '\n선생님과 상담을 통해 학습 방법을 점검해보시기 바랍니다.';
    }

    return `🎯 종합 평가 (${completionRate}%)\n${assessment}`;
  }

  calculateCompletionRate(homework) {
    let completed = 0;
    let total = 0;

    const tasks = [
      { field: 'vocabulary', pass: 'vocabularyPass' },
      { field: 'vocabularyTest', pass: 'vocabularyPass' },
      { field: 'phonics', pass: 'phonicsPass' },
      { field: 'reading', pass: true },
      { field: 'grammar', pass: 'grammarComplete' }
    ];

    tasks.forEach(task => {
      if (homework[task.field]) {
        total++;
        const passField = typeof task.pass === 'string' ? task.pass : null;
        if (!passField || homework[passField] !== false) {
          completed++;
        }
      }
    });

    return total > 0 ? Math.round((completed / total) * 100) : 100;
  }
}

export const feedbackService = new FeedbackService();
```

### 4. 유틸리티 함수

#### calculators.js - 계산 유틸리티
```javascript
/**
 * 입체어휘 4000 진도 추적기
 */
export class VocabularyProgressTracker {
  constructor() {
    this.structure = {
      totalUn
