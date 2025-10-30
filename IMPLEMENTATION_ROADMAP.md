# 구현 로드맵 및 GitHub 배포 가이드

## 📅 마이그레이션 단계별 계획

### Phase 1: 프로젝트 설정 (1-2일)

#### 1.1 React 프로젝트 초기화
```bash
# Create React App 사용
npx create-react-app homework-system-react
cd homework-system-react

# 또는 Vite 사용 (더 빠름)
npm create vite@latest homework-system-react -- --template react
cd homework-system-react
npm install
```

#### 1.2 필수 패키지 설치
```bash
# 상태 관리
npm install zustand  # 또는 redux toolkit

# 라우팅 (필요시)
npm install react-router-dom

# UI 라이브러리 (선택사항)
npm install @mui/material @emotion/react @emotion/styled
# 또는
npm install antd

# 유틸리티
npm install date-fns lodash
npm install classnames

# 데이터 검증
npm install yup
npm install react-hook-form

# 차트 (통계용)
npm install recharts

# 파일 다운로드
npm install file-saver
npm install papaparse  # CSV 처리

# 개발 도구
npm install -D eslint prettier
npm install -D @testing-library/react @testing-library/jest-dom
```

#### 1.3 프로젝트 구조 생성
```bash
mkdir -p src/{components,hooks,context,services,utils,styles}
mkdir -p src/components/{common,layout,student,homework,progress,feedback,statistics,export}
```

### Phase 2: 핵심 기능 마이그레이션 (3-5일)

#### 2.1 데이터 레이어 구현
- [ ] storageService.js 구현
- [ ] dataService.js 구현
- [ ] 데이터 모델 정의
- [ ] LocalStorage 마이그레이션 스크립트

#### 2.2 Context 및 Hooks 구현
- [ ] AppContext 구현
- [ ] StudentContext 구현
- [ ] HomeworkContext 구현
- [ ] useStudents Hook
- [ ] useHomework Hook
- [ ] useProgress Hook
- [ ] useAutoSave Hook

#### 2.3 공통 컴포넌트 구현
- [ ] Button 컴포넌트
- [ ] Input 컴포넌트
- [ ] Select 컴포넌트
- [ ] Modal 컴포넌트
- [ ] Notification 컴포넌트
- [ ] Loading 컴포넌트

### Phase 3: UI 컴포넌트 구현 (5-7일)

#### 3.1 레이아웃 컴포넌트
- [ ] Header 컴포넌트
- [ ] Controls 컴포넌트
- [ ] StatsBar 컴포넌트

#### 3.2 학생 관련 컴포넌트
- [ ] StudentCard 컴포넌트
- [ ] StudentList 컴포넌트
- [ ] StudentForm 컴포넌트
- [ ] StudentModal 컴포넌트

#### 3.3 숙제 관련 컴포넌트
- [ ] HomeworkForm 컴포넌트
- [ ] VocabularySelector 컴포넌트
- [ ] PhonicsSelector 컴포넌트
- [ ] QuizletSection 컴포넌트

#### 3.4 진도 및 피드백 컴포넌트
- [ ] ProgressTracker 컴포넌트
- [ ] ProgressModal 컴포넌트
- [ ] FeedbackGenerator 컴포넌트
- [ ] ParentFeedback 컴포넌트

### Phase 4: 고급 기능 구현 (3-4일)

#### 4.1 내보내기 기능
- [ ] CSV 내보내기
- [ ] 인쇄 기능
- [ ] 반별 숙제 복사
- [ ] 백업/복구 기능

#### 4.2 통계 및 분석
- [ ] 학생별 통계
- [ ] 반별 통계
- [ ] 진도 차트
- [ ] 완료율 대시보드

#### 4.3 최적화
- [ ] React.memo 적용
- [ ] useMemo/useCallback 최적화
- [ ] 코드 스플리팅
- [ ] 이미지 최적화

### Phase 5: 테스트 및 디버깅 (2-3일)

