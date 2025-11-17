pipeline {
    agent any

    tools {
        nodejs 'node22'
        jdk 'jdk17'
    }

    environment {
        BACKEND_PORT = '8000'
        FRONTEND_PORT = '5173'
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
                bat """
                    cd backend
                    npm install
                """
            }
        }

        stage('Install Frontend Dependencies') {
            steps {
                bat """
                    cd frontend
                    npm install
                """
            }
        }

        stage('Build Frontend') {
            steps {
                bat """
                    cd frontend
                    npm run build
                """
            }
        }

        stage('SonarQube Analysis') {
            steps {
                script {
                    def scannerHome = tool 'sonar-scanner'
                    withSonarQubeEnv('sonar-local') {
                        bat """
                            "${scannerHome}\\bin\\sonar-scanner.bat" ^
                            -Dsonar.projectKey=product-deck ^
                            -Dsonar.projectName="Product Deck" ^
                            -Dsonar.sources=backend,frontend ^
                            -Dsonar.host.url=%SONAR_HOST_URL% ^
                            -Dsonar.token=%SONAR_AUTH_TOKEN% ^
                            -Dsonar.sourceEncoding=UTF-8 ^
                            -Dsonar.exclusions=**/node_modules/**,**/dist/**,**/build/**
                        """
                    }
                }
            }
        }

        stage('Quality Gate') {
            steps {
                timeout(time: 5, unit: 'MINUTES') {
                    waitForQualityGate abortPipeline: true
                }
            }
        }

        stage('Docker Build') {
            steps {
                bat """
                    docker build -t product-deck-backend:latest ./backend
                    docker build -t product-deck-frontend:latest ./frontend
                """
            }
        }

        stage('Stop Old Containers') {
            steps {
                bat """
                    docker stop backend 2>nul || echo "Backend container not running"
                    docker rm backend 2>nul || echo "Backend container not found"
                    docker stop frontend 2>nul || echo "Frontend container not running"
                    docker rm frontend 2>nul || echo "Frontend container not found"
                """
            }
        }

        stage('Docker Run') {
            steps {
                bat """
                    docker run -d --name backend --network product-deck-net -p %BACKEND_PORT%:8000 product-deck-backend:latest
                    timeout /t 10
                    docker run -d --name frontend --network product-deck-net -p %FRONTEND_PORT%:5173 product-deck-frontend:latest
                    timeout /t 10
                """
            }
        }

        stage('Run Selenium Tests') {
            steps {
                bat """
                    cd selenium_tests
                    if not exist node_modules npm install
                    npm test
                """
            }
        }

        stage('Deploy with Ansible') {
            steps {
                bat """
                    wsl ansible-playbook infra/deploy.yml -i infra/inventory --ask-become-pass || echo "Ansible deployment skipped"
                """
            }
        }
    }

    post {
        always {
            echo "Pipeline Completed"
        }
        success {
            echo "Build Successful!"
        }
        failure {
            echo "Build Failed!"
            bat """
                docker stop backend frontend 2>nul || echo "Cleanup attempted"
                docker rm backend frontend 2>nul || echo "Cleanup attempted"
            """
        }
    }
}