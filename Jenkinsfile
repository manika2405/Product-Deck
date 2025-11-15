pipeline {
    agent any

    tools {
        nodejs 'node22'
        jdk 'jdk17'
    }

    environment {
        SONAR_TOKEN = credentials('sonar_token')
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
                withSonarQubeEnv('sonar-local') {

                    withEnv([
                        "JAVA_HOME=${tool 'jdk17'}",
                        "PATH+JDK=${tool 'jdk17'}\\bin"
                    ]) {

                        bat """
                            "${tool 'sonar-scanner'}\\bin\\sonar-scanner.bat" ^
                            -Dsonar.projectKey=product-deck ^
                            -Dsonar.projectName="Product Deck" ^
                            -Dsonar.sources=./backend,./frontend ^
                            -Dsonar.sourceEncoding=UTF-8 ^
                            -Dsonar.login=${env.SONAR_TOKEN}
                        """
                    }
                }
            }
        }

        stage('Run Selenium Tests') {
            steps {
                bat """
                    cd selenium-tests
                    node login.test.js
                """
            }
        }

        stage('Docker Build') {
            steps {
                bat """
                    docker build -t product-deck-backend ./backend
                    docker build -t product-deck-frontend ./frontend
                """
            }
        }

        stage('Docker Run') {
            steps {
                bat """
                    docker stop backend || true
                    docker rm backend || true
                    docker stop frontend || true
                    docker rm frontend || true

                    docker run -d --name backend -p 8000:8000 product-deck-backend
                    docker run -d --name frontend -p 5173:5173 product-deck-frontend
                """
            }
        }

        stage('Deploy with Ansible') {
            steps {
                bat """
                    wsl ansible-playbook infra/deploy.yml -i infra/inventory
                """
            }
        }
    }

    post {
        always {
            echo "Pipeline Completed"
        }
    }
}