#### 5.1 단위 테스트
```javascript
// StudentCard.test.jsx
import { render, screen, fireEvent } from '@testing-library/react';
import StudentCard from './StudentCard';

describe('StudentCard', () => {
  const mockStudent = {
    id: 1,
    name: '테스트학생',
    class: '칼리스토 A',
    school: '테스트초',
    grade: '초5'
  };

  test('학생 정보가 올바르게 표시됨', () => {
    render(<StudentCard student={mockStudent} />);
    expect(screen.getByText('테스트학생')).toBeInTheDocument();
    expect(screen.getByText('테스트초 초5')).toBeInTheDocument();
  });

  test('숙제 입력이 정상 작동함', () => {
    render(<StudentCard student={mockStudent} />);
    const input = screen.getByPlaceholderText('어휘 내용을 입력하세요');
    fireEvent.change(input, { target: { value: 'Unit 1 - 1차' } });
    expect(input.value).toBe('Unit 1 - 1차');
  });
});
```

#### 5.2 통합 테스트
- [ ] 데이터 흐름 테스트
- [ ] 사용자 시나리오 테스트
- [ ] 크로스 브라우저 테스트

#### 5.3 성능 테스트
- [ ] Lighthouse 점수 확인
- [ ] 번들 크기 최적화
- [ ] 렌더링 성능 측정

### Phase 6: 배포 준비 (1-2일)

#### 6.1 빌드 최적화
```javascript
// vite.config.js (Vite 사용 시)
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          utils: ['date-fns', 'lodash']
        }
      }
    },
    chunkSizeWarningLimit: 1000
  }
});
```

#### 6.2 환경 변수 설정
```bash
# .env.production
REACT_APP_VERSION=1.0.0
REACT_APP_API_URL=https://api.example.com
REACT_APP_STORAGE_PREFIX=homework_system_
```

---

## 🚀 GitHub 배포 전략

### 1. Git 저장소 설정

#### 1.1 .gitignore 설정
```gitignore
# dependencies
/node_modules
/.pnp
.pnp.js

# testing
/coverage

# production
/build
/dist

# misc
.DS_Store
.env.local
.env.development.local
.env.test.local
.env.production.local

npm-debug.log*
yarn-debug.log*
yarn-error.log*

# IDE
.vscode/
.idea/
*.swp
*.swo

# OS
Thumbs.db
```

#### 1.2 초기 커밋
```bash
# Git 초기화
git init

# 원격 저장소 연결
git remote add origin https://github.com/Reasonofmoon/2025_homework_management_system.git

# 초기 커밋
git add .
git commit -m "Initial commit: React migration setup"

# 메인 브랜치로 푸시
git branch -M main
git push -u origin main
```

### 2. 브랜치 전략

#### 2.1 브랜치 구조
```
main (production)
  ├── develop (development)
  │   ├── feature/student-management
  │   ├── feature/homework-system
  │   ├── feature/progress-tracking
  │   └── feature/feedback-generator
  └── hotfix/critical-bug
```

#### 2.2 브랜치 생성 및 작업
```bash
# 개발 브랜치 생성
git checkout -b develop

# 기능 브랜치 생성
git checkout -b feature/student-management

# 작업 후 커밋
git add .
git commit -m "feat: Add student CRUD operations"

# develop에 병합
git checkout develop
git merge feature/student-management

# 원격에 푸시
git push origin develop
```

### 3. 커밋 메시지 컨벤션

```
feat: 새로운 기능 추가
fix: 버그 수정
docs: 문서 수정
style: 코드 포맷팅, 세미콜론 누락 등
refactor: 코드 리팩토링
test: 테스트 코드 추가
chore: 빌드 업무 수정, 패키지 매니저 수정

예시:
feat: Add student card component
fix: Fix progress calculation bug
docs: Update README with installation guide
refactor: Optimize homework data structure
```

### 4. GitHub Actions CI/CD 설정

