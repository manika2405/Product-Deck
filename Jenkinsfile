pipeline {
    agent any

    tools {
        nodejs 'node22'
        jdk 'jdk17'
        // DO NOT ADD sonarScanner HERE (not required)
    }

    environment {
        SONAR_PROJECT_KEY = "product-deck"
        SONAR_PROJECT_NAME = "Product Deck"
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
                        // name must match Jenkins > Tools > SonarQube Scanner name
                        def scannerHome = tool 'sonar-scanner'
                        bat "\"${scannerHome}\\bin\\sonar-scanner.bat\" -Dsonar.projectKey=${SONAR_PROJECT_KEY} -Dsonar.projectName=${SONAR_PROJECT_NAME} -Dsonar.projectVersion=${SONAR_PROJECT_VERSION} -Dsonar.sources=backend,frontend -Dsonar.sourceEncoding=UTF-8"
                    }
                }
            }
        }

        stage('Run Selenium Tests') {
            steps {
                bat '''
                    cd selenium-tests
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

        stage('Deploy with Ansible') {
            steps {
                bat '''
                    wsl ansible-playbook infra/deploy.yml -i infra/inventory
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
