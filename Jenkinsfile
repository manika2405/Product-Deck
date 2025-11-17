pipeline {
    agent any

    tools {
        nodejs 'node22'
        jdk 'jdk17'
        // sonar-scanner MUST be defined in Manage Jenkins > Tools
        // Name: sonar-scanner
        sonarScanner 'sonar-scanner'
    }

    environment {
        SONAR_PROJECT_KEY = "product-deck"
        SONAR_PROJECT_NAME = "\"Product Deck\""   // Quotes required due to space
        SONAR_PROJECT_VERSION = "1.0"
    }

    stages {

        stage('Checkout') {
            steps {
                git branch: 'main', url: 'https://github.com/manika2411/Product-Deck.git'
            }
        }

        stage('Check Node Version') {
            steps {
                bat 'node -v'
                bat 'npm -v'
            }
        }

        stage('Install Backend Dependencies') {
            steps {
                bat '''
                    cd backend
                    npm install
                '''
            }
        }

        stage('Install Frontend Dependencies') {
            steps {
                bat '''
                    cd frontend
                    npm install
                '''
            }
        }

        stage('Build Frontend') {
            steps {
                bat '''
                    cd frontend
                    npm run build
                '''
            }
        }

        stage('SonarQube Analysis') {
            steps {
                withSonarQubeEnv('sonar-local') {
                    script {
                        def scanner = tool 'sonar-scanner'
                        bat "\"${scanner}\\bin\\sonar-scanner.bat\" ^
                            -Dsonar.projectKey=${SONAR_PROJECT_KEY} ^
                            -Dsonar.projectName=${SONAR_PROJECT_NAME} ^
                            -Dsonar.projectVersion=${SONAR_PROJECT_VERSION} ^
                            -Dsonar.sources=backend,frontend ^
                            -Dsonar.sourceEncoding=UTF-8 ^
                            -Dsonar.exclusions=**/node_modules/**,**/dist/**,**/build/**,**/*.test.js,**/*.spec.js"
                    }
                }
            }
        }

        stage('Run Selenium Tests') {
            steps {
                bat '''
                    cd selenium-tests
                    npm install
                    npm test
                '''
            }
        }

        stage('Docker Build') {
            steps {
                bat '''
                    docker build -t product-deck-backend ./backend
                    docker build -t product-deck-frontend ./frontend
                '''
            }
        }

        stage('Docker Run') {
            steps {
                bat '''
                    docker stop backend || true
                    docker rm backend || true
                    docker stop frontend || true
                    docker rm frontend || true

                    docker run -d --name backend -p 8000:8000 product-deck-backend
                    docker run -d --name frontend -p 5173:5173 product-deck-frontend
                '''
            }
        }
    }

    post {
        always {
            echo "Pipeline Completed"
        }
    }
}