#### 4.1 자동 테스트 및 빌드
```yaml
# .github/workflows/ci.yml
name: CI

on:
  push:
    branches: [ main, develop ]
  pull_request:
    branches: [ main, develop ]

jobs:
  test:
    runs-on: ubuntu-latest
    
    steps:
    - uses: actions/checkout@v3
    
    - name: Setup Node.js
      uses: actions/setup-node@v3
      with:
        node-version: '18'
        cache: 'npm'
    
    - name: Install dependencies
      run: npm ci
    
    - name: Run tests
      run: npm test -- --coverage
    
    - name: Run linter
      run: npm run lint
    
    - name: Build
      run: npm run build
    
    - name: Upload coverage
      uses: codecov/codecov-action@v3
      with:
        files: ./coverage/lcov.info
```

#### 4.2 자동 배포 (GitHub Pages)
```yaml
# .github/workflows/deploy.yml
name: Deploy to GitHub Pages

on:
  push:
    branches: [ main ]

jobs:
  deploy:
    runs-on: ubuntu-latest
    
    steps:
    - uses: actions/checkout@v3
    
    - name: Setup Node.js
      uses: actions/setup-node@v3
      with:
        node-version: '18'
        cache: 'npm'
    
    - name: Install dependencies
      run: npm ci
    
    - name: Build
      run: npm run build
      env:
        PUBLIC_URL: /2025_homework_management_system
    
    - name: Deploy to GitHub Pages
      uses: peaceiris/actions-gh-pages@v3
      with:
        github_token: ${{ secrets.GITHUB_TOKEN }}
        publish_dir: ./build
```

### 5. GitHub Pages 설정

#### 5.1 package.json 수정
```json
{
  "name": "homework-system-react",
  "version": "1.0.0",
  "homepage": "https://reasonofmoon.github.io/2025_homework_management_system",
  "scripts": {
    "start": "react-scripts start",
    "build": "react-scripts build",
    "test": "react-scripts test",
    "eject": "react-scripts eject",
    "predeploy": "npm run build",
    "deploy": "gh-pages -d build"
  }
}
```

#### 5.2 수동 배포
```bash
# gh-pages 패키지 설치
npm install --save-dev gh-pages

# 배포 실행
npm run deploy
```

### 6. README.md 작성

```markdown
# 🎯 학생 숙제 관리 시스템

입체어휘 4000 & 소리훈련 체계적 관리 시스템

## 🌟 주요 기능

- 📚 학생별 숙제 관리
- 📊 진도 추적 (입체어휘 4000)
- 🔤 소리훈련 관리
- 💬 자동 피드백 생성
- 📈 통계 및 분석
- 💾 데이터 백업/복구
- 📋 CSV 내보내기

## 🚀 시작하기

### 설치

\`\`\`bash
npm install
\`\`\`

### 개발 서버 실행

\`\`\`bash
npm start
\`\`\`

### 빌드

\`\`\`bash
npm run build
\`\`\`

### 테스트

\`\`\`bash
npm test
\`\`\`

## 📖 사용 가이드

### 학생 추가
1. "학생 관리" 버튼 클릭
2. "새 학생 추가" 버튼 클릭
3. 학생 정보 입력 후 저장

### 숙제 할당
1. 학생 카드에서 숙제 항목 선택
2. 내용 입력 후 자동 저장
3. 평가 결과 체크

### 진도 관리
1. "진도관리" 버튼 클릭
2. 현재 Unit 및 Stage 입력
3. 저장하면 자동으로 진도율 계산

## 🛠️ 기술 스택

- React 18
- Context API + Hooks
- LocalStorage
- CSS Modules
- Jest + React Testing Library

## 📝 라이선스

MIT License

## 👥 기여자

- [Reasonofmoon](https://github.com/Reasonofmoon)

## 📞 문의

이슈나 질문이 있으시면 GitHub Issues를 이용해주세요.
```

### 7. 릴리스 관리

