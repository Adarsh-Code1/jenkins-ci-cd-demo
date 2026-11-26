pipeline {
    agent any

    environment {
        APP_NAME = 'Student-Task-Manager'
        APP_ENV = 'Development'
        APP_PORT = '5010'
    }

    stages {

        stage('Environment Variables') {
            steps {
                echo "Application: ${APP_NAME}"
                echo "Environment: ${APP_ENV}"
                echo "Application Port: ${APP_PORT}"
                echo "Jenkins Build Number: ${BUILD_NUMBER}"
                echo "Jenkins Workspace: ${WORKSPACE}"
            }
        }


        stage('Use Docker Hub Credentials') {
            steps {
                withCredentials([usernamePassword(
                    credentialsId: 'dockerhub-login',
                    usernameVariable: 'DOCKER_USER',
                    passwordVariable: 'DOCKER_PASS'
                )]) {
                    sh '''
                        if [ -n "$DOCKER_USER" ] && [ -n "$DOCKER_PASS" ]; then
                            echo "SUCCESS: Docker Hub credentials loaded!"
                        else
                            echo "ERROR: Docker Hub credentials missing!"
                            exit 1
                        fi
                    '''
                }
            }
        }

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
