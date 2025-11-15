pipeline {
    agent any

    tools {
        nodejs "node18"   // Make sure you configured this in Jenkins
    }

    stages {

        stage('Install Backend') {
            steps {
                bat 'cd backend && npm install'
            }
        }

        stage('Install Frontend') {
            steps {
                bat 'cd frontend && npm install'
            }
        }

        stage('Build Frontend') {
            steps {
                bat 'cd frontend && npm run build'
            }
        }

        stage('Docker Build') {
            steps {
                bat 'docker compose build'
            }
        }

        stage('Docker Run Test') {
            steps {
                bat 'docker compose up -d'
                bat 'docker ps'
            }
        }
    }
}
