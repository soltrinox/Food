pipeline {
  agent any
  options {
      
  }
  tools {nodejs "node"}
  stages {
    stage('Git') {
      steps {
        git 'https://github.com/krishnaUIDev/Food'
      }
    }
    stage('Build') {
      steps {
        sh 'npm install'
         sh 'npm run build'
      }
    }  
    stage('Test') {
      steps {
        sh 'node test'
      }
    }
  }
}