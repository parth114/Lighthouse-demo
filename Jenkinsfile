pipeline {
    agent any

    stages {
        stage('Performance analysis') {
            steps {
                powershell '''
                npm i
                node Intermiles-pupeteer.js
                '''
            }
        }
    }
}