pipeline {
    agent any

    stages {
        stage('Checkout') {
            steps {
                echo 'Source code checkout completed'
            }
        }

        stage('Install Dependencies') {
            steps {
                sh 'python3 -m venv .venv'
                sh '.venv/bin/pip install --upgrade pip'
                sh '.venv/bin/pip install -r requirements.txt'
            }
        }

        stage('Build') {
            steps {
                sh '.venv/bin/python -m py_compile app.py'
                echo 'Application build completed'
            }
        }

        stage('Test') {
            steps {
                sh '.venv/bin/python -m unittest -v'
            }
        }
    }

    post {
        success {
            echo 'SUCCESS: Pipeline completed successfully!'
        }

        failure {
            echo 'FAILURE: Pipeline execution failed!'
        }

        always {
            echo 'Pipeline execution has finished.'
        }
    }
}