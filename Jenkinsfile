
pipeline {
    agent any

    parameters {
        choice(
            name: 'APP_ENV',
            choices: ['Development', 'Testing', 'Production'],
            description: 'Select the application environment'
        )

        string(
            name: 'APP_VERSION',
            defaultValue: '1.0.0',
            description: 'Enter the application version'
        )
    }

    environment {
        APP_NAME = 'Student-Task-Manager'
        APP_PORT = '5010'
    }

    stages {
        stage('Environment Variables') {
            steps {
                echo "Application: ${APP_NAME}"
                echo "Selected Environment: ${params.APP_ENV}"
                echo "Application Version: ${params.APP_VERSION}"
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

        stage('Package') {
            steps {
                sh '''
                    mkdir -p artifacts
                    zip -r "artifacts/student-task-manager-${APP_VERSION}.zip" \
                        app.py requirements.txt templates static
                '''

                archiveArtifacts(
                    artifacts: 'artifacts/*.zip',
                    fingerprint: true
                )

                echo 'Application packaged successfully!'
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