#### 7.1 버전 태깅
```bash
# 버전 업데이트
npm version patch  # 1.0.0 -> 1.0.1
npm version minor  # 1.0.0 -> 1.1.0
npm version major  # 1.0.0 -> 2.0.0

# 태그 푸시
git push origin --tags
```

#### 7.2 릴리스 노트 작성
```markdown
## v1.0.0 (2025-01-22)

### 🎉 새로운 기능
- React로 완전히 재작성
- 성능 최적화 (50% 향상)
- 반응형 디자인 개선
- 자동 저장 기능 추가

### 🐛 버그 수정
- 진도 계산 오류 수정
- 데이터 동기화 문제 해결
- 모달 스크롤 이슈 수정

### 🔧 개선사항
- 코드 구조 개선
- 테스트 커버리지 80% 달성
- 접근성 개선

### ⚠️ Breaking Changes
- LocalStorage 데이터 구조 변경
- 기존 데이터 마이그레이션 필요
```

---

## 📊 마이그레이션 체크리스트

### 기능 완성도
- [ ] 학생 관리 (CRUD)
- [ ] 숙제 할당 및 추적
- [ ] 진도 관리
- [ ] 평가 시스템
- [ ] 피드백 생성
- [ ] 통계 대시보드
- [ ] CSV 내보내기
- [ ] 인쇄 기능
- [ ] 백업/복구
- [ ] 데이터 동기화

### 성능 최적화
- [ ] 컴포넌트 메모이제이션
- [ ] 코드 스플리팅
- [ ] 이미지 최적화
- [ ] 번들 크기 최적화
- [ ] 렌더링 최적화

### 테스트
- [ ] 단위 테스트 (80% 커버리지)
- [ ] 통합 테스트
- [ ] E2E 테스트
- [ ] 성능 테스트
- [ ] 접근성 테스트

### 문서화
- [ ] README.md
- [ ] API 문서
- [ ] 컴포넌트 문서
- [ ] 사용자 가이드
- [ ] 개발자 가이드

### 배포
- [ ] GitHub Pages 설정
- [ ] CI/CD 파이프라인
- [ ] 환경 변수 설정
- [ ] 도메인 연결 (선택)
- [ ] SSL 인증서 (선택)

---

## 🎯 다음 단계

### 단기 목표 (1-2주)
1. ✅ 버그 분석 완료
2. ✅ React 아키텍처 설계 완료
3. 🔄 핵심 기능 마이그레이션 진행
4. 🔄 UI 컴포넌트 구현

### 중기 목표 (1개월)
1. 전체 기능 마이그레이션 완료
2. 테스트 커버리지 80% 달성
3. GitHub Pages 배포
4. 사용자 피드백 수집

### 장기 목표 (3개월)
1. 모바일 앱 개발 (React Native)
2. 백엔드 API 개발
3. 실시간 동기화 기능
4. AI 기반 학습 추천 시스템

---

## 💡 추가 개선 아이디어

### 기능 확장
1. **학부모 포털**
   - 학부모 전용 대시보드
   - 실시간 알림
   - 학습 리포트 자동 발송

2. **선생님 도구**
   - 반별 비교 분석
   - 학습 패턴 분석
   - 자동 숙제 생성

3. **학생 포털**
   - 학생 전용 뷰
   - 게임화 요소
   - 학습 동기부여 시스템

### 기술 개선
1. **PWA 변환**
   - 오프라인 지원
   - 푸시 알림
   - 앱처럼 설치 가능

2. **백엔드 통합**
   - Node.js + Express
   - MongoDB/PostgreSQL
   - RESTful API

3. **실시간 기능**
   - WebSocket 통신
   - 실시간 협업
   - 라이브 업데이트

---

## 📞 지원 및 문의

- **GitHub Issues**: 버그 리포트 및 기능 요청
- **Discussions**: 일반적인 질문 및 토론
- **Email**: [이메일 주소]

---

**마지막 업데이트**: 2025-01-22
**버전**: 1.0.0
**작성자**: Reasonofmoon
