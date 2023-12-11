@ 초기 설정
1. npm install react-native-cli > npx react-native init [project_name]
2. react-native-cli가 전역으로 설치되는 경우 새 프로젝트를 init할 때 에러나는 경우가 있음
   - npm uninstall -g react-native-cli로 삭제
   - npx react-native init [project_name] --template react-native-template-typescript
   - 이후 react-native run-android 실행 시 react-native 오류가 나면 npm install react-native-cli 후 다시 실행

npm install react-native-notifications
    	    react-native-splash-screen
    	    react-native-webview

@ react로 개발한 웹을 react native의 webview로 연결하기 위해서 웹 사이트 배포를 선행
- gh-pages로 배포 가능
( 참고 - https://velog.io/@sksgur3217/React-GitHub-Pages-%EB%B0%B0%ED%8F%AC%ED%95%98%EA%B8%B0 )

@ 안드로이드 splash screen, icon 적용
참고 - https://ssilook.tistory.com/entry/React-Native-RN-Android-Splash-%EC%9D%B4%EB%AF%B8%EC%A7%80-%EC%A0%81%EC%9A%A9%ED%95%98%EA%B8%B0

@ 권한 설정
[ AndroidMenifest.xml 수정 ]

    <uses-permission android:name="android.permission.INTERNET" />
    <uses-permission android:name="android.permission.ACCESS_COARSE_LOCATION" />
    <uses-permission android:name="android.permission.ACCESS_FINE_LOCATION" />
    <uses-permission android:name="android.permission.ACCESS_BACKGROUND_LOCATION" />
    <uses-permission android:name="android.permission.POST_NOTIFICATIONS" />

@ notifications dexOption 에러 나는 경우 
=> node_modules > react-native-notifications > lib > android > app > build.gradle 안에 dexOption 부분 삭제

@ 어플 이름 설정
=> main\values\strings.xml 에서 변경

@ 빌드
1. cd android && gradlew clean 캐시 삭제

2. android > app > src > main 안에 assets 폴더 생성
이후 터미널에 아래 입력
react-native bundle --platform android --dev false --entry-file index.js --bundle-output android/app/src/main/assets/index.android.bundle --assets-dest android/app/src/main/res/

3. npm start 또는 react-native run-android

4. 어플 위치 : android\app\build\outputs\apk\debug > app-debug.apk



++
실행 시 AVD에서 초기 화면이 하얗게 나오는 경우
- 지도가 현 위치로 초기화되기 때문에 AVD의 현재 위치를 설정에서 따로 지정해줘야 함
- 또는 실제 기기에서 확인
