pipeline {
    agent any

    stages {
        stage('Checkout') {
            steps {
                echo 'Source code checkout completed'
            }
        }

        stage('Build') {
            steps {
                echo 'Building Python application'
                sh 'python3 app.py'
            }
        }

        stage('Test') {
            steps {
                echo 'Running Python unit tests'
                sh 'python3 -m unittest -v'
            }
        }
    }
}
