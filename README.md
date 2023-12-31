# barogo dev task

## 개요

자판기 구현

## Documents

- [사용자 관점 플로우](./DOCUMENTS/MECHANISM.png)
- [개발 진행 전 요구사항 정의](./DOCUMENTS/REQUIREMENTS_DEFINITION.md)
- 간단한 api spec
  - 각 router index.js 에 주석으로 표현
  - [example](./src/routes/beverages/index.js)

## Usage

### Server Starting

```bash
$ git clone https://github.com/rrgks6221/barogo-dev-task

$ echo "PORT=3000" > .env

$ npm i

# 서버 시작 후 localhost:3000 접속하면 화면이 나옵니다.
$ npm run start
```

### Script

```bash
# server start
$ npm run start

# server start dev
$ npm run start:dev

# unit test
$ npm run test

# e2e test
$ npm run test:e2e

# api skeleton code generator (controller, service)
$ npm run g:res -- -p "example"
```

## Directory Structure

```bash
.
├── DOCUMENTS # document directory
├── scripts # script directory
├── src
│   ├── app.js # server config file
│   ├── bin
│   │   └── www.js # server starting file
│   ├── client # client code directory
│   │   ├── static # static directory
│   │   │   └── js
│   │   │       ├── functions.js
│   │   │       └── root.js
│   │   └── views # view directory
│   │       ├── index.js
│   │       └── root.ejs
│   ├── common # common function directory
│   ├── constants # constant directory
│   ├── entities # entity directory
│   ├── exceptions # exception directory
│   ├── middleware # middleware directory
│   │   ├── exception-filters # exception filter directory
│   │   └── pipes # pipe directory
│   ├── repositories # repository directory
│   ├── routes # router directory
│   └── services # service directory
└── test # e2e test directory
```

## Branch Strategy

| Icon                                                      | Label    | Description                          |
| --------------------------------------------------------- | -------- | ------------------------------------ |
| <img src="https://img.shields.io/badge/bugfix-CC3D10"/>   | bugfix   | 버그 수정                            |
| <img src="https://img.shields.io/badge/delete-8B97E4"/>   | delete   | 코드 삭제                            |
| <img src="https://img.shields.io/badge/doc-F3D197"/>      | doc      | 문서 작업                            |
| <img src="https://img.shields.io/badge/feat-331AE4"/>     | feat     | 새로운 기능 추가                     |
| <img src="https://img.shields.io/badge/modify-2AC582"/>   | modify   | 코드 수정(기능상의 수정이 있는 경우) |
| <img src="https://img.shields.io/badge/refactor-A9362A"/> | refactor | 코드 수정(기능상의 수정이 없는 경우) |
| <img src="https://img.shields.io/badge/test-EAEA38"/>     | test     | 테스트코드 관련 작업                 |

1. 먼저 이슈를 생성한다.
   1. 생성된 이슈번호와 branch type을 통해 브랜치를 생성한다.
      - {branch-type}/i{issue-number}/{branch-title}
        ex) `doc/i1/readme`
1. 작업이 완료되면 작업 브랜치에 푸시 후 `main` 브랜치에 PR 을 요청한다.

## Commit Strategy

| type     | Description                          |
| -------- | ------------------------------------ |
| bugfix   | 버그 수정                            |
| delete   | 코드 삭제                            |
| doc      | 문서 작업                            |
| feat     | 새로운 기능 추가                     |
| modify   | 코드 수정(기능상의 수정이 있는 경우) |
| refactor | 코드 수정(기능상의 수정이 없는 경우) |
| test     | 테스트코드 관련 작업                 |

1. 작업 브랜치의 이슈번호와 commit type 을 통해 커밋메시지를 작성한다.
   - [#{issue-number}]/{commit-type}: {commit description}
     ex) [#1]/{doc}: README.md
