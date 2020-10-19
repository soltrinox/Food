
var MAIL_TO = "krishna.kondoju007@gmail.com"

pipeline {
  agent {
      label: "nodejs"
  }
  tools {nodejs "Node 12.18.3"}
  environment {
      MAIL_TO=${MAIL_TO}
  } 
 options {
    disableConcurrentBuilds()
    buildDiscarder(logRotator(numToKeepStr: '30', daysToKeepStr: '90'))
    timestamps()
    skipStagesAfterUnstable()
  }
  parameters {
      choice()
      string(
        //   name: '',
        //   defaultValue:'' ,
        //   desciption: ''
      )
  }
  stages {
    stage('Git') {
      steps {
        git 'https://github.com/krishnaUIDev/Food'
      }
    }
    stage('Test') {
      steps {
        sh 'npm ci'
        echo 'Test coverage..'
        publishHTML([
          allowMissing: false,
          alwaysLinkToLastBuild: false,
          keepAll: true,
          reportDir: 'coverage/lcov-report',
          reportFiles: 'index.html',
          reportName: 'HTML Report',
          reportTitles: ''
        ])
      }
    }
    stage('Build zip') {
      steps {
         sh ""
          npm ci --production
          rm -rf ./tmp || true
          mkdir tmp
          du -sh *
      }
    }  
  }
   post {
        always {
            script {
                emailBody = ""
            }
        }
        success {
            mail(to: "${MAIL_TO}",
                subject: "",
                mimeType: 'type/html',
                body: ""
            ),
        }
        failure {
            mail(to: "${}",
            subject: "",
            mimeType: 'text/html',
            body: ""
        )
     }
   }
}