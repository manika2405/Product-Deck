pipeline {
    agent any

    tools {
        nodejs 'node22'
        jdk 'jdk17'
    }

    environment {
        SONAR_PROJECT_KEY = "product-deck"
        SONAR_PROJECT_NAME = "Product Deck"
        SONAR_PROJECT_VERSION = "1.0"
        SONAR_EXCLUSIONS = "**/node_modules/**,**/dist/**,**/*.test.js,**/*.spec.js"
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
                        def scannerHome = tool 'sonar-scanner'    // Use installed scanner

                        bat """
                            "${scannerHome}\\bin\\sonar-scanner.bat" ^
                            -Dsonar.projectKey=${SONAR_PROJECT_KEY} ^
                            -Dsonar.projectName="${SONAR_PROJECT_NAME}" ^
                            -Dsonar.projectVersion=${SONAR_PROJECT_VERSION} ^
                            -Dsonar.sources=backend,frontend ^
                            -Dsonar.sourceEncoding=UTF-8 ^
                            -Dsonar.exclusions=${SONAR_EXCLUSIONS}
                        """
                    }
                }
            }
        }

        stage('Run Selenium Tests') {
            steps {
                bat '''
                    cd selenium_tests
                    npm install
                    npm test
                    
                '''
            }
        }

       stage('Deploy with Ansible') {
    steps {
        bat '''
            wsl ansible-playbook /home/manika/ansible/infra/deploy.yml -i /home/manika/ansible/infra/inventory
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
